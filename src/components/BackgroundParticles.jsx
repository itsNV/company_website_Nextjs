"use client";
import React, { useEffect, useRef } from "react";

export default function BackgroundParticles() {
  const containerRef = useRef(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Coordinate delta from screen center, scaled to map to pixels
      mouseTarget.current.x = (e.clientX - window.innerWidth / 2) * 0.15;
      mouseTarget.current.y = (e.clientY - window.innerHeight / 2) * 0.15;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId;
    const update = () => {
      // Smooth interpolation (lerp)
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.08;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.08;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${mouseCurrent.current.x}px`);
        containerRef.current.style.setProperty("--mouse-y", `${mouseCurrent.current.y}px`);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes morph-blob-1 {
          0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; transform: scale(0.8) translate(0px, 0px); }
          33% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; transform: scale(1.25) translate(-10vw, 15vh); }
          66% { border-radius: 50% 50% 30% 70% / 40% 60% 40% 60%; transform: scale(0.7) translate(8vw, -12vh); }
        }
        @keyframes morph-blob-2 {
          0%, 100% { border-radius: 50% 50% 30% 70% / 50% 60% 40% 50%; transform: scale(1.3) translate(0px, 0px); }
          33% { border-radius: 35% 65% 60% 40% / 40% 35% 65% 60%; transform: scale(0.75) translate(12vw, -18vh); }
          66% { border-radius: 65% 35% 45% 55% / 60% 55% 45% 40%; transform: scale(1.2) translate(-8vw, 10vh); }
        }
        @keyframes morph-blob-3 {
          0%, 100% { border-radius: 60% 40% 60% 40% / 40% 60% 40% 60%; transform: scale(0.7) translate(0px, 0px); }
          33% { border-radius: 45% 55% 40% 60% / 50% 45% 55% 50%; transform: scale(1.25) translate(-15vw, -10vh); }
          66% { border-radius: 70% 30% 70% 30% / 60% 40% 60% 40%; transform: scale(0.8) translate(10vw, 12vh); }
        }
      `}} />
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] opacity-75"
        style={{
          "--mouse-x": "0px",
          "--mouse-y": "0px",
        }}
      >
        {/* Blob 1: Top Right, Indigo/Purple Gradient */}
        <div
          className="absolute"
          style={{
            top: "5%",
            right: "10%",
            transform: "translate3d(calc(var(--mouse-x) * 0.4), calc(var(--mouse-y) * 0.4), 0)",
            transition: "transform 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)",
          }}
        >
          <div
            className="w-[380px] h-[380px] blur-[45px] bg-gradient-to-tr from-indigo-500/60 via-purple-500/65 to-pink-500/50 mix-blend-multiply filter"
            style={{
              animation: "morph-blob-1 26s ease-in-out infinite",
            }}
          />
        </div>

        {/* Blob 2: Bottom Left, Cyan/Blue Gradient */}
        <div
          className="absolute"
          style={{
            bottom: "10%",
            left: "5%",
            transform: "translate3d(calc(var(--mouse-x) * -0.5), calc(var(--mouse-y) * -0.5), 0)",
            transition: "transform 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)",
          }}
        >
          <div
            className="w-[420px] h-[420px] blur-[50px] bg-gradient-to-tr from-cyan-400/60 via-blue-500/60 to-indigo-400/50 mix-blend-multiply filter"
            style={{
              animation: "morph-blob-2 30s ease-in-out infinite",
            }}
          />
        </div>

        {/* Blob 3: Center Right, Pink/Rose Gradient */}
        <div
          className="absolute"
          style={{
            top: "35%",
            right: "15%",
            transform: "translate3d(calc(var(--mouse-x) * 0.6), calc(var(--mouse-y) * -0.3), 0)",
            transition: "transform 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)",
          }}
        >
          <div
            className="w-[340px] h-[340px] blur-[40px] bg-gradient-to-tr from-rose-500/60 via-pink-500/60 to-orange-400/50 mix-blend-multiply filter"
            style={{
              animation: "morph-blob-3 22s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </>
  );
}
