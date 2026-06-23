"use client";
import React, { useState, useEffect, useRef } from "react";
import { Compass, Palette, Rocket, Target, Eye, ShieldAlert } from "lucide-react";

export default function About({ config }) {
  const [activeTab, setActiveTab] = useState("mission");
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const totalDist = rect.height + viewportHeight;
      const currentDist = viewportHeight - rect.top;
      
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const workflowSteps = [
    {
      step: "01",
      title: "Strategy First",
      description: "We start by understanding your business goals, target audience, and market landscape to define a clear, optimized roadmap.",
      icon: Compass,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      step: "02",
      title: "Design & Build",
      description: "We design highly intuitive UX/UI experiences and develop scalable, API-first software architectures tailored to your brand.",
      icon: Palette,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      step: "03",
      title: "Launch & Grow",
      description: "We launch with high precision, then continuously monitor, optimize, and support your system to drive business growth.",
      icon: Rocket,
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ];

  const corePillars = {
    mission: {
      tagline: "Our Mission",
      title: "Turning ideas into impactful digital solutions with clear strategy.",
      text: "We help brands solve real problems through thoughtful design and scalable software engineering. By aligning business goals with user needs, we deliver high-performance digital products that drive consistent growth.",
      icon: Target,
      themeColor: "from-indigo-600 to-indigo-800",
      accentBg: "bg-indigo-50 text-indigo-600",
    },
    vision: {
      tagline: "Our Vision",
      title: "Shaping future-ready digital experiences through cross functional collaboration.",
      text: "We blend creative thinking with data-driven strategy to build meaningful user experiences. Through continuous iteration, clean code, and API-first architectures, we craft systems that are highly responsive and built to last.",
      icon: Eye,
      themeColor: "from-purple-600 to-purple-800",
      accentBg: "bg-purple-50 text-purple-600",
    },
    values: {
      tagline: "Our Values",
      title: "Built on trust, transparency, and meaningful collaboration.",
      text: "We believe great results come from open communication, relentless innovation, and extreme attention to detail. Our values guide every decision, helping us build strong long-term partnerships and deliver works that truly matter.",
      icon: ShieldAlert,
      themeColor: "from-rose-600 to-rose-800",
      accentBg: "bg-rose-50 text-rose-600",
    },
  };

  return (
    <section id="about" ref={containerRef} className="py-16 md:py-20 bg-transparent border-y border-[#eae6fa]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Workflow Title */}
        <div className="reveal-item text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full">
            {config?.aboutWorkflowSubtitle || "How We Work"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit text-slate-900 mt-4 mb-6">
            {config?.aboutWorkflowTitle ? (
              config.aboutWorkflowTitle
            ) : (
              <>Ways we build <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">high-performance</span> products.</>
            )}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {config?.aboutWorkflowDesc || "Yunawise is a full-service digital studio delivering strategy, design, and development under one roof. We structure our lifecycle to ensure efficiency and speed."}
          </p>
        </div>

        {/* Workflow Cards */}
        <div className={`reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ${isVisible ? "active" : ""}`}>
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            let displayTitle = step.title;
            let displayDesc = step.description;

            if (config) {
              if (idx === 0 && config.step1Title) {
                displayTitle = config.step1Title;
                displayDesc = config.step1Desc || displayDesc;
              } else if (idx === 1 && config.step2Title) {
                displayTitle = config.step2Title;
                displayDesc = config.step2Desc || displayDesc;
              } else if (idx === 2 && config.step3Title) {
                displayTitle = config.step3Title;
                displayDesc = config.step3Desc || displayDesc;
              }
            }

            return (
              <div
                key={idx}
                className="transition-all duration-700 ease-out will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="hover-box p-8 h-full rounded-3xl border border-slate-100 bg-white/80 backdrop-blur-[6px] group">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${step.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-4xl font-black font-outfit text-slate-500 group-hover:text-purple-500 transition-colors">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">
                    {displayTitle}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {displayDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Pillars */}
        <div
          className={`reveal-item ${isVisible ? "active" : ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="hover-box rounded-[40px] bg-white/40 backdrop-blur-[8px] border border-slate-200/60 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Tabs Selector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-3xl font-extrabold font-outfit text-slate-900 mb-2">
              Our Foundations
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              We align our strategic planning, technical architecture, and team values to build digital experiences that matter.
            </p>

            <div className="flex flex-col gap-3">
              {Object.keys(corePillars).map((tabKey) => {
                const item = corePillars[tabKey];
                const Icon = item.icon;
                const isSelected = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    suppressHydrationWarning
                    className={`hover-btn flex items-center gap-4 p-4 rounded-2xl text-left border transition-all duration-300 ${
                      isSelected
                        ? "bg-white shadow-md border-purple-200 text-purple-600"
                        : "bg-transparent border-transparent text-slate-600 hover:bg-slate-200/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? item.accentBg : "bg-slate-200/60 text-slate-500"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.tagline}</h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Render panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-slate-200/40 shadow-xl shadow-slate-100/50 min-h-[300px] flex flex-col justify-center">
            <div className="animate-fade-in-up">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {corePillars[activeTab].tagline}
              </span>
              <h4 className="text-2xl md:text-3xl font-extrabold font-outfit text-slate-900 mt-2 mb-6 leading-tight">
                {corePillars[activeTab].title}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {corePillars[activeTab].text}
              </p>
            </div>
          </div>

        </div>
      </div>

      </div>
    </section>
  );
}
