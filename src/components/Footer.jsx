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

  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/yunawise-techsolve-llp",
      hoverClass: "hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      label: "Instagram",
      href: "#",
      hoverClass: "hover:border-[#E1306C] hover:bg-[#E1306C]/10 hover:text-[#E1306C]",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    {
      label: "Facebook",
      href: "#",
      hoverClass: "hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:text-[#1877F2]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      )
    },
    {
      label: "Twitter",
      href: "#",
      hoverClass: "hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="reveal-item bg-slate-900/95 text-white pt-16 pb-8 border-t border-slate-800/80 relative overflow-hidden">
      <div className="absolute -top-20 -right-16 w-[340px] h-[340px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-14 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 relative z-10">
        {/* Brand */}
        <div className="md:col-span-5 flex flex-col items-start gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Image src={logo} alt="Yunawise Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left leading-[1.1]">
              <span className="text-[15px] font-black tracking-wider uppercase font-outfit text-white">
                Yunawise
              </span>
              <span className="text-[8px] font-extrabold tracking-[0.22em] uppercase font-outfit text-slate-400">
                Techsolve LLP
              </span>
            </div>
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
        <div className="flex items-center gap-3.5">
          {socials.map(({ label, href, icon, hoverClass }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:scale-110 flex items-center justify-center transition-all duration-300 ${hoverClass}`}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
