"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import BackgroundParticles from "@/components/BackgroundParticles";
import { Sparkles, ArrowRight, Megaphone, Paintbrush, Layers } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const animatableElements = document.querySelectorAll(
        "section, .reveal-item, .reveal-stagger, .split-line-mask"
      );
      animatableElements.forEach((el) => el.classList.add("active"));
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar activeSection="about" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />
      
      <main className="flex-grow reveal-container relative z-[1] pt-28">
        {/* <BackgroundParticles activeSection="about" /> */}
        
        {/* Split Hero Block: About Yunawise */}
        <section className="py-20 bg-transparent relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                About Yunawise
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-[1.1] tracking-tight mb-8">
                Yunawise is your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">all-in-one digital partner</span>
              </h1>
              
              <p className="text-lg text-slate-700 leading-relaxed font-normal mb-6">
                We design and build modern websites, eCommerce stores, and mobile-friendly experiences, backed by smart branding, UI/UX design, and top-notch performance.
              </p>
              
              <p className="text-base text-slate-600 leading-relaxed font-normal mb-10">
                From WordPress, Elementor, and WooCommerce solutions to optimization, support, and scalable technology, we handle it all.
              </p>

              {/* Start CTA */}
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 text-white font-bold hover:bg-slate-900 transition-all duration-300 shadow-lg shadow-purple-200"
              >
                Let's Build Together
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right Column: Premium Illustration */}
            <div className="lg:col-span-5 relative w-full aspect-square max-w-[450px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-indigo-50/50 border border-slate-200/60 rounded-[36px] shadow-inner -z-10" />
              <div className="w-full h-full rounded-[36px] overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-sm p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src="/about_illustration.png"
                  alt="About Yunawise Illustration"
                  width={450}
                  height={450}
                  className="w-full h-full object-cover rounded-2xl animate-float"
                  priority
                />
              </div>
            </div>

          </div>


          {/* Stat Counters Grid */}
        <div className="pb-20 pt-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8 border-t border-slate-200/60">
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm text-center">
                <h3 className="text-3xl md:text-4xl font-extrabold font-outfit text-purple-600">4+</h3>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mt-1">Years of Experience</p>
              </div>
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm text-center">
                <h3 className="text-3xl md:text-4xl font-extrabold font-outfit text-indigo-600">50+</h3>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mt-1">People and Projects</p>
              </div>
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm text-center">
                <h3 className="text-3xl md:text-4xl font-extrabold font-outfit text-blue-600">10+</h3>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mt-1">Worldwide Clients</p>
              </div>
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm text-center">
                <h3 className="text-3xl md:text-4xl font-extrabold font-outfit text-teal-600">25+</h3>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mt-1">Technology Used</p>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* Section 2: Digital Experience & Services */}
        <section className="py-20 bg-transparent relative overflow-hidden border-t border-[#eae6fa]/25">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Heading & Intro */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full mb-6">
                Digital Experience
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-outfit text-slate-900 leading-[1.15] tracking-tight mb-6">
                Let your audience <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">connect with your brand story</span>.
              </h2>
              <p className="text-slate-700 leading-relaxed font-normal mb-8">
                As a leading digital agency in India, Yunawise goes beyond traditional design and development, building lasting partnerships with brands and businesses we serve.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-950 text-white font-bold hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-purple-200"
              >
                Contact us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right Column: Stacked Premium Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Card 1: Digital Marketing */}
              <div className="group relative p-6 md:p-8 rounded-[28px] border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-outfit text-slate-900 mb-2">
                      Digital marketing
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Your one-stop solution, revealing strategies that amplify reach, spark engagement, and fuel online growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Designing */}
              <div className="group relative p-6 md:p-8 rounded-[28px] border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-purple-50 border border-purple-100 text-purple-600 shrink-0">
                    <Paintbrush className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-outfit text-slate-900 mb-2">
                      Designing
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Your one-stop solution, revealing striking designs that capture attention and create memorable experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Branding Strategy */}
              <div className="group relative p-6 md:p-8 rounded-[28px] border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-6 right-6 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-extrabold uppercase tracking-wider">
                  New
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-rose-50 border border-rose-100 text-rose-600 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-outfit text-slate-900 mb-2 pr-12">
                      Branding Strategy
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Your one-stop solution, revealing a powerful brand identity that defines your vision and inspires trust.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        

    
        

        {/* Call to action section */}
        <section className="py-20 bg-gradient-to-tr from-[#fcfaff] to-[#f4f2ff] relative border-t border-[#eae6fa]/40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 mb-6">
              Ready to construct your next digital asset?
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
              We constantly push our limits to grow and innovate. Get in touch with our engineering team to draft a custom architectural blueprint.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 text-white font-bold hover:bg-slate-900 transition-all duration-300 shadow-lg shadow-purple-200"
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
