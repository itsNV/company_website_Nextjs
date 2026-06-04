"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Settings, ShieldAlert, Cpu, Layers, HardDrive, HelpCircle, ChevronDown, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CustomSoftwarePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    "Custom web and software application development",
    "Enterprise software development solutions",
    "Business process automation software",
    "Cloud-based software development",
    "Custom ERP and CRM development",
    "API development and system integration"
  ];

  const features = [
    {
      title: "Tailor-Made Solutions",
      desc: "Software designed from the ground up matching your specific operational requirements and workflows.",
      icon: Settings,
      theme: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      title: "Scalable Architecture",
      desc: "Flexible software configurations that seamlessly grow alongside your expanding enterprise scale.",
      icon: Layers,
      theme: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      title: "End-to-End Development",
      desc: "We manage the entire lifecycle, from design and coding to cloud deployment and long-term support.",
      icon: Cpu,
      theme: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      title: "Secure & Reliable Systems",
      desc: "Industry-grade security practices implemented to protect business-critical datasets and transactions.",
      icon: HardDrive,
      theme: "text-rose-600 bg-rose-50 border-rose-100"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Requirement Analysis",
      desc: "Understand your unique business needs, operational workflows, and objectives."
    },
    {
      step: "02",
      title: "System Design",
      desc: "Define scalable, secure system architecture and design database schemas tailored to your business model."
    },
    {
      step: "03",
      title: "Development",
      desc: "Write clean, optimized code using modern programming languages and frameworks."
    },
    {
      step: "04",
      title: "Testing & QA",
      desc: "Perform multi-level testing to ensure the application is secure, bug-free, and high-performing."
    },
    {
      step: "05",
      title: "Deployment & Launch",
      desc: "Safely deploy the software in a production-ready cloud or local server environment."
    },
    {
      step: "06",
      title: "Support & Maintenance",
      desc: "Provide ongoing feature updates, security patches, system maintenance, and user support."
    }
  ];

  const faqs = [
    {
      q: "What is custom software development?",
      a: "It is the design, creation, and deployment of software applications specifically customized to address unique user or organizational needs."
    },
    {
      q: "How much does custom software development cost?",
      a: "Costs depend heavily on project size, feature complexity, third-party integrations, and testing specifications. We provide a detailed estimate after requirement gathering."
    },
    {
      q: "How long does it take to build custom software?",
      a: "Timeline ranges from a few weeks for small automation scripts to several months for complex enterprise resource planning (ERP) systems."
    }
  ];

  const techStack = ["Python", "AWS (Amazon Web Services)", ".NET Core", "React.js", "Flutter", "Laravel", "Swift", "MongoDB"];

  return (
    <>
      <Navbar activeSection="services" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      <main className="flex-grow pt-28 pb-16 bg-transparent relative z-10">
        
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Custom Software Solutions
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                Custom Software <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500">Development Services</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Build powerful digital solutions designed to solve complex business challenges. We create scalable, secure, and high-performance software tailored to your requirements.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 text-white font-bold hover:bg-slate-900 transition-all duration-300 shadow-lg shadow-purple-100"
                >
                  Consult Our Software Team
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
        <section className="py-16 bg-white/40 border-y border-[#eae6fa]/20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Software Services We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv, idx) => (
                <div key={idx} className="flex gap-3.5 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                  <span className="text-slate-800 font-semibold text-sm">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Scope Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 text-center mb-4">Why Choose Yunawise</h2>
            <p className="text-slate-500 text-center max-w-xl mx-auto mb-16">Enterprise-ready software systems built for high performance and operational clarity.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="group p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg hover:shadow-purple-50 hover:-translate-y-1 transition-all duration-300">
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
        <section className="py-20 bg-slate-50/50 border-t border-slate-200/40">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-4">Our Software Lifecycle</h2>
            <p className="text-slate-500 text-center max-w-xl mx-auto mb-16">A modular architecture lifecycle aligning business workflow definitions with secure, scalable deployments.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, idx) => (
                <div key={idx} className="relative p-8 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-4xl font-black font-outfit text-slate-100 group-hover:text-purple-200 transition-colors block mb-4">{step.step}</span>
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
                      className="w-full flex items-center justify-between p-6 text-left font-bold font-outfit text-slate-900 hover:text-purple-600 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-purple-500 shrink-0" />
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
