"use client";

import Link from "next/link";
import { Lock, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";



export function ProjectCard({ project, index }) {
    // Stagger up to 6 cards on initial load, then cap delay so later cards appear immediately
    const delay = Math.min(index, 5) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: Math.min(index, 5) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative flex flex-col w-full bg-white border border-neutral-100 rounded-3xl overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(45,212,191,0.25)] hover:-translate-y-2 transition-all duration-300"
        >
            {/* Top accent line on hover */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            <div className="p-6 sm:p-8 md:p-9 flex flex-col flex-1 min-h-[320px] justify-between">
                <div>
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
                            {project.platform_type}
                        </span>
                        {!project.live_url ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-400 bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1">
                                <Lock className="w-2.5 h-2.5" /> Confidential
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 rounded-lg px-2.5 py-1">
                                <ExternalLink className="w-2.5 h-2.5" /> Live
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight font-heading text-neutral-900 group-hover:text-blue-600 transition-colors duration-200 leading-[1.2] mb-3">
                        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
                            {project.title}
                        </Link>
                    </h3>

                    {/* Tagline */}
                    <p className="text-[15px] text-neutral-500 leading-relaxed mb-6 font-medium">
                        {project.tagline}
                    </p>

                    {/* Impact snippet */}
                    {project.business_impact && (
                        <div className="bg-blue-50/50 border-l-[3px] border-blue-600 rounded-r-xl pl-4 pr-5 py-3.5 mb-6">
                            <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-1">Impact</p>
                            <p className="text-[13px] font-semibold text-neutral-700 leading-snug line-clamp-2">
                                {project.business_impact}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-100 pt-6 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5 max-w-[85%]">
                        {project.tech_stack?.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-[11px] font-bold text-neutral-400 px-2 py-1 bg-neutral-50 rounded-md border border-neutral-100">
                                {tag}
                            </span>
                        ))}
                        {(project.tech_stack?.length ?? 0) > 4 && (
                            <span className="text-[11px] font-bold text-neutral-400 px-2 py-1">
                                +{(project.tech_stack?.length ?? 0) - 4}
                            </span>
                        )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                </div>
            </div>
        </motion.div>
    );
}
