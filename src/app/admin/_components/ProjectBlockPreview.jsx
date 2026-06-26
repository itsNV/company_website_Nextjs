"use client";

import React from "react";
import { HelpCircle, Cpu, Sparkles, ImageIcon } from "lucide-react";

export function PaletteIcon({ iconName, className }) {
  if (iconName === "HelpCircle") return <HelpCircle className={className} />;
  if (iconName === "Cpu") return <Cpu className={className} />;
  if (iconName === "Sparkles") return <Sparkles className={className} />;
  return <HelpCircle className={className} />;
}

export function ProjectBlockPreview({ block }) {
  const d = block.data || {};
  const pos = d.image_position || "right";

  let badgeText = "";
  let badgeColor = "";
  let defaultTitle = "";
  let description = "";
  let imageUrl = "";
  let extraFooter = null;

  if (block.type === "challenge") {
    badgeText = "Phase 1: The Challenge";
    badgeColor = "text-rose-600 bg-rose-50";
    defaultTitle = "Problem Identification";
    description = d.problem || "Describe the core challenge/problem...";
    imageUrl = d.imagePreview || d.challenge_image_url;
  } else if (block.type === "solution") {
    badgeText = "Phase 2: Our Solution";
    badgeColor = "text-purple-600 bg-purple-50";
    defaultTitle = "Engineering Response";
    description = d.solution || "Describe your engineering solution/approach...";
    imageUrl = d.imagePreview || d.solution_image_url;
  } else if (block.type === "business_impact") {
    badgeText = "Phase 3: Business Impact";
    badgeColor = "text-emerald-600 bg-emerald-50";
    defaultTitle = "Delivering Measurable Value";
    description = d.business_impact || "Describe the measurable business outcomes/impact...";
    imageUrl = d.imagePreview || d.business_impact_image_url;
    extraFooter = (
      <p className="text-slate-400 text-[10px] font-medium mt-3">
        Measurable corporate outcome engineered directly through smart architecture integration.
      </p>
    );
  }

  const title = d.title || defaultTitle;

  const textCol = (
    <div className="flex flex-col justify-center">
      <span className={`text-[10px] font-black uppercase tracking-wider ${badgeColor} px-2.5 py-1 rounded-md inline-block mb-3 w-fit`}>
        {badgeText}
      </span>
      <h4 className="text-xl font-black font-outfit text-slate-900 mb-3">
        {title}
      </h4>
      <p className="text-slate-650 text-xs leading-relaxed font-semibold">
        {description}
      </p>
      {extraFooter}
    </div>
  );

  const imageCol = imageUrl ? (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm max-h-[220px] aspect-[4/3] bg-slate-100 flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  ) : null;

  const wrapperClass = `py-8 border-y border-[#eae6fa]/10 rounded-2xl my-2 px-6 ${
    block.type === "challenge" ? "bg-slate-50/40" : ""
  }`;

  if (!imageUrl) {
    return (
      <div className={wrapperClass}>
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center py-4">
          <span className={`text-[10px] font-black uppercase tracking-wider ${badgeColor} px-2.5 py-1 rounded-md inline-block mb-3`}>
            {badgeText}
          </span>
          <h4 className="text-xl font-black font-outfit text-slate-900 mb-3">
            {title}
          </h4>
          <p className="text-slate-650 text-xs leading-relaxed font-semibold">
            {description}
          </p>
          {extraFooter}
        </div>
      </div>
    );
  }

  if (pos === "left") {
    return (
      <div className={wrapperClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="lg:order-2">{textCol}</div>
          <div className="lg:order-1">{imageCol}</div>
        </div>
      </div>
    );
  } else if (pos === "above") {
    return (
      <div className={wrapperClass}>
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          <div className="w-full">{imageCol}</div>
          <div>{textCol}</div>
        </div>
      </div>
    );
  } else if (pos === "bottom") {
    return (
      <div className={wrapperClass}>
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          <div>{textCol}</div>
          <div className="w-full">{imageCol}</div>
        </div>
      </div>
    );
  } else {
    // Default or "right"
    return (
      <div className={wrapperClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="lg:order-1">{textCol}</div>
          <div className="lg:order-2">{imageCol}</div>
        </div>
      </div>
    );
  }
}
