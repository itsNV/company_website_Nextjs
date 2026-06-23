"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, LogOut, LayoutDashboard, Laptop, Cpu, Globe, Settings, Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../app/icon.png";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { useRouter, usePathname } from "next/navigation";

import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const docRef = doc(db, "settings", "homepage");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setConfig(docSnap.data());
        }
      } catch (e) {
        console.error("Error loading config in AdminNavbar:", e);
      }
    }
    loadConfig();
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If target was removed/detached from DOM during rendering (like changing icons), ignore it
      if (!document.body.contains(event.target)) {
        return;
      }
      if (!event.target.closest("header")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const navLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, color: "text-slate-600 hover:text-slate-900" },
    { label: "Blogs", href: "/admin/blogs", icon: BookOpen, color: "text-purple-600 hover:text-purple-700" },
    { label: "Services", href: "/admin/services", icon: Laptop, color: "text-blue-600 hover:text-blue-700" },
    { label: "Solutions", href: "/admin/solutions", icon: Cpu, color: "text-emerald-600 hover:text-emerald-700" },
    { label: "Settings", href: "/admin/settings", icon: Settings, color: "text-slate-600 hover:text-slate-900" },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-300">
      <div
        className={`w-full max-w-7xl rounded-full flex items-center justify-between border bg-white/70 backdrop-blur-xl border-slate-200/30 shadow-sm transition-all duration-300 relative ${
          scrolled
            ? "px-6 py-3"
            : "px-8 py-4"
        }`}
      >
        {/* Brand logo */}
        <Link href="/admin/dashboard" className="flex items-center gap-3.5 group">
          <div className="h-10 w-auto flex items-center justify-start shrink-0">
            {config?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={config.logoUrl} 
                alt="Yunawise Logo" 
                className="h-full w-auto object-contain transition-all duration-300 mix-blend-multiply" 
              />
            ) : (
              <Image 
                src={logo} 
                alt="Yunawise Logo" 
                className="h-full w-auto object-contain transition-all duration-300 mix-blend-multiply" 
              />
            )}
          </div>
          <div className="flex flex-col justify-center select-none font-outfit">
            <span className="text-[15px] font-black tracking-wider leading-[1.1] transition-all duration-300 text-[#2e5090]">
              {config?.companyName || "YUNAWISE"}
            </span>
            <span className="text-[8.5px] font-black tracking-[0.18em] leading-none mt-0.5 transition-all duration-300 text-[#2e5090]/90">
              {config?.companySubName || "TECHSOLVE LLP"}
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-1.5 text-xs font-outfit font-extrabold uppercase tracking-wider transition-all py-1.5 px-3 rounded-full border ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link 
            href="/" 
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-outfit font-extrabold uppercase tracking-wider transition-colors text-slate-500 hover:text-slate-900"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-full transition-colors text-xs font-outfit font-bold uppercase tracking-wider cursor-pointer shadow-sm bg-slate-950 hover:bg-slate-800 text-white"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Sign Out</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              setIsOpen(!isOpen);
            }}
            className="p-2 -mr-2 lg:hidden transition-colors cursor-pointer z-50 relative text-slate-700 hover:text-slate-900"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown Capsule Card */}
        <div
          className={`absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200/40 p-6 shadow-xl transition-all duration-300 lg:hidden z-50 ${
            isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors py-2.5 px-4 rounded-xl border ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-md"
                      : "border-slate-100 text-slate-600 hover:text-slate-900 bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="h-px bg-slate-200/60 my-2" />
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 py-2 border border-slate-100 rounded-xl bg-slate-50"
            >
              <Globe className="w-4 h-4" />
              <span>View Site</span>
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
