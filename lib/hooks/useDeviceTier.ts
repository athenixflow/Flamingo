"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "mid" | "low";

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("mid");

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    let canvas: HTMLCanvasElement | null = null;
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      canvas = document.createElement("canvas");
      gl = (canvas.getContext("webgl2") ||
        canvas.getContext("webgl")) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    let detected: DeviceTier = "mid";
    if (!gl) {
      detected = "low";
    } else if (isMobile) {
      detected = cores >= 6 && memory >= 4 ? "mid" : "low";
    } else if (cores >= 8 && memory >= 8) {
      detected = "high";
    } else if (cores >= 4 && memory >= 4) {
      detected = "mid";
    } else {
      detected = "low";
    }

    setTier(detected);
  }, []);

  return tier;
}
