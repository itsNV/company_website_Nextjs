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
    },
    {
      text: "Yunawise did an excellent job developing my website satcuree.com. The design is clean, modern, and professional. I'm very satisfied with their work and support.",
      author: "Ayush Thakkar",
      role: "CEO, Satcure",
      site: "satcuree.com",
    },
    {
      text: "Yunawise created a great website for firecoolind.com. It looks professional, works smoothly, and truly reflects our brand. Very happy with their service and results.",
      author: "Vidit Patel",
      role: "CEO, Fire Cool IND",
      site: "firecoolind.com",
    },
    {
      text: "Yunawise delivered excellent website and brochure designs for us. The designs are creative, professional, and perfectly match our brand. We are very happy with the quality of work and timely support.",
      author: "Himanshu Katudiya",
      role: "CEO, Evehica",
      site: "evehica.com",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-sky-200/20 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-teal-200/10 blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        
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
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="w-full shrink-0 p-8 md:p-14 flex flex-col justify-between min-h-[320px]"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-slate-700 leading-relaxed text-lg md:text-xl italic mb-10 font-medium">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 font-outfit">
                        {rev.author}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {rev.role}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
                      {rev.site}
                    </span>
                  </div>
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
              aria-label="Previous review"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-outfit select-none">
              {currentIndex + 1} / {reviews.length}
            </span>
            <button
              onClick={handleNext}
              suppressHydrationWarning
              className="hover-btn w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Next review"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
