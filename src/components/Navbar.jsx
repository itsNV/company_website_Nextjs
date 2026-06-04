"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "@/app/Yunawise_logo.png";
import { usePathname } from "next/navigation";

export default function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-300"
    >
      <div
        className={`w-full max-w-7xl rounded-full flex items-center justify-between border transition-all duration-300 relative ${
          scrolled
            ? "bg-gray-900 backdrop-blur-xl border-slate-200/35 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
            : "bg-gray-300 backdrop-blur-md border-slate-200/10 px-8 py-4.5"
        }`}
      >
        
        {/* Apple-style Geometric Lettermark Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm font-outfit shadow-sm group-hover:bg-primary transition-colors duration-300 
            ${ scrolled ? "bg-grey-300 text-slate-900" : "bg-slate-900 text-white" }`}>
            <Image src={logo} alt="Yunawise Logo" className={`w-full h-full object-contain ${scrolled ? "duration-115" : " bg-gray-300  duration-300"}`} />
          </div>
          <span className={`text-base font-extrabold font-outfit tracking-tight text-slate-900
            ${ scrolled ? "text-white" : "text-slate-900 "}
            `}>
            Yunawise<span className="text-primary font-black">.</span>
          </span>
        </a>

        {/* Premium Quiet Nav Links with Left-to-Right Draw & Active Highlight */}
        <nav className="hidden xl:flex items-center gap-8">
          {links.map((link, idx) => {
            const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/" && activeSection === link.href.substring(2));
            return (
              <a
                key={idx}
                href={link.href}
                className={`text-[13px] font-semibold tracking-wide transition-colors relative py-1.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:transition-transform after:duration-300 ${
                  isActive
                  ?
                  scrolled
                    ?
                    "text-white after:scale-x-100 after:bg-gradient-to-r after:from-indigo-600 after:via-sky-500 after:to-emerald-400"
                    : "text-black after:scale-x-100 after:bg-gradient-to-r after:from-indigo-600 after:via-sky-500 after:to-emerald-400"
                    : "text-slate-500  after:scale-x-0 hover:after:scale-x-100 after:bg-blue-600"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Ultra-Minimal CTA */}
        <div className="hidden xl:flex items-center gap-4">
          <a
            href="/contact"
            className={`hover-btn px-4.5 py-1.5 rounded-full hover:bg-primary text-[12px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-sm transition-all
              ${ scrolled ? "bg-white text-slate-900 hover:bg-primary/90" : "bg-slate-900 text-white hover:bg-primary" }`}
          >
            Get in Touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 text-slate-800 hover:text-primary xl:hidden transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Nav Dropdown Capsule Card */}
        <div
          className={`absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200/40 p-6 shadow-xl transition-all duration-300 xl:hidden ${
            isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-4 text-center">
            {links.map((link, idx) => {
              const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/" && activeSection === link.href.substring(2));
              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold font-outfit transition-colors py-1 ${
                    isActive ? "text-primary" : "text-slate-800 hover:text-primary"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-primary transition-colors mt-4 shadow-md"
            >
              Start Collaboration
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </header>
  );
}
