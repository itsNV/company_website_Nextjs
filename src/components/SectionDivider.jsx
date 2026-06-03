"use client";
import React from "react";

export default function SectionDivider() {
  return (
    <div className="section-divider reveal-item w-full overflow-hidden leading-[0] -my-px" aria-hidden>
      <svg
        className="w-full h-10 md:h-12 text-slate-200/80"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="section-divider-path"
          d="M0 24 C200 4 400 44 600 24 C800 4 1000 44 1200 24"
          stroke="url(#wave-grad-1)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#glass-glow)"
        />
        <path
          className="section-divider-path section-divider-path--delay"
          d="M0 32 C300 12 500 40 900 28 C1050 22 1150 36 1200 30"
          stroke="url(#wave-grad-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.95"
          filter="url(#glass-glow)"
        />
        <defs>
          {/* Glass-Glow filter representing neon glassmorphic rod light guides */}
          <filter id="glass-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="wave-grad-1" x1="-100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(200 95% 55% / 0.2)" />
            <stop offset="50%" stopColor="hsl(165 90% 45% / 0.95)" />
            <stop offset="100%" stopColor="hsl(200 95% 55% / 0.2)" />
            <animate attributeName="x1" from="-100%" to="100%" dur="6s" repeatCount="indefinite" />
            <animate attributeName="x2" from="0%" to="200%" dur="6s" repeatCount="indefinite" />
          </linearGradient>

          <linearGradient id="wave-grad-2" x1="100%" y1="0%" x2="200%" y2="0%">
            <stop offset="0%" stopColor="hsl(275 80% 50% / 0.15)" />
            <stop offset="50%" stopColor="hsl(285 95% 55% / 0.98)" />
            <stop offset="100%" stopColor="hsl(275 80% 50% / 0.15)" />
            <animate attributeName="x1" from="100%" to="-100%" dur="5s" repeatCount="indefinite" />
            <animate attributeName="x2" from="200%" to="0%" dur="5s" repeatCount="indefinite" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
