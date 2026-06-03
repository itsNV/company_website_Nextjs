"use client";
import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import logo from "@/app/Yunawise_logo.png";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Tech Stack", href: "#technologies" },
    { label: "Works", href: "#works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const serviceLinks = [
    "Headless CMS Development",
    "Custom Web Platforms",
    "Mobile App Engineering",
    "CRM / ERP Solutions",
    "SEO & Growth Marketing",
  ];

  return (
    <footer className="reveal-item bg-slate-900/95 text-white pt-16 pb-8 border-t border-slate-800/80 relative overflow-hidden">
      <div className="absolute -top-20 -right-16 w-[340px] h-[340px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-14 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 relative z-10">
        {/* Brand */}
        <div className="md:col-span-5 flex flex-col items-start gap-5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl font-outfit shadow-md shadow-primary/30">
              <Image src={logo} alt="Yunawise Logo" />
            </div>
            <span className="text-xl font-bold font-outfit tracking-tight">
              Yunawise<span className="text-primary">.</span>
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-300">
            <Sparkles className="w-3 h-3 text-primary" />
            Digital Product Engineering
          </span>

          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            We build high-performance websites, mobile apps, and scalable software systems with modern frameworks, clean architecture, and long-term support.
          </p>

          <a
            href="#contact"
            className="hover-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider"
          >
            Start a Project
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Links 1 */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">Quick Navigation</h4>
          <div className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-white text-sm transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Links 2 */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">Core Services</h4>
          <div className="flex flex-col gap-2.5">
            {serviceLinks.map((service) => (
              <a
                key={service}
                href="#services"
                className="text-slate-400 hover:text-white text-sm transition-colors w-fit"
              >
                {service}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} Yunawise Techsolve LLP. All rights reserved.
        </p>

        {/* Social Handles */}
        <div className="flex items-center gap-5">
          {["LinkedIn", "Instagram", "Facebook", "X / Twitter"].map((social) => (
            <a
              key={social}
              href="#contact"
              className="text-slate-500 hover:text-white text-xs font-semibold transition-colors flex items-center gap-0.5"
            >
              {social}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
