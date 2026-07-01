"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { getProjects } from "@/lib/firebase/projects";
import { ProjectCard } from "./projectcard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Filter to show only featured and published projects, limited to 3
  const featuredProjects = projects
    .filter((proj) => proj.featured && proj.is_published)
    .slice(0, 3);

  return (
    <section id="works" className="py-4 md:py-12 lg:py-16 bg-transparent border-y border-[#eae6fa]/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal-item text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            Featured Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-outfit text-slate-900 mt-4 mb-6">
            Innovative <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">work</span> crafted to deliver results.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Take a look at some of our top-featured enterprise applications, e-commerce stores, and high-performance software setups.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading && featuredProjects.map((proj, idx) => (
            <ProjectCard key={proj.id || idx} project={proj} index={idx} />
          ))}
        </div>

        {/* View All Button */}
        <div className="reveal-item flex justify-center mt-16">
          <a
            href="/projects"
            className="hover-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-950 text-white font-bold hover:bg-primary transition-all duration-300 shadow-lg"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

