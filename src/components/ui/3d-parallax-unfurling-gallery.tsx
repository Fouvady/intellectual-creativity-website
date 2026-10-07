"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// 11 high-quality photorealistic service images (one per service sector).
// Regenerated using detailed user-provided prompts (photorealistic, 8k).
// No duplicates — each image is a distinct visual of one of our service sectors.
const SERVICE_IMAGES = [
  // 1. PABX / Telephone systems
  "/services/pabx-1.png",
  // 2. AVC Audio-Video & PA
  "/services/avc-1.png",
  // 3. Networking / Structured cabling
  "/services/network-1.png",
  // 4. CCTV / Security
  "/services/cctv-1.png",
  // 5. Smart electronic systems
  "/services/smart-1.png",
  // 6. Building automation
  "/services/automation-1.png",
  // 7. Digital Signage & Video Walls
  "/services/signage-1.png",
  // 8. Point of Sale (POS) Solutions
  "/services/pos-1.png",
  // 9. Unified Low Current (ELV) Systems
  "/services/elv-1.png",
  // 10. Time & Attendance Management
  "/services/time-1.png",
  // 11. Smart AI Analytics & Standalone VoIP
  "/services/aivoip-1.png",
] as const;

interface ImageCardProps {
  src: string;
  onLoad?: () => void;
}

const ImageCard = ({ src, onLoad }: ImageCardProps) => {
  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-foreground/10 transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative backface-hidden preserve-3d border border-foreground/10">
      <img
        src={src}
        alt="Gallery Asset"
        loading="lazy"
        decoding="async"
        onLoad={onLoad}
        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
};

export default function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const colMedia = useMemo(() => {
    const col1Base = SERVICE_IMAGES.filter((_, i) => i % 4 === 0);
    const col2Base = SERVICE_IMAGES.filter((_, i) => i % 4 === 1);
    const col3Base = SERVICE_IMAGES.filter((_, i) => i % 4 === 2);
    const col4Base = SERVICE_IMAGES.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["90vw", "100vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["80vh", "100vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["48px", "0px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["4px", "0px"]);

  const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-40%", "10%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-30%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600vh] bg-background text-foreground font-sans selection:bg-foreground selection:text-background"
    >
      <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden z-10">
        <motion.div
          style={{
            width: bannerWidth,
            height: bannerHeight,
            borderRadius: bannerRadius,
            borderWidth: bannerBorderWidth,
            borderColor: "color-mix(in oklch, var(--brand-cyan) 30%, transparent)",
          }}
          className="relative bg-background overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto backface-hidden preserve-3d"
        >
          <div
            className="absolute inset-0 flex justify-center items-center pointer-events-none"
            style={{ perspective: "1000px" }}
          >
            <div
              className="absolute inset-0 z-20"
              style={{
                boxShadow:
                  "inset 0 100px 150px -50px var(--bg-glow, rgba(0,0,0,0.9)), inset 0 -100px 150px -50px var(--bg-glow, rgba(0,0,0,0.9))",
              }}
            />
            <div
              className="absolute inset-0 z-20"
              style={{
                boxShadow:
                  "inset 150px 0 150px -50px var(--bg-glow, rgba(0,0,0,0.9)), inset -150px 0 150px -50px var(--bg-glow, rgba(0,0,0,0.9))",
              }}
            />

            <motion.div
              style={{
                rotateX,
                rotateY,
                rotateZ,
                z: translateZ,
                transformStyle: "preserve-3d",
              }}
              className="flex gap-4 md:gap-6 justify-center items-center w-[120vw] h-[150vh] origin-center opacity-100 backface-hidden"
            >
              <motion.div style={{ y: yCol1 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col1.map((src, index) => (
                  <ImageCard key={`col1-${index}`} src={src} onLoad={handleItemLoad} />
                ))}
              </motion.div>

              <motion.div style={{ y: yCol2 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col2.map((src, index) => (
                  <ImageCard key={`col2-${index}`} src={src} onLoad={handleItemLoad} />
                ))}
              </motion.div>

              <motion.div style={{ y: yCol3 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col3.map((src, index) => (
                  <ImageCard key={`col3-${index}`} src={src} onLoad={handleItemLoad} />
                ))}
              </motion.div>

              <motion.div style={{ y: yCol4 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col4.map((src, index) => (
                  <ImageCard key={`col4-${index}`} src={src} onLoad={handleItemLoad} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
