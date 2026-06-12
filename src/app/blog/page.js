"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Calendar, User, ArrowUpRight, Loader2, BookOpen } from "lucide-react";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from "next/link";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticArticles = [
    {
      id: "static-1",
      title: "Custom Ecommerce Website vs Shopify – Which One Is Better in 2026?",
      excerpt: "If you are planning to launch an online store, one of the biggest decisions you will face is choosing between a fully custom ecommerce framework and Shopify. We break down parameters such as server load speeds, transaction fees, checkout API configurations, and operational limits.",
      author: "Nishith Prajapati",
      date: "June 2, 2026",
      category: "Ecommerce",
      slug: "ecommerce-shopify-comparison-2026"
    },
    {
      id: "static-2",
      title: "🚀 15 Must-Have Features Required for Ecommerce Website in 2026",
      excerpt: "Discover the critical, next-generation functionalities and checkout integrations your online store needs to thrive in 2026. Explore headless shop integrations, omnichannel inventory management, progressive web app (PWA) frameworks, and AI recommendation engines.",
      author: "Kathan Patel",
      date: "May 14, 2026",
      category: "Ecommerce",
      slug: "ecommerce-features-2026"
    },
    {
      id: "static-3",
      title: "Best IT Company in Ahmedabad: How to Choose the Right Partner in 2026",
      excerpt: "Selecting the right software development agency is critical for your project's longevity. Here is your comprehensive evaluation framework to rate tech partners in Ahmedabad on transparency, code modularity, agile lifecycle, and containerized deployment pipelines.",
      author: "Kathan Patel",
      date: "May 1, 2026",
      category: "IT Strategy",
      slug: "best-it-company-ahmedabad-2026"
    }
  ];

  useEffect(() => {
    async function loadBlogs() {
      try {
        const snapshot = await getDocs(collection(db, "blogs"));
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort in Javascript to avoid Firestore index errors
        fetched.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setBlogs(fetched.length > 0 ? fetched : staticArticles);
      } catch (error) {
        console.error("Error reading blogs:", error);
        setBlogs(staticArticles);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const timer = setTimeout(() => {
      const animatableElements = document.querySelectorAll(
        "section, .reveal-item, .reveal-stagger"
      );
      animatableElements.forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [blogs]);

  return (
    <>
      <Navbar activeSection="blog" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />
      
      <main className="flex-grow reveal-container relative z-[1] pt-28">
        
        {/* Blog Directory Hero */}
        <section className="py-20 bg-transparent">
          <div className="reveal-item max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse-soft">
              <Sparkles className="w-3.5 h-3.5" />
              Insights &amp; Industry Trends
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6 max-w-4xl mx-auto">
              Our latest articles <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">&amp; analysis.</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Stay up to date with modern web standards, software budget guides, and strategic marketing tips from our senior engineering team.
            </p>
          </div>
        </section>

        {/* Article Index Grid */}
        <section className="py-20 bg-gradient-to-tr from-[#fcfaff]/40 to-[#f4f2ff]/40 backdrop-blur-[6px] border-t border-[#eae6fa]/40">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 mb-12 text-center">
              All Publications
            </h2>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Syncing feed...</span>
              </div>
            ) : blogs.length > 0 ? (
              <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogs.map((art) => (
                  <div
                    key={art.id}
                    className="p-8 hover-btn rounded-3xl border border-slate-200/40 bg-white/80 hover:bg-white hover:shadow-xl hover:shadow-purple-50/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {art.imageUrl && (
                        <div className="w-full aspect-[1.8] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 mb-6">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-xs text-slate-400 font-bold mb-4">
                        <span className="inline-flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {art.author || "Yunawise Contributor"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {art.date}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-4 hover:text-purple-600 transition-colors leading-snug">
                        {art.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {art.excerpt}
                      </p>
                    </div>

                    <Link href={`/blog/${art.slug}`} className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-purple-600 transition-colors border-t border-slate-100 pt-4 cursor-pointer group">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border border-dashed border-slate-200 rounded-3xl bg-white/70 flex flex-col items-center justify-center">
                <BookOpen className="w-12 h-12 text-slate-300 mb-3" />
                <span className="text-sm font-bold text-slate-400">No blog posts found.</span>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
