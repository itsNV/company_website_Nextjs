"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Cpu } from "lucide-react";

const TECH_NAMES = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "GraphQL",
  "JavaScript",
  "Python",
];

/** Aurora theme pills — primary, accent, sky, slate (contrast-safe text) */
const THEME_VARIANTS = [
  "raindrop-theme-primary",
  "raindrop-theme-accent",
  "raindrop-theme-sky",
  "raindrop-theme-slate",
];

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildRaindrops() {
  const rand = mulberry32(42);
  return TECH_NAMES.map((name, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    return {
      id: idx,
      name,
      variant: THEME_VARIANTS[idx % THEME_VARIANTS.length],
      left: 10 + col * 22 + rand() * 4,
      landTop: row === 0 ? "68%" : "28%",
      delay: idx * 0.1 + rand() * 0.12,
      duration: 1 + rand() * 0.5,
      scale: rand() * 0.08 + 0.96,
      drift: (rand() - 0.5) * 12,
    };
  });
}

const RAIN_PARTICLES = buildRaindrops();

export default function Technologies() {
  const sectionRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  const [hasDropped, setHasDropped] = useState(false);

  const tryTriggerRain = useCallback(() => {
    const section = sectionRef.current;
    if (!section || hasTriggeredRef.current) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < vh * 0.9 && rect.bottom > vh * 0.1) {
      hasTriggeredRef.current = true;
      setHasDropped(true);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    tryTriggerRain();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryTriggerRain();
      },
      { threshold: 0.15, rootMargin: "0px 0px 32px 0px" }
    );

    observer.observe(section);
    window.addEventListener("scroll", tryTriggerRain, { passive: true });
    window.addEventListener("resize", tryTriggerRain, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", tryTriggerRain);
      window.removeEventListener("resize", tryTriggerRain);
    };
  }, [tryTriggerRain]);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="reveal-item py-16 md:py-20"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal-item text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-5">
            <Cpu className="w-3.5 h-3.5" />
            Tech Stack
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 leading-tight">
            Technology <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">we use</span>
          </h2>
          <p className="mt-3 text-slate-500 text-sm md:text-base max-w-lg mx-auto">
            Modern tools that power fast, scalable products.
          </p>
        </div>

        <div
          className="reveal-item tech-rain-canvas"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="hover-box relative h-36 sm:h-40 rounded-2xl border border-slate-200/90 bg-white/70 shadow-sm overflow-hidden w-full"
            aria-label="Technologies animation"
          >
            <div className="tech-rain-layer absolute inset-0" aria-hidden={!hasDropped}>
              {hasDropped &&
                RAIN_PARTICLES.map((p) => (
                  <div
                    key={p.id}
                    className={`raindrop-particle raindrop-once ${p.variant}`}
                    style={{
                      left: `${p.left}%`,
                      "--rain-land-top": p.landTop,
                      "--rain-delay": `${p.delay}s`,
                      "--rain-duration": `${p.duration}s`,
                      "--rain-scale": String(p.scale),
                      "--rain-drift": `${p.drift}px`,
                    }}
                  >
                    <span className="raindrop-label">{p.name}</span>
                  </div>
                ))}
            </div>

            {!hasDropped && (
              <p className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 font-medium">
                Scroll here to reveal our stack
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
