"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/app/Yunawise_logo.jpg";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lockoutUntil = localStorage.getItem("lockoutUntil");
      if (lockoutUntil) {
        const remaining = Math.ceil((parseInt(lockoutUntil) - Date.now()) / 1000);
        if (remaining > 0) {
          setLockoutTimeLeft(remaining);
        } else {
          localStorage.removeItem("lockoutUntil");
          localStorage.setItem("failedAttempts", "0");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (lockoutTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setLockoutTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("lockoutUntil");
          localStorage.setItem("failedAttempts", "0");
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutTimeLeft]);

  const login = async (e) => {
    e.preventDefault();
    if (lockoutTimeLeft > 0) {
      setError(`Login is locked. Please wait ${lockoutTimeLeft}s.`);
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.removeItem("failedAttempts");
      localStorage.removeItem("lockoutUntil");
      router.push("/admin/dashboard");
    } catch (err) {
      const currentAttempts = parseInt(localStorage.getItem("failedAttempts") || "0") + 1;
      localStorage.setItem("failedAttempts", currentAttempts.toString());
      
      if (currentAttempts >= 5) {
        const lockoutTime = Date.now() + 5 * 60 * 1000;
        localStorage.setItem("lockoutUntil", lockoutTime.toString());
        setLockoutTimeLeft(300);
        setError("Too many failed attempts. Console access locked for 5 minutes.");
      } else {
        setError(`Invalid credentials. ${5 - currentAttempts} attempts remaining before lockout.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f3f9fc] p-4 font-sans selection:bg-purple-500/30 selection:text-purple-700">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-purple-200/50 via-indigo-100/30 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-blue-200/50 via-sky-100/30 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-white/85 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-xl">
        
        {/* Top Accented Glow Line */}
        <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

        {/* Brand/Logo Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center p-2.5 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
            <Image src={logo} alt="Yunawise Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-black font-outfit text-slate-900 tracking-wide flex items-center gap-0.5">
            Yunawise Admin
            <span className="text-purple-600">.</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">
            Control Console Access
          </p>
        </div>

        {/* Error Alert Display */}
        {error && (
          <div className="flex items-start gap-2.5 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-xs leading-relaxed mb-6 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={login} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                placeholder="admin@yunawise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-slate-300 disabled:to-slate-300 text-white font-bold text-sm transition-all duration-300 shadow-md shadow-purple-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed group"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <a
            href="/"
            className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-purple-600 transition-colors"
          >
            &larr; Back to Main Site
          </a>
        </div>

      </div>
    </div>
  );
}