"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/app/Yunawise_logo.jpg";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user already saw the loader in this session to prevent annoyance
    const hasVisited = sessionStorage.getItem("yunawise_preloader_seen");
    if (hasVisited) {
      document.body.classList.remove("is-loading");
      setShow(false);
      return;
    }

    // Prevent body scrolling and hide main content during preloader animation
    document.body.style.overflow = "hidden";
    document.body.classList.add("is-loading");

    // Phase 1: Start fade out transition after 4.2s (gives full time to read the text)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2800);

    // Phase 2: Completely hide, re-enable scroll/content, and set sessionStorage (4.9s total)
    const hideTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      document.body.classList.remove("is-loading");
      sessionStorage.setItem("yunawise_preloader_seen", "true");
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = ""; // Safety cleanup
      document.body.classList.remove("is-loading");
    };
  }, []);

  if (!mounted) {
    // Return server-matching layout during initial hydration
    return (
      <div className="fixed inset-0 z-[100] bg-[#0c1524] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center px-6">
          <div className="w-16 h-16 mb-8 flex items-center justify-center">
            <Image src={logo} alt="Yunawise Logo" className="w-full h-full object-contain" priority />
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit text-white tracking-wider uppercase">
            YUNAWISE
          </div>
          <div className="h-[1.5px] w-[120px] bg-sky-400/60 my-4" />
          <div className="text-[10px] sm:text-xs font-black tracking-[0.26em] font-outfit text-sky-400 uppercase">
            TECHSOLVE LLP
          </div>
        </div>
      </div>
    );
  }

  if (!show) return null;

  const brandName = "YUNAWISE";
  const subText = "TECHSOLVE LLP";

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0c1524] flex flex-col items-center justify-center transition-all duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fadeOut ? "opacity-0 translate-y-[-100%]" : "opacity-100 translate-y-0"
      }`}
    >
      <style>{`
        @keyframes letterFadeIn {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.95);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes logoScale {
          0% {
            opacity: 0;
            transform: scale(0.75) rotate(-10deg);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0);
          }
        }
        @keyframes lineExpand {
          0% {
            width: 0%;
            opacity: 0;
          }
          100% {
            width: 120px;
            opacity: 0.6;
          }
        }
        @keyframes bgGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.35;
          }
        }
        .preloader-letter {
          display: inline-block;
          opacity: 0;
          animation: letterFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .preloader-logo {
          opacity: 0;
          animation: logoScale 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .preloader-line {
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #38bdf8, transparent);
          opacity: 0;
          animation: lineExpand 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
        }
        .preloader-subtext {
          opacity: 0;
          letter-spacing: 0.26em;
          animation: letterFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
        }
        .preloader-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: -1;
          animation: bgGlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative ambient background glow */}
      <div className="preloader-glow" />

      <div className="flex flex-col items-center text-center px-6">
        
        {/* Animated Brand Symbol */}
        <div className="preloader-logo w-16 h-16 mb-8 flex items-center justify-center">
          <Image src={logo} alt="Yunawise Logo" className="w-full h-full object-contain" priority />
        </div>

        {/* Staggered Letter Reveal for YUNAWISE */}
        <div className="flex items-center gap-[2px] mb-3">
          {brandName.split("").map((char, index) => (
            <span
              key={index}
              style={{ animationDelay: `${index * 60 + 200}ms` }}
              className="preloader-letter text-3xl sm:text-4xl md:text-5xl font-black font-outfit text-white tracking-wider uppercase"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Separator Line */}
        <div className="preloader-line mb-4" />

        {/* Subtitle Techsolve LLP */}
        <div className="preloader-subtext text-[10px] sm:text-xs font-black tracking-[0.26em] font-outfit text-sky-400 uppercase">
          {subText}
        </div>
      </div>
    </div>
  );
}
