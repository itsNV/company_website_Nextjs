"use client";
import React, { useState, useEffect, useRef } from "react";
import { Laptop, Smartphone, Settings, ShoppingBag, TrendingUp, ShieldCheck } from "lucide-react";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Services({ config }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [srvConfig, setSrvConfig] = useState(config || null);

  useEffect(() => {
    if (config) {
      setSrvConfig(config);
      return;
    }
    async function loadConfig() {
      try {
        const docRef = doc(db, "settings", "homepage");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSrvConfig(docSnap.data());
        }
      } catch (e) {
        console.error("Error loading config in Services:", e);
      }
    }
    loadConfig();
  }, [config]);

  const serviceList = [
    {
      title: "Web Design & Development",
      category: "Development",
      description: "Scalable websites built using modern frameworks. Specializing in Headless CMS architectures (Sanity, Strapi, Contentful) and high-performance traditional CMS layouts.",
      icon: Laptop,
      color: "from-indigo-500 to-indigo-600 shadow-indigo-100",
      accent: "text-indigo-600",
      bgClass: "bg-indigo-50/90 border-indigo-100/80",
    },
    {
      title: "Mobile App Development",
      category: "Development",
      description: "Custom native and hybrid mobile apps (iOS & Android) designed with fluid UI and seamless database integrations for supreme performance.",
      icon: Smartphone,
      color: "from-purple-500 to-purple-600 shadow-purple-100",
      accent: "text-purple-600",
      bgClass: "bg-purple-50/90 border-purple-100/80",
    },
    {
      title: "Custom Software Solutions",
      category: "Solutions",
      description: "Tailor-made software to optimize your business operations. Expert development of lightweight, robust CRM and ERP architectures in Ahmedabad.",
      icon: Settings,
      color: "from-pink-500 to-pink-600 shadow-pink-100",
      accent: "text-pink-600",
      bgClass: "bg-pink-50/70 border-pink-100/80",
    },
    {
      title: "e-Commerce Development",
      category: "Development",
      description: "Conversion-centric online storefronts with secure payment processors, automated logistics syncing, and lightning-fast product directories.",
      icon: ShoppingBag,
      color: "from-rose-500 to-rose-600 shadow-rose-100",
      accent: "text-rose-600",
      bgClass: "bg-rose-50/70 border-rose-100/80",
    },
    {
      title: "Digital & Social Media Marketing",
      category: "Marketing",
      description: "Data-driven SEO, SEM, and PPC marketing strategies designed to increase brand presence, capture targeted leads, and maximize your ROI.",
      icon: TrendingUp,
      color: "from-sky-500 to-sky-600 shadow-sky-100",
      accent: "text-sky-600",
      bgClass: "bg-sky-50/70 border-sky-100/80",
    },
    {
      title: "Branding & Identity Design",
      category: "Creative",
      description: "Best-in-class brand experience strategy. We craft unified corporate identities, creative brochures, and visual materials that capture customer trust.",
      icon: ShieldCheck,
      color: "from-emerald-500 to-emerald-600 shadow-emerald-100",
      accent: "text-emerald-600",
      bgClass: "bg-emerald-50/70 border-emerald-100/80",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate scroll progress of our parent container relative to window height
      const totalScrollableHeight = rect.height - window.innerHeight;
      const scrolledDistance = -rect.top;
      
      // Clamp progress between 0 and 1
      const progress = Math.min(Math.max(scrolledDistance / totalScrollableHeight, 0), 0.99);
      
      // Map scroll progress to the active card index with an adjusted scale so the final card stays visible longer
      const adjustedProgress = progress * (serviceList.length + 0.8);
      const newIndex = Math.min(Math.floor(adjustedProgress), serviceList.length - 1);
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Run initially

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [serviceList.length]);

  return (
    /* The parent height is set to 500vh to create scroll track padding for the viewport lock on desktop */
    <section ref={containerRef} id="services" className="relative lg:h-[500vh] h-auto py-16 lg:py-0 bg-transparent">
      
      {/* Sticky viewport container covering 100vh only on desktop */}
      <div className="lg:sticky lg:top-0 lg:left-0 lg:right-0 lg:h-screen w-full lg:overflow-hidden flex items-center justify-center">
        
        <div className="max-w-4xl w-full px-6 flex flex-col items-center relative justify-center">
          
          {/* Static Title Header floating over cards */}
          <div className="reveal-item text-center max-w-3xl mx-auto mb-10 shrink-0 relative z-20 pt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
              {srvConfig?.servicesSubtitle || "Our Services"}
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold font-outfit text-slate-900 mt-3 mb-2">
              {srvConfig?.servicesTitle ? (
                srvConfig.servicesTitle
              ) : (
                <>Innovative digital solutions, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">built to scale</span>.</>
              )}
            </h2>
            <p className="hidden lg:block text-xs md:text-sm text-slate-500 font-semibold tracking-wider uppercase font-outfit">
              Scroll down to overlay services • Card {activeIndex + 1} of {serviceList.length}
            </p>
          </div>

          {/* Desktop Cards viewport deck */}
          <div className="hidden lg:flex relative w-full max-w-3xl h-[340px] items-center justify-center z-10">
            {serviceList.map((srv, idx) => {
              const Icon = srv.icon;
              
              // Animation calculations based on current active card index
              const isPast = idx < activeIndex;
              const isActive = idx === activeIndex;

              let transformStyle = "translateY(100vh) scale(0.9)"; // Hidden in future
              let opacity = 0;
              let zIndex = idx;

              if (isActive) {
                transformStyle = "translateY(0) scale(1) rotateX(0deg)";
                opacity = 1;
                zIndex = 50; // Active card on top
              } else if (isPast) {
                // Stacked neatly behind with scaling depth
                const depth = activeIndex - idx;
                transformStyle = `translateY(-${depth * 14}px) scale(${1 - depth * 0.04}) rotateX(${depth * 2}deg)`;
                opacity = 0.85 - depth * 0.15;
                zIndex = idx;
              }

              return (
                <div
                  key={idx}
                  className="absolute inset-0 w-full h-full transition-all duration-700 ease-out will-change-transform"
                  style={{
                    transform: transformStyle,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="hover-box w-full h-full p-8 lg:p-12 rounded-[32px] border bg-white shadow-xl shadow-slate-200/30 flex flex-col lg:flex-row gap-8 items-start lg:items-center border-slate-200/60">
                    {/* Left Side: Icon */}
                    <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-tr ${srv.color} text-white flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Right Side: Copy */}
                    <div className="flex-grow">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full mb-3 inline-block">
                        {srv.category}
                      </span>
                      <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-4 leading-tight">
                        {srv.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {srv.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Cards flow list */}
          <div className="flex lg:hidden flex-col gap-6 w-full z-10">
            {serviceList.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="hover-box w-full p-6 rounded-3xl border bg-white shadow-md border-slate-200/60 flex flex-col gap-5 items-start"
                >
                  <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-tr ${srv.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded mb-2 inline-block">
                      {srv.category}
                    </span>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2 leading-tight">
                      {srv.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {srv.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
