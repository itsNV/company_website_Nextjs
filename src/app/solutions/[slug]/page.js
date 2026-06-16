"use client";

import React, { use, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

const iconMap = {
  Palette: LucideIcons.Award,
  Compass: LucideIcons.Cpu,
  ShieldCheck: LucideIcons.Shield,
  Award: LucideIcons.Award,
  Laptop: LucideIcons.Laptop,
  HelpCircle: LucideIcons.HelpCircle,
  Sparkles: LucideIcons.Sparkles,
  Cpu: LucideIcons.Cpu,
  Users: LucideIcons.Users,
  Shield: LucideIcons.Shield
};

const colorThemes = [
  "text-indigo-600 bg-indigo-50 border-indigo-100",
  "text-purple-600 bg-purple-50 border-purple-100",
  "text-blue-600 bg-blue-50 border-blue-100",
  "text-rose-600 bg-rose-50 border-rose-100",
  "text-emerald-600 bg-emerald-50 border-emerald-100"
];

const getIconComponent = (name) => {
  const IconComp = LucideIcons[name];
  if (IconComp) return IconComp;
  return LucideIcons.Cpu; 
};
// Dynamic page blocks rendering for custom schema solutions

function RenderPageBlocks({ blocks, openFaq, setOpenFaq }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-20">
      {blocks.map((block) => {
        const IconComponent = block.data?.sectionIcon ? getIconComponent(block.data.sectionIcon) : null;
        switch (block.type) {
          case "hero": {
            const imgUrl = block.data.imageUrl;
            return (
              <section key={block.id} className="py-20 reveal-item">
                <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className={imgUrl ? "lg:col-span-7 flex flex-col items-center lg:items-start" : "lg:col-span-12 flex flex-col items-center text-center"}>
                    {block.data.badge && (
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                        {IconComponent ? <IconComponent className="w-3.5 h-3.5" /> : <LucideIcons.Sparkles className="w-3.5 h-3.5 animate-pulse" />}
                        {block.data.badge}
                      </div>
                    )}
                    <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                      {block.data.title}
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                      {block.data.description}
                    </p>
                    {block.data.ctaText && (
                      <div className="mt-8">
                        <a
                          href={block.data.ctaLink || "/contact"}
                          className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-bold transition-all duration-300 shadow-lg shadow-emerald-100"
                        >
                          {block.data.ctaText}
                          <LucideIcons.ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                  {imgUrl && (
                    <div className="lg:col-span-5 flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={imgUrl} 
                        alt={block.data.title} 
                        className="w-full max-w-md md:max-w-lg aspect-[4/3] object-cover rounded-[32px] shadow-2xl border-4 border-white" 
                      />
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case "overview": {
            return (
              <section key={block.id} className="py-16 bg-white/40 border-y border-slate-200/30">
                <div className="max-w-5xl mx-auto px-6 text-center">
                  <h2 className="text-3xl font-extrabold font-outfit text-slate-900 mb-6 flex items-center justify-center gap-2">
                    {IconComponent && <IconComponent className="w-6 h-6 text-emerald-600 shrink-0" />}
                    {block.data.title || "Core Highlights"}
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed">
                    {block.data.description}
                  </p>
                </div>
              </section>
            );
          }
          case "benefits": {
            const Icon = getIconComponent(block.data.bulletIcon || "CheckCircle2");
            const style = block.data.bulletStyle || "icon";

            let listClass = "grid grid-cols-1 md:grid-cols-2 gap-4";
            if (style === "disc") listClass = "list-disc pl-6 space-y-2 text-slate-700 text-sm font-semibold";
            else if (style === "circle") listClass = "list-[circle] pl-6 space-y-2 text-slate-700 text-sm font-semibold";
            else if (style === "square") listClass = "list-[square] pl-6 space-y-2 text-slate-700 text-sm font-semibold";
            else if (style === "decimal") listClass = "list-decimal pl-6 space-y-2 text-slate-700 text-sm font-semibold";

            return (
              <section key={block.id} className="py-16 bg-transparent">
                <div className="max-w-4xl mx-auto px-6 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-8 sm:p-10 shadow-xl">
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-6 border-b pb-3 border-slate-100 flex items-center gap-2">
                    {IconComponent && <IconComponent className="w-5 h-5 text-emerald-500 shrink-0" />}
                    Key Benefits
                  </h3>
                  {style === "icon" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {block.data.items?.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <Icon className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span className="text-slate-700 text-sm font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ol className={listClass}>
                      {block.data.items?.map((item, idx) => (
                        <li key={idx}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </section>
            );
          }
          case "offerings": {
            return (
              <section key={block.id} className="py-16 bg-white/40 border-y border-slate-200/30">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Capabilities & Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {block.data.items?.map((srv, idx) => (
                      <div key={idx} className="flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <LucideIcons.CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="text-slate-800 font-semibold text-sm">{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }
          case "features": {
            return (
              <section key={block.id} className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 text-center mb-12">Core Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {block.data.items?.map((feat, idx) => {
                      const Icon = getIconComponent(feat.icon || "Cpu");
                      return (
                        <div key={idx} className="p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-emerald-100 bg-emerald-50 text-emerald-600 mb-6">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">{feat.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }
          case "process": {
            return (
              <section key={block.id} className="py-20 bg-slate-50/50 border-t border-slate-200/40">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Lifecycle Timeline</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {block.data.items?.map((step, idx) => (
                      <div key={idx} className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between group">
                        <div>
                          <span className="text-4xl font-black font-outfit text-slate-500 group-hover:text-emerald-500 transition-colors block mb-4">{step.step}</span>
                          <h3 className="text-base font-bold font-outfit text-slate-900 mb-2">{step.title}</h3>
                          <p className="text-slate-600 text-[11px] leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }
          case "faqs": {
            return (
              <section key={block.id} className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                  <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
                  <div className="flex flex-col gap-4">
                    {block.data.items?.map((faq, idx) => {
                      const isOpen = openFaq === `${block.id}_${idx}`;
                      return (
                        <div key={idx} className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm overflow-hidden transition-all">
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : `${block.id}_${idx}`)}
                            className="w-full flex items-center justify-between p-6 text-left font-bold font-outfit text-slate-900 hover:text-emerald-600 transition-colors"
                          >
                            <span className="flex items-center gap-3">
                              <LucideIcons.HelpCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                              {faq.q}
                            </span>
                            <LucideIcons.ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                          {isOpen && (
                            <div className="p-6 pt-0 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }
          case "pricing": {
            return (
              <section key={block.id} className="py-20 bg-gradient-to-b from-transparent to-emerald-50/10">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Pricing & Packages</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {block.data.items?.map((plan, idx) => (
                      <div key={idx} className="bg-white border-2 border-slate-200/80 rounded-3xl p-8 shadow-xl flex flex-col justify-between hover:border-emerald-500 transition-colors">
                        <div>
                          <h4 className="text-lg font-black text-slate-900">{plan.name}</h4>
                          <div className="mt-4 flex items-baseline">
                            <span className="text-4xl font-extrabold tracking-tight text-slate-900">{plan.price}</span>
                            <span className="ml-1 text-xs text-slate-500">/ {plan.period}</span>
                          </div>
                          <ul className="mt-6 space-y-4">
                            {plan.features?.map((feat, fi) => (
                              <li key={fi} className="flex items-start gap-3">
                                <LucideIcons.Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="text-xs text-slate-600 font-semibold">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-8">
                          <a 
                            href={plan.ctaLink || "/contact"}
                            className="block w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center text-xs uppercase tracking-wider shadow-sm transition-all"
                          >
                            {plan.ctaText || "Choose Plan"}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }
          case "industries": {
            return (
              <section key={block.id} className="py-20 bg-slate-50/50 border-t border-slate-200/40">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-4">
                    {block.data.title || "Industries We Serve"}
                  </h2>
                  {block.data.description && (
                    <p className="text-slate-500 text-center max-w-xl mx-auto mb-16">{block.data.description}</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {block.data.items?.map((ind, idx) => (
                      <div key={idx} className="flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <LucideIcons.CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="text-slate-800 font-semibold text-sm">{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function DynamicSolutionPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    async function loadSolution() {
      try {
        const q = query(collection(db, "solutions"), where("slug", "==", slug), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          setSolution({ id: snapshot.docs[0].id, ...docData });
        } else {
          setSolution(null);
        }
      } catch (error) {
        console.error("Error loading solution details:", error);
        setSolution(null);
      } finally {
        setLoading(false);
      }
    }
    loadSolution();
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
        "section, .reveal-item, .reveal-stagger"
      );
      animatableElements.forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [solution]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-slate-50/30">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Solution...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!solution) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-slate-50/30">
          <div className="text-center p-8 max-w-md bg-white border border-slate-200/60 rounded-3xl shadow-xl">
            <LucideIcons.ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-6" />
            <h1 className="text-2xl font-black font-outfit text-slate-900 mb-2">Solution Not Found</h1>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">The solution blueprint you are looking for does not exist or has been archived.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-slate-900 transition-colors">
              <LucideIcons.ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const hasBlocks = solution.blocks && solution.blocks.length > 0;

  return (
    <>
      <Navbar activeSection="services" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      {hasBlocks && solution.blocks.find(b => b.type === "seo")?.data?.structuredSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: solution.blocks.find(b => b.type === "seo").data.structuredSchema
          }}
        />
      )}

      <main className="flex-grow pt-28 pb-16 bg-transparent relative z-10 reveal-container font-sans text-slate-800">
        {hasBlocks ? (
          <RenderPageBlocks 
            blocks={solution.blocks} 
            openFaq={openFaq} 
            setOpenFaq={setOpenFaq} 
          />
        ) : (
          <>
            {/* Fallback legacy layout */}
            <section className="py-20 reveal-item">
              <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8 flex flex-col items-center lg:items-start">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                    <LucideIcons.Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    {solution.heroBadge || "Enterprise Solution"}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                    {solution.name}
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                    {solution.heroDescription}
                  </p>
                  {solution.ctaText && (
                    <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                      <a
                        href={solution.ctaLink || "/contact"}
                        className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-bold transition-all duration-300 shadow-lg shadow-emerald-100"
                      >
                        {solution.ctaText}
                        <LucideIcons.ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
                
                {solution.benefits?.length > 0 && (
                  <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-8 shadow-xl">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">Key Benefits</h3>
                    <div className="flex flex-col gap-2">
                      {solution.benefits.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <LucideIcons.CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-slate-700 text-xs font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {solution.overviewDescription && (
              <section className="py-16 bg-white/40 border-y border-[#eae6fa]/20">
                <div className="max-w-7xl mx-auto px-6 text-center lg:text-left animate-fade-in">
                  <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 mb-6">
                    {solution.overviewTitle || "Overview Blueprint"}
                  </h2>
                  <p className="reveal-item text-slate-600 leading-relaxed max-w-4xl mx-auto lg:mx-0">
                    {solution.overviewDescription}
                  </p>
                </div>
              </section>
            )}

            {solution.features?.length > 0 && (
              <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Core Features</h2>
                  <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {solution.features.map((feat, idx) => {
                      const Icon = iconMap[feat.icon] || LucideIcons.Cpu;
                      const themeClass = colorThemes[idx % colorThemes.length];
                      return (
                        <div key={idx} className="hover-box group p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${themeClass}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-bold font-outfit text-slate-900 mb-3">{feat.title}</h3>
                          <p className="text-slate-600 text-xs leading-relaxed">{feat.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {solution.industriesServed?.length > 0 && (
              <section className="py-20 bg-slate-50/50 border-t border-slate-200/40">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-4">Industries We Serve</h2>
                  <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">Custom database workflows configured specifically for your industry vertical.</p>
                  <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solution.industriesServed.map((ind, idx) => (
                      <div key={idx} className="hover-box flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <LucideIcons.CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="text-slate-800 font-semibold text-sm">{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
