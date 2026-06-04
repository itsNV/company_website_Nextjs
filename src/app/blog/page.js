"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { Sparkles, Calendar, User, ArrowUpRight } from "lucide-react";

export default function BlogPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const animatableElements = document.querySelectorAll(
        "section, .reveal-item, .reveal-stagger, .split-line-mask"
      );
      animatableElements.forEach((el) => el.classList.add("active"));
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const articles = [
    {
      title: "Custom Ecommerce Website vs Shopify – Which One Is Better in 2026?",
      excerpt: "If you are planning to launch an online store, one of the biggest decisions you will face is choosing between a fully custom ecommerce framework and Shopify. We break down parameters such as server load speeds, transaction fees, checkout API configurations, and operational limits.",
      author: "Nishith Prajapati",
      date: "June 2, 2026",
      category: "Ecommerce",
      bgColor: "bg-purple-50/50 border-purple-100",
    },
    {
      title: "🚀 15 Must-Have Features Required for Ecommerce Website in 2026",
      excerpt: "Discover the critical, next-generation functionalities and checkout integrations your online store needs to thrive in 2026. Explore headless shop integrations, omnichannel inventory management, progressive web app (PWA) frameworks, and AI recommendation engines.",
      author: "Kathan Patel",
      date: "May 14, 2026",
      category: "Ecommerce",
      bgColor: "bg-indigo-50/50 border-indigo-100",
    },
    {
      title: "Best IT Company in Ahmedabad: How to Choose the Right Partner in 2026",
      excerpt: "Selecting the right software development agency is critical for your project's longevity. Here is your comprehensive evaluation framework to rate tech partners in Ahmedabad on transparency, code modularity, agile lifecycle, and containerized deployment pipelines.",
      author: "Kathan Patel",
      date: "May 1, 2026",
      category: "IT Strategy",
      bgColor: "bg-blue-50/50 border-blue-100",
    },
    {
      title: "SEO vs Paid Ads: Which Is Better for Your Business in 2026?",
      excerpt: "Should you invest in long-term organic search engine optimization (SEO) or launch immediate paid advertisement (PPC) campaigns? We weigh the ROI statistics, user acquisition cost (CAC), brand retention metrics, and local Ahmedabad performance indicators.",
      author: "Nishith Prajapati",
      date: "April 20, 2026",
      category: "Digital Marketing",
      bgColor: "bg-teal-50/50 border-teal-100",
    },
  ];

  return (
    <>
      <Navbar activeSection="blog" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />
      
      <main className="flex-grow reveal-container relative z-[1] pt-28">
       
        
        {/* Blog Directory Hero */}
        <section className="py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse-soft">
              <Sparkles className="w-3.5 h-3.5" />
              Insights &amp; Industry Trends
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6 max-w-4xl mx-auto">
              Our latest articles <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">&amp; analysis.</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Stay up to date with modern web standards, software budget guides, and strategic marketing tips from our senior engineering team.
            </p>
          </div>
        </section>

      
        

        {/* Article Index Grid */}
        <section className="py-20 bg-gradient-to-tr from-[#fcfaff] to-[#f4f2ff] border-t border-[#eae6fa]/40">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 mb-12 text-center">
              All Publications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((art, idx) => (
                <div
                  key={idx}
                  className="p-8 hover-btn rounded-3xl border border-slate-200/40 bg-white/80 hover:bg-white hover:shadow-xl hover:shadow-purple-50/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-bold mb-4">
                      <span className="inline-flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {art.author}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {art.date}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-4 hover:text-purple-600 transition-colors">
                      {art.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-purple-600 transition-colors border-t border-slate-100 pt-4 cursor-pointer group">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
