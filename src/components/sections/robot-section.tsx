'use client';

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export function RobotSection() {
  return (
    <div className="relative bg-background overflow-hidden" style={{ width: "100%", height: "100%" }}>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
