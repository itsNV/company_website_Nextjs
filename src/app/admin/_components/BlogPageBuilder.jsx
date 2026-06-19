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
  Plus,
} from "lucide-react";
import {
  BLOG_BLOCK_PALETTE,
  createBlock,
  getDefaultBlocks,
} from "@/lib/blogBlocks";
import { BlogBlockPreview, PaletteIcon } from "./BlogBlockPreview";
import BlogBlockEditor from "./BlogBlockEditor";

const DRAG_NEW = "blog-block-new";
const DRAG_REORDER = "blog-block-reorder";

const PALETTE_COLORS = {
  purple: "border-purple-200 bg-purple-50/80 hover:border-purple-400 text-purple-700",
  indigo: "border-indigo-200 bg-indigo-50/80 hover:border-indigo-400 text-indigo-700",
  violet: "border-violet-200 bg-violet-50/80 hover:border-violet-400 text-violet-700",
  slate: "border-slate-200 bg-slate-50/80 hover:border-slate-400 text-slate-700",
  blue: "border-blue-200 bg-blue-50/80 hover:border-blue-400 text-blue-700",
  emerald: "border-emerald-200 bg-emerald-50/80 hover:border-emerald-400 text-emerald-700",
  rose: "border-rose-200 bg-rose-50/80 hover:border-rose-400 text-rose-700",
  cyan: "border-cyan-200 bg-cyan-50/80 hover:border-cyan-400 text-cyan-700",
  amber: "border-amber-200 bg-amber-50/80 hover:border-amber-400 text-amber-700",
  fuchsia: "border-fuchsia-200 bg-fuchsia-50/80 hover:border-fuchsia-400 text-fuchsia-700",
  gray: "border-gray-200 bg-gray-50/80 hover:border-gray-400 text-gray-700",
  teal: "border-teal-200 bg-teal-50/80 hover:border-teal-400 text-teal-700",
  orange: "border-orange-200 bg-orange-50/80 hover:border-orange-400 text-orange-700",
};

export default function BlogPageBuilder({
  blocks: controlledBlocks,
  onChange,
  categories,
  onPublish,
  publishing = false,
  publishLabel = "Publish Blog Post",
  message,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const blocks = controlledBlocks?.length ? controlledBlocks : getDefaultBlocks();
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
    const newBlock = createBlock(type);
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
    const copy = { ...blocks[idx], id: `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, data: { ...blocks[idx].data, imageFile: null } };
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
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[70vh]">
      {/* Left: Component Palette */}
      {!previewMode && (
        <aside className="xl:col-span-3 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xl h-fit xl:sticky xl:top-28">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <LayoutGrid className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-outfit">
              Components
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
            Drag a component onto the canvas to build your blog layout.
          </p>
          <div className="grid grid-cols-1 gap-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {BLOG_BLOCK_PALETTE.map((item) => (
              <div
                key={item.type}
                draggable
                onDragStart={(e) => handlePaletteDragStart(e, item.type)}
                className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-grab active:cursor-grabbing transition-all ${PALETTE_COLORS[item.color]}`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-grow">
                  <div className="w-9 h-9 rounded-lg bg-white/80 border border-white flex items-center justify-center shrink-0 shadow-sm">
                    <PaletteIcon iconName={item.icon} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900">{item.label}</p>
                    <p className="text-[10px] text-slate-500 truncate">{item.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addBlockAt(item.type, blocks.length);
                  }}
                  className="p-1.5 rounded-lg bg-white/80 border border-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors shadow-sm shrink-0"
                  title="Tap to add"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Right: Canvas + Editor */}
      <div className={`${previewMode ? "xl:col-span-12" : "xl:col-span-9"} flex flex-col gap-4`}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200/60 rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                previewMode ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-purple-50"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {previewMode ? "Edit Mode" : "Preview"}
            </button>
            <span className="text-[10px] text-slate-400 font-bold uppercase">
              {blocks.length} block{blocks.length !== 1 ? "s" : ""}
            </span>
          </div>
          {onPublish && (
            <button
              type="button"
              onClick={onPublish}
              disabled={publishing}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl shadow-md disabled:opacity-60"
            >
              {publishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                publishLabel
              )}
            </button>
          )}
        </div>

        {message?.text && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold border ${
              message.type === "success"
                ? "bg-teal-50 border-teal-200 text-teal-700"
                : "bg-rose-50 border-rose-200 text-rose-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
          {/* Canvas */}
          <div
            className={`${previewMode || !selectedBlock ? "lg:col-span-12" : "lg:col-span-7"} bg-gradient-to-br from-slate-100/80 to-purple-50/30 border border-slate-200/60 rounded-3xl p-4 sm:p-6 min-h-[500px]`}
            onDragOver={handleCanvasDragOver}
            onDrop={handleCanvasDrop}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 min-h-[460px] overflow-hidden">
              <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                <span className="ml-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Blog Preview
                </span>
              </div>

              <div className="p-6 sm:p-8 max-w-3xl mx-auto">
                {blocks.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-purple-200 rounded-2xl bg-purple-50/30"
                    onDragOver={(e) => handleDragOver(e, 0)}
                    onDrop={(e) => handleDrop(e, 0)}
                  >
                    <LayoutGrid className="w-10 h-10 text-purple-300 mb-3" />
                    <p className="text-sm font-bold text-slate-600">Drop components here</p>
                    <p className="text-xs text-slate-400 mt-1">Drag from the left panel</p>
                  </div>
                ) : (
                  <>
                    {blocks.map((block, index) => (
                      <div key={block.id}>
                        {/* Drop zone above */}
                        {!previewMode && (
                          <div
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragLeave={() => setDragOverIndex(null)}
                            onDrop={(e) => handleDrop(e, index)}
                            className={`h-3 -my-1 rounded transition-all ${
                              dragOverIndex === index
                                ? "h-8 bg-purple-100 border-2 border-dashed border-purple-400 my-1"
                                : "hover:h-5 hover:bg-purple-50/50"
                            }`}
                          />
                        )}

                        <div
                          onClick={() => !previewMode && setSelectedId(block.id)}
                          className={`relative group rounded-xl transition-all ${
                            !previewMode && selectedId === block.id
                              ? "ring-2 ring-purple-500 ring-offset-2 bg-purple-50/20"
                              : !previewMode
                                ? "hover:ring-1 hover:ring-purple-200 cursor-pointer"
                                : ""
                          }`}
                        >
                          {!previewMode && (
                            <div className="absolute -left-2 top-2 z-10 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                draggable
                                onDragStart={(e) => {
                                  e.stopPropagation();
                                  handleBlockDragStart(e, block.id);
                                }}
                                className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm cursor-grab hover:border-purple-300"
                                title="Drag to reorder"
                              >
                                <GripVertical className="w-3.5 h-3.5 text-slate-400" />
                              </button>
                            </div>
                          )}

                          {!previewMode && selectedId === block.id && (
                            <div className="absolute right-2 top-2 z-10 flex gap-1 bg-white/95 backdrop-blur border border-slate-200/85 p-1 rounded-xl shadow-md lg:shadow-none lg:border-none lg:bg-transparent lg:p-0 lg:-right-2 lg:top-2 lg:flex-col">
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); moveBlock(block.id, -1); }}
                                className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-purple-300"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 1); }}
                                className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-purple-300"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); duplicateBlock(block.id); }}
                                className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-purple-300"
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

                          <BlogBlockPreview block={block} isSelected={selectedId === block.id} />
                        </div>
                      </div>
                    ))}

                    {!previewMode && (
                      <div
                        onDragOver={(e) => handleDragOver(e, blocks.length)}
                        onDrop={(e) => handleDrop(e, blocks.length)}
                        className={`mt-4 py-6 rounded-xl border-2 border-dashed text-center transition-all ${
                          dragOverIndex === blocks.length
                            ? "border-purple-400 bg-purple-50"
                            : "border-slate-200 text-slate-400 hover:border-purple-200 hover:bg-purple-50/30"
                        }`}
                      >
                        <p className="text-xs font-bold">+ Drop component here</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Property Editor */}
          {!previewMode && selectedBlock && (
            <div className="lg:col-span-5 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xl h-fit lg:sticky lg:top-28">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-outfit">
                  Edit Block
                </h3>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase">
                  {BLOG_BLOCK_PALETTE.find((p) => p.type === selectedBlock.type)?.label || selectedBlock.type}
                </span>
              </div>
              <BlogBlockEditor
                block={selectedBlock}
                categories={categories}
                onChange={(data) => updateBlockData(selectedBlock.id, data)}
                onSizeChange={(size) => updateBlock(selectedBlock.id, { size })}
                onPositionChange={(position) => updateBlock(selectedBlock.id, { position })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
