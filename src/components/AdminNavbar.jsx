"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, LogOut, LayoutDashboard, Laptop, Cpu, Globe, Settings } from "lucide-react";
import Image from "next/image";
import logo from "@/app/Yunawise_logo.png";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { useRouter, usePathname } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
        className={`w-full max-w-7xl rounded-full flex items-center justify-between border transition-all duration-300 relative ${
          scrolled
            ? "bg-slate-900/90 backdrop-blur-xl border-slate-700/30 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            : "bg-white/70 backdrop-blur-xl border-slate-200/30 px-8 py-4 shadow-sm"
        }`}
      >
        {/* Brand logo */}
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex items-center justify-center shrink-0 p-1 bg-white rounded-xl border border-slate-100 transition-transform duration-300 group-hover:scale-105">
            <Image src={logo} alt="Yunawise Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col text-left leading-[1.1]">
            <span className={`text-[13px] font-black tracking-wider uppercase font-outfit transition-colors ${scrolled ? "text-white" : "text-slate-900"}`}>
              Yunawise
            </span>
            <span className={`text-[8px] font-extrabold tracking-[0.22em] uppercase font-outfit transition-colors ${scrolled ? "text-slate-400" : "text-slate-500"}`}>
              Console
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider transition-all py-1.5 px-3 rounded-full border ${
                  isActive
                    ? scrolled
                      ? "bg-white text-slate-900 border-white shadow-md"
                      : "bg-slate-900 text-white border-slate-900 shadow-md"
                    : scrolled
                      ? "border-transparent text-slate-400 hover:text-white"
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
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors ${
              scrolled ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm ${
              scrolled
                ? "bg-white hover:bg-slate-100 text-slate-900"
                : "bg-slate-950 hover:bg-slate-800 text-white"
            }`}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

      </div>
    </header>
  );
}
