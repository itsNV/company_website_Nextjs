"use client";

import React from "react";
import { CheckCircle2, Circle, ArrowRight, Star } from "lucide-react";

export function BulletListItems({ items, style = "check", className = "" }) {
  const filtered = (items || []).filter(Boolean);
  if (!filtered.length) return null;

  const renderMarker = (idx) => {
    switch (style) {
      case "dot":
        return <Circle className="w-2 h-2 text-purple-500 shrink-0 mt-2 fill-purple-500" />;
      case "number":
        return (
          <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0">
            {idx + 1}
          </span>
        );
      case "arrow":
        return <ArrowRight className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />;
      case "star":
        return <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 fill-amber-400" />;
      case "check":
      default:
        return <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />;
    }
  };

  return (
    <ul className={`space-y-2 ${className}`}>
      {filtered.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
          {renderMarker(idx)}
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function BulletListCards({ items, style = "check", className = "" }) {
  const filtered = (items || []).filter(Boolean);
  if (!filtered.length) return null;

  const renderMarker = (idx) => {
    switch (style) {
      case "dot":
        return <span className="text-purple-500 font-bold">•</span>;
      case "number":
        return <span className="text-purple-600 font-bold text-xs">{idx + 1}.</span>;
      case "arrow":
        return <ArrowRight className="w-4 h-4 text-purple-500 shrink-0" />;
      case "star":
        return <Star className="w-4 h-4 text-amber-500 shrink-0 fill-amber-400" />;
      case "check":
      default:
        return <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />;
    }
  };

  return (
    <ul className={`space-y-3 ${className}`}>
      {filtered.map((item, idx) => (
        <li
          key={idx}
          className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-sm"
        >
          {renderMarker(idx)}
          <span className="text-slate-700 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
