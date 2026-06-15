"use client";

import React from "react";
import {
  FileText,
  ImageIcon,
  Layout,
  AlignLeft,
  Image,
  List,
  Columns2,
  Cpu,
  HelpCircle,
  Quote,
  Minus,
  User,
  Calendar,
  Sparkles,
  Search,
  Table,
} from "lucide-react";
import { getBlockLayoutClasses, getImagePixelStyle } from "@/lib/blogBlocks";
import { serviceIconMap } from "@/lib/serviceIcons";
import { BulletListItems } from "@/components/BulletListStyles";

const PALETTE_ICONS = {
  FileText,
  ImageIcon,
  Layout,
  AlignLeft,
  Image,
  List,
  Columns2,
  Cpu,
  HelpCircle,
  Quote,
  Minus,
  Search,
  Table,
};

export function BlogBlockPreview({ block }) {
  const layoutClass = getBlockLayoutClasses(block);
  const d = block.data || {};

  const wrapper = (children) => (
    <div className={`${layoutClass} transition-all duration-300`}>{children}</div>
  );

  switch (block.type) {
    case "header":
      return wrapper(
        <div className="text-center lg:text-left py-4">
          <div className="mb-3 flex items-center justify-center lg:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
              {d.category || "Category"}
            </span>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-3 text-[10px] text-slate-400 font-bold mb-3">
            <span className="inline-flex items-center gap-1">
              <User className="w-3 h-3" /> {d.author || "Author"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Today
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black font-outfit text-slate-900 leading-tight mb-3">
            {d.title || "Blog Title"}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {d.excerpt || "Short excerpt appears here..."}
          </p>
        </div>
      );

    case "coverImage":
      return wrapper(
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
          {d.imagePreview || d.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={d.imagePreview || d.imageUrl} alt="Cover" style={getImagePixelStyle(d)} className="object-cover rounded-2xl" />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 py-16">
              <ImageIcon className="w-8 h-8 mb-1" />
              <span className="text-xs font-bold">Cover Image</span>
            </div>
          )}
        </div>
      );

    case "seo":
      return wrapper(
        <div className="p-4 rounded-2xl border border-teal-100 bg-teal-50/50 space-y-2 text-xs">
          <p className="font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1"><Search className="w-3.5 h-3.5" /> SEO Settings</p>
          <p><span className="font-bold text-slate-600">Meta Title:</span> {d.metaTitle || "—"}</p>
          <p><span className="font-bold text-slate-600">Keyphrase:</span> {d.focusKeyphrase || "—"}</p>
          <p className="line-clamp-2"><span className="font-bold text-slate-600">Description:</span> {d.metaDescription || "—"}</p>
          {d.schema && <p className="text-teal-600 font-mono text-[10px] truncate">Schema JSON-LD configured</p>}
        </div>
      );

    case "contentSection":
      return wrapper(
        <div className="py-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-xl">
              {d.emoji || "💡"}
            </div>
            <h2 className="text-xl font-extrabold font-outfit text-slate-900 pt-2">
              {d.title || "Section Title"}
            </h2>
          </div>
          {d.body && <p className="text-sm text-slate-600 mb-4 pl-14">{d.body}</p>}
          {(d.bulletPoints || []).filter(Boolean).length > 0 && (
            <div className="mb-4 pl-14">
              <BulletListItems items={d.bulletPoints} style={d.bulletStyle || "check"} />
            </div>
          )}
          {(d.imagePreview || d.imageUrl) && (
            <div className="pl-14 rounded-xl overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.imagePreview || d.imageUrl} alt="" style={getImagePixelStyle(d)} className="object-cover" />
            </div>
          )}
        </div>
      );

    case "text":
      return wrapper(
        <p
          className={`text-sm text-slate-600 leading-relaxed py-2 ${
            d.align === "center" ? "text-center" : d.align === "right" ? "text-right" : "text-left"
          }`}
        >
          {d.content || "Enter your paragraph text..."}
        </p>
      );

    case "image":
      return wrapper(
        <figure className={`py-2 ${d.align === "left" ? "mr-auto" : d.align === "right" ? "ml-auto" : "mx-auto"}`}>
          {d.imagePreview || d.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={d.imagePreview || d.imageUrl} alt={d.caption || ""} style={getImagePixelStyle(d)} className="object-cover rounded-2xl border border-slate-200" />
          ) : (
            <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-16">
              <Image className="w-8 h-8 text-slate-300" />
            </div>
          )}
          {d.caption && (
            <figcaption className="text-xs text-slate-400 text-center mt-2">{d.caption}</figcaption>
          )}
        </figure>
      );

    case "bulletList":
      return wrapper(
        <div className="py-3">
          {d.title && <h3 className="font-bold text-slate-900 mb-3 text-sm">{d.title}</h3>}
          <BulletListItems items={d.items} style={d.listStyle || "check"} />
          {!(d.items || []).filter(Boolean).length && (
            <p className="text-xs text-slate-400 italic">Add bullet points...</p>
          )}
        </div>
      );

    case "table":
      return wrapper(
        <div className="py-3 overflow-x-auto">
          {d.title && <h3 className="font-bold text-slate-900 mb-2 text-sm">{d.title}</h3>}
          <table className="w-full text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                {(d.headers || []).map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left font-bold text-slate-700 border-b border-slate-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(d.rows || []).map((row, ri) => (
                <tr key={ri} className="border-b border-slate-100">
                  {(d.headers || []).map((_, ci) => (
                    <td key={ci} className="px-3 py-2 text-slate-600">{row[ci] || "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "twoColumn":
      return wrapper(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
          <div className="p-4 rounded-2xl border border-rose-100 bg-rose-50/50">
            <h3 className="text-sm font-bold text-slate-900 mb-2">{d.leftTitle || "Left"}</h3>
            <p className="text-xs text-slate-600">{d.leftContent || "Left column content..."}</p>
          </div>
          <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/50">
            <h3 className="text-sm font-bold text-slate-900 mb-2">{d.rightTitle || "Right"}</h3>
            <p className="text-xs text-slate-600">{d.rightContent || "Right column content..."}</p>
          </div>
        </div>
      );

    case "techStack":
      return wrapper(
        <div className="py-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> Technologies
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {(d.items || []).filter((i) => i.name).length > 0 ? (
              d.items.filter((i) => i.name).map((item, idx) => {
                const Icon = serviceIconMap[item.icon] || serviceIconMap.Cpu;
                return (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-600">
                    <Icon className="w-3.5 h-3.5 text-cyan-600" />
                    {item.name}
                  </span>
                );
              })
            ) : (
              <span className="text-xs text-slate-400 italic">Add technologies with icons...</span>
            )}
          </div>
        </div>
      );

    case "faq":
      return wrapper(
        <div className="py-3 space-y-2">
          <h3 className="text-sm font-bold text-slate-900 text-center mb-3">FAQ</h3>
          {(d.items || []).filter((f) => f.q).map((faq, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 bg-white text-xs">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-purple-500" /> {faq.q}
              </p>
              {faq.a && <p className="text-slate-500 mt-1 pl-5">{faq.a}</p>}
            </div>
          ))}
          {!(d.items || []).some((f) => f.q) && (
            <p className="text-xs text-slate-400 italic text-center">Add FAQ items...</p>
          )}
        </div>
      );

    case "callout":
      return wrapper(
        <div
          className={`p-5 rounded-2xl border my-2 ${
            d.variant === "amber"
              ? "bg-amber-50 border-amber-100"
              : d.variant === "emerald"
                ? "bg-emerald-50 border-emerald-100"
                : "bg-purple-50 border-purple-100"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{d.emoji || "💡"}</span>
            <div>
              {d.title && <h3 className="font-bold text-slate-900 text-sm mb-1">{d.title}</h3>}
              <p className="text-xs text-slate-600">{d.content || "Callout message..."}</p>
            </div>
          </div>
        </div>
      );

    case "divider":
      return wrapper(
        <div className="py-6">
          {d.style === "dots" ? (
            <div className="flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-purple-300" />
              ))}
            </div>
          ) : (
            <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
          )}
        </div>
      );

    default:
      return wrapper(
        <div className="p-4 text-xs text-slate-400 border border-dashed rounded-xl">Unknown block</div>
      );
  }
}

export function PaletteIcon({ iconName, className }) {
  const Icon = PALETTE_ICONS[iconName] || Sparkles;
  return <Icon className={className} />;
}
