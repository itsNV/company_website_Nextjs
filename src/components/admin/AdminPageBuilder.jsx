"use client";

import React, { useState } from "react";
import {
  GripVertical,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  Eye,
  Loader2,
  Laptop,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  Award,
  Compass,
  HelpCircle,
  ShoppingBag,
  Shield,
  Plus,
  X,
  Upload,
  Link2,
  FileText
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import {
  SERVICE_BLOCK_PALETTE,
  createPageBlock,
  getDefaultPageBlocks
} from "@/lib/pageBuilderBlocks";

const getIconComponent = (name) => {
  const IconComp = LucideIcons[name];
  if (IconComp) return IconComp;
  return LucideIcons.Laptop; 
};

const DRAG_NEW = "page-block-new";
const DRAG_REORDER = "page-block-reorder";

const blockIcons = {
  Laptop,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  Award,
  Compass,
  HelpCircle,
  ShoppingBag,
  Shield
};

const PALETTE_COLORS = {
  blue: "border-blue-200 bg-blue-50/80 hover:border-blue-400 text-blue-700",
  cyan: "border-cyan-200 bg-cyan-50/80 hover:border-cyan-400 text-cyan-700",
  emerald: "border-emerald-200 bg-emerald-50/80 hover:border-emerald-400 text-emerald-700",
  indigo: "border-indigo-200 bg-indigo-50/80 hover:border-indigo-400 text-indigo-700",
  rose: "border-rose-200 bg-rose-50/80 hover:border-rose-400 text-rose-700",
  amber: "border-amber-200 bg-amber-50/80 hover:border-amber-400 text-amber-700",
  fuchsia: "border-fuchsia-200 bg-fuchsia-50/80 hover:border-fuchsia-400 text-fuchsia-700",
  violet: "border-violet-200 bg-violet-50/80 hover:border-violet-400 text-violet-700",
  slate: "border-slate-200 bg-slate-50/80 hover:border-slate-400 text-slate-700",
};

const lucideOptions = [
  "Palette", "Compass", "ShieldCheck", "Award", "Laptop", "HelpCircle", "Sparkles", "Cpu", 
  "Users", "Shield", "Zap", "Rocket", "Star", "Code", "Cloud", "Database", "BarChart", "Settings", 
  "Mail", "MapPin", "Globe", "Lock", "ArrowRight", "Smartphone", "ShoppingBag", "TrendingUp"
];

export default function AdminPageBuilder({
  blocks: controlledBlocks,
  onChange,
  onPublish,
  publishing = false,
  publishLabel = "Publish Page Details",
  message,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const blocks = controlledBlocks?.length ? controlledBlocks : getDefaultPageBlocks();
  const selectedBlock = blocks.find((b) => b.id === selectedId);

  const setBlocks = (next) => {
    onChange(next);
    if (selectedId && !next.find((b) => b.id === selectedId)) {
      setSelectedId(null);
    }
  };

  const updateBlock = (id, updates) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const updateBlockData = (id, data) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, data: { ...b.data, ...data } } : b)));
  };

  const addBlockAt = (type, index) => {
    const newBlock = createPageBlock(type);
    if (!newBlock) return;
    const next = [...blocks];
    next.splice(index, 0, newBlock);
    setBlocks(next);
    setSelectedId(newBlock.id);
  };

  const removeBlock = (id) => {
    if (blocks.length <= 1) return;
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const duplicateBlock = (id) => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx === -1) return;
    const copy = { 
      ...blocks[idx], 
      id: `${blocks[idx].type}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, 
      data: JSON.parse(JSON.stringify(blocks[idx].data)) 
    };
    if (copy.data.imageFile) copy.data.imageFile = null;
    const next = [...blocks];
    next.splice(idx + 1, 0, copy);
    setBlocks(next);
    setSelectedId(copy.id);
  };

  const moveBlock = (id, direction) => {
    const idx = blocks.findIndex((b) => b.id === id);
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    const next = [...blocks];
    const [item] = next.splice(idx, 1);
    next.splice(newIdx, 0, item);
    setBlocks(next);
  };

  // Drag & Drop Handlers
  const handlePaletteDragStart = (e, type) => {
    e.dataTransfer.setData(DRAG_NEW, type);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleBlockDragStart = (e, id) => {
    e.dataTransfer.setData(DRAG_REORDER, id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = e.dataTransfer.types.includes(DRAG_REORDER) ? "move" : "copy";
    setDragOverIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDragOverIndex(null);

    const newType = e.dataTransfer.getData(DRAG_NEW);
    const reorderId = e.dataTransfer.getData(DRAG_REORDER);

    if (newType) {
      addBlockAt(newType, index);
      return;
    }

    if (reorderId) {
      const fromIdx = blocks.findIndex((b) => b.id === reorderId);
      if (fromIdx === -1) return;
      const next = [...blocks];
      const [item] = next.splice(fromIdx, 1);
      const toIdx = fromIdx < index ? index - 1 : index;
      next.splice(toIdx, 0, item);
      setBlocks(next);
    }
  };

  const handleCanvasDragOver = (e) => {
    e.preventDefault();
    if (blocks.length === 0) setDragOverIndex(0);
  };

  const handleCanvasDrop = (e) => {
    e.preventDefault();
    const newType = e.dataTransfer.getData(DRAG_NEW);
    if (newType && blocks.length === 0) addBlockAt(newType, 0);
    setDragOverIndex(null);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[75vh] font-sans text-slate-800">
      {/* Left sidebar: Component Palette */}
      {!previewMode && (
        <aside className="xl:col-span-3 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xl h-fit xl:sticky xl:top-28">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <LayoutGrid className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-outfit">
              Layout Sections
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mb-4 leading-relaxed font-semibold">
            Drag a section onto the canvas below to build your page.
          </p>
          <div className="grid grid-cols-1 gap-2.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
            {SERVICE_BLOCK_PALETTE.map((item) => {
              const Icon = blockIcons[item.icon] || Laptop;
              return (
                <div
                  key={item.type}
                  draggable
                  onDragStart={(e) => handlePaletteDragStart(e, item.type)}
                  className={`flex items-center justify-between gap-3.5 p-3 rounded-xl border cursor-grab active:cursor-grabbing transition-all ${PALETTE_COLORS[item.color]}`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-grow">
                    <div className="w-9 h-9 rounded-lg bg-white/85 border border-white/60 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 leading-none">{item.label}</p>
                      <p className="text-[10px] text-slate-500 truncate mt-1 leading-relaxed font-medium">{item.description}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addBlockAt(item.type, blocks.length);
                    }}
                    className="p-1.5 rounded-lg bg-white/80 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm shrink-0"
                    title="Tap to add"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </aside>
      )}

      {/* Right/Middle: Canvas & Editor panel */}
      <div className={`${previewMode ? "xl:col-span-12" : "xl:col-span-9"} flex flex-col gap-4`}>
        {/* Toolbar header */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200/60 rounded-2xl px-5 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                previewMode ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-blue-50"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {previewMode ? "Edit Mode" : "Preview Mode"}
            </button>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {blocks.length} section{blocks.length !== 1 ? "s" : ""} active
            </span>
          </div>

          <button
            type="button"
            onClick={onPublish}
            disabled={publishing}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl shadow-md disabled:opacity-60"
          >
            {publishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Configuration...
              </>
            ) : (
              publishLabel
            )}
          </button>
        </div>

        {message?.text && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold border ${
              message.type === "success"
                ? "bg-teal-50 border-teal-200 text-teal-700"
                : "bg-rose-50 border-rose-200 text-rose-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow min-h-[500px]">
          {/* Canvas area */}
          <div
            className={`${previewMode || !selectedBlock ? "lg:col-span-12" : "lg:col-span-7"} bg-gradient-to-br from-slate-100/60 to-blue-50/20 border border-slate-200/60 rounded-3xl p-5 sm:p-6 min-h-[550px]`}
            onDragOver={handleCanvasDragOver}
            onDrop={handleCanvasDrop}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 min-h-[480px] overflow-hidden">
              <div className="h-9 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-1.5 justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                  <span className="ml-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Interactive Layout Canvas
                  </span>
                </div>
                {!previewMode && (
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Click a block to edit</span>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-4 max-w-3xl mx-auto">
                {blocks.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-28 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/30"
                    onDragOver={(e) => handleDragOver(e, 0)}
                    onDrop={(e) => handleDrop(e, 0)}
                  >
                    <LayoutGrid className="w-10 h-10 text-blue-300 mb-3" />
                    <p className="text-sm font-bold text-slate-600">Drop layouts here</p>
                    <p className="text-xs text-slate-400 mt-1">Drag sections from the left list</p>
                  </div>
                ) : (
                  <>
                    {blocks.map((block, index) => (
                      <div key={block.id}>
                        {/* Drop zone above block */}
                        {!previewMode && (
                          <div
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragLeave={() => setDragOverIndex(null)}
                            onDrop={(e) => handleDrop(e, index)}
                            className={`h-2.5 -my-1 rounded transition-all ${
                              dragOverIndex === index
                                ? "h-8 bg-blue-100 border border-dashed border-blue-400 my-1"
                                : "hover:h-4 hover:bg-blue-50/50"
                            }`}
                          />
                        )}

                        <div
                          onClick={() => !previewMode && setSelectedId(block.id)}
                          className={`relative group rounded-2xl transition-all border p-5 ${
                            !previewMode && selectedId === block.id
                              ? "ring-2 ring-blue-500 ring-offset-2 bg-blue-50/10 border-blue-200"
                              : !previewMode
                                ? "hover:ring-1 hover:ring-blue-300 cursor-pointer bg-white border-slate-200"
                                : "bg-white border-slate-100 shadow-sm"
                          }`}
                        >
                          {!previewMode && (
                            <div className="absolute -left-2 top-2.5 z-10 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                draggable
                                onDragStart={(e) => {
                                  e.stopPropagation();
                                  handleBlockDragStart(e, block.id);
                                }}
                                className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm cursor-grab hover:border-blue-300"
                                title="Drag to reorder"
                              >
                                <GripVertical className="w-3.5 h-3.5 text-slate-400" />
                              </button>
                            </div>
                          )}

                          {!previewMode && selectedId === block.id && (
                            <div className="absolute right-2 top-2 z-10 flex gap-1 bg-white/95 backdrop-blur border border-slate-200/85 p-1 rounded-xl shadow-md lg:shadow-none lg:border-none lg:bg-transparent lg:p-0 lg:-right-2 lg:top-2.5 lg:flex-col">
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); moveBlock(block.id, -1); }}
                                className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 1); }}
                                className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); duplicateBlock(block.id); }}
                                className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }}
                                className="p-1 bg-white border border-rose-200 rounded-lg shadow-sm hover:bg-rose-50 text-rose-500"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          {/* Render visual content of the block */}
                          <div className="space-y-2">
                            <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                              {block.type} section
                            </span>
                            <h4 className="text-base font-bold text-slate-900 leading-snug">{block.data.sectionTitle || block.data.title || block.data.name || "Untitled Section"}</h4>
                            
                            {block.type === "hero" && (
                              <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-500">
                                <p><strong>Badge:</strong> {block.data.badge}</p>
                                <p><strong>Description:</strong> {block.data.description}</p>
                                {block.data.imageUrl && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={block.data.imageUrl} alt="" className="w-40 h-28 object-cover rounded-xl mt-2" />
                                )}
                              </div>
                            )}

                            {block.type === "overview" && (
                              <p className="text-xs text-slate-500 leading-relaxed">{block.data.description}</p>
                            )}

                            {block.type === "benefits" && (
                              <div className="space-y-2">
                                {block.data.sectionName && (
                                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">{block.data.sectionName}</span>
                                )}
                                <div className={`flex ${block.data.imagePosition === 'left' ? 'flex-row-reverse' : block.data.imagePosition === 'top' ? 'flex-col-reverse' : block.data.imagePosition === 'bottom' ? 'flex-col' : 'flex-row'} items-center justify-between gap-4`}>
                                  <ul className="space-y-1 pl-1 flex-grow text-left">
                                    {block.data.items?.map((item, i) => {
                                      const BulletIcon = block.data.bulletIcon ? getIconComponent(block.data.bulletIcon) : null;
                                      return (
                                        <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5 justify-start">
                                          {BulletIcon ? (
                                            <BulletIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                                          ) : (
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                          )}
                                          <span>{item}</span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                  {block.data.imageUrl && (
                                    <img
                                      src={block.data.imageUrl}
                                      alt=""
                                      style={{
                                        width: block.data.imageWidth ? `${block.data.imageWidth}px` : '150px',
                                        height: block.data.imageHeight ? `${block.data.imageHeight}px` : '100px',
                                        maxWidth: '100%'
                                      }}
                                      className="object-cover rounded-xl border border-slate-200 shrink-0"
                                    />
                                  )}
                                </div>
                              </div>
                            )}

                            {block.type === "offerings" && (
                              <div className="space-y-2">
                                {block.data.sectionName && (
                                  <span className="text-[10px] uppercase font-bold text-indigo-600 block">{block.data.sectionName}</span>
                                )}
                                <div className={`flex ${block.data.imagePosition === 'left' ? 'flex-row-reverse' : block.data.imagePosition === 'top' ? 'flex-col-reverse' : block.data.imagePosition === 'bottom' ? 'flex-col' : 'flex-row'} items-center justify-between gap-4`}>
                                  <div className="flex flex-wrap gap-1.5 pt-1 flex-grow justify-start">
                                    {block.data.items?.map((item, i) => {
                                      const BulletIcon = block.data.bulletIcon ? getIconComponent(block.data.bulletIcon) : null;
                                      return (
                                        <span key={i} className="text-[10px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                          {BulletIcon && <BulletIcon className="w-3.5 h-3.5" />}
                                          {item}
                                        </span>
                                      );
                                    })}
                                  </div>
                                  {block.data.imageUrl && (
                                    <img
                                      src={block.data.imageUrl}
                                      alt=""
                                      style={{
                                        width: block.data.imageWidth ? `${block.data.imageWidth}px` : '150px',
                                        height: block.data.imageHeight ? `${block.data.imageHeight}px` : '100px',
                                        maxWidth: '100%'
                                      }}
                                      className="object-cover rounded-xl border border-slate-200 shrink-0"
                                    />
                                  )}
                                </div>
                              </div>
                            )}

                            {block.type === "features" && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                {block.data.items?.map((item, i) => (
                                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                                    <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                      {item.title} ({item.icon})
                                    </h5>
                                    <p className="text-slate-500 mt-1">{item.desc}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {block.type === "process" && (
                              <div className="space-y-2 pt-2">
                                {block.data.items?.map((item, i) => (
                                  <div key={i} className="flex gap-3 text-xs">
                                    <span className="font-mono font-black text-blue-600 shrink-0">{item.step}</span>
                                    <div>
                                      <h5 className="font-bold text-slate-800">{item.title}</h5>
                                      <p className="text-slate-500">{item.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {block.type === "faqs" && (
                              <div className="space-y-2 pt-2">
                                {block.data.items?.map((item, i) => (
                                  <div key={i} className="p-3 bg-slate-50 rounded-xl text-xs">
                                    <p className="font-bold text-slate-800">Q: {item.q}</p>
                                    <p className="text-slate-500 mt-1">A: {item.a}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {block.type === "pricing" && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                {block.data.items?.map((item, i) => (
                                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                                    <h5 className="font-black text-slate-900">{item.name}</h5>
                                    <p className="text-slate-600 font-bold">{item.price} / {item.period}</p>
                                    <ul className="mt-2 space-y-0.5 pl-2 text-[10px] text-slate-500 list-disc">
                                      {item.features?.map((f, fi) => <li key={fi}>{f}</li>)}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}

                            {block.type === "seo" && (
                              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                                <p><strong>Meta Title:</strong> {block.data.metaTitle}</p>
                                <p><strong>Meta Description:</strong> {block.data.metaDescription}</p>
                                <p><strong>Keyword:</strong> {block.data.focusKeyword}</p>
                              </div>
                            )}

                            {block.type === "industries" && (
                              <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-550">
                                <p><strong>Title:</strong> {block.data.title}</p>
                                <p><strong>Description:</strong> {block.data.description}</p>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {block.data.items?.map((item, i) => (
                                    <span key={i} className="text-[10px] font-bold bg-amber-50 border border-amber-100 text-amber-700 px-2.5 py-1 rounded-lg">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {!previewMode && (
                      <div
                        onDragOver={(e) => handleDragOver(e, blocks.length)}
                        onDrop={(e) => handleDrop(e, blocks.length)}
                        className={`mt-4 py-8 rounded-2xl border border-dashed text-center transition-all ${
                          dragOverIndex === blocks.length
                            ? "border-blue-400 bg-blue-50"
                            : "border-slate-200 text-slate-400 hover:border-blue-200 hover:bg-blue-50/20 animate-pulse-soft"
                        }`}
                      >
                        <p className="text-xs font-bold">+ Drag &amp; Drop a section block here</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Selected block parameters editor */}
          {!previewMode && selectedBlock && (
            <aside className="lg:col-span-5 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xl h-fit lg:sticky lg:top-28 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-outfit">
                  Properties Editor
                </h3>
                <span className="text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase">
                  {selectedBlock.type}
                </span>
              </div>

              {selectedBlock.type !== "seo" && (
                <div className="space-y-1.5 pb-4 border-b border-slate-100">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Section Icon</label>
                  <select
                    value={selectedBlock.data.sectionIcon || ""}
                    onChange={(e) => updateBlockData(selectedBlock.id, { sectionIcon: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-55 border border-slate-200 rounded-xl text-xs focus:border-blue-500"
                  >
                    <option value="">No Section Icon</option>
                    {lucideOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedBlock.type !== "seo" && selectedBlock.type !== "hero" && (
                <div className="space-y-1.5 pb-4 border-b border-slate-100">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Section Title (Optional)</label>
                  <input
                    type="text"
                    value={selectedBlock.data.sectionTitle || ""}
                    onChange={(e) => updateBlockData(selectedBlock.id, { sectionTitle: e.target.value })}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="Enter Custom Title (or leave blank for default)"
                  />
                </div>
              )}

              {selectedBlock.type === "hero" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Service Name (Title)</label>
                    <input
                      type="text"
                      value={selectedBlock.data.title || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "") })}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">URL Slug</label>
                    <input
                      type="text"
                      value={selectedBlock.data.slug || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Hero Badge Text</label>
                    <input
                      type="text"
                      value={selectedBlock.data.badge || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { badge: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-55 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Hero Description / Tagline</label>
                    <textarea
                      rows={3}
                      value={selectedBlock.data.description || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { description: e.target.value })}
                      className="w-full p-4 bg-slate-55 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">CTA Text</label>
                      <input
                        type="text"
                        value={selectedBlock.data.ctaText || ""}
                        onChange={(e) => updateBlockData(selectedBlock.id, { ctaText: e.target.value })}
                        className="w-full h-11 px-4 bg-slate-55 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">CTA Link</label>
                      <input
                        type="text"
                        value={selectedBlock.data.ctaLink || ""}
                        onChange={(e) => updateBlockData(selectedBlock.id, { ctaLink: e.target.value })}
                        className="w-full h-11 px-4 bg-slate-55 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Image upload with pixel increases */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Cover Image (Drag / Click to change)</label>
                    <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl bg-slate-50 p-4 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            updateBlockData(selectedBlock.id, {
                              imageFile: file,
                              imageUrl: URL.createObjectURL(file)
                            });
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {selectedBlock.data.imageUrl ? (
                        <div className="flex flex-col items-center gap-2">
                          {/* Pixel increase: Width and height rendered larger */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={selectedBlock.data.imageUrl} alt="Big Preview" className="w-[300px] h-[200px] object-cover rounded-xl border border-slate-200" />
                          <span className="text-[10px] text-blue-600 font-black uppercase mt-1">Change cover Image</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                          <Upload className="w-8 h-8 mb-2" />
                          <span className="text-xs font-bold">Upload High-Res cover image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedBlock.type === "overview" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Overview Title</label>
                    <input
                      type="text"
                      value={selectedBlock.data.title || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { title: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Overview Description</label>
                    <textarea
                      rows={5}
                      value={selectedBlock.data.description || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { description: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {selectedBlock.type === "benefits" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Section Name (Optional Subtitle)</label>
                    <input
                      type="text"
                      value={selectedBlock.data.sectionName || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { sectionName: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      placeholder="e.g. BENEFITS"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Checklist Bullet Icon</label>
                    <select
                      value={selectedBlock.data.bulletIcon || "CheckCircle2"}
                      onChange={(e) => updateBlockData(selectedBlock.id, { bulletIcon: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-blue-500"
                    >
                      <option value="">No Icon</option>
                      {lucideOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">List / Bullet Style</label>
                    <select
                      value={selectedBlock.data.bulletStyle || "icon"}
                      onChange={(e) => updateBlockData(selectedBlock.id, { bulletStyle: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-blue-500"
                    >
                      <option value="icon">Lucide Checklist Icon</option>
                      <option value="disc">Standard Bullet Point (Disc)</option>
                      <option value="circle">Open Circle Bullet</option>
                      <option value="square">Solid Square Bullet</option>
                      <option value="decimal">Numbered List (1, 2, 3)</option>
                    </select>
                  </div>

                  {/* Section Image Settings */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Section Image (Optional)</label>
                    <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl bg-slate-50/50 p-4 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            updateBlockData(selectedBlock.id, {
                              imageFile: file,
                              imageUrl: URL.createObjectURL(file)
                            });
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {selectedBlock.data.imageUrl ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={selectedBlock.data.imageUrl}
                            alt="Preview"
                            style={{
                              width: selectedBlock.data.imageWidth ? `${selectedBlock.data.imageWidth}px` : '150px',
                              height: selectedBlock.data.imageHeight ? `${selectedBlock.data.imageHeight}px` : '100px'
                            }}
                            className="object-cover rounded-xl border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              updateBlockData(selectedBlock.id, { imageUrl: "", imageFile: null });
                            }}
                            className="text-[10px] text-red-650 text-red-600 font-bold uppercase"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 text-slate-400">
                          <Upload className="w-6 h-6 mb-2" />
                          <span className="text-[11px] font-bold">Add optional image</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedBlock.data.imageUrl && (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Width (px)</label>
                        <input
                          type="number"
                          value={selectedBlock.data.imageWidth || ""}
                          onChange={(e) => updateBlockData(selectedBlock.id, { imageWidth: e.target.value })}
                          className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Height (px)</label>
                        <input
                          type="number"
                          value={selectedBlock.data.imageHeight || ""}
                          onChange={(e) => updateBlockData(selectedBlock.id, { imageHeight: e.target.value })}
                          className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-555 uppercase">Position</label>
                        <select
                          value={selectedBlock.data.imagePosition || "right"}
                          onChange={(e) => updateBlockData(selectedBlock.id, { imagePosition: e.target.value })}
                          className="w-full h-9 px-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-blue-500"
                        >
                          <option value="top">Above the content</option>
                          <option value="bottom">Below the content</option>
                          <option value="left">Side by side (Left)</option>
                          <option value="right">Side by side (Right)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Bullet checklists */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Checklist Bullets</label>
                    <div className="flex gap-2">
                      <input
                        id="new-benefit-input"
                        type="text"
                        placeholder="e.g. 99.9% Uptime Guarantee"
                        className="flex-grow h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const val = e.target.value.trim();
                            if (val) {
                              updateBlockData(selectedBlock.id, {
                                items: [...(selectedBlock.data.items || []), val]
                              });
                              e.target.value = "";
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById("new-benefit-input");
                          const val = input?.value.trim();
                          if (val) {
                            updateBlockData(selectedBlock.id, {
                              items: [...(selectedBlock.data.items || []), val]
                            });
                            input.value = "";
                          }
                        }}
                        className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                      >
                        Add
                      </button>
                    </div>

                    <div className="space-y-2">
                      {selectedBlock.data.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-55 border border-slate-100 text-xs">
                          <span className="font-semibold text-slate-700">{item}</span>
                          <button
                            type="button"
                            onClick={() => {
                              updateBlockData(selectedBlock.id, {
                                items: selectedBlock.data.items.filter((_, i) => i !== idx)
                              });
                            }}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedBlock.type === "offerings" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Section Name (Optional Subtitle)</label>
                    <input
                      type="text"
                      value={selectedBlock.data.sectionName || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { sectionName: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      placeholder="e.g. CAPABILITIES"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Offering Bullet Icon</label>
                    <select
                      value={selectedBlock.data.bulletIcon || "CheckCircle2"}
                      onChange={(e) => updateBlockData(selectedBlock.id, { bulletIcon: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-blue-500"
                    >
                      <option value="">No Icon</option>
                      {lucideOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Section Image Settings */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Section Image (Optional)</label>
                    <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl bg-slate-50/50 p-4 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            updateBlockData(selectedBlock.id, {
                              imageFile: file,
                              imageUrl: URL.createObjectURL(file)
                            });
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {selectedBlock.data.imageUrl ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={selectedBlock.data.imageUrl}
                            alt="Preview"
                            style={{
                              width: selectedBlock.data.imageWidth ? `${selectedBlock.data.imageWidth}px` : '150px',
                              height: selectedBlock.data.imageHeight ? `${selectedBlock.data.imageHeight}px` : '100px'
                            }}
                            className="object-cover rounded-xl border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              updateBlockData(selectedBlock.id, { imageUrl: "", imageFile: null });
                            }}
                            className="text-[10px] text-red-650 text-red-650 text-red-600 font-bold uppercase"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 text-slate-400">
                          <Upload className="w-6 h-6 mb-2" />
                          <span className="text-[11px] font-bold">Add optional image</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedBlock.data.imageUrl && (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Width (px)</label>
                        <input
                          type="number"
                          value={selectedBlock.data.imageWidth || ""}
                          onChange={(e) => updateBlockData(selectedBlock.id, { imageWidth: e.target.value })}
                          className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Height (px)</label>
                        <input
                          type="number"
                          value={selectedBlock.data.imageHeight || ""}
                          onChange={(e) => updateBlockData(selectedBlock.id, { imageHeight: e.target.value })}
                          className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-555 uppercase">Position</label>
                        <select
                          value={selectedBlock.data.imagePosition || "right"}
                          onChange={(e) => updateBlockData(selectedBlock.id, { imagePosition: e.target.value })}
                          className="w-full h-9 px-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-blue-500"
                        >
                          <option value="top">Above the content</option>
                          <option value="bottom">Below the content</option>
                          <option value="left">Side by side (Left)</option>
                          <option value="right">Side by side (Right)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Dynamic checklist arrays */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Sub-Services / Offerings List</label>
                    <div className="flex gap-2">
                      <input
                        id="new-offering-input"
                        type="text"
                        placeholder="e.g. Headless Shopify store development"
                        className="flex-grow h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const val = e.target.value.trim();
                            if (val) {
                              updateBlockData(selectedBlock.id, {
                                items: [...(selectedBlock.data.items || []), val]
                              });
                              e.target.value = "";
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById("new-offering-input");
                          const val = input?.value.trim();
                          if (val) {
                            updateBlockData(selectedBlock.id, {
                              items: [...(selectedBlock.data.items || []), val]
                            });
                            input.value = "";
                          }
                        }}
                        className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                      >
                        Add
                      </button>
                    </div>

                    <div className="space-y-2">
                      {selectedBlock.data.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                          <span className="font-semibold text-slate-700">{item}</span>
                          <button
                            type="button"
                            onClick={() => {
                              updateBlockData(selectedBlock.id, {
                                items: selectedBlock.data.items.filter((_, i) => i !== idx)
                              });
                            }}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedBlock.type === "features" && (
                <div className="space-y-4">
                  {/* Repeatable subfields for features */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Add Feature Card</h4>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Title</label>
                      <input
                        id="feat-title"
                        type="text"
                        placeholder="e.g. Ultra-Fast CDN"
                        className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Icon</label>
                      <select
                        id="feat-icon"
                        className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs"
                      >
                        {lucideOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
                      <textarea
                        id="feat-desc"
                        rows={2}
                        placeholder="e.g. Configured with dynamic route edges."
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const titleInput = document.getElementById("feat-title");
                          const iconSelect = document.getElementById("feat-icon");
                          const descInput = document.getElementById("feat-desc");

                          if (titleInput?.value.trim() && descInput?.value.trim()) {
                            updateBlockData(selectedBlock.id, {
                              items: [
                                ...(selectedBlock.data.items || []),
                                {
                                  title: titleInput.value.trim(),
                                  icon: iconSelect.value,
                                  desc: descInput.value.trim()
                                }
                              ]
                            });
                            titleInput.value = "";
                            descInput.value = "";
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        Add Card
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Features Added ({selectedBlock.data.items?.length || 0})</label>
                    <div className="space-y-2">
                      {selectedBlock.data.items?.map((item, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{item.title} ({item.icon})</p>
                            <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              updateBlockData(selectedBlock.id, {
                                items: selectedBlock.data.items.filter((_, i) => i !== idx)
                              });
                            }}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedBlock.type === "process" && (
                <div className="space-y-4">
                  {/* Process Step repeatable cards */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Add Timeline Step</h4>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Number</label>
                        <input id="step-num" type="text" placeholder="e.g. 01" className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs" />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Title</label>
                        <input id="step-title" type="text" placeholder="e.g. Discovery Audit" className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
                      <textarea id="step-desc" rows={2} placeholder="e.g. Deep discovery analysis loop." className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs resize-none" />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const numInput = document.getElementById("step-num");
                          const titleInput = document.getElementById("step-title");
                          const descInput = document.getElementById("step-desc");

                          if (numInput?.value.trim() && titleInput?.value.trim() && descInput?.value.trim()) {
                            updateBlockData(selectedBlock.id, {
                              items: [
                                ...(selectedBlock.data.items || []),
                                {
                                  step: numInput.value.trim(),
                                  title: titleInput.value.trim(),
                                  desc: descInput.value.trim()
                                }
                              ]
                            });
                            numInput.value = "";
                            titleInput.value = "";
                            descInput.value = "";
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        Add Step
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Timeline Steps Added ({selectedBlock.data.items?.length || 0})</label>
                    <div className="space-y-2">
                      {selectedBlock.data.items?.map((item, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{item.step} - {item.title}</p>
                            <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              updateBlockData(selectedBlock.id, {
                                items: selectedBlock.data.items.filter((_, i) => i !== idx)
                              });
                            }}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedBlock.type === "faqs" && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Add FAQ</h4>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Question</label>
                      <input id="faq-q" type="text" placeholder="e.g. How secure is the platform?" className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs outline-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Answer</label>
                      <textarea id="faq-a" rows={3} placeholder="e.g. We use SSL and data partition guidelines." className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs resize-none" />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const qInput = document.getElementById("faq-q");
                          const aInput = document.getElementById("faq-a");

                          if (qInput?.value.trim() && aInput?.value.trim()) {
                            updateBlockData(selectedBlock.id, {
                              items: [
                                ...(selectedBlock.data.items || []),
                                { q: qInput.value.trim(), a: aInput.value.trim() }
                              ]
                            });
                            qInput.value = "";
                            aInput.value = "";
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        Add FAQ
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">FAQs Added ({selectedBlock.data.items?.length || 0})</label>
                    <div className="space-y-2">
                      {selectedBlock.data.items?.map((item, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{item.q}</p>
                            <p className="text-[11px] text-slate-500 mt-1">{item.a}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              updateBlockData(selectedBlock.id, {
                                items: selectedBlock.data.items.filter((_, i) => i !== idx)
                              });
                            }}
                            className="text-slate-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedBlock.type === "pricing" && (
                <div className="space-y-4">
                  {/* Hostinger-style pricing plan configuration */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Add Pricing Plan</h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Plan Name</label>
                        <input id="plan-name" type="text" placeholder="Premium Web Hosting" className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Price</label>
                        <input id="plan-price" type="text" placeholder="$2.99" className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Billing Period</label>
                        <input id="plan-period" type="text" placeholder="Monthly / Yearly" className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">CTA Button Text</label>
                        <input id="plan-cta-text" type="text" placeholder="Choose Plan" className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">CTA Link</label>
                      <input id="plan-cta-link" type="text" placeholder="/contact" className="w-full h-9 px-3 bg-white border border-slate-200 rounded-xl text-xs" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Plan Features (comma-separated)</label>
                      <textarea id="plan-feats" rows={2} placeholder="100 Websites, Free SSL, Unlimited Databases" className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs resize-none" />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const name = document.getElementById("plan-name");
                          const price = document.getElementById("plan-price");
                          const period = document.getElementById("plan-period");
                          const ctaText = document.getElementById("plan-cta-text");
                          const ctaLink = document.getElementById("plan-cta-link");
                          const feats = document.getElementById("plan-feats");

                          if (name?.value.trim() && price?.value.trim()) {
                            const featuresArray = feats.value
                              .split(",")
                              .map((f) => f.trim())
                              .filter(Boolean);

                            updateBlockData(selectedBlock.id, {
                              items: [
                                ...(selectedBlock.data.items || []),
                                {
                                  name: name.value.trim(),
                                  price: price.value.trim(),
                                  period: period.value.trim(),
                                  ctaText: ctaText.value.trim() || "Choose Plan",
                                  ctaLink: ctaLink.value.trim() || "/contact",
                                  features: featuresArray
                                }
                              ]
                            });

                            name.value = "";
                            price.value = "";
                            period.value = "";
                            ctaText.value = "";
                            ctaLink.value = "";
                            feats.value = "";
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                      >
                        Add Plan Card
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Plans Added ({selectedBlock.data.items?.length || 0})</label>
                    <div className="space-y-2">
                      {selectedBlock.data.items?.map((item, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between gap-4 text-xs">
                          <div>
                            <p className="font-bold text-slate-900">{item.name} ({item.price})</p>
                            <p className="text-[10px] text-slate-500 mt-1">{item.features?.join(", ")}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              updateBlockData(selectedBlock.id, {
                                items: selectedBlock.data.items.filter((_, i) => i !== idx)
                              });
                            }}
                            className="text-slate-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedBlock.type === "seo" && (
                <div className="space-y-4">
                  {/* SEO structured attributes (Schema, meta, focus phrase) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Meta Title Tag</label>
                    <input
                      type="text"
                      value={selectedBlock.data.metaTitle || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { metaTitle: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-55 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Meta Description</label>
                    <textarea
                      rows={3}
                      value={selectedBlock.data.metaDescription || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { metaDescription: e.target.value })}
                      className="w-full p-4 bg-slate-55 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Focus Keyphrase</label>
                    <input
                      type="text"
                      placeholder="e.g. cloud database systems, logo branding"
                      value={selectedBlock.data.focusKeyword || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { focusKeyword: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-55 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">JSON-LD Structured Schema</label>
                    <textarea
                      rows={5}
                      value={selectedBlock.data.structuredSchema || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { structuredSchema: e.target.value })}
                      className="w-full p-4 bg-slate-55 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {selectedBlock.type === "industries" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Section Title</label>
                    <input
                      type="text"
                      value={selectedBlock.data.title || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { title: e.target.value })}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Section Description</label>
                    <textarea
                      rows={3}
                      value={selectedBlock.data.description || ""}
                      onChange={(e) => updateBlockData(selectedBlock.id, { description: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Industries List</label>
                    <div className="flex gap-2">
                      <input
                        id="new-industry-input"
                        type="text"
                        placeholder="e.g. Healthcare, Finance"
                        className="flex-grow h-11 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = e.target.value.trim();
                            if (val) {
                              updateBlockData(selectedBlock.id, {
                                items: [...(selectedBlock.data.items || []), val]
                              });
                              e.target.value = "";
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById("new-industry-input");
                          const val = input?.value.trim();
                          if (val) {
                            updateBlockData(selectedBlock.id, {
                              items: [...(selectedBlock.data.items || []), val]
                            });
                            input.value = "";
                          }
                        }}
                        className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                      >
                        Add
                      </button>
                    </div>

                    <div className="space-y-2">
                      {selectedBlock.data.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                          <span className="font-semibold text-slate-700">{item}</span>
                          <button
                            type="button"
                            onClick={() => {
                              updateBlockData(selectedBlock.id, {
                                items: selectedBlock.data.items.filter((_, i) => i !== idx)
                              });
                            }}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
