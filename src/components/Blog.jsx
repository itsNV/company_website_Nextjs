"use client";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, User, Calendar, Tag, ArrowUpRight } from "lucide-react";

export default function Blog() {
  const [activeIndex, setActiveIndex] = useState(0);

  const posts = [
    {
      title: "Custom Ecommerce Website vs Shopify – Which One Is Better in 2026?",
      excerpt: "If you are planning to launch an online store, one of the biggest decisions you will face is choosing between a fully custom ecommerce framework and Shopify...",
      author: "Nishith Prajapati",
      date: "4 days ago",
      category: "Ecommerce",
      bgColor: "bg-indigo-50/70 border-indigo-100",
    },
    {
      title: "🚀 15 Must-Have Features Required for Ecommerce Website in 2026",
      excerpt: "Discover the critical, next-generation functionalities and checkout integrations your online store needs to thrive in 2026's competitive environment...",
      author: "Kathan Patel",
      date: "3 weeks ago",
      category: "Ecommerce",
      bgColor: "bg-rose-50/70 border-rose-100",
    },
    {
      title: "Best IT Company in Ahmedabad: How to Choose the Right Partner in 2026",
      excerpt: "Selecting the right software agency is critical for your success. Here is your comprehensive framework to evaluate tech partners in Ahmedabad...",
      author: "Kathan Patel",
      date: "1 month ago",
      category: "IT Strategy",
      bgColor: "bg-emerald-50/70 border-emerald-100",
    },
    {
      title: "SEO vs Paid Ads: Which Is Better for Your Business in 2026?",
      excerpt: "Should you invest in long-term organic search optimization or launch high-velocity paid advertisement campaigns? We weigh the ROI statistics...",
      author: "Nishith Prajapati",
      date: "1 month ago",
      category: "Marketing",
      bgColor: "bg-sky-50/70 border-sky-100",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="blog" className="py-24 bg-transparent border-y border-[#eae6fa]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="reveal-item text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full">
            Insights &amp; News
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit text-slate-900 mt-4 mb-6">
            Read our <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">latest articles</span>.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stay up to date with modern web standards, application cost guides, and strategic marketing tips from our senior engineering team.
          </p>
        </div>

        {/* Center-Focused Slider Window */}
        <div className="reveal-item relative max-w-2xl mx-auto p-1">
          <div className="hover-box overflow-hidden rounded-[32px] border border-slate-200/50 bg-white/40 backdrop-blur-sm shadow-xl shadow-slate-100/50">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {posts.map((post, idx) => (
                <div
                  key={idx}
                  className="w-full shrink-0 p-8 md:p-12 flex flex-col justify-between min-h-[360px]"
                >
                  <div>
                    {/* Meta bar */}
                    <div className="flex items-center flex-wrap gap-4 text-xs text-slate-400 font-bold mb-6">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full uppercase text-[9px] tracking-wider ml-auto">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold font-outfit text-slate-900 mb-4 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed text-sm">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-purple-600 transition-colors border-t border-slate-100 pt-6 mt-10 cursor-pointer group">
                    <span>Read Full Article</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              suppressHydrationWarning
              className="hover-btn w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-primary hover:text-blue-500 hover:border-primary flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Previous post"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-outfit select-none">
              {activeIndex + 1} / {posts.length}
            </span>
            <button
              onClick={handleNext}
              suppressHydrationWarning
              className="hover-btn w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-primary hover:text-blue-500 hover:border-primary flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Next post"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
