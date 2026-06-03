"use client";
import React, { useEffect, useState, useRef } from "react";

export default function BackgroundCurves() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.scrollHeight;
      const winHeight = window.innerHeight;
      
      // Calculate scroll progress percentage relative to page height
      const scrolled = window.scrollY / (totalHeight - winHeight || 1);
      setScrollProgress(Math.min(Math.max(scrolled, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call to set correct offset on page load
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate the line drawing via CSS strokeDashoffset
  // Let pathLength be 1500 for high precision
  const pathLength = 1500;
  const strokeDashoffset = pathLength - scrollProgress * pathLength;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden z-[-1]"
    >
      <svg
        className="w-full h-full min-h-screen opacity-35"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Shimmering Aurora Light Guide Path 1 */}
        <path
          d="M 10 0 C 40 25, -20 50, 80 75 C 120 85, 30 95, 20 100"
          stroke="url(#aurora-blue-grad)"
          strokeWidth="0.15"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />

        {/* Opposite Shimmering Guide Path 2 */}
        <path
          d="M 90 0 C 60 30, 120 60, 20 80 C -10 90, 70 95, 80 100"
          stroke="url(#aurora-teal-grad)"
          strokeWidth="0.1"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset * 1.05} // Slightly offset for staggered visual harmony
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />

        {/* Glow Gradients */}
        <defs>
          <linearGradient id="aurora-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="aurora-teal-grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
