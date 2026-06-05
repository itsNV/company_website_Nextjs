"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Zap, Sparkles } from "lucide-react";

export default function Hero() {
  const [heroReady, setHeroReady] = useState(false);
  const [angleOffset, setAngleOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dimensions, setDimensions] = useState({ rx: 500, ry: 295 });

  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // SSR-safe responsive ellipse dimensions
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setDimensions({ rx: 125, ry: 135 });
      } else if (window.innerWidth < 640) {
        setDimensions({ rx: 175, ry: 155 });
      } else if (window.innerWidth < 1024) {
        setDimensions({ rx: 340, ry: 215 });
      } else {
        setDimensions({ rx: 500, ry: 295 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth delta-based animation loop for elliptical path
  useEffect(() => {
    let frameId;
    let lastTime = performance.now();
    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      if (!isPaused) {
        setAngleOffset((prev) => (prev + (delta / 50000) * 360) % 360);
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused]);

  const throwableTags = [
    "React",
    "Next.js",
    "Headless CMS",
    "Sanity.io",
    "Strapi",
    "SEO Engine",
  ];

  const techIcons = [
    {
      name: "React",
      svg: (
        <svg className="w-6 h-6 text-sky-400 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(56,189,248,0.25)]",
    },
    {
      name: "TypeScript",
      svg: (
        <svg className="w-5.5 h-5.5 text-blue-600 rounded" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6"/>
          <text x="12" y="17" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">TS</text>
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(49,120,198,0.25)]",
    },
    {
      name: "Tailwind CSS",
      svg: (
        <svg className="w-5.5 h-5.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3L2 12h5v9h10v-9h5L12 3z" fill="currentColor" opacity="0.15" />
          <path d="M12 3L2 12h5v9h10v-9h5L12 3z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(56,189,248,0.25)]",
    },
    {
      name: "Figma",
      svg: (
        <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none">
          <path d="M8 5a3 3 0 0 0 0 6h4V5H8z" fill="#F24E1E" />
          <path d="M12 11h4a3 3 0 1 0-3-3v3z" fill="#FF7262" />
          <path d="M8 11a3 3 0 0 0 0 6h4v-6H8z" fill="#A259FF" />
          <path d="M12 17a3 3 0 1 0 3-3h-3v3z" fill="#1ABC9C" />
          <path d="M8 23a3 3 0 0 0 3-3v-3H8a3 3 0 0 0 0 6z" fill="#18A0FB" />
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(242,78,30,0.2)]",
    },
    {
      name: "Vue.js",
      svg: (
        <svg className="w-5.5 h-5.5 text-[#4FC08D]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19.5h4L12 9l6 10.5h4L12 2z" />
          <path d="M12 7.5L5.5 19.5h3L12 13l3.5 6.5h3L12 7.5z" fill="#35495E" />
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(79,192,141,0.25)]",
    },
    {
      name: "Next.js",
      svg: (
        <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 16V8l8 8V8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bgColor: "bg-black border-slate-800",
      shadow: "shadow-[0_0_20px_rgba(0,0,0,0.3)]",
    },
    {
      name: "Node.js",
      svg: (
        <span className="text-[9px] font-black font-outfit text-slate-800 tracking-tighter flex items-center gap-0.5 select-none">
          <span className="text-emerald-500 font-bold">●</span>node
        </span>
      ),
      shadow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    },
    {
      name: "Flutter",
      svg: (
        <svg className="w-5 h-5 text-[#02569B]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.314 0L2.3 12l3.422 3.42 15.978-12h-7.386zM21.7 15.895l-3.422 3.42 3.422 3.42 5.15-3.42-5.15-3.42z" />
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(2,86,155,0.25)]",
    },
    {
      name: "GraphQL",
      svg: (
        <svg className="w-5 h-5 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
          <path d="M12 6l5.2 3v6l-5.2 3-5.2-3V9l5.2-3z" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(225,0,152,0.2)]",
    },
    {
      name: "Python",
      svg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.898 2.002c-2.457 0-4.54.126-5.83.336-1.853.303-2.92 1.34-3.328 3.232-.432 1.996-.408 3.82-.408 5.952h2.247c0-2.13.018-3.414.288-4.664.298-1.39 1.077-1.883 2.467-2.023 1.258-.126 3.036-.168 4.566-.168 1.53 0 3.308.042 4.566.168 1.39.14 2.17.633 2.467 2.023.27 1.25.288 2.534.288 4.664h2.247c0-2.132.024-3.956-.408-5.952-.408-1.892-1.475-2.93-3.328-3.232-1.29-.21-3.373-.336-5.83-.336zm0 1.998a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm0 14.002c2.457 0 4.54-.126 5.83-.336 1.853-.303 2.92-1.34 3.328-3.232.432-1.996.408-3.82.408-5.952h-2.247c0 2.13-.018 3.414-.288 4.664-.298 1.39-1.077 1.883-2.467 2.023-1.258.126-3.036.168-4.566.168-1.53 0-3.308-.042-4.566-.168-1.39-.14-2.17-.633-2.467-2.023-.27-1.25-.288-2.534-.288-4.664H2.732c0 2.132-.024 3.956.408 5.952.408 1.892 1.475 2.93 3.328 3.232 1.29.21 3.373.336 5.83.336zm0-1.998a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#3776AB"/>
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(55,118,171,0.2)]",
    },
    {
      name: "Docker",
      svg: (
        <svg className="w-5.5 h-5.5 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.983 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM11.283 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM11.283 8.357h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM8.594 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H8.594c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM8.594 8.357h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186H8.594c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM5.894 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H5.894c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM2.21 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H2.21c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM13.983 8.357h2.119c.102 0 .186-.084.186-.186V6.052c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM13.983 5.66h2.119c.102 0 .186-.084.186-.186V3.354c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186V5.47c0 .105.084.19.186.19zM23.957 10.978c-.297-1.127-1.39-2.023-2.607-2.023-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186h2.46c.105 0 .189-.084.189-.186 0-.097-.013-.195-.042-.282zM21.267 13.905c-1.39 0-3.328-.838-4.496-2.119H1.835c-.102 0-.186.084-.186.186v.77c0 4.148 3.513 7.518 7.848 7.518h7.94c3.483 0 6.353-2.698 6.353-6.023v-.147c0-.102-.084-.186-.186-.186h-2.339z" />
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(36,150,237,0.2)]",
    },
    {
      name: "Firebase",
      svg: (
        <svg className="w-5.5 h-5.5 text-[#FFCA28]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.89 15.75L2.11 5.37a.64.64 0 0 1 .98-.67l10.15 5.86-3.83 5.19zm15.65.63l-1.92-12a.64.64 0 0 0-1.12-.39L3.43 14.86l8.81 5.09a1.5 1.5 0 0 0 1.54 0l5.76-3.57z" />
        </svg>
      ),
      shadow: "shadow-[0_0_20px_rgba(255,202,40,0.25)]",
    }
  ];

  return (
    <section
      id="home"
      className={`hero-section relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-transparent ${heroReady ? "hero-ready" : ""}`}
    >
      <style>{`
        .orbit-item {
          position: absolute;
          left: 50%;
          top: 50%;
          transition: transform 2.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1.5s ease;
        }

        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite reverse;
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-item {
            transition: none !important;
          }
          .animate-marquee-left, .animate-marquee-right {
            animation: none;
            width: auto;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>

      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-sky-200/40 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4 animate-float" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-teal-200/30 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4 animate-float-slow" />

      <div className="max-w-4xl mx-auto px-6 relative w-full flex flex-col items-center text-center z-10 pt-8">
        
        {/* <div className="hero-enter hero-enter-delay-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          Top IT Agency in Ahmedabad
        </div> */}

        {/* Orbit and Content Container wrapping main text + tags + buttons */}
        <div 
          className="relative w-full flex flex-col items-center py-6 z-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Orbit Rings Wrapper centered exactly behind this content block (Hidden on mobile) */}
          <div className="absolute inset-0 pointer-events-none select-none z-0 hidden sm:flex items-center justify-center">
            <div 
              style={{
                width: `${dimensions.rx * 2}px`,
                height: `${dimensions.ry * 2}px`,
              }}
              className="absolute border border-dashed border-slate-300/30 rounded-full transition-all duration-1000"
            />
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {techIcons.map((icon, idx) => {
                // Calculate the specific orbital angle for this index on the ellipse
                const initialAngle = (360 / techIcons.length) * idx;
                const angle = (initialAngle + angleOffset) % 360;
                const angleRad = (angle * Math.PI) / 180;
                
                // Elliptical coordinate calculation
                const x = dimensions.rx * Math.cos(angleRad);
                const y = dimensions.ry * Math.sin(angleRad);
                
                return (
                  <div
                    key={icon.name}
                    style={{
                      transform: `translate(-50%, -50%) translate(${heroReady ? x : 0}px, ${heroReady ? y : 0}px) scale(${heroReady ? 1 : 0})`,
                      opacity: heroReady ? 1 : 0,
                    }}
                    className="orbit-item pointer-events-auto z-20"
                  >
                    <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${icon.bgColor || "bg-white"} border border-slate-200/80 shadow-md flex items-center justify-center hover-box transition-transform duration-300 ${icon.shadow}`}>
                      <div className="scale-75 sm:scale-100 flex items-center justify-center">
                        {icon.svg}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Running Tech Line 1 (Above Heading) */}
          <div className="sm:hidden w-full overflow-hidden py-3 mb-6 relative z-20 pointer-events-none select-none">
            <div className="animate-marquee-left flex gap-6">
              {[...techIcons, ...techIcons].map((icon, idx) => (
                <div key={idx} className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-sm flex items-center justify-center shrink-0">
                  <div className="scale-75 flex items-center justify-center">
                    {icon.svg}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[62px] font-extrabold font-outfit text-slate-900 leading-[1.12] tracking-tight mb-8 max-w-4xl select-none z-20 relative">
            <span className="split-line-mask block">
              <span className="split-line-text">Developing Mobile</span>
            </span>
            <span className="split-line-mask block mt-1">
              <span className="split-line-text">
                Apps,Websites, Custom
              </span>
            </span>
            <span className="split-line-mask block mt-1">
              <span className="split-line-text">
                Softwares and tailor-made
              </span>
            </span>
            <span className="split-line-mask block mt-1">
              <span className="split-line-text">
                digital solutions.
              </span>
            </span>
          </h1>

          <div className="hero-enter hero-enter-delay-4 flex flex-wrap gap-2.5 max-w-2xl mb-12 justify-center z-20 relative">
            {throwableTags.map((label) => (
              <span
                key={label}
                className="throwable-badge hover-box select-none px-4 py-2 rounded-xl bg-white border border-slate-200/80 text-slate-800 text-xs font-bold shadow-sm"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="hero-enter hero-enter-delay-5 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto z-20 relative">
            <a
              href="#contact"
              className="hover-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-accent text-center shadow-lg"
            >
              Start Your Project
              <Zap className="w-4 h-4 fill-white" />
            </a>
            <a
              href="#works"
              className="hover-btn hover-btn-outline inline-flex items-center justify-center gap-1.5 px-8 py-4 rounded-full bg-white text-slate-800 font-semibold border border-slate-200 text-center shadow-sm"
            >
              Explore Our Work
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Running Tech Line 2 (After CTA Buttons) */}
          <div className="sm:hidden w-full overflow-hidden py-3 mt-10 relative z-20 pointer-events-none select-none">
            <div className="animate-marquee-right flex gap-6">
              {[...techIcons, ...techIcons].map((icon, idx) => (
                <div key={idx} className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-sm flex items-center justify-center shrink-0">
                  <div className="scale-75 flex items-center justify-center">
                    {icon.svg}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Refactored Horizontal Capabilities Grid */}
        <div className="hero-enter hero-enter-delay-6 w-full max-w-6xl mt-16 pt-10 border-t border-slate-200/60 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 shadow-sm border border-slate-200/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="9" rx="1" />
                <rect x="14" y="3" width="7" height="5" rx="1" />
                <rect x="14" y="12" width="7" height="9" rx="1" />
                <rect x="3" y="16" width="7" height="5" rx="1" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold font-outfit">Web Design.</strong> Smart designs that grow targeted email lists faster.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 shadow-sm border border-slate-200/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold font-outfit">eCommerce.</strong> SEO-driven online stores built to Google rank and sell.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 shadow-sm border border-slate-200/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M4.93 4.93l14.14 14.14" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold font-outfit">Privacy &amp; Social.</strong> Social integration with privacy-first protection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



