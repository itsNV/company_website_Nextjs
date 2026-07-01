"use client";
import React, { use, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjects } from "@/lib/firebase/projects";
import { 
  ArrowLeft, 
  ExternalLink, 
  Lock, 
  Cpu, 
  Rocket, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  HelpCircle, 
  ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function RevealImage({ src, alt, className = "", aspectClassName = "aspect-video" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full ${aspectClassName} overflow-hidden bg-slate-100/50 rounded-2xl`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80 animate-pulse">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} w-full h-full object-cover transition-all duration-700 ease-out ${
          loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-md"
        }`}
      />
    </div>
  );
}

export default function ProjectDetailsPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjects();
        const found = data.find((p) => p.slug === slug);
        setProject(found || null);
      } catch (error) {
        console.error("Error loading project details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const timer = setTimeout(() => {
      const animatableElements = document.querySelectorAll(
        "section, .reveal-item, .reveal-stagger, .split-line-mask"
      );
      animatableElements.forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [project]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-slate-50/30">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Project...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-slate-50/30">
          <div className="text-center p-8 max-w-md bg-white border border-slate-200/60 rounded-3xl shadow-xl">
            <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-6" />
            <h1 className="text-2xl font-black font-outfit text-slate-900 mb-2">Project Not Found</h1>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">The project you are looking for does not exist or has been archived.</p>
            <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar activeSection="projects" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      <main className="flex-grow pt-16 sm:pt-20 lg:pt-28 pb-10 lg:pb-16 bg-transparent relative z-10 reveal-container">
        
        {/* Hero Section */}
        <section className="py-10 md:py-12 lg:py-16 reveal-item">
          <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start">
              
              {/* Breadcrumb Tag */}
              <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Link href="/projects" className="hover:text-purple-600 transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Projects
                </Link>
                <span>/</span>
                <span className="text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">{project.platform_type}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {project.live_url ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-extrabold uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    Live Platform
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <Lock className="w-3 h-3" /> Confidential Archive
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                {project.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                {project.tagline}
              </p>

              {/* Main Image */}
              {project.image_url && (
                <div className="mt-8 w-full rounded-2xl overflow-hidden border border-slate-200/60 shadow-md">
                  <RevealImage 
                    src={project.image_url} 
                    alt={project.title} 
                    aspectClassName="aspect-video md:aspect-[21/9]"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 text-white font-bold transition-all duration-300 shadow-lg shadow-purple-100"
                  >
                    Explore Live Site
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Link
                  href="/contact"
                  className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-bold transition-all duration-300 shadow-lg"
                >
                  Consult Similar Blueprint
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Tech Stack Card (mirroring Service Page Right Side) */}
            <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-8 shadow-xl">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-600" /> Technology stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack?.length > 0 ? (
                  project.tech_stack.map((tech, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 text-xs font-bold shadow-sm">
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 italic text-xs">No stack declared.</span>
                )}
              </div>
            </div>
          </div>
        </section>

       
        {/* Project Sections Rendering */}
        {project.blocks && project.blocks.length > 0 ? (
          (() => {
            return project.blocks.map((block, idx) => {
              const d = block.data || {};
              const pos = d.image_position || "right";
              
              let badgeText = "";
              let badgeClass = "";
              let defaultTitle = "";
              let desc = "";
              let imgUrl = "";
              let sectionBg = "py-10 md:py-12 lg:py-16 border-b border-[#eae6fa]/10";
              let extra = null;

              if (block.type === "challenge") {
                badgeText = "Phase 1: The Challenge";
                badgeClass = "text-rose-600 bg-rose-50";
                defaultTitle = "Problem Identification";
                desc = d.problem || "";
                imgUrl = d.challenge_image_url || "";
                sectionBg = "py-10 md:py-12 lg:py-16 bg-slate-50/40 border-b border-[#eae6fa]/10";
              } else if (block.type === "solution") {
                badgeText = "Phase 2: Our Solution";
                badgeClass = "text-purple-600 bg-purple-50";
                defaultTitle = "Engineering Response";
                desc = d.solution || "";
                imgUrl = d.solution_image_url || "";
              } else if (block.type === "business_impact") {
                badgeText = "Phase 3: Business Impact";
                badgeClass = "text-purple-600 bg-purple-50";
                defaultTitle = "Delivering Measurable Value";
                desc = d.business_impact || "";
                imgUrl = d.business_impact_image_url || "";
                sectionBg = "py-10 md:py-12 lg:py-16 border-b border-[#eae6fa]/10 last:border-b-0";
                extra = (
                  <p className="text-slate-400 text-xs mt-4">
                    Measurable corporate outcome engineered directly through smart architecture integration.
                  </p>
                );
              }

              const blockTitle = d.title || defaultTitle;
              const hasImage = !!imgUrl;

              // Left/Right split layout order logic:
              const descOrder = pos === "left" ? "lg:order-2" : "lg:order-1";
              const imgOrder = pos === "left" ? "lg:order-1" : "lg:order-2";

              const textElement = (
                <div className="flex flex-col justify-center">
                  <span className={`text-xs font-bold uppercase tracking-wider ${badgeClass} px-3 py-1 rounded-md inline-block mb-4 w-fit`}>
                    {badgeText}
                  </span>
                  <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                    {blockTitle}
                  </h3>
                  <p className="text-slate-655 text-base leading-relaxed font-medium">
                    {desc}
                  </p>
                  {extra}
                </div>
              );

              const imageElement = hasImage ? (
                <div className="w-full">
                  <div className="overflow-hidden rounded-3xl border border-slate-200/60 shadow-xl max-h-[400px]">
                    <RevealImage 
                      src={imgUrl} 
                      alt={blockTitle} 
                    />
                  </div>
                </div>
              ) : null;

              return (
                <section key={block.id || idx} className={sectionBg}>
                  <div className="max-w-7xl mx-auto px-6">
                    {!hasImage ? (
                      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                        <span className={`text-xs font-bold uppercase tracking-wider ${badgeClass} px-3 py-1 rounded-md inline-block mb-4`}>
                          {badgeText}
                        </span>
                        <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                          {blockTitle}
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed font-medium">
                          {desc}
                        </p>
                        {extra}
                      </div>
                    ) : pos === "above" ? (
                      <div className="flex flex-col gap-10 max-w-4xl mx-auto items-center text-center">
                        <div className="w-full max-w-2xl">{imageElement}</div>
                        <div className="flex flex-col items-center">
                          <span className={`text-xs font-bold uppercase tracking-wider ${badgeClass} px-3 py-1 rounded-md inline-block mb-4`}>
                            {badgeText}
                          </span>
                          <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                            {blockTitle}
                          </h3>
                          <p className="text-slate-600 text-base leading-relaxed font-medium">
                            {desc}
                          </p>
                          {extra}
                        </div>
                      </div>
                    ) : pos === "bottom" ? (
                      <div className="flex flex-col gap-10 max-w-4xl mx-auto items-center text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-xs font-bold uppercase tracking-wider ${badgeClass} px-3 py-1 rounded-md inline-block mb-4`}>
                            {badgeText}
                          </span>
                          <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                            {blockTitle}
                          </h3>
                          <p className="text-slate-600 text-base leading-relaxed font-medium">
                            {desc}
                          </p>
                          {extra}
                        </div>
                        <div className="w-full max-w-2xl">{imageElement}</div>
                      </div>
                    ) : (
                      // "left" or "right" split layout
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className={`${descOrder} flex flex-col justify-center`}>
                          {textElement}
                        </div>
                        <div className={`${imgOrder} w-full`}>
                          {imageElement}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              );
            });
          })()
        ) : (
          <>
            {/* The Challenge Section (Phase 1) */}
            {project.problem && (
              <section className="py-10 md:py-12 lg:py-16 bg-slate-50/40 border-b border-[#eae6fa]/10">
                <div className="max-w-7xl mx-auto px-6">
                  {project.challenge_image_url ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="lg:order-1 flex flex-col justify-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-md inline-block mb-4 w-fit">
                          Phase 1: The Challenge
                        </span>
                        <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                          Problem Identification
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed font-medium">
                          {project.problem}
                        </p>
                      </div>
                      <div className="lg:order-2 w-full">
                        <div className="overflow-hidden rounded-3xl border border-slate-200/60 shadow-xl max-h-[400px]">
                          <RevealImage 
                            src={project.challenge_image_url} 
                            alt="The Challenge" 
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-md inline-block mb-4">
                        Phase 1: The Challenge
                      </span>
                      <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                        Problem Identification
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed font-medium">
                        {project.problem}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Our Solution Section (Phase 2) */}
            {project.solution && (
              <section className="py-10 md:py-12 lg:py-16 border-b border-[#eae6fa]/10">
                <div className="max-w-7xl mx-auto px-6">
                  {project.solution_image_url ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="lg:order-2 flex flex-col justify-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md inline-block mb-4 w-fit">
                          Phase 2: Our Solution
                        </span>
                        <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                          Engineering Response
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed font-medium">
                          {project.solution}
                        </p>
                      </div>
                      <div className="lg:order-1 w-full">
                        <div className="overflow-hidden rounded-3xl border border-slate-200/60 shadow-xl max-h-[400px]">
                          <RevealImage 
                            src={project.solution_image_url} 
                            alt="Our Solution" 
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md inline-block mb-4">
                        Phase 2: Our Solution
                      </span>
                      <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                        Engineering Response
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed font-medium">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Business Impact Section (Phase 3) */}
            {project.business_impact && (
              <section className="py-10 md:py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-6">
                  {project.business_impact_image_url ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="lg:order-1 flex flex-col justify-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md inline-block mb-4 w-fit">
                          Phase 3: Business Impact
                        </span>
                        <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                          Delivering Measurable Value
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed font-medium">
                          {project.business_impact}
                        </p>
                        <p className="text-slate-400 text-xs">
                          Measurable corporate outcome engineered directly through smart architecture integration.
                        </p>
                      </div>
                      <div className="lg:order-2 w-full">
                        <div className="overflow-hidden rounded-3xl border border-slate-200/60 shadow-xl max-h-[400px]">
                          <RevealImage 
                            src={project.business_impact_image_url} 
                            alt="Business Impact" 
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-md inline-block mb-4">
                        Phase 3: Business Impact
                      </span>
                      <h3 className="text-3xl font-black font-outfit text-slate-900 mb-6 leading-tight">
                        Delivering Measurable Value
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed font-medium">
                        {project.business_impact}
                      </p>
                      <p className="text-slate-400 text-xs">
                        Measurable corporate outcome engineered directly through smart architecture integration.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        )}

        {/* Bottom Call to Action Section (mirroring standard styling) */}
        <section className="py-10 md:py-12 lg:py-16 bg-gradient-to-tr from-[#fcfaff]/40 to-[#f4f2ff]/40 backdrop-blur-[6px] relative border-t border-[#eae6fa]/40">
          <div className="reveal-item max-w-4xl mx-auto px-6 text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Rocket className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 mb-6">
              Ready to construct your next digital asset?
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
              We constantly push our limits to grow and innovate. Get in touch with our engineering team to draft a custom architectural blueprint.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 text-white font-bold hover:bg-slate-900 transition-all duration-300 shadow-lg shadow-purple-200"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
