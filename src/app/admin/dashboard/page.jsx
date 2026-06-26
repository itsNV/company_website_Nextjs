"use client";

import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { BookOpen, Laptop, Cpu, ArrowRight, Activity, ShieldCheck, Database, Calendar, Settings, Briefcase } from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";


export default function Dashboard() {
  const dashboardCards = [
    {
      title: "Blog Manager",
      description: "Publish articles, edit contents section-wise, search existing publications, and manage company updates.",
      icon: BookOpen,
      href: "/admin/blogs",
      color: "from-purple-500/5 to-indigo-500/5 hover:border-purple-500/30",
      iconColor: "text-purple-600 bg-purple-50 border-purple-100",
      badge: "Publications",
    },
    {
      title: "Services Console",
      description: "Manage client website development tracks, branding strategies, and customized mobile applications.",
      icon: Laptop,
      href: "/admin/services",
      color: "from-blue-500/5 to-sky-500/5 hover:border-blue-500/30",
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
      badge: "Capabilities",
    },
    {
      title: "Solutions Center",
      description: "Maintain ERP system flows, local Ahmedabad CRM parameters, and software layout specifications.",
      icon: Cpu,
      href: "/admin/solutions",
      color: "from-emerald-500/5 to-teal-500/5 hover:border-emerald-500/30",
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      badge: "Enterprise",
    },
    {
      title: "Projects Showcase",
      description: "Build client project portfolios, challenge case studies, solution diagrams, and impact spotlights.",
      icon: Briefcase,
      href: "/admin/projects",
      color: "from-rose-500/5 to-orange-500/5 hover:border-rose-500/30",
      iconColor: "text-rose-600 bg-rose-50 border-rose-100",
      badge: "Showcase",
    },
    {
      title: "Global Settings",
      description: "Configure homepage visual layouts, orbital tags lists, meta descriptions, logo uploads, and favicon files.",
      icon: Settings,
      href: "/admin/settings",
      color: "from-slate-500/5 to-blue-500/5 hover:border-slate-500/30",
      iconColor: "text-slate-600 bg-slate-50 border-slate-100",
      badge: "Configuration",
    },
  ];

//   const statItems = [
//     { label: "Console Status", value: "Operational", icon: Activity, color: "text-teal-600 bg-teal-50" },
//     { label: "Gatekeeper Node", value: "Encrypted", icon: ShieldCheck, color: "text-indigo-600 bg-indigo-50" },
//     { label: "Database link", value: "Firestore Active", icon: Database, color: "text-blue-600 bg-blue-50" },
//   ];

  return (
    <AdminGuard>
      <div className="min-h-screen w-full bg-[#f3f9fc] text-slate-800 font-sans relative overflow-hidden flex flex-col">
        <AdminNavbar />
        
        {/* Glow ambient lights */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full z-10 pt-32 px-6 pb-16 flex-grow flex flex-col justify-center">
          
          {/* Header Row */}
          <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black font-outfit text-slate-900 tracking-wide">
                Console Dashboard<span className="text-blue-600">.</span>
              </h1>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">
                Control panel for company metadata and dynamic tracks
              </p>
            </div>
            
            {/* Live indicator */}
            <div className="self-center sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/60 shadow-sm text-xs font-bold text-slate-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
              </span>
              System Live
            </div>
          </div>

          {/* Quick Metrics Row */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {statItems.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-4 bg-white/60 backdrop-blur-sm border border-slate-200/60 p-5 rounded-2xl shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{stat.label}</span>
                    <span className="text-sm font-black text-slate-800 font-outfit mt-0.5 block">{stat.value}</span>
                  </div>
                </div>
              );
            })}
          </div> */}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dashboardCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm p-8 flex flex-col justify-between h-[300px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 bg-gradient-to-br ${card.color}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-500">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                      {card.description}
                    </p>
                  </div>

                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 uppercase tracking-wider group-hover:gap-2 transition-all mt-4 border-t border-slate-100 pt-4"
                  >
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
        
      </div>
    </AdminGuard>
  );
}