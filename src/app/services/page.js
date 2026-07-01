"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { serviceIconMap } from "@/lib/serviceIcons";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const timer = setTimeout(() => {
      const animatableElements = document.querySelectorAll(
        "section, .reveal-item, .reveal-stagger"
      );
      animatableElements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [services]);

  const colorClasses = [
    "text-blue-600 bg-blue-50 border-blue-100",
    "text-emerald-600 bg-emerald-50 border-emerald-100",
    "text-purple-600 bg-purple-50 border-purple-100",
    "text-rose-600 bg-rose-50 border-rose-100",
    "text-cyan-600 bg-cyan-50 border-cyan-100",
    "text-indigo-600 bg-indigo-50 border-indigo-100"
  ];

  return (
    <>
      <Navbar activeSection="services" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />
      
      <main className="flex-grow reveal-container relative z-[1] pt-16 sm:pt-20 lg:pt-28 font-sans">
        
        {/* Services Page Hero */}
        <section className="py-10 md:py-12 lg:py-16 bg-transparent">
          <div className="reveal-item max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse-soft">
              <Sparkles className="w-3.5 h-3.5" />
              Our Capabilities
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6 max-w-4xl mx-auto">
              Innovative digital solutions, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500">built to scale.</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We leverage composable systems, modern API setups, and stunning designs to deliver rapid, secure, and user-centric software services.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-6 md:pb-12 lg:pb-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Syncing Services...</span>
              </div>
            ) : (
              <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((srv, idx) => {
                  const Icon = serviceIconMap[srv.icon] || serviceIconMap.Laptop;
                  const colorTheme = srv.colorClass || colorClasses[idx % colorClasses.length];
                  return (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      className="p-8 hover-btn rounded-3xl border border-slate-100 bg-white/60 backdrop-blur-[6px] hover:bg-white group block"
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 transition-transform duration-300 group-hover:scale-110 ${colorTheme}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold font-outfit text-slate-900 group-hover:text-blue-600 transition-colors">{srv.name}</h3>
                        <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{srv.heroDescription}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Call to action section */}
        <section className="py-6 md:py-12 lg:py-16 bg-gradient-to-tr from-[#fcfaff]/40 to-[#f4f2ff]/40 backdrop-blur-[6px] relative border-t border-[#eae6fa]/40">
          <div className="reveal-item max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-outfit bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Ready to construct your next digital asset?
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
              We constantly push our limits to grow and innovate. Get in touch with our engineering team to draft a custom architectural blueprint.
            </p>
            <a
              href="/contact"
              className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 text-white font-bold hover:bg-slate-950 transition-all duration-300 shadow-lg shadow-purple-200"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
