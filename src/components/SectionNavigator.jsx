"use client";
import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "technologies", label: "Tech Stack" },
  { id: "works", label: "Works" },
  { id: "testimonials", label: "Reviews" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function SectionNavigator() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Find index of current active section to draw the line up to this exact dot
  const activeIdx = SECTIONS.findIndex((s) => s.id === activeId);
  const activeIdxSafe = activeIdx !== -1 ? activeIdx : 0;

  // 7 segments * sqrt(20^2 + 40^2) = 7 * 44.72136 = 313.05px total path length
  const pathLength = 313.05;
  const strokeDashoffset = pathLength - activeIdxSafe * 44.72136;

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block w-10 h-[300px]"
      aria-label="Page sections"
    >
      {/* SVG Zigzag Tracks */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
        viewBox="0 0 40 300"
        fill="none"
      >
        <defs>
          <linearGradient id="navGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Faint Background Zigzag Line */}
        <path
          d="M 10 10 L 30 50 L 10 90 L 30 130 L 10 170 L 30 210 L 10 250 L 30 290"
          stroke="rgba(148, 163, 184, 0.2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Glowing Active Scroll Progress Line */}
        <path
          d="M 10 10 L 30 50 L 10 90 L 30 130 L 10 170 L 30 210 L 10 250 L 30 290"
          stroke="url(#navGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
          filter="url(#glow)"
          className="transition-all duration-150 ease-out"
        />
      </svg>

      {/* Navigation Staggered Dots */}
      <div className="relative w-full h-full">
        {SECTIONS.map((section, idx) => {
          const isActive = activeId === section.id;
          const x = idx % 2 === 0 ? 10 : 30;
          const y = 10 + idx * 40;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute section-nav-dot group flex items-center justify-center w-6 h-6 transition-transform duration-300 ease-out hover:scale-110 z-10"
              aria-label={section.label}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Tooltip Label */}
              <span
                className={`absolute right-8 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white border border-slate-200/60 shadow-sm text-slate-500 opacity-0 translate-x-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${
                  isActive ? "opacity-100 translate-x-0 text-slate-900 border-slate-300 font-black shadow-md" : ""
                }`}
              >
                {section.label}
              </span>

              {/* Dynamic Concentric Dot */}
              <span
                className={`block transition-all duration-300 ease-out rounded-full ${
                  isActive
                    ? "w-4.5 h-4.5 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400 border-2 border-white shadow-md shadow-sky-400/40"
                    : "w-2.5 h-2.5 bg-slate-300/80 group-hover:w-3.5 group-hover:h-3.5 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-sky-400 group-hover:border group-hover:border-white"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
