"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Smartphone, Cpu, Layers, ShieldCheck, CheckCircle, HelpCircle, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

export default function MobileAppDevPage() {
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
    "Custom iOS & Android App Development",
    "Cross-Platform Mobile Applications (Flutter, React Native)",
    "UI/UX Design for Mobile Apps",
    "Mobile App Consultation & Strategy",
    "API Integration & Backend Services",
    "App Maintenance & Support"
  ];

  const features = [
    {
      title: "Native Development",
      desc: "Custom Native iOS & Android App Development using Swift, Kotlin, Java, and Objective-C.",
      icon: Cpu,
      theme: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      title: "Cross-Platform Solutions",
      desc: "Hybrid/Cross-platform mobile applications using Flutter and React Native.",
      icon: Smartphone,
      theme: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      title: "Custom UI/UX",
      desc: "Tailored UI/UX design matching brand guidelines.",
      icon: Layers,
      theme: "text-pink-600 bg-pink-50 border-pink-100"
    },
    {
      title: "Secure Backends",
      desc: "Secure, high-performing backend integration and custom APIs.",
      icon: ShieldCheck,
      theme: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      title: "Enterprise Apps",
      desc: "Enterprise mobile solutions to streamline internal business workflows.",
      icon: Cpu,
      theme: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      title: "Maintenance & Support",
      desc: "Professional post-launch maintenance, monitoring, and updates.",
      icon: ShieldCheck,
      theme: "text-rose-600 bg-rose-50 border-rose-100"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      desc: "Analyze the initial app idea, target audience, and business goals to outline a roadmap."
    },
    {
      step: "02",
      title: "UI/UX Design",
      desc: "Create wireframes and interactive prototypes to define the visual layout and user journey."
    },
    {
      step: "03",
      title: "Development",
      desc: "Write clean, modular code following coding standards and architecture guidelines."
    },
    {
      step: "04",
      title: "Testing & QA",
      desc: "Conduct performance, security, compatibility, and user acceptance testing."
    },
    {
      step: "05",
      title: "Deployment & Launch",
      desc: "Manage submissions, reviews, and release processes for the Google Play Store and Apple App Store."
    },
    {
      step: "06",
      title: "Post-Launch Support",
      desc: "Monitor crash logs, provide system updates, and release feature enhancements."
    }
  ];

  const faqs = [
    {
      q: "What technologies do you use for app development?",
      a: "We specialize in native development using Swift and Kotlin, and cross-platform development using Flutter and React Native."
    },
    {
      q: "How long does it take to develop a mobile app?",
      a: "Timelines vary based on complexity, feature set, design requirements, and integrations. A typical project takes between 8 to 24 weeks."
    },
    {
      q: "Do you publish apps to the App Store and Google Play Store?",
      a: "Yes, we handle the entire application submission process, addressing review guidelines for successful store deployment."
    }
  ];

  const techStack = ["Flutter", "React Native", "Kotlin", "Swift", "Android Studio", "Xamarin", "Ionic", "Node.js"];

  return (
    <>
      <Navbar activeSection="services" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      <main className="flex-grow pt-28 pb-16 bg-transparent relative z-10 reveal-container">
        
        {/* Hero Section */}
        <section className="py-20 reveal-item">
          <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Mobile App Development
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                Custom Mobile App <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Development Services</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Scalable, high-performance, and secure mobile applications tailored to your business needs. Clearly scoped services, end-to-end design, and deployment.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/contact"
                  className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 text-white font-bold transition-all duration-300 shadow-lg shadow-indigo-100"
                >
                  Start Your App Project
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Tech stack container right side */}
            <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-8 shadow-xl">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">Technology stack</h3>
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
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Services We Offer</h2>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div key={idx} className="hover-box flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span className="text-slate-800 font-semibold text-sm">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Scope Section */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="reveal-item text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 text-center mb-4">Key Scope & Features</h2>
            <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">Features engineered uniquely for your application ecosystem to provide top-notch touch responsiveness and performance.</p>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-4">Our Development Journey</h2>
            <p className="reveal-item text-slate-500 text-center max-w-xl mx-auto mb-16">A systematic development process that turns your application concept into a successful app-store product.</p>
            
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, idx) => (
                <div key={idx} className="hover-box relative p-8 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-4xl font-black font-outfit text-slate-100 group-hover:text-indigo-200 transition-colors block mb-4">{step.step}</span>
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
                      className="w-full flex items-center justify-between p-6 text-left font-bold font-outfit text-slate-900 hover:text-indigo-600 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0" />
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
