"use client";

import React, { use, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { serviceIconMap } from "@/lib/serviceIcons";

const colorThemes = [
  "text-cyan-600 bg-cyan-50 border-cyan-100",
  "text-blue-600 bg-blue-50 border-blue-100",
  "text-indigo-600 bg-indigo-50 border-indigo-100",
  "text-rose-600 bg-rose-50 border-rose-100",
  "text-emerald-600 bg-emerald-50 border-emerald-100"
];

// Complete static configurations for services to guarantee seamless load/transition
const fallbackServices = {
  "branding": {
    name: "Branding Strategy & Identity",
    heroBadge: "Branding Strategy",
    heroDescription: "Strategic branding services that build strong identities, trust, and long-term market recognition. We help businesses build strong, memorable, and impactful brand identities.",
    ctaText: "Design Your Identity",
    ctaLink: "/contact",
    benefits: [
      "Builds brand recognition and trust",
      "Differentiates your business from competitors",
      "Creates emotional connection with customers",
      "Improves customer loyalty",
      "Enhances business credibility",
      "Supports long-term growth"
    ],
    servicesOffered: [
      "Brand strategy and positioning",
      "Logo and visual identity design",
      "Brand messaging and voice development",
      "Brand guidelines creation",
      "Rebranding services",
      "Digital and print brand assets"
    ],
    features: [
      {
        title: "Unique Identity",
        desc: "Creative and modern visual design concepts designed specifically to identify and separate your business.",
        icon: "Palette"
      },
      {
        title: "Market Positioning",
        desc: "Target audience research alignment and strategic messaging guidelines that build user trust.",
        icon: "Compass"
      },
      {
        title: "Visual Consistency",
        desc: "Comprehensive brand guideline documents guaranteeing unified presentation across physical and online mediums.",
        icon: "ShieldCheck"
      },
      {
        title: "Storytelling",
        desc: "Translating corporate vision into emotional customer connection pipelines and credibility builders.",
        icon: "Award"
      }
    ],
    processSteps: [
      { step: "01", title: "Research & Strategy", desc: "Investigate business values, target demographic preferences, and evaluate competitor positioning." },
      { step: "02", title: "Brand Strategy", desc: "Define the brand voice, core values, mission alignment, and visual messaging guidelines." },
      { step: "03", title: "Visual Identity Design", desc: "Draft unique logo variations, select color palettes, and finalize corporate typography." },
      { step: "04", title: "Brand Development", desc: "Create unified print and digital brand assets, such as business cards, brochures, and digital headers." },
      { step: "05", title: "Implementation", desc: "Ensure visual consistency is applied across websites, social media, and packaging material." }
    ],
    faqs: [
      { q: "What is branding?", a: "Branding is the creation of a distinct visual identity, personality, and reputation for your business to establish recognition and trust." },
      { q: "Why is branding important?", a: "Branding differentiates your business from competitors, increases client trust, and forms a lasting professional impression." },
      { q: "Do you offer rebranding services?", a: "Yes, we assist established businesses in updating their logos, assets, and messaging to match current market trends." }
    ]
  },
  "website-development": {
    name: "Website Development Solutions",
    heroBadge: "Web Platforms",
    heroDescription: "High-performance headless CMS architectures and enterprise systems designed for sub-second speeds, modern accessibility, and secure scaling.",
    ctaText: "Build Your Website",
    ctaLink: "/contact",
    benefits: [
      "Sub-second load times",
      "Unparalleled security",
      "Flexible content management",
      "SEO friendly rendering"
    ],
    servicesOffered: [
      "Next.js headless configurations",
      "Enterprise WordPress development",
      "Strapi and Sanity CMS setup",
      "Responsive layout engineering"
    ],
    features: [
      { title: "Headless CMS", desc: "Integrate Sanity or Strapi to give teams total control of text updates without developer bottlenecks.", icon: "Laptop" },
      { title: "SEO Primed", desc: "Server-side rendering (SSR) ensuring google indices read and rank pages faster.", icon: "Compass" }
    ],
    processSteps: [
      { step: "01", title: "Discovery", desc: "Align business requirements and layout scope." }
    ],
    faqs: []
  }
};

export default function DynamicServicePage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    async function loadService() {
      try {
        const q = query(collection(db, "services"), where("slug", "==", slug), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          setService({ id: snapshot.docs[0].id, ...docData });
        } else {
          // Fallback to static services
          const found = fallbackServices[slug] || null;
          setService(found);
        }
      } catch (error) {
        console.error("Error loading service details:", error);
        setService(fallbackServices[slug] || null);
      } finally {
        setLoading(false);
      }
    }
    loadService();
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
  }, [service]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-slate-50/30">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Service...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-slate-50/30">
          <div className="text-center p-8 max-w-md bg-white border border-slate-200/60 rounded-3xl shadow-xl">
            <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-6" />
            <h1 className="text-2xl font-black font-outfit text-slate-900 mb-2">Service Not Found</h1>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">The service track you are looking for does not exist or has been archived.</p>
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-slate-900 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Services
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar activeSection="services" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      <main className="flex-grow pt-28 pb-16 bg-transparent relative z-10 reveal-container font-sans text-slate-800">
        
        {/* Hero Section */}
        <section className="py-20 reveal-item">
          <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                {service.heroBadge || "Enterprise Solution"}
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                {service.name}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                {service.heroDescription}
              </p>
              {service.ctaText && (
                <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                  <a
                    href={service.ctaLink || "/contact"}
                    className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-bold transition-all duration-300 shadow-lg shadow-blue-100"
                  >
                    {service.ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
            
            {/* Benefits Sidebar */}
            {service.benefits?.length > 0 && (
              <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-8 shadow-xl">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">Key Benefits</h3>
                <div className="flex flex-col gap-2">
                  {service.benefits.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-slate-700 text-xs font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Services & Capabilities List */}
        {service.servicesOffered?.length > 0 && (
          <section className="py-16 bg-white/40 border-y border-[#eae6fa]/20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Offerings & Capabilities</h2>
              <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.servicesOffered.map((srv, idx) => (
                  <div key={idx} className="hover-box flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-slate-800 font-semibold text-sm">{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features / Scope Section */}
        {service.features?.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="reveal-item text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 text-center mb-4">Core Focus Areas</h2>
              <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">Creating visual consistency and emotional connection strategies to elevate credibility values.</p>
              <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {service.features.map((feat, idx) => {
                  const Icon = serviceIconMap[feat.icon] || serviceIconMap.Palette;
                  const themeClass = colorThemes[idx % colorThemes.length];
                  return (
                    <div key={idx} className="hover-box group p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${themeClass}`}>
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
        )}

        {/* Process Timeline */}
        {service.processSteps?.length > 0 && (
          <section className="py-20 bg-slate-50/50 border-t border-slate-200/40">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-4">Lifecycle Timeline</h2>
              <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">Our structured path from requirements map to final deployment delivery.</p>
              
              <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="hover-box relative p-6 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between group">
                    <div>
                      <span className="text-4xl font-black font-outfit text-slate-500 group-hover:text-blue-500 transition-colors block mb-4">{step.step}</span>
                      <h3 className="text-base font-bold font-outfit text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Accordion FAQ Section */}
        {service.faqs?.length > 0 && (
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
              
              <div className="flex flex-col gap-4">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm overflow-hidden transition-all">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-6 text-left font-bold font-outfit text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                          {faq.q}
                        </span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
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
        )}

      </main>
      <Footer />
    </>
  );
}
