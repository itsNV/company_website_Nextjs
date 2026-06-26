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
  PROJECT_BLOCK_PALETTE,
  createProjectBlock,
  getDefaultProjectBlocks,
} from "@/lib/projectBuilderBlocks";
import { ProjectBlockPreview, PaletteIcon } from "./ProjectBlockPreview";
import ProjectBlockEditor from "./ProjectBlockEditor";

const DRAG_NEW = "project-block-new";
const DRAG_REORDER = "project-block-reorder";

const PALETTE_COLORS = {
  rose: "border-rose-200 bg-rose-50/80 hover:border-rose-400 text-rose-700",
  purple: "border-purple-200 bg-purple-50/80 hover:border-purple-400 text-purple-700",
  emerald: "border-emerald-200 bg-emerald-50/80 hover:border-emerald-400 text-emerald-700",
};

export default function ProjectPageBuilder({
  blocks: controlledBlocks,
  onChange,
  onPublish,
  publishing = false,
  publishLabel = "Publish Project",
  message,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const blocks = controlledBlocks?.length ? controlledBlocks : getDefaultProjectBlocks();
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
    const newBlock = createProjectBlock(type);
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
    if (copy.data.imageFile) {
      copy.data.imageFile = null;
    }
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
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[60vh]">
      {/* Left Sidebar: Palette */}
      {!previewMode && (
        <aside className="xl:col-span-3 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xl h-fit xl:sticky xl:top-28">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <LayoutGrid className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-outfit">
              Blocks Palette
            </h3>
          </div>
          <p className="text-[10px] text-slate-500 mb-4 leading-relaxed font-semibold">
            Drag a section below onto the builder canvas to construct or reorder layout flows.
          </p>
          <div className="grid grid-cols-1 gap-2">
            {PROJECT_BLOCK_PALETTE.map((item) => (
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
                    <p className="text-xs font-bold text-slate-900 leading-tight">{item.label}</p>
                    <p className="text-[9px] text-slate-500 truncate mt-0.5">{item.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addBlockAt(item.type, blocks.length);
                  }}
                  className="p-1.5 rounded-lg bg-white/80 border border-slate-200 hover:bg-purple-50 hover:text-purple-600 transition-colors shadow-sm shrink-0"
                  title="Tap to add to end"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Center Canvas & Right Property Editor */}
      <div className={`${previewMode ? "xl:col-span-12" : "xl:col-span-9"} flex flex-col gap-4`}>
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200/60 rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                previewMode ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-purple-50"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {previewMode ? "Editor Mode" : "Preview Canvas"}
            </button>
            <span className="text-[9px] text-slate-400 font-extrabold uppercase bg-slate-50 border px-2 py-0.5 rounded-md">
              {blocks.length} section{blocks.length !== 1 ? "s" : ""}
            </span>
          </div>

          {onPublish && (
            <button
              type="button"
              onClick={onPublish}
              disabled={publishing}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl shadow-md disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {publishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" /> Saving...
                </>
              ) : (
                publishLabel
              )}
            </button>
          )}
        </div>

        {message?.text && (
          <div
            className={`p-3.5 rounded-xl text-xs font-semibold border ${
              message.type === "success"
                ? "bg-teal-50 border-teal-200 text-teal-700"
                : "bg-rose-50 border-rose-200 text-rose-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
          {/* Active Canvas */}
          <div
            className={`${previewMode || !selectedBlock ? "lg:col-span-12" : "lg:col-span-7"} bg-gradient-to-br from-slate-100/80 to-purple-50/30 border border-slate-200/60 rounded-3xl p-4 sm:p-5 min-h-[480px]`}
            onDragOver={handleCanvasDragOver}
            onDrop={handleCanvasDrop}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 min-h-[440px] overflow-hidden">
              <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                <span className="ml-3 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Showcase Preview
                </span>
              </div>

              <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4">
                {blocks.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-purple-200 rounded-2xl bg-purple-50/20"
                    onDragOver={(e) => handleDragOver(e, 0)}
                    onDrop={(e) => handleDrop(e, 0)}
                  >
                    <LayoutGrid className="w-10 h-10 text-purple-300 mb-3 animate-pulse" />
                    <p className="text-sm font-bold text-slate-650">No sections added</p>
                    <p className="text-xs text-slate-400 mt-1">Drag and drop sections here</p>
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
                            className={`h-2.5 -my-0.5 rounded transition-all ${
                              dragOverIndex === index
                                ? "h-8 bg-purple-100/80 border border-dashed border-purple-450 my-1"
                                : "hover:h-4 hover:bg-purple-50/50"
                            }`}
                          />
                        )}

                        <div
                          onClick={() => !previewMode && setSelectedId(block.id)}
                          className={`relative group rounded-2xl transition-all ${
                            !previewMode && selectedId === block.id
                              ? "ring-2 ring-purple-650 ring-offset-2 bg-purple-50/10 shadow-sm"
                              : !previewMode
                                ? "hover:ring-1 hover:ring-purple-200 cursor-pointer"
                                : ""
                          }`}
                        >
                          {/* Drag reorder trigger */}
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

                          {/* Control actions */}
                          {!previewMode && selectedId === block.id && (
                            <div className="absolute right-2 top-2 z-10 flex gap-1 bg-white border border-slate-200 p-1 rounded-xl shadow-sm lg:-right-2 lg:top-2 lg:flex-col lg:bg-transparent lg:shadow-none lg:border-none lg:p-0">
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

                          <ProjectBlockPreview block={block} />
                        </div>
                      </div>
                    ))}

                    {/* Bottom Drop Zone */}
                    {!previewMode && (
                      <div
                        onDragOver={(e) => handleDragOver(e, blocks.length)}
                        onDrop={(e) => handleDrop(e, blocks.length)}
                        className={`mt-4 py-4 rounded-2xl border-2 border-dashed text-center transition-all ${
                          dragOverIndex === blocks.length
                            ? "border-purple-400 bg-purple-50"
                            : "border-slate-200 text-slate-400 hover:border-purple-200 hover:bg-purple-50/20"
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wider">+ Drop section here</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Property Editor */}
          {!previewMode && selectedBlock && (
            <div className="lg:col-span-5 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xl h-fit lg:sticky lg:top-28">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-outfit">
                  Properties Editor
                </h3>
                <span className="text-[9px] font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase">
                  {selectedBlock.type}
                </span>
              </div>
              <ProjectBlockEditor
                block={selectedBlock}
                onChange={(data) => updateBlockData(selectedBlock.id, data)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
