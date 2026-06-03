"use client";
import React, { useState, useEffect } from "react";
import { Cpu, Zap, Activity, HardDrive, Compass, Sparkles } from "lucide-react";

export default function Selector() {
  const [goal, setGoal] = useState("corporate");
  const [updates, setUpdates] = useState("weekly");
  const [traffic, setTraffic] = useState("medium");
  const [channels, setChannels] = useState("single");
  const [recommendation, setRecommendation] = useState({});

  useEffect(() => {
    // Interactive Stack Selector Algorithm
    let stackName = "Next.js + Sanity (Headless CMS)";
    let reason = "Recommended for fast, secure, modern omnichannel setups.";
    let speed = "A+ (99/100 Mobile)";
    let effort = "Low (Fully Managed Headless)";
    let db = "CDN Global Cache / Edge Databases";
    let icon = Sparkles;

    if (goal === "ecommerce") {
      stackName = "Next.js + Shopify Storefront (Headless)";
      reason = "Perfect for conversion-centric high-traffic digital retail with rapid page load speeds.";
      speed = "A+ (98/100)";
      effort = "Medium (Advanced Syncing)";
      db = "Shopify Core API & Cache";
    } else if (goal === "saas") {
      stackName = "Next.js Custom App Router + Node.js/PostgreSQL";
      reason = "Ideal for highly interactive dashboard platforms requiring custom user roles & database queries.";
      speed = "A (95/100)";
      effort = "High (Requires DevOps)";
      db = "PostgreSQL Managed RDS";
    } else if (goal === "corporate" && traffic === "light" && updates === "monthly") {
      stackName = "Modern Next.js + Payload CMS";
      reason = "A lightweight setup that gives marketers easy visual page editing while keeping developers happy.";
      speed = "A+ (97/100)";
      effort = "Low (Self-hosted SQLite/Mongo)";
      db = "Local SQLite / MongoDB Atlas";
    } else if (goal === "portal" && updates === "daily") {
      stackName = "Next.js + Strapi Enterprise CMS";
      reason = "Recommended for multi-author publishing platforms requiring complex database tagging and permissions.";
      speed = "A (93/100)";
      effort = "Medium-High (Dedicated DevOps)";
      db = "Managed PostgreSQL";
    }

    setRecommendation({
      stack: stackName,
      reason: reason,
      speed: speed,
      effort: effort,
      db: db,
    });
  }, [goal, updates, traffic, channels]);

  return (
    <section id="selector" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">
            Interactive Architecture Tool
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit text-slate-900 mt-4 mb-6">
            Find your ideal CMS &amp; Web architecture.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Choose your project details below. Our reactive configurator will instantly calculate the ultimate CMS and database stack matching your specifications.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Configurator Controls */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200/60 rounded-[32px] p-8 md:p-10 flex flex-col gap-8">
            
            {/* Step 1: Project Goal */}
            <div>
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-4">
                1. What are we building?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "corporate", label: "Corporate Blog / Web" },
                  { id: "portal", label: "Enterprise Portal" },
                  { id: "ecommerce", label: "E-Commerce Store" },
                  { id: "saas", label: "Custom SaaS Dashboard" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id)}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold text-center transition-all ${
                      goal === item.id
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                        : "bg-white border-slate-200 text-slate-700 hover:border-indigo-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Content Updates */}
            <div>
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-4">
                2. How often is content updated?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "daily", label: "Daily / Hourly" },
                  { id: "weekly", label: "Weekly" },
                  { id: "monthly", label: "Monthly / Rarely" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setUpdates(item.id)}
                    className={`py-3 px-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                      updates === item.id
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                        : "bg-white border-slate-200 text-slate-700 hover:border-indigo-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Traffic Scale */}
            <div>
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-4">
                3. Estimated monthly traffic?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", label: "< 10k hits" },
                  { id: "medium", label: "10k - 200k" },
                  { id: "heavy", label: "200k - 1M+" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTraffic(item.id)}
                    className={`py-3 px-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                      traffic === item.id
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                        : "bg-white border-slate-200 text-slate-700 hover:border-indigo-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Channels */}
            <div>
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-4">
                4. Channel Delivery?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "single", label: "Web Only (Traditional)" },
                  { id: "omni", label: "Omnichannel (Web, App)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setChannels(item.id)}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold text-center transition-all ${
                      channels === item.id
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                        : "bg-white border-slate-200 text-slate-700 hover:border-indigo-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Configuration Output Result */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 md:p-12 bg-slate-900 rounded-[32px] text-white shadow-2xl relative overflow-hidden">
            {/* Backdrop decoration */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl" />
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-8">
                <Sparkles className="w-3.5 h-3.5 fill-indigo-300" />
                Live Architecture Output
              </div>

              <span className="text-slate-400 text-xs font-black uppercase tracking-widest block mb-1">
                RECOMMENDED WEB STACK
              </span>
              <h3 className="text-2xl md:text-3xl font-black font-outfit text-white leading-tight mb-4">
                {recommendation.stack}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 border-b border-slate-800 pb-8">
                {recommendation.reason}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-black block">SPEED RATING</span>
                    <span className="text-sm font-bold text-white">{recommendation.speed}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-black block">MAINTENANCE TYPE</span>
                    <span className="text-sm font-bold text-white">{recommendation.effort}</span>
                  </div>
                </div>

                <div className="flex gap-3 col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-rose-400">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-black block">DATABASE &amp; CACHING LAYER</span>
                    <span className="text-sm font-bold text-white">{recommendation.db}</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-12 pt-8 border-t border-slate-800">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-white hover:text-slate-900 transition-all text-center text-sm shadow-md"
              >
                Request Architectural Blueprint
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
