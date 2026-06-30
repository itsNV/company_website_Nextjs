"use client";

import Link from "next/link";
import { Lock, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectCard({ project, index }) {
    // Generate upper-case categories combining platform type and tech stack
    const categories = [
        project.platform_type,
        ...(project.tech_stack || []).slice(0, 2)
    ].filter(Boolean).join(" / ").toUpperCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: Math.min(index, 5) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group relative flex flex-col justify-end w-full aspect-[4/3] min-h-[340px] bg-slate-900 rounded-[28px] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.25)] hover:-translate-y-2 transition-all duration-500 border border-slate-800/10"
        >
            {/* Top accent line on hover */}
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-[65%] overflow-hidden z-0">
                {project.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500 font-bold uppercase tracking-wider text-xs">
                    No Preview Available
                  </div>
                )}
            </div>

            {/* Bottom Dark Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500 z-10 pointer-events-none" /> */}

            {/* Info and Action Contents */}
            <div className="relative z-20 p-6 md:p-8 flex items-end justify-between gap-6 w-full">
                {/* Left side text items */}
                <div className="space-y-2 flex-grow max-w-[70%]">
                    {categories && (
                        <p className="text-[10px] font-black tracking-widest text-cyan-400 font-outfit uppercase leading-relaxed line-clamp-1">
                            {categories}
                        </p>
                    )}
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight font-outfit text-white group-hover:text-cyan-300 transition-colors duration-300 leading-tight">
                        {project.title}
                    </h3>
                </div>

                {/* Right side status and action elements */}
                <div className="flex flex-col items-end gap-4 shrink-0 z-30">
                    {/* Status badge pill */}
                    {!project.live_url ? (
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold text-slate-300 bg-slate-900/60 backdrop-blur-sm border border-slate-700/40 rounded-full px-3 py-1 shadow-sm">
                            <Lock className="w-2.5 h-2.5" /> Confidential
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold text-white bg-blue-950/60 backdrop-blur-sm border border-blue-800/40 rounded-full px-3 py-1 shadow-sm">
                            <ExternalLink className="w-2.5 h-2.5 text-blue-400" /> Live
                        </span>
                    )}

                    {/* Action circle button */}
                    <div className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 group-hover:bg-green-500 transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>
        </Link>
        </motion.div>
    );
}
