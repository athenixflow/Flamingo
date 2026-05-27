"use client";

import { useEffect, useState } from "react";

interface Tilt {
  beta: number; // front/back
  gamma: number; // left/right
}

export function useGyroscope(active = true): Tilt {
  const [tilt, setTilt] = useState<Tilt>({ beta: 0, gamma: 0 });

  useEffect(() => {
    if (!active || typeof window === "undefined") return;

    const handler = (event: DeviceOrientationEvent) => {
      setTilt({
        beta: event.beta ?? 0,
        gamma: event.gamma ?? 0,
      });
    };

    let cleanup: (() => void) | undefined;

    // iOS 13+ requires explicit permission via a user gesture.
    type IOSDeviceOrientation = typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    const DOE = DeviceOrientationEvent as unknown as IOSDeviceOrientation;
    const needsPermission = typeof DOE?.requestPermission === "function";

    if (needsPermission) {
      const onceClick = async () => {
        try {
          const state = await DOE.requestPermission!();
          if (state === "granted") {
            window.addEventListener("deviceorientation", handler, true);
          }
        } catch {
          /* user dismissed */
        }
        document.removeEventListener("click", onceClick);
      };
      document.addEventListener("click", onceClick, { once: true });
      cleanup = () => document.removeEventListener("click", onceClick);
    } else {
      window.addEventListener("deviceorientation", handler, true);
      cleanup = () =>
        window.removeEventListener("deviceorientation", handler, true);
    }

    return cleanup;
  }, [active]);

  return tilt;
}
