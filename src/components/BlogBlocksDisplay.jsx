"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Cpu,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { getBlockLayoutClasses, getImagePixelStyle } from "@/lib/blogBlocks";
import { serviceIconMap } from "@/lib/serviceIcons";
import { BulletListCards } from "@/components/BulletListStyles";

function SeoSchemaInjector({ schema }) {
  useEffect(() => {
    if (!schema?.trim()) return;
    try {
      JSON.parse(schema);
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = "blog-schema-ld";
      el.text = schema;
      const existing = document.getElementById("blog-schema-ld");
      if (existing) existing.remove();
      document.head.appendChild(el);
      return () => el.remove();
    } catch {
      /* invalid JSON — skip */
    }
  }, [schema]);
  return null;
}

function BlockWrapper({ block, children }) {
  const layoutClass = getBlockLayoutClasses(block);
  return <div className={layoutClass}>{children}</div>;
}

export default function BlogBlocksDisplay({ blocks, blogMeta }) {
  const [openFaq, setOpenFaq] = useState(null);

  if (!blocks?.length) return null;

  return (
    <div className="space-y-2">
      {blocks.map((block, idx) => {
        const d = block.data || {};

        switch (block.type) {
          case "header":
            return (
              <section key={block.id || idx} className="py-16 reveal-item">
                <div className="max-w-4xl mx-auto px-6">
                  <BlockWrapper block={block}>
                    <div className="text-center lg:text-left">
                      <span className="inline-block text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-4">
                        {d.category || blogMeta?.category}
                      </span>
                      <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-bold mb-6">
                        <span className="inline-flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          By {d.author || blogMeta?.author}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {blogMeta?.date}
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 leading-tight mb-6">
                        {d.title || blogMeta?.title}
                      </h1>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {d.excerpt || blogMeta?.excerpt}
                      </p>
                    </div>
                  </BlockWrapper>
                </div>
              </section>
            );

          case "coverImage":
            if (!d.imageUrl) return null;
            return (
              <section key={block.id || idx} className="pb-12 reveal-item">
                <div className="max-w-5xl mx-auto px-6">
                  <BlockWrapper block={block}>
                    <div className="rounded-3xl overflow-hidden border border-slate-200/60 shadow-xl shadow-purple-50/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.imageUrl} alt="Cover" style={getImagePixelStyle(d)} className="object-cover" />
                    </div>
                  </BlockWrapper>
                </div>
              </section>
            );

          case "seo":
            return <SeoSchemaInjector key={block.id || idx} schema={d.schema} />;
          case "contentSection": {
            const isHorizontal = d.imageUrl && (d.imagePosition === 'left' || d.imagePosition === 'right');
            const isReverse = d.imagePosition === 'left';
            const textContent = (
              <div className="w-full flex-grow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex items-center justify-center text-2xl shadow-sm">
                    {d.emoji || "💡"}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-outfit text-slate-900 leading-tight pt-2">
                    {d.title}
                  </h2>
                </div>
                {d.body && (
                  <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-8 md:pl-[4.5rem]">
                    {d.body}
                  </p>
                )}
                {d.bulletPoints?.length > 0 && (
                  <div className="mb-8 md:pl-[4.5rem]">
                    <BulletListCards items={d.bulletPoints} style={d.bulletStyle || "check"} />
                  </div>
                )}
              </div>
            );

            const imageContent = d.imageUrl && (
              <div className={`${isHorizontal ? 'w-full lg:w-1/2' : 'w-full'} ${(!d.imagePosition || d.imagePosition === 'bottom') ? 'md:pl-[4.5rem]' : ''} flex justify-center shrink-0`}>
                <div className="w-full rounded-3xl overflow-hidden border border-slate-200/60 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.imageUrl} alt={d.title} style={getImagePixelStyle(d)} className="object-cover w-full" />
                </div>
              </div>
            );

            return (
              <section key={block.id || idx} className="py-10 reveal-item">
                <div className="max-w-4xl mx-auto px-6">
                  <BlockWrapper block={block}>
                    <article className={`flex ${isHorizontal ? 'flex-col lg:flex-row' : 'flex-col'} ${isReverse ? 'flex-col-reverse' : ''} ${d.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''} gap-8 items-start`}>
                      {d.imagePosition === "top" && imageContent}
                      {textContent}
                      {d.imagePosition !== "top" && imageContent}
                    </article>
                  </BlockWrapper>
                </div>
              </section>
            );
          }

          case "text":
            return (
              <section key={block.id || idx} className="py-6 reveal-item">
                <div className="max-w-4xl mx-auto px-6">
                  <BlockWrapper block={block}>
                    <p
                      className={`text-slate-600 leading-relaxed text-base md:text-lg ${
                        d.align === "center" ? "text-center" : d.align === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {d.content}
                    </p>
                  </BlockWrapper>
                </div>
              </section>
            );

          case "image":
            if (!d.imageUrl) return null;
            return (
              <section key={block.id || idx} className="py-8 reveal-item">
                <div className="max-w-4xl mx-auto px-6">
                  <BlockWrapper block={block}>
                    <figure>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.imageUrl} alt={d.caption || ""} style={getImagePixelStyle(d)} className="object-cover rounded-3xl border border-slate-200/60 shadow-lg" />
                      {d.caption && (
                        <figcaption className="text-sm text-slate-400 text-center mt-3">{d.caption}</figcaption>
                      )}
                    </figure>
                  </BlockWrapper>
                </div>
              </section>
            );

          case "bulletList":
            return (
              <section key={block.id || idx} className="py-8 reveal-item">
                <div className="max-w-4xl mx-auto px-6">
                  <BlockWrapper block={block}>
                    {d.title && <h3 className="text-xl font-bold font-outfit text-slate-900 mb-4">{d.title}</h3>}
                    <BulletListCards items={d.items} style={d.listStyle || "check"} />
                  </BlockWrapper>
                </div>
              </section>
            );

          case "table":
            return (
              <section key={block.id || idx} className="py-10 reveal-item">
                <div className="max-w-5xl mx-auto px-6 overflow-x-auto">
                  <BlockWrapper block={block}>
                    {d.title && <h3 className="text-xl font-bold font-outfit text-slate-900 mb-4">{d.title}</h3>}
                    <table className="w-full text-sm border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm bg-white">
                      <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
                        <tr>
                          {(d.headers || []).map((h, i) => (
                            <th key={i} className="px-4 py-3 text-left font-bold text-slate-800 border-b border-slate-200">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(d.rows || []).map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                            {(d.headers || []).map((_, ci) => (
                              <td key={ci} className="px-4 py-3 text-slate-600 border-b border-slate-100">{row[ci]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </BlockWrapper>
                </div>
              </section>
            );

          case "twoColumn":
            return (
              <section key={block.id || idx} className="py-12 bg-white/40 border-y border-[#eae6fa]/25 reveal-item">
                <div className="max-w-5xl mx-auto px-6">
                  <BlockWrapper block={block}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 rounded-3xl border border-slate-200/60 bg-white shadow-sm">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center border border-rose-100 bg-rose-50 text-rose-600 mb-4 font-bold text-sm">
                          01
                        </div>
                        <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">{d.leftTitle}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{d.leftContent}</p>
                      </div>
                      <div className="p-8 rounded-3xl border border-slate-200/60 bg-white shadow-sm">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center border border-purple-100 bg-purple-50 text-purple-600 mb-4 font-bold text-sm">
                          02
                        </div>
                        <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">{d.rightTitle}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{d.rightContent}</p>
                      </div>
                    </div>
                  </BlockWrapper>
                </div>
              </section>
            );

          case "techStack":
            return (
              <section key={block.id || idx} className="md:py-12 reveal-item">
                <div className="max-w-3xl mx-auto px-6 text-center">
                  <BlockWrapper block={block}>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center justify-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-600" /> Technologies Addressed
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {(d.items || []).filter((t) => t.name).map((item, i) => {
                        const Icon = serviceIconMap[item.icon] || serviceIconMap.Cpu;
                        return (
                          <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm">
                            <Icon className="w-4 h-4 text-cyan-600" />
                            {item.name}
                          </span>
                        );
                      })}
                    </div>
                  </BlockWrapper>
                </div>
              </section>
            );

          case "faq":
            return (
              <section key={block.id || idx} className="py-16 reveal-item">
                <div className="max-w-3xl mx-auto px-6">
                  <BlockWrapper block={block}>
                    <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-10">
                      Frequently Asked Questions
                    </h2>
                    <div className="flex flex-col gap-4">
                      {(d.items || []).map((faq, faqIdx) => {
                        const isOpen = openFaq === `${idx}-${faqIdx}`;
                        return (
                          <div
                            key={faqIdx}
                            className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm overflow-hidden"
                          >
                            <button
                              onClick={() => setOpenFaq(isOpen ? null : `${idx}-${faqIdx}`)}
                              className="w-full flex items-center justify-between p-6 text-left font-bold font-outfit text-slate-900 hover:text-purple-600 transition-colors"
                            >
                              <span className="flex items-center gap-3">
                                <HelpCircle className="w-5 h-5 text-purple-500 shrink-0" />
                                {faq.q}
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                            {isOpen && (
                              <div className="p-6 pt-0 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </BlockWrapper>
                </div>
              </section>
            );

          case "callout":
            return (
              <section key={block.id || idx} className="py-6 reveal-item">
                <div className="max-w-4xl mx-auto px-6">
                  <BlockWrapper block={block}>
                    <div
                      className={`p-6 md:p-8 rounded-3xl border ${
                        d.variant === "amber"
                          ? "bg-amber-50/80 border-amber-100"
                          : d.variant === "emerald"
                            ? "bg-emerald-50/80 border-emerald-100"
                            : "bg-purple-50/80 border-purple-100"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{d.emoji || "💡"}</span>
                        <div>
                          {d.title && (
                            <h3 className="text-lg font-bold font-outfit text-slate-900 mb-2">{d.title}</h3>
                          )}
                          <p className="text-slate-600 leading-relaxed">{d.content}</p>
                        </div>
                      </div>
                    </div>
                  </BlockWrapper>
                </div>
              </section>
            );

          case "divider":
            return (
              <div key={block.id || idx} className="py-8 reveal-item">
                <BlockWrapper block={block}>
                  {d.style === "dots" ? (
                    <div className="flex justify-center gap-2">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="w-2 h-2 rounded-full bg-purple-300" />
                      ))}
                    </div>
                  ) : (
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-200/60 to-transparent" />
                  )}
                </BlockWrapper>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
