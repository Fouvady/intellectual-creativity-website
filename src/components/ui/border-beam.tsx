"use client";

import React, { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export type BorderBeamSize = "line" | "chunky";
export type BorderBeamColorVariant = "mono" | "colorful";

export interface BorderBeamProps {
  children: React.ReactNode;
  size?: BorderBeamSize;
  colorVariant?: BorderBeamColorVariant;
  duration?: number;
  borderRadius?: number;
  className?: string;
}

const COLORS: Record<BorderBeamColorVariant, string[]> = {
  mono: ["#ffffff", "#a3a3a3", "#ffffff"],
  colorful: ["#22d3ee", "#38bdf8", "#fbbf24", "#22d3ee"],
};

/**
 * BorderBeam — an animated gradient beam that travels around the border.
 * Uses a conic-gradient + CSS mask to show only the border ring.
 */
export function BorderBeam({
  children,
  size = "line",
  colorVariant = "colorful",
  duration = 3,
  borderRadius = 20,
  className,
}: BorderBeamProps) {
  const beamRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((delta) => {
    if (!beamRef.current) return;
    const current = parseFloat(beamRef.current.dataset.angle || "0");
    const next = current + (delta / 1000) * (360 / duration);
    beamRef.current.dataset.angle = String(next);
    const colors = COLORS[colorVariant].join(", ");
    beamRef.current.style.background = `conic-gradient(from ${next}deg, transparent 0deg, ${colors} 60deg, transparent 120deg, transparent 360deg)`;
  });

  const beamWidth = size === "line" ? 2 : 4;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius: `${borderRadius}px`,
        overflow: "hidden",
      }}
    >
      {/* Animated beam layer */}
      <div
        ref={beamRef}
        aria-hidden
        data-angle="0"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: `${borderRadius}px`,
          padding: `${beamWidth}px`,
          background: `conic-gradient(from 0deg, transparent 0deg, ${COLORS[colorVariant].join(", ")} 60deg, transparent 120deg, transparent 360deg)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 5 }}>
        {children}
      </div>
    </div>
  );
}

export default BorderBeam;
