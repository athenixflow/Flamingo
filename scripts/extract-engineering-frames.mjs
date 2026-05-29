#!/usr/bin/env node
/**
 * Extract a JPEG frame sequence from the engineering-reveal MP4.
 * The Hero Reveal section uses these as an <img> sequence swapped on
 * scroll — that's the standard "buttery scroll-scrub" technique because
 * no live H.264 decoding happens per scroll event.
 *
 * Output: public/videos/engineering-frames/frame-XXXX.jpg
 * Manifest: public/videos/engineering-frames.json (count + dimensions)
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "public", "videos", "engineering-reveal.mp4");
const OUT_DIR = path.join(ROOT, "public", "videos", "engineering-frames");
// Manifest lives under content/ so it's bundleable via TS import. The
// frame JPEGs stay under public/ as static assets served by the CDN.
const MANIFEST = path.join(ROOT, "content", "engineering-frames.json");

// Frame rate of the output sequence. 15 fps over an ~8s clip = ~120
// frames — smooth enough that consecutive frames are imperceptibly
// different to the eye, with a manageable on-disk footprint.
const FPS = 15;
// Output width — 1280 keeps it crisp on 1440p displays at object-cover
// while shaving ~33% of the file size vs the original 1920px.
const WIDTH = 1280;
// JPEG quality (1-31, lower = better). 4 is high quality with
// noticeable compression savings vs lossless.
const QSCALE = 4;

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

async function main() {
  if (!ffmpegPath) {
    throw new Error("ffmpeg-static failed to expose a binary path.");
  }
  await fs.mkdir(OUT_DIR, { recursive: true });

  // Wipe any previous extraction so frame counts stay deterministic.
  const existing = await fs.readdir(OUT_DIR).catch(() => []);
  for (const f of existing) {
    if (f.startsWith("frame-") && f.endsWith(".jpg")) {
      await fs.unlink(path.join(OUT_DIR, f));
    }
  }

  console.log(`Extracting frames from ${path.relative(ROOT, SRC)}…`);
  const outputPattern = path.join(OUT_DIR, "frame-%04d.jpg");
  await run(ffmpegPath, [
    "-y",
    "-i",
    SRC,
    "-vf",
    `fps=${FPS},scale=${WIDTH}:-2:flags=lanczos`,
    "-q:v",
    String(QSCALE),
    "-pix_fmt",
    "yuvj420p",
    outputPattern,
  ]);

  const files = (await fs.readdir(OUT_DIR))
    .filter((f) => f.startsWith("frame-") && f.endsWith(".jpg"))
    .sort();

  if (files.length === 0) {
    throw new Error("No frames written. Check the source video.");
  }

  // Probe the first frame to record dimensions in the manifest. ffmpeg
  // doesn't easily emit them on stdout, so spawn ffprobe — but
  // ffmpeg-static only ships ffmpeg. Fall back to a manual probe via
  // ffmpeg's `-i` log scrape, which prints `Stream #0:0: Video:
  // mjpeg, yuvj420p(pc, bt470bg/unknown/unknown), 1280x720, …`.
  const probeLog = await run(ffmpegPath, [
    "-i",
    path.join(OUT_DIR, files[0]),
    "-f",
    "null",
    "-",
  ]).catch((e) => e.message);
  const dimMatch = probeLog.match(/(\d{2,5})x(\d{2,5})/);
  const width = dimMatch ? parseInt(dimMatch[1], 10) : WIDTH;
  const height = dimMatch ? parseInt(dimMatch[2], 10) : Math.round((WIDTH * 9) / 16);

  const totalSize = (
    await Promise.all(
      files.map((f) => fs.stat(path.join(OUT_DIR, f)).then((s) => s.size)),
    )
  ).reduce((a, b) => a + b, 0);

  const manifest = {
    count: files.length,
    fps: FPS,
    width,
    height,
    pathPrefix: "/videos/engineering-frames/frame-",
    pathSuffix: ".jpg",
    // Padding length — frame-0001.jpg → 4. Useful for component-side path building.
    padding: 4,
    totalBytes: totalSize,
  };
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  console.log("=".repeat(60));
  console.log(`Frames written: ${files.length}`);
  console.log(`Dimensions: ${width}×${height}`);
  console.log(
    `Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB (avg ${(totalSize / files.length / 1024).toFixed(0)} KB/frame)`,
  );
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST)}`);
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("Extraction failed:", err);
  process.exit(1);
});
