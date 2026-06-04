"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Database, ShieldCheck, Cpu, HardDrive, CheckCircle2, ArrowRight } from "lucide-react";

export default function ERPPage() {
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
  }, []);

  const features = [
    { title: "Inventory & Warehouses", desc: "Automate batch tracking, stock locations, and level warnings.", icon: Database, theme: "text-blue-600 bg-blue-50 border-blue-100" },
    { title: "GST Billing & Accounting", desc: "Generate invoices, reconcile ledger logs, and manage accounts.", icon: ShieldCheck, theme: "text-purple-600 bg-purple-50 border-purple-100" },
    { title: "Production Planning", desc: "Track batch planning, procurement lifecycle steps, and resource lists.", icon: Cpu, theme: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { title: "Supply Chain Operations", desc: "Streamline vendor orders, distributor networks, and logistics.", icon: HardDrive, theme: "text-rose-600 bg-rose-50 border-rose-100" },
  ];

  const industries = [
    "Manufacturing & Production",
    "Textile & Apparel",
    "Pharmaceutical & Chemical",
    "Logistics & Distribution",
    "Small & Medium Enterprises (SMEs)",
    "Construction & Infrastructure",
    "Retail & Trading",
    "Distribution & Wholesale",
    "Engineering & Process"
  ];

  const benefits = [
    "Integrated Multi-Department Platform",
    "Real-time Inventory Batches Tracking",
    "GST / Compliance Automated Invoices",
    "Production and Resource Planning",
    "Cloud ERP Secure Access Controls"
  ];

  return (
    <>
      <Navbar activeSection="services" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      <main className="flex-grow pt-28 pb-16 bg-transparent relative z-10 reveal-container">
        
        {/* Hero Section */}
        <section className="py-20 reveal-item">
          <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                ERP Solutions
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                ERP Software <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">Development Company</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Digitize your operations, optimize resources, and automate billing/inventory with scalable, cloud-based ERP systems custom-built for manufacturing and business planning.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/contact"
                  className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-bold transition-all duration-300 shadow-lg shadow-blue-100"
                >
                  Start ERP Project
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
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-slate-700 text-xs font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Overview section */}
        <section id="about" className="py-16 bg-white/40 border-y border-[#eae6fa]/20">
          <div className="max-w-7xl mx-auto px-6 text-center lg:text-left">
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 mb-6">integrated Business Automation</h2>
            <p className="reveal-item text-slate-600 leading-relaxed max-w-4xl mx-auto lg:mx-0">
              Managing finance, batch inventory, and vendor logs requires one unified interface. 
              Yunawise provides scalable, GST-ready ERP systems tailored to manufacturing divisions and supply chain networks to reduce manual overhead and improve traceability.
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">ERP Core Features</h2>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="hover-box group p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${feat.theme}`}>
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

        {/* Industries Served */}
        <section id="works" className="py-20 bg-slate-50/50 border-t border-slate-200/40">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-4">Industries We Serve</h2>
            <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">Optimizing supply chains, scheduling production resources, and managing analytics.</p>
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind, idx) => (
                <div key={idx} className="hover-box flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-slate-800 font-semibold text-sm">{ind}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
