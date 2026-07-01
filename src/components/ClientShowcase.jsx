"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ClientShowcase() {
  const [clients, setClients] = useState([]);

  const defaultClients = [
    { 
      name: "Aakar Publication", 
      domain: "aakarpublication.com",
      glowClass: "group-hover:shadow-amber-500/10 group-hover:border-amber-500/20",
      logo: (
        <svg className="w-9 h-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21c-1.2-1.2-3-2-5-2s-3.8.8-5 2V6c1.2-1.2 3-2 5-2s3.8.8 5 2m0 15c1.2-1.2 3-2 5-2s3.8.8 5 2V6c-1.2-1.2-3-2-5-2s-3.8.8-5 2" stroke="url(#aakarGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      name: "Satcure", 
      domain: "satcuree.com",
      glowClass: "group-hover:shadow-blue-500/10 group-hover:border-blue-500/20",
      logo: (
        <svg className="w-9 h-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#satcureGrad)" fillOpacity="0.15"/>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#satcureGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12h6M12 9v6" stroke="url(#satcureGrad)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      name: "Fire Cool IND", 
      domain: "firecoolind.com",
      glowClass: "group-hover:shadow-orange-500/10 group-hover:border-orange-500/20",
      logo: (
        <svg className="w-9 h-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3.5z" fill="url(#fireCoolGrad)" fillOpacity="0.15"/>
          <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3.5z" stroke="url(#fireCoolGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      name: "Evehica", 
      domain: "evehica.com",
      glowClass: "group-hover:shadow-emerald-500/10 group-hover:border-emerald-500/20",
      logo: (
        <svg className="w-9 h-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="url(#evehicaGrad)" fillOpacity="0.15"/>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="url(#evehicaGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      name: "Zenith Apparel", 
      domain: "zenithapparel.com",
      glowClass: "group-hover:shadow-purple-500/10 group-hover:border-purple-500/20",
      logo: (
        <svg className="w-9 h-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22h20L12 2z" fill="url(#zenithGrad)" fillOpacity="0.15"/>
          <path d="M12 2L2 22h20L12 2z" stroke="url(#zenithGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8l-6 10h12l-6-10z" stroke="url(#zenithGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      name: "Aura Clinix", 
      domain: "auraclinix.com",
      glowClass: "group-hover:shadow-pink-500/10 group-hover:border-pink-500/20",
      logo: (
        <svg className="w-9 h-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="url(#auraGrad)" fillOpacity="0.15"/>
          <circle cx="12" cy="12" r="10" stroke="url(#auraGrad)" strokeWidth="2" />
          <path d="M8 12h8M12 8v8" stroke="url(#auraGrad)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
  ];

  useEffect(() => {
    async function loadClients() {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const list = querySnapshot.docs.map((doc, idx) => {
          const data = doc.data();
          const glows = [
            "group-hover:shadow-amber-500/10 group-hover:border-amber-500/20",
            "group-hover:shadow-blue-500/10 group-hover:border-blue-500/20",
            "group-hover:shadow-orange-500/10 group-hover:border-orange-500/20",
            "group-hover:shadow-emerald-500/10 group-hover:border-emerald-500/20",
            "group-hover:shadow-purple-500/10 group-hover:border-purple-500/20",
            "group-hover:shadow-pink-500/10 group-hover:border-pink-500/20",
          ];
          return {
            ...data,
            glowClass: glows[idx % glows.length],
          };
        });
        if (list.length > 0) {
          setClients(list);
        } else {
          setClients(defaultClients);
        }
      } catch (e) {
        console.error("Error fetching clients in ClientShowcase:", e);
        setClients(defaultClients);
      }
    }
    loadClients();
  }, []);

  // Only scroll marquee if we have partners
  const isScrollable = clients.length >= 3;
  const marqueeClients = isScrollable ? [...clients, ...clients, ...clients] : clients;

  return (
    <section className="py-10 md:py-12 lg:py-16 bg-transparent overflow-hidden select-none relative z-10">
      {/* Global SVG Gradients Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="aakarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="satcureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="fireCoolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="evehicaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="zenithGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="auraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center reveal-item">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-violet-500 border border-slate-200/40 text-[11px] font-extrabold uppercase tracking-widest">
          Valued Integrations
        </span>
        <h2 className="text-2xl md:text-3xl font-black font-outfit text-slate-800 mt-4 leading-tight">
          Powering digital assets for <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">growing brands</span>.
        </h2>
      </div>

      {/* Infinite Scrolling Marquee Wrapper */}
      <div className="relative w-full flex items-center justify-center pointer-events-auto">
        {isScrollable && (
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.33%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}} />
        )}
        
        {/* Soft Vignette Overlay Mask Left & Right */}
        {isScrollable && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#f3f9fc] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#f3f9fc] to-transparent z-20 pointer-events-none" />
          </>
        )}

        <div className={`flex w-max gap-6 py-6 ${isScrollable ? "animate-marquee" : "justify-center mx-auto w-full"}`}>
          {marqueeClients.map((client, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4.5 pl-4.5 pr-6 py-4.5 rounded-2xl border border-slate-200/50 bg-white/40 backdrop-blur-sm shadow-sm transition-all duration-300 group hover:bg-white hover:-translate-y-1 select-none ${client.glowClass || "group-hover:shadow-indigo-500/10 group-hover:border-indigo-500/20"}`}
            >
              {/* Brand Logo Container */}
              <div className="flex items-center justify-center h-13 w-13 rounded-xl bg-slate-50 border border-slate-100 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300 p-2 overflow-hidden shrink-0">
                {client.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={client.imageUrl} alt={client.name} className="h-full w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  client.logo
                )}
              </div>
              
              {/* Brand Information */}
              <div className="flex flex-col text-left justify-center min-w-[120px]">
                <span className="text-slate-800 font-extrabold font-outfit tracking-wide text-sm transition-colors duration-300 group-hover:text-primary leading-tight">
                  {client.name}
                </span>
                <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-0.5 leading-none">
                  {client.domain}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
