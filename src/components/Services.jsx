"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, ChevronDown } from "lucide-react";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { serviceIconMap } from "@/lib/serviceIcons";

const SERVICE_THEMES = [
  {
    text: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100/50",
    gradient: "from-indigo-500 to-indigo-600",
    shadow: "shadow-indigo-100",
    hoverBg: "hover:bg-indigo-600",
    accentBorder: "border-l-indigo-600"
  },
  {
    text: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100/50",
    gradient: "from-purple-500 to-purple-600",
    shadow: "shadow-purple-100",
    hoverBg: "hover:bg-purple-600",
    accentBorder: "border-l-purple-600"
  },
  {
    text: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100/50",
    gradient: "from-pink-500 to-pink-600",
    shadow: "shadow-pink-100",
    hoverBg: "hover:bg-pink-600",
    accentBorder: "border-l-pink-600"
  },
  {
    text: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100/50",
    gradient: "from-rose-500 to-rose-600",
    shadow: "shadow-rose-100",
    hoverBg: "hover:bg-rose-600",
    accentBorder: "border-l-rose-600"
  },
  {
    text: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100/50",
    gradient: "from-sky-500 to-sky-600",
    shadow: "shadow-sky-100",
    hoverBg: "hover:bg-sky-600",
    accentBorder: "border-l-sky-600"
  },
  {
    text: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100/50",
    gradient: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-100",
    hoverBg: "hover:bg-emerald-600",
    accentBorder: "border-l-emerald-600"
  }
];

export default function Services({ config }) {
  const [services, setServices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [srvConfig, setSrvConfig] = useState(config || null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (config) {
      setSrvConfig(config);
      return;
    }
    async function loadConfig() {
      try {
        const docRef = doc(db, "settings", "homepage");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSrvConfig(docSnap.data());
        }
      } catch (e) {
        console.error("Error loading config in Services:", e);
      }
    }
    loadConfig();
  }, [config]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const fetched = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setServices(fetched);
      } catch (err) {
        console.error("Error reading services:", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const activeService = services[activeIndex] || null;
  const activeTheme = SERVICE_THEMES[activeIndex % SERVICE_THEMES.length] || SERVICE_THEMES[0];

  return (
    <section id="services" className="relative py-24 bg-transparent overflow-hidden">
      {/* Dynamic inline styles for smooth scrollbar */}
      <style>{`
        .services-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .services-scrollbar::-webkit-scrollbar-track {
          background: rgba(148, 163, 184, 0.05);
          border-radius: 10px;
        }
        .services-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        .services-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.4);
        }
      `}</style>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-indigo-100/30 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Header */}
        <div className="reveal-item text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/60 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {srvConfig?.servicesSubtitle || "Our Services"}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-slate-900 leading-tight">
            {srvConfig?.servicesTitle ? (
              srvConfig.servicesTitle
            ) : (
              <>Innovative digital solutions, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">built to scale</span>.</>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-pulse">
            {/* Left list skeleton (Desktop only) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
              <div className="h-3 w-28 bg-slate-200 rounded mb-2" />
              <div className="flex flex-col gap-2.5">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-16 bg-slate-100/50 border border-slate-200/30 rounded-2xl flex items-center p-4 gap-3.5">
                    <div className="w-9 h-9 bg-slate-200 rounded-xl shrink-0" />
                    <div className="h-3 bg-slate-200 rounded w-2/3" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Middle image skeleton */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="w-full h-[300px] sm:h-[400px] lg:h-[480px] rounded-[32px] bg-slate-100 border-4 border-white shadow-xl" />
            </div>

            {/* Right details skeleton */}
            <div className="lg:col-span-4 flex flex-col justify-between py-2 gap-8">
              <div className="flex flex-col gap-6">
                <div className="h-5 w-24 bg-slate-200 rounded-full" />
                <div className="space-y-3">
                  <div className="h-7 w-3/4 bg-slate-200 rounded" />
                  <div className="h-3.5 w-full bg-slate-200 rounded" />
                  <div className="h-3.5 w-5/6 bg-slate-200 rounded" />
                </div>
                <div className="space-y-3 pt-4">
                  <div className="h-2.5 w-32 bg-slate-200 rounded mb-4" />
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="flex gap-2.5 items-center">
                      <div className="w-4 h-4 bg-slate-200 rounded-full shrink-0" />
                      <div className="h-2.5 bg-slate-200 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-11 w-48 bg-slate-200 rounded-full mt-6" />
            </div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 text-slate-500 font-medium">
            No services configured in the system.
          </div>
        ) : (
          <div>
            {/* Mobile / Tablet Custom Dropdown Selector */}
            <div className="lg:hidden w-full mb-8 relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border bg-white/80 backdrop-blur-md text-slate-800 border-slate-200/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    const CurrentIcon = serviceIconMap[activeService?.icon] || serviceIconMap.Laptop;
                    return (
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTheme.bg} ${activeTheme.text}`}>
                        <CurrentIcon className="w-4 h-4 shrink-0" />
                      </div>
                    );
                  })()}
                  <span className="text-sm font-bold tracking-wide text-slate-900">{activeService?.name}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-indigo-600" : ""}`} />
              </button>

              {dropdownOpen && (
                <>
                  {/* Backdrop overlay to close when clicking outside */}
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute left-0 right-0 mt-2 p-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 max-h-[300px] overflow-y-auto services-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                    {services.map((srv, idx) => {
                      const Icon = serviceIconMap[srv.icon] || serviceIconMap.Laptop;
                      const isActive = idx === activeIndex;
                      const theme = SERVICE_THEMES[idx % SERVICE_THEMES.length] || SERVICE_THEMES[0];
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => {
                            setActiveIndex(idx);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left flex items-center gap-3.5 p-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-slate-50 text-slate-900 font-bold"
                              : "text-slate-600 hover:bg-slate-50/60 hover:text-slate-900"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                            isActive ? `${theme.bg} ${theme.text}` : "bg-slate-50 text-slate-400"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold tracking-wide">{srv.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* LEFT COLUMN: Service List Selector (Desktop Only) */}
              <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 pl-1">
                  Service Directory ({services.length})
                </span>
                
                {/* Scrollable list optimized for arbitrary growth */}
                <div className="flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-2 services-scrollbar">
                  {services.map((srv, idx) => {
                    const Icon = serviceIconMap[srv.icon] || serviceIconMap.Laptop;
                    const isActive = idx === activeIndex;
                    const theme = SERVICE_THEMES[idx % SERVICE_THEMES.length] || SERVICE_THEMES[0];
                    return (
                      <button
                        key={srv.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-full text-left flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-300 group ${
                          isActive
                            ? `bg-white border-slate-900 shadow-md shadow-slate-100 border-l-4 ${theme.accentBorder} scale-[1.02]`
                            : "bg-white/40 border-slate-200/50 text-slate-500 hover:bg-white hover:border-slate-300 hover:text-slate-900"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                          isActive ? `${theme.bg} ${theme.text}` : "bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[13px] font-extrabold tracking-wide line-clamp-1 transition-colors ${
                          isActive ? "text-slate-900" : "text-slate-600"
                        }`}>
                          {srv.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center relative">
                {/* Glowing backlight matching the active theme */}
                <div className={`absolute -inset-4 bg-gradient-to-tr ${activeTheme.gradient} opacity-15 blur-3xl -z-10 rounded-[32px] transition-all duration-700`} />
                
                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 group">
                  {activeService?.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={activeService.id} // Forces re-render and plays default browser entry animation
                      src={activeService.imageUrl}
                      alt={activeService.name}
                      className="w-full h-full object-cover transition-all duration-700 ease-out transform scale-100 group-hover:scale-105 animate-fade-in"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 gap-2">
                      <Sparkles className="w-8 h-8 opacity-40 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Yunawise Tech</span>
                    </div>
                  )}
                  {/* Subtle decorative linear gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* RIGHT COLUMN: Description & Key Features */}
              <div className="lg:col-span-4 flex flex-col justify-between py-2">
                <div className="flex flex-col gap-6">
                  {/* Badge Category Tag */}
                  <div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${activeTheme.text} ${activeTheme.bg} border ${activeTheme.border} px-3 py-1 rounded-full`}>
                      Capability Profile
                    </span>
                  </div>

                  {/* Service Title & Desc */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit text-slate-900 mb-4 tracking-tight leading-tight">
                      {activeService?.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {activeService?.heroDescription || activeService?.overviewDescription}
                    </p>
                  </div>

                  {/* Bullet features list */}
                  {activeService?.benefits && activeService.benefits.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                        Key Features & benefits
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {activeService.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-700">
                            <CheckCircle2 className={`w-4 h-4 ${activeTheme.text} shrink-0 mt-0.5`} />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Call-to-action details link */}
                <div className="pt-8">
                  <Link
                    href={`/services/${activeService?.slug}`}
                    className={`hover-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wide ${activeTheme.hoverBg} transition-colors shadow-lg shadow-slate-100 hover:${activeTheme.shadow}`}
                  >
                    Explore Service Architecture
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
