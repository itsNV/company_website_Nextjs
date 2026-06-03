"use client";
import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const projectList = [
    {
      title: "Nexa Mobile",
      category: "digital-design",
      categoryLabel: "Digital Design",
      description: "Next-generation iOS & Android application designed for rapid peer payments and unified digital assets trading.",
      bgColor: "bg-indigo-50 border-indigo-100",
      accentColor: "text-indigo-600",
      imageText: "NEXA APP",
    },
    {
      title: "AirPlane SaaS UI",
      category: "digital-design",
      categoryLabel: "Digital Design",
      description: "State-of-the-art telemetry and logistics interface designed for international charter logistics and fleet management.",
      bgColor: "bg-sky-50 border-sky-100",
      accentColor: "text-sky-600",
      imageText: "FLIGHT PANEL",
    },
    {
      title: "Aliens do 3D Automobile",
      category: "ecommerce",
      categoryLabel: "Ecommerce",
      description: "Immersive 3D e-commerce catalog featuring interactive car rendering, custom component config, and secure booking.",
      bgColor: "bg-rose-50 border-rose-100",
      accentColor: "text-rose-600",
      imageText: "3D MOTORS",
    },
    {
      title: "Photo Retouching Assets",
      category: "branding",
      categoryLabel: "Branding",
      description: "Comprehensive visual branding, high-end vector assets, and artistic marketing collateral built for digital agencies.",
      bgColor: "bg-emerald-50 border-emerald-100",
      accentColor: "text-emerald-600",
      imageText: "MEDIA LAB",
    },
  ];

  const filteredProjects = filter === "all"
    ? projectList
    : projectList.filter((proj) => proj.category === filter);

  return (
    <section id="works" className="py-24 bg-transparent border-y border-[#eae6fa]/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal-item flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-outfit text-slate-900 mt-4">
              Some of the projects we’re proud of.
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Works" },
              { id: "digital-design", label: "Digital Design" },
              { id: "ecommerce", label: "E-Commerce" },
              { id: "branding", label: "Branding" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                suppressHydrationWarning
                className={`hover-btn px-5 py-2.5 rounded-full text-xs font-bold ${
                  filter === btn.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj, idx) => (
            <div
              key={idx}
              className="transition-all duration-700 ease-out will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="hover-box group rounded-3xl border border-slate-200/50 bg-white overflow-hidden shadow-sm flex flex-col h-full">
                {/* Image Placeholder Visual */}
                <div className={`aspect-[1.8] ${proj.bgColor} border-b flex items-center justify-center relative p-6 group-hover:bg-opacity-80 transition-colors`}>
                  <div className="text-[24px] font-black font-outfit text-slate-300 tracking-wider group-hover:scale-105 transition-transform duration-300">
                    {proj.imageText}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-extrabold bg-white text-slate-800 border border-slate-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {proj.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Text Info */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-xs mb-5">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    <span>Explore Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
