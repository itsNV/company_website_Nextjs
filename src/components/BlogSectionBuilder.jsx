"use client";

import React from "react";
import { Plus, Trash2, Upload, GripVertical, ImageIcon } from "lucide-react";
import { BLOG_SECTION_EMOJIS, DEFAULT_SECTION_EMOJI } from "@/lib/blogEmojis";

export const emptyBlogSection = () => ({
  emoji: DEFAULT_SECTION_EMOJI,
  title: "",
  body: "",
  bulletPoints: [],
  imageUrl: "",
  imageFile: null,
  imagePreview: "",
});

export default function BlogSectionBuilder({ sections, onChange }) {
  const updateSection = (index, updates) => {
    const next = sections.map((section, i) =>
      i === index ? { ...section, ...updates } : section
    );
    onChange(next);
  };

  const addSection = () => {
    onChange([...sections, emptyBlogSection()]);
  };

  const removeSection = (index) => {
    onChange(sections.filter((_, i) => i !== index));
  };

  const addBulletPoint = (sectionIndex) => {
    const section = sections[sectionIndex];
    updateSection(sectionIndex, {
      bulletPoints: [...(section.bulletPoints || []), ""],
    });
  };

  const updateBulletPoint = (sectionIndex, bulletIndex, value) => {
    const section = sections[sectionIndex];
    const bulletPoints = [...(section.bulletPoints || [])];
    bulletPoints[bulletIndex] = value;
    updateSection(sectionIndex, { bulletPoints });
  };

  const removeBulletPoint = (sectionIndex, bulletIndex) => {
    const section = sections[sectionIndex];
    updateSection(sectionIndex, {
      bulletPoints: (section.bulletPoints || []).filter((_, i) => i !== bulletIndex),
    });
  };

  const handleSectionImageChange = (index, file) => {
    if (!file) return;
    updateSection(index, {
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const clearSectionImage = (index) => {
    updateSection(index, {
      imageFile: null,
      imagePreview: "",
      imageUrl: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
          Content Sections
        </label>
        <button
          type="button"
          onClick={addSection}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-purple-100 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Section
        </button>
      </div>

      {sections.length === 0 && (
        <div className="p-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 text-center">
          <p className="text-xs text-slate-500">
            No sections yet. Add sections with titles, emojis, bullet points, and optional images.
          </p>
        </div>
      )}

      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <GripVertical className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-wider">
                Section {sectionIndex + 1}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeSection(sectionIndex)}
              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
              Section Emoji
            </label>
            <div className="flex flex-wrap gap-1.5">
              {BLOG_SECTION_EMOJIS.map(({ emoji, label }) => (
                <button
                  key={emoji}
                  type="button"
                  title={label}
                  onClick={() => updateSection(sectionIndex, { emoji })}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all ${
                    section.emoji === emoji
                      ? "border-purple-500 bg-purple-50 ring-2 ring-purple-500/20"
                      : "border-slate-200 bg-white hover:border-purple-300"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
              Section Title
            </label>
            <input
              type="text"
              placeholder="e.g. Key Benefits"
              value={section.title}
              onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
              className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
              Section Body (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Introductory paragraph for this section..."
              value={section.body}
              onChange={(e) => updateSection(sectionIndex, { body: e.target.value })}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                Bullet Points
              </label>
              <button
                type="button"
                onClick={() => addBulletPoint(sectionIndex)}
                className="text-[10px] font-bold uppercase text-purple-600 hover:text-purple-800"
              >
                + Add Point
              </button>
            </div>
            {(section.bulletPoints || []).length === 0 ? (
              <p className="text-[11px] text-slate-400 italic">No bullet points added.</p>
            ) : (
              <div className="space-y-2">
                {(section.bulletPoints || []).map((point, bulletIndex) => (
                  <div key={bulletIndex} className="flex items-center gap-2">
                    <span className="text-purple-500 font-bold text-sm shrink-0">•</span>
                    <input
                      type="text"
                      placeholder="Bullet point text..."
                      value={point}
                      onChange={(e) =>
                        updateBulletPoint(sectionIndex, bulletIndex, e.target.value)
                      }
                      className="flex-1 h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeBulletPoint(sectionIndex, bulletIndex)}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
              Section Image (optional)
            </label>
            <div className="relative border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-2xl bg-white p-3 transition-colors">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleSectionImageChange(sectionIndex, file);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {section.imagePreview || section.imageUrl ? (
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.imagePreview || section.imageUrl}
                    alt="Section"
                    className="h-20 w-28 object-cover rounded-xl border border-slate-200"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-purple-600 font-bold flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" /> Replace Image
                    </span>
                    <button
                      type="button"
                      onClick={() => clearSectionImage(sectionIndex)}
                      className="text-[10px] font-bold uppercase text-rose-500 hover:text-rose-700 text-left"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-3 text-slate-400">
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-xs font-bold">Click to upload section image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function uploadBlogSectionImages(sections, storage, uploadBytes, getDownloadURL, ref) {
  const uploaded = [];
  for (const section of sections) {
    let imageUrl = section.imageUrl || "";
    if (section.imageFile) {
      const fileRef = ref(storage, `blogs/sections/${Date.now()}_${section.imageFile.name}`);
      const snapshot = await uploadBytes(fileRef, section.imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    uploaded.push({
      emoji: section.emoji || DEFAULT_SECTION_EMOJI,
      title: section.title,
      body: section.body || "",
      bulletPoints: (section.bulletPoints || []).filter(Boolean),
      imageUrl,
    });
  }
  return uploaded;
}

export function sanitizeSectionsForFirestore(sections) {
  return (sections || []).map(({ emoji, title, body, bulletPoints, imageUrl }) => ({
    emoji: emoji || DEFAULT_SECTION_EMOJI,
    title: title || "",
    body: body || "",
    bulletPoints: (bulletPoints || []).filter(Boolean),
    imageUrl: imageUrl || "",
  }));
}
