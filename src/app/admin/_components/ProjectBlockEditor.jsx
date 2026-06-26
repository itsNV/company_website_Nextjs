"use client";

import React from "react";
import { Upload, ImageIcon, Trash2 } from "lucide-react";

export default function ProjectBlockEditor({ block, onChange }) {
  if (!block) return null;

  const update = (patch) => onChange({ ...block.data, ...patch });

  const textareaClass =
    "w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-purple-500 min-h-[120px]";
  const inputClass =
    "w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-purple-500";
  const selectClass =
    "w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-850 outline-none focus:border-purple-500 bg-no-repeat cursor-pointer";
  const labelClass = "text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1";

  const handleImageUpload = (file, type) => {
    if (!file) return;
    update({ 
      imageFile: file, 
      imagePreview: URL.createObjectURL(file) 
    });
  };

  const handleClearImage = (imgUrlField) => {
    update({
      imageFile: null,
      imagePreview: null,
      [imgUrlField]: ""
    });
  };

  const renderImageUpload = (imgUrlField, label) => {
    const imageUrl = block.data?.imagePreview || block.data?.[imgUrlField];
    return (
      <div className="space-y-1.5">
        <label className={labelClass}>{label}</label>
        {imageUrl ? (
          <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 aspect-[4/3] max-h-[180px]">
            <img src={imageUrl} alt="Upload preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleClearImage(imgUrlField)}
              className="absolute top-2 right-2 p-1.5 rounded-xl bg-white/90 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-sm text-slate-500"
              title="Delete illustration image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl hover:border-purple-300 transition-all p-6 bg-slate-50 cursor-pointer text-slate-400 group">
            <Upload className="w-5 h-5 mb-1 group-hover:text-purple-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-purple-600">
              Upload Image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files[0], block.type)}
            />
          </label>
        )}
      </div>
    );
  };

  const renderCommonFields = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100 mb-4">
        <div className="space-y-1.5">
          <label className={labelClass}>Section Title</label>
          <input
            type="text"
            value={block.data.title || ""}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Problem Identification"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass}>Image Position</label>
          <select
            value={block.data.image_position || "right"}
            onChange={(e) => update({ image_position: e.target.value })}
            className={selectClass}
          >
            <option value="left">Left of Description</option>
            <option value="right">Right of Description</option>
            <option value="above">Above Description</option>
            <option value="bottom">Below Description</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderCommonFields()}
      {block.type === "challenge" && (
        <>
          <div className="space-y-1.5">
            <label className={labelClass}>Challenge Description</label>
            <textarea
              value={block.data.problem || ""}
              onChange={(e) => update({ problem: e.target.value })}
              placeholder="Describe the operational hurdles or core client issues..."
              className={textareaClass}
            />
          </div>
          {renderImageUpload("challenge_image_url", "Challenge Illustration")}
        </>
      )}
      {block.type === "solution" && (
        <>
          <div className="space-y-1.5">
            <label className={labelClass}>Solution Description</label>
            <textarea
              value={block.data.solution || ""}
              onChange={(e) => update({ solution: e.target.value })}
              placeholder="Describe the technical strategy, layout implementations..."
              className={textareaClass}
            />
          </div>
          {renderImageUpload("solution_image_url", "Solution Architecture Diagram")}
        </>
      )}
      {block.type === "business_impact" && (
        <>
          <div className="space-y-1.5">
            <label className={labelClass}>Business Impact Outcomes</label>
            <textarea
              value={block.data.business_impact || ""}
              onChange={(e) => update({ business_impact: e.target.value })}
              placeholder="Describe metrics, cost reductions, conversion increases..."
              className={textareaClass}
            />
          </div>
          {renderImageUpload("business_impact_image_url", "Impact Result Mockup")}
        </>
      )}
    </div>
  );
}
