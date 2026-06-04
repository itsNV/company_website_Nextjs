"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingBag, TrendingUp, Cpu, CreditCard, HelpCircle, ChevronDown, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function EcommerceDevPage() {
  const [openFaq, setOpenFaq] = useState(null);

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
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const timer = setTimeout(() => {
      const animatableElements = document.querySelectorAll(
        "section, .reveal-item, .reveal-stagger, .split-line-mask"
      );
      animatableElements.forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const services = [
    "Custom E-commerce Store Development",
    "Platform Migration (e.g., to Shopify or WooCommerce)",
    "Payment Gateway & API Integration",
    "UI/UX Design for E-commerce",
    "Multi-Vendor Marketplace Solutions",
    "E-commerce App Development",
    "Ongoing Store Maintenance & Optimization"
  ];

  const features = [
    {
      title: "Experienced Developers",
      desc: "Specialization in building custom e-commerce stores on robust platforms like Shopify and WooCommerce.",
      icon: ShoppingBag,
      theme: "text-rose-600 bg-rose-50 border-rose-100"
    },
    {
      title: "Focus on Conversion",
      desc: "Optimized page layouts and simplified checkout structures designed to reduce cart abandonment.",
      icon: TrendingUp,
      theme: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      title: "Scalable Architecture",
      desc: "Built to handle bulk inventory uploads and high-traffic flash sales events smoothly.",
      icon: Cpu,
      theme: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      title: "Dedicated Support",
      desc: "Post-launch technical maintenance, security monitoring, and continuous storefront optimizations.",
      icon: CreditCard,
      theme: "text-purple-600 bg-purple-50 border-purple-100"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      desc: "Analyze products, target audience, business goals, and choose the ideal platform."
    },
    {
      step: "02",
      title: "Custom Store Design",
      desc: "Create interactive UI/UX designs focused on product accessibility, quick checkout, and branding."
    },
    {
      step: "03",
      title: "Store Development",
      desc: "Build and customize theme layouts, product catalogs, shopping carts, and site features."
    },
    {
      step: "04",
      title: "Integrations & Setup",
      desc: "Connect payment processors, shipping API configurations, ERP inventory systems, and add initial products."
    },
    {
      step: "05",
      title: "Testing & QA",
      desc: "Test checkouts, load speeds, security certificates, and mobile responsiveness."
    },
    {
      step: "06",
      title: "Launch & Optimization",
      desc: "Make the store live and optimize backend settings for search engine crawlability."
    }
  ];

  const faqs = [
    {
      q: "Which e-commerce platform is best for my business?",
      a: "We analyze your operational scale, budget, and customization requirements to recommend platforms (e.g., WooCommerce for content-driven sites, Shopify for scalability)."
    },
    {
      q: "Can you integrate third-party payment gateways?",
      a: "Yes, we integrate major payment processors such as Stripe, PayPal, Razorpay, and direct credit card gateways securely."
    },
    {
      q: "Do you provide migration services?",
      a: "Yes, we can migrate customer accounts, orders, products, and databases from your existing legacy platform to a modern storefront."
    },
    {
      q: "How long does it take to build an e-commerce website?",
      a: "Timeline ranges from 4 to 12 weeks, depending on product catalog size, complexity of features, and integration requirements."
    }
  ];

  const techStack = ["Shopify", "WooCommerce", "Magento", "OpenCart", "PrestaShop", "BigCommerce", "Wix eCommerce"];

  return (
    <>
      <Navbar activeSection="services" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      <main className="flex-grow pt-28 pb-16 bg-transparent relative z-10 reveal-container">
        
        {/* Hero Section */}
        <section className="py-20 reveal-item">
          <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                e-Commerce Development
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                E-commerce Store <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-purple-500">Development Services</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Build scalable, high-converting, and secure online stores with our professional e-commerce development services. Drive sales, engage customers, and grow your retail business.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/contact"
                  className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-rose-600 text-white font-bold transition-all duration-300 shadow-lg shadow-rose-100"
                >
                  Build Your Online Store
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Tech stack container right side */}
            <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-8 shadow-xl">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">Store Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services & Capabilities List */}
        <section id="about" className="py-16 bg-white/40 border-y border-[#eae6fa]/20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Commerce Capabilities</h2>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div key={idx} className="hover-box flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0" />
                  <span className="text-slate-800 font-semibold text-sm">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Scope Section */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="reveal-item text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 text-center mb-4">Why Choose Yunawise</h2>
            <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">High performance and optimized checkouts to elevate conversion numbers and sales volume.</p>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="hover-box group p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${feat.theme}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">{feat.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section id="works" className="py-20 bg-slate-50/50 border-t border-slate-200/40">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-4">Our E-commerce Store Journey</h2>
            <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">We plan, integrate, and launch high-converting storefronts through a step-by-step methodology.</p>
            
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, idx) => (
                <div key={idx} className="hover-box relative p-8 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-4xl font-black font-outfit text-slate-100 group-hover:text-rose-200 transition-colors block mb-4">{step.step}</span>
                    <h3 className="text-lg font-bold font-outfit text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accordion FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left font-bold font-outfit text-slate-900 hover:text-rose-600 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="p-6 pt-0 border-t border-slate-100 text-slate-600 text-sm leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
