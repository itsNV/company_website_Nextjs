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

      <main className="flex-grow pt-28 pb-16 bg-transparent relative z-10 reveal-container">
        
        {/* Hero Section */}
        <section className="py-20 reveal-item">
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

        {/* Project Overview & Core Details (mirroring Focus Areas) */}
        <section className="py-16 bg-white/40 border-y border-[#eae6fa]/25">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 mb-6">Project Parameters</h2>
              <div className="reveal-stagger flex flex-col gap-4">
                <div className="flex gap-3.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold text-sm md:text-base">
                    Platform Architecture: {project.platform_type}
                  </span>
                </div>
                <div className="flex gap-3.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold text-sm md:text-base">
                    Deployment Status: {project.live_url ? "Public Production Node" : "Internal Corporate Sandbox"}
                  </span>
                </div>
                <div className="flex gap-3.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold text-sm md:text-base">
                    Accessibility Status: {project.live_url ? "Open Web Access" : "Encrypted Confidential Contract"}
                  </span>
                </div>
              </div>
            </div>

            {/* Business Impact Spotlight card */}
            {project.business_impact && (
              <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-[100px]" />
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/50 px-3 py-1 rounded-md inline-block mb-4">
                  Impact Delivered
                </span>
                <h3 className="text-xl font-bold font-outfit text-white mb-4 leading-relaxed">
                  "{project.business_impact}"
                </h3>
                <p className="text-slate-400 text-xs">
                  Measurable corporate outcome engineered directly through smart architecture integration.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Challenge & Solution (mirroring What You Get / Features Section) */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="reveal-item text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 text-center mb-4">Engineering Scope</h2>
            <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">Deep dive into the problem definition and targeted programmatic response.</p>
            
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Problem Card */}
              {project.problem && (
                <div className="hover-box group p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-rose-100 bg-rose-50 text-rose-600 mb-6 font-black font-outfit">
                    01
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">The Challenge</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.problem}</p>
                </div>
              )}

              {/* Solution Card */}
              {project.solution && (
                <div className="hover-box group p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-purple-100 bg-purple-50 text-purple-600 mb-6 font-black font-outfit">
                    02
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">Our Solution</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.solution}</p>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* Bottom Call to Action Section (mirroring standard styling) */}
        <section className="py-20 bg-gradient-to-tr from-[#fcfaff]/40 to-[#f4f2ff]/40 backdrop-blur-[6px] relative border-t border-[#eae6fa]/40">
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
