"use client";
import React, { useState } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      text: "Yunawise did an excellent job developing our website aakarpublication.com. The design is clean, professional, and truly represents our brand. We are very satisfied with their work and support.",
      author: "Suresh Prajapati",
      role: "CEO, Aakar Publication",
      site: "aakarpublication.com",
      bgColor: "bg-purple-50/60 hover:bg-purple-50/80 border-purple-100/80 hover:border-purple-200/90",
      textColor: "text-purple-950",
      badgeColor: "text-purple-700 bg-purple-100/60"
    },
    {
      text: "Yunawise did an excellent job developing my website satcuree.com. The design is clean, modern, and professional. I'm very satisfied with their work and support.",
      author: "Ayush Thakkar",
      role: "CEO, Satcure",
      site: "satcuree.com",
      bgColor: "bg-blue-50/60 hover:bg-blue-50/80 border-blue-100/80 hover:border-blue-200/90",
      textColor: "text-blue-950",
      badgeColor: "text-blue-700 bg-blue-100/60"
    },
    {
      text: "Yunawise created a great website for firecoolind.com. It looks professional, works smoothly, and truly reflects our brand. Very happy with their service and results.",
      author: "Vidit Patel",
      role: "CEO, Fire Cool IND",
      site: "firecoolind.com",
      bgColor: "bg-indigo-50/60 hover:bg-indigo-50/80 border-indigo-100/80 hover:border-indigo-200/90",
      textColor: "text-indigo-950",
      badgeColor: "text-indigo-700 bg-indigo-100/60"
    },
    {
      text: "Yunawise delivered excellent website and brochure designs for us. The designs are creative, professional, and perfectly match our brand. We are very happy with the quality of work and timely support.",
      author: "Himanshu Katudiya",
      role: "CEO, Evehica",
      site: "evehica.com",
      bgColor: "bg-rose-50/60 hover:bg-rose-50/80 border-rose-100/80 hover:border-rose-200/90",
      textColor: "text-rose-950",
      badgeColor: "text-rose-700 bg-rose-100/60"
    },
    {
      text: "The team at Yunawise built a premium custom e-commerce solution that doubled our sales conversion rates. Their attention to detail, page load speeds, and clean code are exceptional.",
      author: "Rajesh Shah",
      role: "Founder, Zenith Apparel",
      site: "zenithapparel.com",
      bgColor: "bg-teal-50/60 hover:bg-teal-50/80 border-teal-100/80 hover:border-teal-200/90",
      textColor: "text-teal-950",
      badgeColor: "text-teal-700 bg-teal-100/60"
    },
    {
      text: "Their digital marketing campaigns and SEO optimizations have placed us on the first page of Google. We saw a 150% increase in qualified organic leads within three months.",
      author: "Sneha Patel",
      role: "Marketing Director, Aura Clinix",
      site: "auraclinix.com",
      bgColor: "bg-emerald-50/60 hover:bg-emerald-50/80 border-emerald-100/80 hover:border-emerald-200/90",
      textColor: "text-emerald-950",
      badgeColor: "text-emerald-700 bg-emerald-100/60"
    }
  ];

  // Chunk reviews into groups of 3 for each slide
  const slides = [];
  for (let i = 0; i < reviews.length; i += 3) {
    slides.push(reviews.slice(i, i + 3));
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-sky-200/20 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-teal-200/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="reveal-item text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            Client Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit text-slate-900 mt-4 mb-6">
            People are talking about us.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Read verified recommendations from founders and executives who partnered with Yunawise Techsolve LLP.
          </p>
        </div>

        {/* Sliding Window Container */}
        <div className="reveal-item relative p-1 md:p-4">
          <Quote className="absolute -top-8 -left-8 w-24 h-24 text-primary/10 pointer-events-none" />

          {/* Slider Window */}
          <div className="hover-box overflow-hidden rounded-[32px] border border-slate-200/50 bg-white/40 backdrop-blur-sm shadow-xl shadow-slate-100/50">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slideReviews, slideIdx) => (
                <div
                  key={slideIdx}
                  className="w-full shrink-0 p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[320px]"
                >
                  {slideReviews.map((rev, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 shadow-sm backdrop-blur-sm ${rev.bgColor}`}
                    >
                      <div>
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        <p className={`leading-relaxed text-sm md:text-base italic mb-6 font-medium ${rev.textColor}`}>
                          "{rev.text}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-200/40 flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <h4 className="text-xs md:text-sm font-extrabold text-slate-900 font-outfit">
                            {rev.author}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {rev.role}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${rev.badgeColor}`}>
                          {rev.site}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              suppressHydrationWarning
              className="hover-btn w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Previous review page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-outfit select-none">
              {currentIndex + 1} / {slides.length}
            </span>
            <button
              onClick={handleNext}
              suppressHydrationWarning
              className="hover-btn w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Next review page"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
