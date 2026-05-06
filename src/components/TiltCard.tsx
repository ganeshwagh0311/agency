import React, { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
}

export function TiltCard({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.15)",
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const el = cardRef.current;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    // Normalize coordinates from -1 to 1
    const xc = x / rect.width;
    const yc = y / rect.height;

    const dx = (xc - 0.5) * 2; // -1 to 1
    const dy = (yc - 0.5) * 2; // -1 to 1

    // Set rotation
    setRotateX(-dy * tiltMaxAngleX);
    setRotateY(dx * tiltMaxAngleY);

    // Set glare position (as percentage)
    setGlarePos({
      x: xc * 100,
      y: yc * 100,
      opacity: 0.6,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-200 ease-out",
        "bg-white/[0.04] backdrop-blur-md border border-white/[0.08]",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
        z: rotateX !== 0 || rotateY !== 0 ? 20 : 0,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 150 }}
    >
      {/* Glare Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glareColor} 0%, rgba(255,255,255,0) 60%)`,
          opacity: glarePos.opacity,
        }}
      />
      
      {/* Content wrapper with 3D depth */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}
