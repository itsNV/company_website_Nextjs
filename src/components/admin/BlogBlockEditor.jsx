"use client";

import React from "react";
import { Plus, Trash2, Upload, ImageIcon } from "lucide-react";
import { BLOG_SECTION_EMOJIS } from "@/lib/blogEmojis";
import { BLOCK_SIZES, BLOCK_POSITIONS, BULLET_LIST_STYLES, generateSlug } from "@/lib/blogBlocks";
import { serviceIconMap, serviceIconOptions } from "@/lib/serviceIcons";

export default function BlogBlockEditor({ block, categories, onChange, onSizeChange, onPositionChange }) {
  if (!block) return null;

  const update = (patch) => onChange({ ...block.data, ...patch });

  const inputClass =
    "w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-purple-500";
  const textareaClass =
    "w-full p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-purple-500 resize-none";
  const labelClass = "text-[10px] font-black uppercase text-slate-500 tracking-wider";

  const imageUpload = (file) => {
    if (!file) return;
    update({ imageFile: file, imagePreview: URL.createObjectURL(file) });
  };

  const layoutControls = (
    <div className="space-y-2 pb-3 border-b border-slate-100">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`${labelClass} mr-1`}>Width</span>
        {BLOCK_SIZES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSizeChange(s.id)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
              block.size === s.id ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`${labelClass} mr-1`}>Position</span>
        {BLOCK_POSITIONS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onPositionChange(p.id)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
              (block.position || "center") === p.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );

  const pixelSizeControls = (data) => (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <label className={labelClass}>Width (px)</label>
        <input
          type="number"
          min="0"
          placeholder="e.g. 800"
          className={inputClass}
          value={data.imageWidthPx || ""}
          onChange={(e) => update({ imageWidthPx: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label className={labelClass}>Height (px)</label>
        <input
          type="number"
          min="0"
          placeholder="e.g. 450"
          className={inputClass}
          value={data.imageHeightPx || ""}
          onChange={(e) => update({ imageHeightPx: e.target.value })}
        />
      </div>
    </div>
  );

  const listStyleControls = (current, onSelect) => (
    <div className="space-y-1">
      <label className={labelClass}>List Style</label>
      <div className="flex flex-wrap gap-1.5">
        {BULLET_LIST_STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
              (current || "check") === s.id ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );

  const imageUploadBox = (
    <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-3">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => imageUpload(e.target.files?.[0])}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      {block.data.imagePreview || block.data.imageUrl ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.data.imagePreview || block.data.imageUrl} alt="" className="h-16 w-24 object-cover rounded-lg" />
          <span className="text-xs font-bold text-purple-600 flex items-center gap-1">
            <Upload className="w-3.5 h-3.5" /> Replace
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 py-4 text-slate-400">
          <ImageIcon className="w-5 h-5" />
          <span className="text-xs font-bold">Upload image</span>
        </div>
      )}
    </div>
  );

  let body = null;

  switch (block.type) {
    case "header":
      body = (
        <>
          <div className="space-y-1.5">
            <label className={labelClass}>Title</label>
            <input
              className={inputClass}
              value={block.data.title}
              onChange={(e) => {
                const title = e.target.value;
                update({ title, slug: generateSlug(title) });
              }}
              placeholder="Blog title"
            />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Slug</label>
            <input className={`${inputClass} bg-slate-50 text-slate-500`} value={block.data.slug} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className={labelClass}>Category</label>
              <select className={inputClass} value={block.data.category} onChange={(e) => update({ category: e.target.value })}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className={labelClass}>Author</label>
              <input className={inputClass} value={block.data.author} onChange={(e) => update({ author: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Excerpt</label>
            <textarea rows={3} className={textareaClass} value={block.data.excerpt} onChange={(e) => update({ excerpt: e.target.value })} />
          </div>
        </>
      );
      break;

    case "seo":
      body = (
        <>
          <div className="space-y-1.5">
            <label className={labelClass}>Meta Title</label>
            <input className={inputClass} value={block.data.metaTitle || ""} onChange={(e) => update({ metaTitle: e.target.value })} placeholder="SEO page title" />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Focus Keyphrase</label>
            <input className={inputClass} value={block.data.focusKeyphrase || ""} onChange={(e) => update({ focusKeyphrase: e.target.value })} placeholder="e.g. ecommerce development" />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Meta Description</label>
            <textarea rows={3} className={textareaClass} value={block.data.metaDescription || ""} onChange={(e) => update({ metaDescription: e.target.value })} placeholder="155 characters recommended" />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass}>Schema (JSON-LD)</label>
            <textarea rows={6} className={`${textareaClass} font-mono text-xs`} value={block.data.schema || ""} onChange={(e) => update({ schema: e.target.value })} placeholder='{"@context":"https://schema.org","@type":"Article",...}' />
          </div>
        </>
      );
      break;

    case "coverImage":
    case "image":
      body = (
        <>
          {pixelSizeControls(block.data)}
          {block.type === "image" && (
            <div className="space-y-1.5">
              <label className={labelClass}>Caption</label>
              <input className={inputClass} value={block.data.caption || ""} onChange={(e) => update({ caption: e.target.value })} />
            </div>
          )}
          {imageUploadBox}
        </>
      );
      break;

    case "contentSection":
      body = (
        <>
          <div className="space-y-1.5">
            <label className={labelClass}>Emoji</label>
            <div className="flex flex-wrap gap-1">
              {BLOG_SECTION_EMOJIS.map(({ emoji, label }) => (
                <button key={emoji} type="button" title={label} onClick={() => update({ emoji })} className={`w-8 h-8 rounded-lg text-base border ${block.data.emoji === emoji ? "border-purple-500 bg-purple-50" : "border-slate-200"}`}>
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <input className={inputClass} placeholder="Section title" value={block.data.title} onChange={(e) => update({ title: e.target.value })} />
          <textarea rows={3} className={textareaClass} placeholder="Body text" value={block.data.body} onChange={(e) => update({ body: e.target.value })} />
          {listStyleControls(block.data.bulletStyle, (s) => update({ bulletStyle: s }))}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className={labelClass}>Bullet Points</label>
              <button type="button" onClick={() => update({ bulletPoints: [...(block.data.bulletPoints || []), ""] })} className="text-[10px] font-bold text-purple-600">+ Add</button>
            </div>
            {(block.data.bulletPoints || []).map((pt, i) => (
              <div key={i} className="flex gap-2">
                <input className={inputClass} value={pt} onChange={(e) => { const pts = [...block.data.bulletPoints]; pts[i] = e.target.value; update({ bulletPoints: pts }); }} />
                <button type="button" onClick={() => update({ bulletPoints: block.data.bulletPoints.filter((_, j) => j !== i) })} className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <div className="space-y-1"><label className={labelClass}>Section Image Size</label>{pixelSizeControls(block.data)}</div>
          {imageUploadBox}
        </>
      );
      break;

    case "text":
      body = (
        <textarea rows={5} className={textareaClass} value={block.data.content} onChange={(e) => update({ content: e.target.value })} placeholder="Paragraph text..." />
      );
      break;

    case "bulletList":
      body = (
        <>
          <input className={inputClass} placeholder="List title (optional)" value={block.data.title} onChange={(e) => update({ title: e.target.value })} />
          {listStyleControls(block.data.listStyle, (s) => update({ listStyle: s }))}
          {(block.data.items || []).map((item, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputClass} value={item} onChange={(e) => { const items = [...block.data.items]; items[i] = e.target.value; update({ items }); }} />
              <button type="button" onClick={() => update({ items: block.data.items.filter((_, j) => j !== i) })} className="text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <button type="button" onClick={() => update({ items: [...(block.data.items || []), ""] })} className="text-[10px] font-bold text-purple-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add item</button>
        </>
      );
      break;

    case "table":
      body = (
        <>
          <input className={inputClass} placeholder="Table title (optional)" value={block.data.title || ""} onChange={(e) => update({ title: e.target.value })} />
          <div className="space-y-2">
            <label className={labelClass}>Headers</label>
            <div className="flex gap-2 flex-wrap">
              {(block.data.headers || []).map((h, i) => (
                <div key={i} className="flex gap-1 items-center">
                  <input className={`${inputClass} w-28`} value={h} onChange={(e) => { const headers = [...block.data.headers]; headers[i] = e.target.value; update({ headers }); }} />
                  <button type="button" onClick={() => { const headers = block.data.headers.filter((_, j) => j !== i); const rows = block.data.rows.map((r) => r.filter((_, j) => j !== i)); update({ headers, rows }); }} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
              <button type="button" onClick={() => update({ headers: [...(block.data.headers || []), `Column ${(block.data.headers?.length || 0) + 1}`], rows: (block.data.rows || []).map((r) => [...r, ""]) })} className="text-[10px] font-bold text-purple-600">+ Column</button>
            </div>
          </div>
          <div className="space-y-2 overflow-x-auto">
            <label className={labelClass}>Rows</label>
            {(block.data.rows || []).map((row, ri) => (
              <div key={ri} className="flex gap-2 items-center">
                {(block.data.headers || []).map((_, ci) => (
                  <input key={ci} className={`${inputClass} w-28`} value={row[ci] || ""} onChange={(e) => { const rows = block.data.rows.map((r) => [...r]); rows[ri][ci] = e.target.value; update({ rows }); }} />
                ))}
                <button type="button" onClick={() => update({ rows: block.data.rows.filter((_, j) => j !== ri) })} className="text-rose-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => update({ rows: [...(block.data.rows || []), Array(block.data.headers?.length || 3).fill("")] })} className="text-[10px] font-bold text-purple-600">+ Row</button>
          </div>
        </>
      );
      break;

    case "twoColumn":
      body = (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <input className={inputClass} value={block.data.leftTitle} onChange={(e) => update({ leftTitle: e.target.value })} placeholder="Left title" />
            <textarea rows={4} className={textareaClass} value={block.data.leftContent} onChange={(e) => update({ leftContent: e.target.value })} />
          </div>
          <div className="space-y-2">
            <input className={inputClass} value={block.data.rightTitle} onChange={(e) => update({ rightTitle: e.target.value })} placeholder="Right title" />
            <textarea rows={4} className={textareaClass} value={block.data.rightContent} onChange={(e) => update({ rightContent: e.target.value })} />
          </div>
        </div>
      );
      break;

    case "techStack":
      body = (
        <>
          {(block.data.items || []).map((item, i) => {
            const Icon = serviceIconMap[item.icon] || serviceIconMap.Cpu;
            return (
              <div key={i} className="p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="p-2 rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600"><Icon className="w-4 h-4" /></div>
                  <input className={inputClass} placeholder="Technology name" value={item.name} onChange={(e) => { const items = [...block.data.items]; items[i] = { ...items[i], name: e.target.value }; update({ items }); }} />
                  <button type="button" onClick={() => update({ items: block.data.items.filter((_, j) => j !== i) })} className="text-rose-400"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                  {serviceIconOptions.map((iconName) => {
                    const Ic = serviceIconMap[iconName];
                    return (
                      <button key={iconName} type="button" title={iconName} onClick={() => { const items = [...block.data.items]; items[i] = { ...items[i], icon: iconName }; update({ items }); }} className={`w-8 h-8 rounded-lg flex items-center justify-center border ${item.icon === iconName ? "border-cyan-500 bg-cyan-50" : "border-slate-200"}`}>
                        <Ic className="w-3.5 h-3.5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button type="button" onClick={() => update({ items: [...(block.data.items || []), { name: "", icon: "Cpu" }] })} className="text-[10px] font-bold text-purple-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add technology</button>
        </>
      );
      break;

    case "faq":
      body = (
        <>
          {(block.data.items || []).map((faq, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 space-y-2">
              <input className={inputClass} placeholder="Question" value={faq.q} onChange={(e) => { const items = [...block.data.items]; items[i] = { ...items[i], q: e.target.value }; update({ items }); }} />
              <textarea rows={2} className={textareaClass} placeholder="Answer" value={faq.a} onChange={(e) => { const items = [...block.data.items]; items[i] = { ...items[i], a: e.target.value }; update({ items }); }} />
              <button type="button" onClick={() => update({ items: block.data.items.filter((_, j) => j !== i) })} className="text-[10px] font-bold text-rose-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => update({ items: [...(block.data.items || []), { q: "", a: "" }] })} className="text-[10px] font-bold text-purple-600 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add FAQ</button>
        </>
      );
      break;

    case "callout":
      body = (
        <>
          <div className="flex flex-wrap gap-1">
            {BLOG_SECTION_EMOJIS.slice(0, 10).map(({ emoji }) => (
              <button key={emoji} type="button" onClick={() => update({ emoji })} className={`w-8 h-8 rounded-lg border text-base ${block.data.emoji === emoji ? "border-purple-500 bg-purple-50" : "border-slate-200"}`}>{emoji}</button>
            ))}
          </div>
          <input className={inputClass} placeholder="Callout title" value={block.data.title} onChange={(e) => update({ title: e.target.value })} />
          <textarea rows={3} className={textareaClass} value={block.data.content} onChange={(e) => update({ content: e.target.value })} />
          <div className="flex gap-2">
            {["purple", "amber", "emerald"].map((v) => (
              <button key={v} type="button" onClick={() => update({ variant: v })} className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${block.data.variant === v ? "bg-purple-600 text-white" : "bg-slate-100"}`}>{v}</button>
            ))}
          </div>
        </>
      );
      break;

    case "divider":
      body = (
        <div className="flex gap-2">
          {["gradient", "dots"].map((s) => (
            <button key={s} type="button" onClick={() => update({ style: s })} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase ${block.data.style === s ? "bg-purple-600 text-white" : "bg-slate-100"}`}>{s}</button>
          ))}
        </div>
      );
      break;

    default:
      return <p className="text-xs text-slate-400">No editor for this block.</p>;
  }

  return (
    <div className="space-y-3">
      {layoutControls}
      {body}
    </div>
  );
}
