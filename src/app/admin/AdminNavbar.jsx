"use client";
import React from "react";
import Link from "next/link";
import { BookOpen, Laptop, LogOut, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import logo from "@/app/Yunawise_logo.jpg";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { useRouter, usePathname } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const navLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111827]/85 backdrop-blur-xl border-b border-slate-800/80 h-16 w-full flex items-center justify-between px-6 sm:px-10">
      
      {/* Brand logo */}
      <Link href="/admin/dashboard" className="flex items-center gap-3 group">
        <div className="w-8 h-8 flex items-center justify-center shrink-0 p-1 bg-white/5 rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-105">
          <Image src={logo} alt="Yunawise Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex items-baseline gap-0.5 text-white">
          <span className="text-sm font-black tracking-wider uppercase font-outfit">
            Yunawise Console
          </span>
          <span className="text-sm font-black font-outfit text-purple-500">.</span>
        </div>
      </Link>

      {/* Center Nav Links */}
      <nav className="hidden sm:flex items-center gap-6">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors py-1.5 px-3.5 rounded-xl border ${
                isActive
                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/10"
                  : "border-transparent text-slate-400 hover:text-white"
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
       
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>

    </header>
  );
}
