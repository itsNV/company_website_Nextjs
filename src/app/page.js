"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionNavigator from "@/components/SectionNavigator";
import { getProjects } from "@/lib/firebase/projects";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";


export default function Home() {

  


  const [activeSection, setActiveSection] = useState("home");
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const docRef = doc(db, "settings", "homepage");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setConfig(data);
          
          if (data.seoTitle) document.title = data.seoTitle;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc && data.seoDescription) {
            metaDesc.setAttribute("content", data.seoDescription);
          }

          if (data.faviconUrl) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
              link = document.createElement("link");
              link.rel = "icon";
              document.getElementsByTagName("head")[0].appendChild(link);
            }
            link.href = data.faviconUrl;
          }
        }
      } catch (e) {
        console.error("Error loading homepage config:", e);
      }
    }
    loadConfig();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            if (entry.target.tagName === "SECTION") {
              setActiveSection(entry.target.id);
            }
          } else {
            // Remove 'active' class from sections when they exit the viewport so HSL background glows transition dynamically
            if (entry.target.tagName === "SECTION") {
              entry.target.classList.remove("active");
            }
          }
        });
      },
      {
        threshold: 0.08, // Lowered threshold for absolute reliability on large sections
        rootMargin: "0px 0px -40px 0px",
      }
    );

    // Use a small timeout to ensure the Next.js hydration cycle has completed and the DOM is fully rendered
    const timer = setTimeout(() => {
      const animatableElements = document.querySelectorAll(
        "section, .reveal-item, .reveal-stagger, .split-line-mask, .draw-shape, .section-divider"
      );
      animatableElements.forEach((el) => observer.observe(el));
    }, 200);

    const handleGlobalScroll = () => {
      const mainEl = document.querySelector("main");
      if (!mainEl) return;
      const rect = mainEl.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      
      // Prevent division by zero
      if (totalScrollableHeight <= 0) return;
      
      const scrolledDistance = -rect.top;
      const progress = Math.min(Math.max(scrolledDistance / totalScrollableHeight, 0), 1);
      setGlobalScrollProgress(progress);
    };

    window.addEventListener("scroll", handleGlobalScroll, { passive: true });
    window.addEventListener("resize", handleGlobalScroll, { passive: true });
    handleGlobalScroll();

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", handleGlobalScroll);
      window.removeEventListener("resize", handleGlobalScroll);
    };
  }, []);





  return (
    <>
      
      <Navbar activeSection={activeSection} config={config} />
      <SectionNavigator />
      {/* Premium Top Satin Gradient Vignette Mask */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />
      <main className="flex-grow reveal-container relative z-[1]">
        
        {/* Dynamic Scroll-Linked Winding Global Backline */}
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-0 opacity-[0.24] w-full h-full overflow-hidden">
          <svg
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 1000 10000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Faint Background Track */}
            <path
              d="M 500 100 C 150 1000, 850 2000, 200 3000 C 800 4000, 100 5000, 900 6000 C 200 7000, 850 8000, 150 9000 C 500 9500, 500 9900, 500 10000"
              stroke="rgba(99, 102, 241, 0.12)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Highly Visible Drawing Glowing Path */}
            <path
              d="M 500 100 C 150 1000, 850 2000, 200 3000 C 800 4000, 100 5000, 900 6000 C 200 7000, 850 8000, 150 9000 C 500 9500, 500 9900, 500 10000"
              stroke="url(#globalScribbleGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="11200"
              strokeDashoffset={11200 - globalScrollProgress * 11200}
              filter="url(#globalLineGlow)"
              className="transition-all duration-75 ease-out"
            />
            <defs>
              <filter id="globalLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="globalScribbleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />     {/* Indigo */}
                <stop offset="25%" stopColor="#c084fc" />    {/* Purple */}
                <stop offset="50%" stopColor="#38bdf8" />    {/* Sky Blue */}
                <stop offset="75%" stopColor="#34d399" />    {/* Emerald Teal */}
                <stop offset="100%" stopColor="#ec4899" />   {/* Rose Pink */}
              </linearGradient>
            </defs>
          </svg>
        </div>

        <Hero config={config} />
        
        <About config={config} />
        
        <Services />
        
        <Projects />
        
        <Testimonials />
        
        <Contact />
      </main>
      <Footer config={config} />
    </>
  );
}
