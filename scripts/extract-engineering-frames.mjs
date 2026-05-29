#!/usr/bin/env node
/**
 * Extract two JPEG frame sequences from the engineering-reveal MP4 — one
 * tuned for desktop (1280px, q4) and one tuned for mobile (640px, q7).
 * The Hero Reveal section uses these as an <img> sequence swapped on
 * scroll. Buttery scrub on both form factors because no live H.264
 * decoding happens per scroll event.
 *
 * Outputs:
 *   public/videos/engineering-frames/frame-XXXX.jpg            (desktop)
 *   public/videos/engineering-frames-mobile/frame-XXXX.jpg     (mobile)
 *
 * Manifests:
 *   content/engineering-frames.json         (desktop)
 *   content/engineering-frames-mobile.json  (mobile)
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "public", "videos", "engineering-reveal.mp4");

// Two encodings — desktop and mobile. Mobile uses a smaller frame size
// AND a higher q (lower quality) to cut total bytes by ~70%.
const PROFILES = [
  {
    name: "desktop",
    outDir: path.join(ROOT, "public", "videos", "engineering-frames"),
    manifest: path.join(ROOT, "content", "engineering-frames.json"),
    pathPrefix: "/videos/engineering-frames/frame-",
    fps: 15,
    width: 1280,
    qscale: 4,
  },
  {
    // Mobile profile: half the frame rate AND half the resolution. Each
    // scroll-pixel advances the same fraction of the timeline, but with
    // half as many img.src swaps per scroll-distance — the paint cost
    // halves and the total download drops to ~1 MB. The visual
    // difference is invisible on a ~390 px-wide viewport.
    name: "mobile",
    outDir: path.join(ROOT, "public", "videos", "engineering-frames-mobile"),
    manifest: path.join(ROOT, "content", "engineering-frames-mobile.json"),
    pathPrefix: "/videos/engineering-frames-mobile/frame-",
    fps: 8,
    width: 480,
    qscale: 8,
  },
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    proc.stderr.on("data", (d) => (stderr += d.toString()));
    proc.on("close", (code) =>
      code === 0
        ? resolve(stderr)
        : reject(new Error(`ffmpeg exit ${code}\n${stderr.slice(-1500)}`)),
    );
    proc.on("error", reject);
  });
}

async function buildProfile(profile) {
  await fs.mkdir(profile.outDir, { recursive: true });

  // Wipe any previous extraction so frame counts stay deterministic.
  const existing = await fs.readdir(profile.outDir).catch(() => []);
  for (const f of existing) {
    if (f.startsWith("frame-") && f.endsWith(".jpg")) {
      await fs.unlink(path.join(profile.outDir, f));
    }
  }

  console.log(`[${profile.name}] extracting from ${path.relative(ROOT, SRC)}…`);
  const outputPattern = path.join(profile.outDir, "frame-%04d.jpg");
  await run(ffmpegPath, [
    "-y",
    "-i",
    SRC,
    "-vf",
    `fps=${profile.fps},scale=${profile.width}:-2:flags=lanczos`,
    "-q:v",
    String(profile.qscale),
    "-pix_fmt",
    "yuvj420p",
    outputPattern,
  ]);

  const files = (await fs.readdir(profile.outDir))
    .filter((f) => f.startsWith("frame-") && f.endsWith(".jpg"))
    .sort();

  if (files.length === 0) {
    throw new Error(`[${profile.name}] no frames written.`);
  }

  // Probe frame dimensions by feeding a frame back through ffmpeg.
  const probeLog = await run(ffmpegPath, [
    "-i",
    path.join(profile.outDir, files[0]),
    "-f",
    "null",
    "-",
  ]).catch((e) => e.message);
  const dimMatch = probeLog.match(/(\d{2,5})x(\d{2,5})/);
  const width = dimMatch ? parseInt(dimMatch[1], 10) : profile.width;
  const height = dimMatch
    ? parseInt(dimMatch[2], 10)
    : Math.round((profile.width * 9) / 16);

  const totalSize = (
    await Promise.all(
      files.map((f) => fs.stat(path.join(profile.outDir, f)).then((s) => s.size)),
    )
  ).reduce((a, b) => a + b, 0);

  const manifest = {
    count: files.length,
    fps: profile.fps,
    width,
    height,
    pathPrefix: profile.pathPrefix,
    pathSuffix: ".jpg",
    padding: 4,
    totalBytes: totalSize,
  };
  await fs.writeFile(profile.manifest, JSON.stringify(manifest, null, 2) + "\n");

  return {
    profile: profile.name,
    count: files.length,
    width,
    height,
    totalSize,
    avgKB: totalSize / files.length / 1024,
  };
}

async function main() {
  if (!ffmpegPath) {
    throw new Error("ffmpeg-static failed to expose a binary path.");
  }

  const summaries = [];
  for (const profile of PROFILES) {
    summaries.push(await buildProfile(profile));
  }

  console.log("=".repeat(60));
  for (const s of summaries) {
    console.log(
      `${s.profile.padEnd(8)} ${s.count} frames · ${s.width}×${s.height} · ${(s.totalSize / 1024 / 1024).toFixed(2)} MB · avg ${s.avgKB.toFixed(0)} KB/frame`,
    );
  }
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("Extraction failed:", err);
  process.exit(1);
});
