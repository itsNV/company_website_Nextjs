"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function BlogContentDisplay({ sections }) {
  if (!sections?.length) return null;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        {sections.map((section, idx) => {
          const isHorizontal = section.imageUrl && (section.imagePosition === 'left' || section.imagePosition === 'right');
          const isReverse = section.imagePosition === 'left';

          const textContent = (
            <div className="w-full flex-grow">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
                  {section.emoji || "💡"}
                </div>
                <div className="flex-1 pt-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1 block">
                    Section {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-outfit text-slate-900 leading-tight">
                    {section.title}
                  </h2>
                </div>
              </div>

              {section.body && (
                <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-8 pl-0 md:pl-[4.5rem]">
                  {section.body}
                </p>
              )}

              {section.bulletPoints?.length > 0 && (
                <ul className="space-y-3 mb-8 pl-0 md:pl-[4.5rem]">
                  {section.bulletPoints.map((point, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-sm hover:border-purple-200/60 hover:shadow-md transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm md:text-base leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );

          const imageContent = section.imageUrl && (
            <div className={`${isHorizontal ? 'w-full lg:w-1/2' : 'w-full'} ${(!section.imagePosition || section.imagePosition === 'bottom') ? 'pl-0 md:pl-[4.5rem]' : ''} flex justify-center shrink-0`}>
              <div className="w-full rounded-3xl overflow-hidden border border-slate-200/60 shadow-lg shadow-purple-50/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
            </div>
          );

          return (
            <article
              key={idx}
              className="reveal-item group relative"
            >
              <div className={`flex ${isHorizontal ? 'flex-col lg:flex-row' : 'flex-col'} ${isReverse ? 'flex-col-reverse' : ''} ${section.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''} gap-8 items-start`}>
                {section.imagePosition === "top" && imageContent}
                {textContent}
                {section.imagePosition !== "top" && imageContent}
              </div>

              {idx < sections.length - 1 && (
                <div className="mt-16 h-px bg-gradient-to-r from-transparent via-purple-200/50 to-transparent" />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
