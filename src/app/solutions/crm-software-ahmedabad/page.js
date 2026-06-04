"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Users, Award, Shield, CheckCircle2, ArrowRight } from "lucide-react";

export default function CRMPage() {
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
    { title: "Lead Management System", desc: "Track inquiries, captures, and statuses through conversion filters.", icon: Users, theme: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { title: "Sales Pipeline Automation", desc: "Centralized deal flow charts, automation follow-ups, and reminders.", icon: Sparkles, theme: "text-purple-600 bg-purple-50 border-purple-100" },
    { title: "Quotation & Order Tracker", desc: "Draft quotes, generate invoice details, and route transactions securely.", icon: Shield, theme: "text-blue-600 bg-blue-50 border-blue-100" },
    { title: "Performance Dashboards", desc: "Monitor sales team activities, KPIs, and close ratios in real-time.", icon: Award, theme: "text-rose-600 bg-rose-50 border-rose-100" },
  ];

  const industries = [
    "Manufacturing & Industrial",
    "Textile & Garment",
    "Pharmaceutical & Chemical",
    "Logistics & Distribution",
    "Startups, SMEs & MSMEs",
    "Real Estate & Construction",
    "Retail & Trading",
    "FMCG & Wholesale",
    "Service & Project-Based"
  ];

  const benefits = [
    "Centralized Customer Database",
    "Automated Sales & Tasks Follow-ups",
    "Cloud CRM Mobile Compatibility",
    "Advanced Business Analytics Dashboards",
    "Role-Based Access Protections"
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
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                CRM Solutions
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                CRM Software <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Development Company</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Automate customer engagement, track sales pipelines, and improve team retention with custom cloud CRM software built for SMEs and growing businesses.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/contact"
                  className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 text-white font-bold transition-all duration-300 shadow-lg shadow-indigo-100"
                >
                  Start CRM Project
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
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
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
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 mb-6">Centralized Sales Management</h2>
            <p className="reveal-item text-slate-600 leading-relaxed max-w-4xl mx-auto lg:mx-0">
              Modern businesses require smart CRM software to manage customer relations, follow-ups, quotes, and reports. 
              As a trusted CRM developer, Yunawise designs modular features integrating contact repositories, analytics dashboards, and role-based permissions to optimize operations.
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">CRM Core Features</h2>
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
            <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">Custom database workflows configured specifically for your industry vertical.</p>
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind, idx) => (
                <div key={idx} className="hover-box flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
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
