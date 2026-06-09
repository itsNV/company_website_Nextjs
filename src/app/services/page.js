"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
// import BackgroundParticles from "@/components/BackgroundParticles";
import { Laptop, Smartphone, Settings, ShoppingBag, TrendingUp, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export default function ServicesPage() {
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
        "section, .reveal-item, .reveal-stagger, .split-line-mask"
      );
      animatableElements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const coreServices = [
    {
      title: "Website Development",
      desc: "High-performance headless CMS architectures (Sanity, Strapi) and enterprise WordPress ecosystems built to scale.",
      icon: Laptop,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      link: "/services/website-development",
    },
    {
      title: "Digital Marketing",
      desc: "Your one-stop strategy, revealing organic search (SEO), targeted SEM, and performance campaign methodologies.",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      link: "/services/digital-marketing",
    },
    {
      title: "Custom Software Solutions",
      desc: "Tailored engineering solving enterprise problems. Scalable operations directories, ERP modules, and custom CRM systems.",
      icon: Settings,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      link: "/services/custom-software-development",
    },
    {
      title: "e-Commerce Development",
      desc: "Conversion-centric digital storefronts integrated with Shopify Headless API or customized WooCommerce setups.",
      icon: ShoppingBag,
      color: "text-rose-600 bg-rose-50 border-rose-100",
      link: "/services/e-commerce-development",
    },
    {
      title: "Branding Strategy",
      desc: "Striking design assets and identity rulesets that define your corporate vision and establish customer trust.",
      icon: ShieldCheck,
      color: "text-cyan-600 bg-cyan-50 border-cyan-100",
      link: "/services/branding",
    },
    {
      title: "Mobile App Development",
      desc: "Scalable, native, and cross-platform (Flutter, React Native) mobile applications crafted for optimal touch-screen experiences.",
      icon: Smartphone,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      link: "/services/mobile-app-development",
    },
  ];

  return (
    <>
      <Navbar activeSection="services" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />
      
      <main className="flex-grow reveal-container relative z-[1] pt-28">
        {/* <BackgroundParticles activeSection="services" /> */}
        
        {/* Services Page Hero */}
        <section className="py-20 bg-transparent">
          <div className="reveal-item max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 animate-pulse-soft">
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

        {/* Static Capabalities Grid */}
        <section className="pb-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreServices.map((srv, idx) => {
                const Icon = srv.icon;
                return (
                  <Link
                    key={idx}
                    href={srv.link}
                    className="p-8 hover-btn rounded-3xl border border-slate-100 bg-white/60 backdrop-blur-[6px] hover:bg-white group block"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 transition-transform duration-300 group-hover:scale-110 ${srv.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold font-outfit text-slate-900 group-hover:text-primary transition-colors">{srv.title}</h3>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{srv.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to action section */}
        <section className="py-20 bg-gradient-to-tr from-[#fcfaff]/40 to-[#f4f2ff]/40 backdrop-blur-[6px] relative border-t border-[#eae6fa]/40">
          <div className="reveal-item max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 mb-6">
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
