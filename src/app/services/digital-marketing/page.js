"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, Award, BarChart3, Search, Megaphone, HelpCircle, ChevronDown, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DigitalMarketingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    "Search Engine Optimization (SEO)",
    "Social Media Marketing (SMM)",
    "Pay-Per-Click Advertising (PPC)",
    "Content Marketing",
    "Email Marketing & Automation",
    "Conversion Rate Optimization (CRO)",
    "Analytics & Performance Reporting"
  ];

  const features = [
    {
      title: "Data-Driven Strategies",
      desc: "Audits and research aligning keywords, search rankings, and campaign bids for your target niche.",
      icon: BarChart3,
      theme: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      title: "Target-Oriented Campaigns",
      desc: "Tailored audiences matching target demographic preferences to increase capture rates.",
      icon: TrendingUp,
      theme: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      title: "Multi-Platform Reach",
      desc: "Comprehensive presence scaling meta ads, google search algorithms, and social media ecosystems.",
      icon: Megaphone,
      theme: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      title: "ROI Optimization",
      desc: "Maximized search output value and lower customer acquisition costs via continual bid tweaks.",
      icon: Award,
      theme: "text-rose-600 bg-rose-50 border-rose-100"
    }
  ];

  const benefits = [
    "Higher Search Engine Rankings",
    "Increased Website Traffic",
    "Quality Lead Generation",
    "Strong Brand Authority",
    "Improved Customer Engagement",
    "Measurable Growth"
  ];

  const process = [
    {
      step: "01",
      title: "Audit & Strategy",
      desc: "Audit existing digital performance, analyze search rankings, and formulate a targeted marketing roadmap."
    },
    {
      step: "02",
      title: "Campaign Setup",
      desc: "Configure audiences, select keywords, design ad creatives, and deploy tracking pixels."
    },
    {
      step: "03",
      title: "Launch & Execution",
      desc: "Publish content, activate ads across platforms, and begin search optimization routines."
    },
    {
      step: "04",
      title: "Monitor & Optimize",
      desc: "Continually track key performance indicators (KPIs), adjust bidding, and refine audience targeting."
    },
    {
      step: "05",
      title: "Reporting & Review",
      desc: "Deliver detailed reports outlining click-throughs, lead conversions, cost-per-lead, and ROI."
    }
  ];

  const faqs = [
    {
      q: "How long does it take to see results from SEO?",
      a: "SEO is a long-term organic strategy. Visible improvements in rankings and traffic typically appear in 3 to 6 months."
    },
    {
      q: "Do you manage pay-per-click (PPC) campaigns?",
      a: "Yes, we design and manage search engine and social media ad campaigns across Google Ads, Meta Ads, and LinkedIn Ads."
    },
    {
      q: "Which marketing services are right for my business?",
      a: "We recommend a custom digital mix based on your industry, target audience demographics, business goals, and budget."
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
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Digital Marketing
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                ROI-Driven Digital <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-500">Marketing Services</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Drive business growth, generate high-quality leads, and build brand awareness with our marketing strategies. Reach your target audience and grow your brand online.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-bold hover:bg-slate-900 transition-all duration-300 shadow-lg shadow-emerald-100"
                >
                  Start Marketing Campaign
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
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Marketing Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div key={idx} className="flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-slate-800 font-semibold text-sm">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Scope Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 text-center mb-4">Why Choose Yunawise</h2>
            <p className="text-slate-500 text-center max-w-xl mx-auto mb-16">Data-driven strategies backed by multi-platform marketing reach and performance tracking.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="group p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg hover:shadow-emerald-50 hover:-translate-y-1 transition-all duration-300">
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
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-4">Our Marketing Process</h2>
            <p className="text-slate-500 text-center max-w-xl mx-auto mb-16">A roadmap from digital performance audit and keyword setup to campaign launch and ROI optimization.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {process.map((step, idx) => (
                <div key={idx} className="relative p-6 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-4xl font-black font-outfit text-slate-100 group-hover:text-emerald-200 transition-colors block mb-4">{step.step}</span>
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
                      className="w-full flex items-center justify-between p-6 text-left font-bold font-outfit text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0" />
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
