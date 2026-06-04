"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Compass, Palette, Award, HelpCircle, ChevronDown, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function BrandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    "Brand strategy and positioning",
    "Logo and visual identity design",
    "Brand messaging and voice development",
    "Brand guidelines creation",
    "Rebranding services",
    "Digital and print brand assets"
  ];

  const features = [
    {
      title: "Unique Identity",
      desc: "Creative and modern visual design concepts designed specifically to identify and separate your business.",
      icon: Palette,
      theme: "text-cyan-600 bg-cyan-50 border-cyan-100"
    },
    {
      title: "Market Positioning",
      desc: "Target audience research alignment and strategic messaging guidelines that build user trust.",
      icon: Compass,
      theme: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      title: "Visual Consistency",
      desc: "Comprehensive brand guideline documents guaranteeing unified presentation across physical and online mediums.",
      icon: ShieldCheck,
      theme: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      title: "Storytelling",
      desc: "Translating corporate vision into emotional customer connection pipelines and credibility builders.",
      icon: Award,
      theme: "text-rose-600 bg-rose-50 border-rose-100"
    }
  ];

  const benefits = [
    "Builds brand recognition and trust",
    "Differentiates your business from competitors",
    "Creates emotional connection with customers",
    "Improves customer loyalty",
    "Enhances business credibility",
    "Supports long-term growth"
  ];

  const process = [
    {
      step: "01",
      title: "Research & Strategy",
      desc: "Investigate business values, target demographic preferences, and evaluate competitor positioning."
    },
    {
      step: "02",
      title: "Brand Strategy",
      desc: "Define the brand voice, core values, mission alignment, and visual messaging guidelines."
    },
    {
      step: "03",
      title: "Visual Identity Design",
      desc: "Draft unique logo variations, select color palettes, and finalize corporate typography."
    },
    {
      step: "04",
      title: "Brand Development",
      desc: "Create unified print and digital brand assets, such as business cards, brochures, and digital headers."
    },
    {
      step: "05",
      title: "Implementation",
      desc: "Ensure visual consistency is applied across websites, social media, and packaging material."
    }
  ];

  const faqs = [
    {
      q: "What is branding?",
      a: "Branding is the creation of a distinct visual identity, personality, and reputation for your business to establish recognition and trust."
    },
    {
      q: "Why is branding important?",
      a: "Branding differentiates your business from competitors, increases client trust, and forms a lasting professional impression."
    },
    {
      q: "Do you offer rebranding services?",
      a: "Yes, we assist established businesses in updating their logos, assets, and messaging to match current market trends."
    }
  ];

  return (
    <>
      <Navbar activeSection="services" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      <main className="flex-grow pt-28 pb-16 bg-transparent relative z-10">
        
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Branding Strategy
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                Strategic Branding <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500">Services & Identity</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Strategic branding services that build strong identities, trust, and long-term market recognition. We help businesses build strong, memorable, and impactful brand identities.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-600 text-white font-bold hover:bg-slate-900 transition-all duration-300 shadow-lg shadow-cyan-100"
                >
                  Design Your Identity
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Tech stack container right side */}
            <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-8 shadow-xl">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">Key Benefits</h3>
              <div className="flex flex-col gap-2">
                {benefits.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span className="text-slate-700 text-xs font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services & Capabilities List */}
        <section className="py-16 bg-white/40 border-y border-[#eae6fa]/20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Branding Offerings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div key={idx} className="flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                  <span className="text-slate-800 font-semibold text-sm">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Scope Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 text-center mb-4">Core Branding Solutions</h2>
            <p className="text-slate-500 text-center max-w-xl mx-auto mb-16">Creating visual consistency and emotional connection strategies to elevate credibility values.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="group p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg hover:shadow-cyan-50 hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${feat.theme}`}>
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

        {/* Process Timeline */}
        <section className="py-20 bg-slate-50/50 border-t border-slate-200/40">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-4">Our Creative Lifecycle</h2>
            <p className="text-slate-500 text-center max-w-xl mx-auto mb-16">We structure our process from competitor audits to layout stylebooks and final guidelines distribution.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {process.map((step, idx) => (
                <div key={idx} className="relative p-6 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-4xl font-black font-outfit text-slate-100 group-hover:text-cyan-200 transition-colors block mb-4">{step.step}</span>
                    <h3 className="text-base font-bold font-outfit text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accordion FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left font-bold font-outfit text-slate-900 hover:text-cyan-600 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-cyan-500 shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="p-6 pt-0 border-t border-slate-100 text-slate-600 text-sm leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
