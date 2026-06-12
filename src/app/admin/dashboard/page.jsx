"use client";

import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { BookOpen, Laptop, Cpu, ArrowRight } from "lucide-react";
import AdminNavbar from "@/components/AdminNavbar";

export default function Dashboard() {
  const dashboardCards = [
    {
      title: "Blog Manager",
      description: "Publish articles, edit contents section-wise, search existing publications, and manage company updates.",
      icon: BookOpen,
      href: "/admin/blogs",
      color: "from-purple-500/5 to-indigo-500/5 hover:border-purple-500/20",
      iconColor: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Services Console",
      description: "Manage client website development tracks, branding strategies, and customized mobile applications.",
      icon: Laptop,
      href: "/admin/services",
      color: "from-blue-500/5 to-sky-500/5 hover:border-blue-500/20",
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Solutions Center",
      description: "Maintain ERP system flows, local Ahmedabad CRM parameters, and software layout specifications.",
      icon: Cpu,
      href: "/admin/solutions",
      color: "from-emerald-500/5 to-teal-500/5 hover:border-emerald-500/20",
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen w-full bg-[#f3f9fc] text-slate-800 font-sans relative overflow-hidden flex flex-col">
        <AdminNavbar />
        
        {/* Glow ambient lights */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full z-10 pt-28 px-6 pb-16 flex-grow flex flex-col justify-center">
          
          {/* Header Row */}
          <div className="mb-12 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-black font-outfit text-slate-900 tracking-wide">
              Console Dashboard <span className="text-purple-600">.</span>
            </h1>
            <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">
              Select a console block to manage company features.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dashboardCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm p-8 flex flex-col justify-between h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5 bg-gradient-to-br ${card.color}`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${card.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>

                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-purple-600 uppercase tracking-wider group-hover:gap-2 transition-all mt-4"
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