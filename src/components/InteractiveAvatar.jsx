"use client";
import React, { useEffect, useState, useRef } from "react";
import { Sparkles } from "lucide-react";

// Pre-configured coordinates and scales for each section
const SECTION_POSITIONS = {
  home: { bottom: "8vh", right: "6vw", scale: 1.1, rotate: 0 },
  about: { bottom: "10vh", left: "4vw", scale: 0.95, rotate: -6 },
  services: { top: "18vh", right: "5vw", scale: 0.9, rotate: 6 },
  technologies: { bottom: "12vh", left: "5vw", scale: 1.0, rotate: -4 },
  works: { bottom: "14vh", right: "5vw", scale: 0.92, rotate: 5 },
  testimonials: { top: "22vh", left: "4vw", scale: 0.98, rotate: -8 },
  blog: { bottom: "10vh", left: "5vw", scale: 0.9, rotate: 4 },
  contact: { bottom: "14vh", right: "10vw", scale: 1.15, rotate: 0 },
};

export default function InteractiveAvatar({ activeSection }) {
  const avatarRef = useRef(null);
  const [lookOffset, setLookOffset] = useState({ x: 0, y: 0, rotate: 0 });

  const currentPos = SECTION_POSITIONS[activeSection] || SECTION_POSITIONS.home;

  useEffect(() => {
    // ONLY track cursor if we are in the home/hero section
    if (activeSection !== "home") {
      setLookOffset({ x: 0, y: 0, rotate: 0 });
      return;
    }

    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;

      const rect = avatarRef.current.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - avatarCenterX;
      const dy = e.clientY - avatarCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxOffset = 7;
      const scale = Math.min(distance / 250, 1.2);
      
      const angle = Math.atan2(dy, dx);
      const lookX = Math.cos(angle) * maxOffset * scale;
      const lookY = Math.sin(angle) * maxOffset * scale;
      const headRotate = (dx / window.innerWidth) * 10;

      setLookOffset({
        x: lookX,
        y: lookY,
        rotate: headRotate,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeSection]);

  // Premium, highly descriptive SVG posture accessories to clearly visualize section meanings
  const renderPostureDetails = () => {
    switch (activeSection) {
      case "about": // 1. Strategy & Foundations (Strategic roadmap Target Flag + Thoughtful hand touching chin)
        return (
          <>
            {/* Holographic Flag Pole & Target Flag representing strategy roadmapping */}
            <g className="avatar-float">
              <line x1="22" y1="80" x2="22" y2="25" stroke="hsl(210 90% 50%)" strokeWidth="1.8" strokeLinecap="round" />
              {/* Target Flag banner */}
              <path d="M22 25 L4 32 L22 40 Z" fill="hsl(165 75% 42% / 0.8)" stroke="hsl(165 75% 42%)" strokeWidth="1" />
              {/* Center target dot */}
              <circle cx="14" cy="32" r="2" fill="white" className="avatar-pulse-fast" />
            </g>

            {/* Arm & Proper Human Hand touching chin thoughtfully (fingers and wrist detailed) */}
            <g>
              {/* Arm path */}
              <path d="M30 80 Q26 70 34 60" stroke="hsl(210 90% 50% / 0.55)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              
              {/* Hand structure: Palm resting, index finger touching chin, other fingers bent */}
              <path
                d="M34 60 
                   C32 58, 33 54, 35 52 
                   C37 50, 42 46, 44 48 
                   C45 49, 44 53, 42 55 
                   C44 52, 47 50, 48 53
                   C48 56, 45 58, 43 59
                   C45 57, 47 56, 47 59
                   C46 62, 40 64, 38 62"
                fill="rgba(255, 255, 255, 0.95)"
                stroke="hsl(210 90% 50% / 0.4)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "services": // 2. Solutions Builder (Assembling code blocks with Wrench & Gripping hand)
        return (
          <>
            {/* Glowing Digital Wrench representing building & development */}
            <g className="avatar-pulse">
              <path
                d="M44 78 L56 66 C58 64, 61 64, 63 66 L64 67 C66 69, 66 72, 64 74 L52 86 Z"
                fill="hsl(165 75% 42% / 0.15)"
                stroke="hsl(165 75% 42%)"
                strokeWidth="1.2"
              />
              <circle cx="60" cy="70" r="1.5" fill="hsl(165 75% 42%)" />
            </g>
            {/* Proper Human Hand wrapping fingers around wrench handle */}
            <g>
              <path d="M30 80 Q34 76 40 76" stroke="hsl(210 90% 50% / 0.45)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              {/* Detailed gripping palm with thumb and wrapped fingers */}
              <path
                d="M40 76
                   C42 76, 44 73, 45 71 
                   C46 69, 48 70, 47 72 
                   C46 74, 44 76, 42 78
                   C44 76, 46 75, 46 77
                   C45 79, 43 80, 41 81"
                fill="rgba(255, 255, 255, 0.95)"
                stroke="hsl(210 90% 50% / 0.4)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "technologies": // 3. Tech Stack / Coding (Typing with detailed human fingers on a keyboard)
        return (
          <>
            {/* Perspective Holographic Coding Keyboard */}
            <g className="avatar-pulse" style={{ animationDuration: "2.5s" }}>
              <polygon points="30,76 70,76 78,86 22,86" fill="hsl(195 85% 65% / 0.15)" stroke="hsl(195 85% 60%)" strokeWidth="1" />
              <line x1="38" y1="76" x2="33" y2="86" stroke="hsl(195 85% 60% / 0.4)" strokeWidth="0.8" />
              <line x1="50" y1="76" x2="50" y2="86" stroke="hsl(195 85% 60% / 0.4)" strokeWidth="0.8" />
              <line x1="62" y1="76" x2="67" y2="86" stroke="hsl(195 85% 60% / 0.4)" strokeWidth="0.8" />
              <line x1="26" y1="81" x2="74" y2="81" stroke="hsl(195 85% 60% / 0.4)" strokeWidth="0.8" />
            </g>
            
            {/* Left and Right Human Typing Hands (individual fingers bent tapping down) */}
            <g>
              {/* Left Hand wrist and fingers */}
              <path d="M28 80 Q31 75 34 76" stroke="hsl(210 90% 50% / 0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path
                d="M34 76 Q36 73 37 76 Q38 72 40 75 Q41 72 43 76"
                stroke="hsl(210 90% 50% / 0.4)"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Hand wrist and fingers */}
              <path d="M72 80 Q69 75 66 76" stroke="hsl(210 90% 50% / 0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path
                d="M66 76 Q64 73 63 76 Q62 72 60 75 Q59 72 57 76"
                stroke="hsl(210 90% 50% / 0.4)"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </>
        );

      case "works": // 4. Selected Work / Creative Portfolio (Digital Design Paintbrush & Detailed Palette hand)
        return (
          <>
            {/* Floating holographic artist color palette */}
            <g className="avatar-float">
              <path d="M12 76 C12 66, 26 66, 26 76 C26 80, 20 84, 12 76 Z" fill="rgba(255, 255, 255, 0.9)" stroke="hsl(210 90% 50% / 0.4)" strokeWidth="1" />
              <circle cx="16" cy="72" r="1.5" fill="hsl(195 85% 60%)" />
              <circle cx="21" cy="74" r="1.5" fill="hsl(165 75% 42%)" />
              <circle cx="18" cy="78" r="1.5" fill="hsl(275 80% 50%)" />
            </g>

            {/* Detailed Human Hand holding the paintbrush with proper grip (thumb and pointer extended) */}
            <g className="avatar-paint">
              <line x1="28" y1="74" x2="34" y2="60" stroke="hsl(210 90% 50%)" strokeWidth="2.5" strokeLinecap="round" />
              {/* Brush tip */}
              <path d="M34 60 C35 58, 36 58, 35 60 Z" fill="hsl(165 75% 42%)" />
              {/* Hand wrapping around handle */}
              <path
                d="M26 76 
                   C27 74, 28 72, 30 73
                   C32 74, 30 78, 28 79
                   C29 77, 31 76, 31 78
                   C30 80, 28 81, 26 80"
                fill="rgba(255, 255, 255, 0.95)"
                stroke="hsl(210 90% 50% / 0.4)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "testimonials": // 5. Client Reviews (Five glowing stars, hand on heart)
        return (
          <>
            {/* Row of 5 floating golden stars directly above head */}
            <g className="avatar-stars-bounce">
              <text x="32" y="16" fill="hsl(45 95% 50%)" fontSize="9" fontWeight="bold">★</text>
              <text x="41" y="14" fill="hsl(45 95% 50%)" fontSize="9" fontWeight="bold">★</text>
              <text x="50" y="12" fill="hsl(45 95% 50%)" fontSize="10" fontWeight="bold">★</text>
              <text x="59" y="14" fill="hsl(45 95% 50%)" fontSize="9" fontWeight="bold">★</text>
              <text x="68" y="16" fill="hsl(45 95% 50%)" fontSize="9" fontWeight="bold">★</text>
            </g>

            {/* Wrist connection */}
            <path
              d="M68 78 C65 72, 60 68, 54 68"
              stroke="hsl(210 90% 50% / 0.5)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Proper flat Human Hand placed gracefully directly over the heart */}
            <g>
              <path
                d="M54 68
                   C52 64, 49 61, 46 63 
                   C44 65, 42 68, 44 71
                   C46 73, 50 74, 53 71
                   C50 72, 47 70, 46 68
                   C47 66, 49 66, 50 69"
                fill="rgba(255, 255, 255, 0.95)"
                stroke="hsl(210 90% 50% / 0.4)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>
            {/* Pulsing heart overlay */}
            <path
              d="M50 67 C48 65, 46 65, 45 67 C44 69, 47 72, 50 74 C53 72, 56 69, 55 67 C54 65, 52 65, 50 67 Z"
              fill="rgba(244, 63, 94, 0.85)"
              className="avatar-heart-pulse"
            />
          </>
        );

      case "blog": // 6. News & Technical Insights (Holographic lightbulb + Scholar hands)
        return (
          <>
            {/* Floating glowing lightbulb representing technical insights & ideas */}
            <g className="avatar-pulse">
              <path d="M50 12 C44 12, 40 16, 40 22 C40 26, 44 28, 46 31 L46 34 L54 34 L54 31 C56 28, 60 26, 60 22 C60 16, 56 12, 50 12 Z" fill="hsl(45 95% 55% / 0.2)" stroke="hsl(45 95% 50%)" strokeWidth="1.2" />
              <rect x="47" y="34" width="6" height="3" fill="hsl(210 90% 50% / 0.3)" stroke="hsl(210 90% 50%)" strokeWidth="1" />
              <line x1="36" y1="22" x2="32" y2="22" stroke="hsl(45 95% 50% / 0.6)" strokeWidth="1" />
              <line x1="64" y1="22" x2="68" y2="22" stroke="hsl(45 95% 50% / 0.6)" strokeWidth="1" />
            </g>

            {/* Open palms (Human hands supporting technical insights below) */}
            <g>
              {/* Arm path */}
              <path d="M30 78 Q40 82 50 82" stroke="hsl(210 90% 50% / 0.35)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              
              {/* Detailed open hand palm facing upwards with extended thumb and fingers */}
              <path
                d="M50 82
                   C53 82, 55 79, 56 77
                   C57 75, 59 76, 58 78
                   C56 80, 54 83, 50 84
                   C52 83, 54 82, 53 80"
                fill="rgba(255, 255, 255, 0.95)"
                stroke="hsl(210 90% 50% / 0.4)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "contact": // 7. Let's Talk (glowing paper airplane sending message & launching hand)
        return (
          <>
            {/* Glowing paper airplane representing contact mail / messaging */}
            <g className="avatar-float" style={{ animationDuration: "2.5s" }}>
              <path
                d="M72 58 L86 48 L76 64 L74 59 Z"
                fill="hsl(195 85% 65% / 0.18)"
                stroke="hsl(195 85% 60%)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <line x1="72" y1="58" x2="76" y2="64" stroke="hsl(195 85% 60%)" strokeWidth="1.2" />
            </g>

            {/* Arm and launching human hand (detailed fingers throwing/pointing forward) */}
            <g>
              <path d="M68 76 C65 74, 60 70, 56 68" stroke="hsl(210 90% 50% / 0.4)" strokeWidth="2" fill="none" />
              
              {/* Structured human hand throwing paper plane (extended index and thumb) */}
              <path
                d="M56 68
                   C54 68, 52 65, 51 63
                   C50 61, 52 60, 53 62
                   C54 64, 56 66, 58 67
                   C56 65, 58 64, 59 66
                   C58 68, 56 69, 54 69"
                fill="rgba(255, 255, 255, 0.95)"
                stroke="hsl(210 90% 50% / 0.4)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      default: // 8. Home/Hero (Greeting/waving hand + interactive cursor head)
        return (
          <>
            {/* Wrist & waving human hand (distinct palm, 4 extended fingers, waving thumb) */}
            <g className="avatar-waving-arm">
              {/* Arm path */}
              <path
                d="M28 78 C25 66, 20 54, 21 46"
                stroke="hsl(210 90% 50% / 0.55)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              
              {/* Detailed waving palm with five proper finger curves */}
              <path
                d="M21 46 
                   C21 42, 19 38, 20 40 
                   C21 34, 23 32, 23 37 
                   C24 30, 26 29, 26 35 
                   C27 28, 29 27, 29 34 
                   C29 31, 31 31, 31 36 
                   C32 42, 26 48, 24 51"
                fill="rgba(255, 255, 255, 0.95)"
                stroke="hsl(210 90% 50% / 0.4)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            {/* Sparkles around waving hand */}
            <circle cx="29" cy="24" r="1.5" fill="hsl(165 75% 42%)" className="avatar-pulse-fast" />
          </>
        );
    }
  };

  return (
    <div
      ref={avatarRef}
      className="fixed z-40 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none hidden md:block"
      style={{
        top: currentPos.top || "auto",
        bottom: currentPos.bottom || "auto",
        left: currentPos.left || "auto",
        right: currentPos.right || "auto",
        transform: `scale(${currentPos.scale}) rotate(${currentPos.rotate + lookOffset.rotate * 0.4}deg)`,
        filter: "drop-shadow(0 20px 45px rgba(99, 102, 241, 0.16))",
      }}
    >
      {/* Self-contained, highly optimized CSS keyframes to make the avatar breath and move organically */}
      <style>{`
        /* 1. Global organic path morphing transitions */
        .fixed svg path, 
        .fixed svg circle, 
        .fixed svg rect, 
        .fixed svg line, 
        .fixed svg polygon {
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 2. Soft, natural breathing float */
        .avatar-float {
          animation: avatarFloat 6s ease-in-out infinite alternate;
        }
        @keyframes avatarFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-4px) rotate(1deg); }
        }

        /* 3. Real-time warm greeting arm wave */
        .avatar-waving-arm {
          animation: avatarWave 2.8s ease-in-out infinite;
          transform-origin: 28px 78px;
        }
        @keyframes avatarWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-8deg) translateX(-1px); }
        }

        /* 4. Soft blueprint pulsing glow */
        .avatar-pulse {
          animation: avatarPulse 3.5s ease-in-out infinite;
        }
        @keyframes avatarPulse {
          0%, 100% { opacity: 0.7; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .avatar-pulse-fast {
          animation: avatarPulseFast 1.5s ease-in-out infinite;
        }
        @keyframes avatarPulseFast {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* 5. Star floating bounce for reviews */
        .avatar-stars-bounce {
          animation: avatarStarsBounce 4s ease-in-out infinite alternate;
        }
        @keyframes avatarStarsBounce {
          0% { transform: translateY(0px) scale(0.95); }
          100% { transform: translateY(-5px) scale(1.05); }
        }

        /* 6. Heart beat for testimonials trust */
        .avatar-heart-pulse {
          animation: avatarHeartPulse 1.2s ease-in-out infinite;
          transform-origin: 50px 67px;
        }
        @keyframes avatarHeartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.22); }
        }

        /* 7. Painting paintbrush swing */
        .avatar-paint {
          animation: avatarPaint 4s ease-in-out infinite alternate;
          transform-origin: 28px 74px;
        }
        @keyframes avatarPaint {
          0% { transform: rotate(-2deg); }
          100% { transform: rotate(3deg); }
        }
      `}</style>

      <div className="relative w-36 h-36 flex items-center justify-center">
        
        {/* Soft glassmorphic spin halo */}
        <div className="absolute inset-0 rounded-full border border-primary/20 bg-gradient-to-tr from-primary/8 via-transparent to-accent/8 animate-spin-slow scale-110 blur-[1px]" />
        
        {/* SVG Core illustration */}
        <svg
          className="w-28 h-28 relative z-10 overflow-visible"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Turtleneck Body */}
          <path
            d="M25 80 C25 68, 38 62, 50 62 C62 62, 75 68, 75 80 C75 83, 73 85, 70 85 L30 85 C27 85, 25 83, 25 80 Z"
            fill="rgba(255, 255, 255, 0.8)"
            stroke="hsl(210 90% 50% / 0.35)"
            strokeWidth="1.5"
          />

          {/* Neck */}
          <path
            d="M44 52 L44 65 L56 65 L56 52 Z"
            fill="rgba(255, 255, 255, 0.95)"
            stroke="hsl(210 90% 50% / 0.2)"
            strokeWidth="1"
          />

          {/* Posture Tools / holographic shapes */}
          {renderPostureDetails()}

          {/* Face group (tilt and look offset active ONLY for home section) */}
          <g
            style={{
              transform: `translate3d(${lookOffset.x * 0.3}px, ${lookOffset.y * 0.3}px, 0)`,
              transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Face circle */}
            <circle
              cx="50"
              cy="40"
              r="20"
              fill="rgba(255, 255, 255, 0.92)"
              stroke="hsl(210 90% 50% / 0.4)"
              strokeWidth="1.5"
            />

            {/* Glasses / Visor framing */}
            <rect
              x="36"
              y="33"
              width="28"
              height="10"
              rx="5"
              fill="hsl(195 85% 65% / 0.12)"
              stroke="hsl(195 85% 60% / 0.45)"
              strokeWidth="1.2"
            />

            {/* Pupil Left (Center lock or Cursor look depending on activeSection) */}
            <circle
              cx={
                activeSection === "testimonials"
                  ? 43 // Look straight up at the stars
                  : activeSection === "about"
                  ? 40 // Look thoughtfully left at the flag
                  : 43 + lookOffset.x * 0.26
              }
              cy={
                activeSection === "testimonials"
                  ? 35 // Look straight up at the stars
                  : 38 + lookOffset.y * 0.26
              }
              r="2.5"
              fill="hsl(165 75% 42%)"
              className="transition-all duration-75"
            />
            <circle
              cx={
                activeSection === "testimonials"
                  ? 42.2
                  : activeSection === "about"
                  ? 39.2
                  : 42.2 + lookOffset.x * 0.26
              }
              cy={
                activeSection === "testimonials"
                  ? 34.2
                  : 37.2 + lookOffset.y * 0.26
              }
              r="0.8"
              fill="white"
            />

            {/* Pupil Right */}
            <circle
              cx={
                activeSection === "testimonials"
                  ? 57
                  : activeSection === "about"
                  ? 54
                  : 57 + lookOffset.x * 0.26
              }
              cy={
                activeSection === "testimonials"
                  ? 35
                  : 38 + lookOffset.y * 0.26
              }
              r="2.5"
              fill="hsl(165 75% 42%)"
              className="transition-all duration-75"
            />
            <circle
              cx={
                activeSection === "testimonials"
                  ? 56.2
                  : activeSection === "about"
                  ? 53.2
                  : 56.2 + lookOffset.x * 0.26
              }
              cy={
                activeSection === "testimonials"
                  ? 34.2
                  : 37.2 + lookOffset.y * 0.26
              }
              r="0.8"
              fill="white"
            />

            {/* Ears brackets */}
            <path d="M28 35 C27 38, 27 42, 28 45" stroke="hsl(210 90% 50% / 0.45)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M72 35 C73 38, 73 42, 72 45" stroke="hsl(210 90% 50% / 0.45)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Smile (analytical curve for about, warm smile for others) */}
            <path
              d={
                activeSection === "about"
                  ? `M46 47 Q50 ${46.5 + lookOffset.y * 0.1} 54 47`
                  : `M46 47 Q50 ${48.5 + lookOffset.y * 0.1} 54 47`
              }
              stroke="hsl(210 90% 40%)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Glacier Hair outlines */}
          <path
            d="M32 32 C34 22, 50 18, 68 32 C65 24, 52 20, 36 28 C34 29, 32 30, 32 32 Z"
            fill="hsl(195 85% 65% / 0.7)"
            stroke="hsl(195 85% 60% / 0.5)"
            strokeWidth="1"
          />
        </svg>

        {/* Small floating sparkles (representing active AI processing) */}
        <div className="absolute top-2 right-2 w-4 h-4 text-accent animate-pulse">
          <Sparkles className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
