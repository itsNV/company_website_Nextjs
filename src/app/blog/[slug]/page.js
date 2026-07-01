"use client";

import React, { use, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowLeft, 
  ArrowUpRight,
  Calendar, 
  User, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  HelpCircle, 
  ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import BlogBlocksDisplay from "@/components/BlogBlocksDisplay";
import BlogContentDisplay from "@/components/BlogContentDisplay";

export default function BlogDetailsPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  // Fallback static articles to ensure zero downtime or display if db is empty
  const staticArticles = [
    {
      id: "static-1",
      title: "Custom Ecommerce Website vs Shopify – Which One Is Better in 2026?",
      excerpt: "If you are planning to launch an online store, one of the biggest decisions you will face is choosing between a fully custom ecommerce framework and Shopify.",
      author: "Nishith Prajapati",
      date: "June 2, 2026",
      category: "Ecommerce",
      slug: "ecommerce-shopify-comparison-2026",
      contentSections: [
        {
          emoji: "🛒",
          title: "Why This Decision Matters in 2026",
          body: "Choosing between Shopify and a custom ecommerce build affects your long-term costs, flexibility, and performance.",
          bulletPoints: [
            "Shopify offers fast setup but recurring app and transaction fees",
            "Custom builds provide full design freedom and better performance",
            "Headless architectures scale better for growing brands",
          ],
          imageUrl: "",
        },
        {
          emoji: "📊",
          title: "Cost Comparison Breakdown",
          body: "Understanding the true cost of ownership helps you make an informed decision.",
          bulletPoints: [
            "Shopify: $29–$299/month plus 0.5–2% transaction fees",
            "Custom: Higher upfront, lower long-term operational costs",
            "App subscriptions on Shopify can add $200+/month quickly",
          ],
          imageUrl: "",
        },
      ],
      problem: "Shopify offers quick setups but quickly becomes expensive due to app subscriptions and transaction fees, while limiting custom layout structures.",
      solution: "Building a headless ecommerce store with a custom framework offers total design freedom, sub-second load times, and zero operational fees.",
      tech_stack: ["Next.js", "Tailwind CSS", "Node.js", "Firebase", "Stripe"],
      faqs: [
        {
          q: "What are Shopify's hidden transaction fees?",
          a: "Shopify charges up to 2% per transaction if you don't use Shopify Payments, plus monthly app subscriptions that accumulate fast."
        }
      ]
    },
    {
      id: "static-2",
      title: "🚀 15 Must-Have Features Required for Ecommerce Website in 2026",
      excerpt: "Discover the critical, next-generation functionalities and checkout integrations your online store needs to thrive in 2026.",
      author: "Kathan Patel",
      date: "May 14, 2026",
      category: "Ecommerce",
      slug: "ecommerce-features-2026",
      problem: "Traditional ecommerce stores fail to retain users due to slow page loads and complex checkout flows.",
      solution: "Implement AI recommendation engines, headless configurations, sub-second page loads, and simplified 1-click checkout pages.",
      tech_stack: ["Shopify Plus", "React", "GraphQL", "Tailwind CSS"],
      faqs: []
    },
    {
      id: "static-3",
      title: "Best IT Company in Ahmedabad: How to Choose the Right Partner in 2026",
      excerpt: "Selecting the right software development agency is critical for your project's longevity. Here is your comprehensive evaluation framework.",
      author: "Kathan Patel",
      date: "May 1, 2026",
      category: "IT Strategy",
      slug: "best-it-company-ahmedabad-2026",
      problem: "Many clients struggle to find transparent development teams that adhere to strict timelines and clean coding standards.",
      solution: "Evaluate partners based on their Git practices, containerized deployment pipelines, and agile iteration transparency.",
      tech_stack: ["Agile Development", "Docker", "GitLab CI"],
      faqs: []
    }
  ];

  function getRelatedBlogs(allBlogs, currentBlog) {
    return allBlogs
      .filter((b) => b.category === currentBlog.category && b.slug !== currentBlog.slug)
      .sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0))
      .slice(0, 3);
  }

  useEffect(() => {
    async function loadBlog() {
      try {
        const snapshot = await getDocs(collection(db, "blogs"));
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const allBlogs = fetched.length > 0 ? fetched : staticArticles;
        const found =
          fetched.length > 0
            ? fetched.find((a) => a.slug === slug)
            : staticArticles.find((a) => a.slug === slug);

        if (found) {
          setBlog(found);
          setRelatedBlogs(getRelatedBlogs(allBlogs, found));
        } else {
          setBlog(null);
          setRelatedBlogs([]);
        }
      } catch (error) {
        console.error("Error loading blog details:", error);
        const found = staticArticles.find((a) => a.slug === slug);
        if (found) {
          setBlog(found);
          setRelatedBlogs(getRelatedBlogs(staticArticles, found));
        } else {
          setBlog(null);
          setRelatedBlogs([]);
        }
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [slug]);

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
  }, [blog]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-slate-50/30">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Article...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-slate-50/30">
          <div className="text-center p-8 max-w-md bg-white border border-slate-200/60 rounded-3xl shadow-xl">
            <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-6" />
            <h1 className="text-2xl font-black font-outfit text-slate-900 mb-2">Article Not Found</h1>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">The insights article you are looking for does not exist or has been archived.</p>
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog Feed
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar activeSection="blog" />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      <main className="flex-grow pt-25 sm:pt-25 lg:pt-28 pb-10 lg:pb-16 bg-transparent relative z-10 reveal-container">
        
        {/* Breadcrumb — always visible */}
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Link href="/blog" className="hover:text-purple-600 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Blog
            </Link>
            <span>/</span>
            <span className="text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">{blog.category}</span>
          </div>
        </div>

        {/* Legacy Hero — only when no block layout */}
        {!blog.blocks?.length && (
        <section className="md:py-12 py-10 reveal-item">
          <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-4 text-xs text-slate-400 font-bold mb-6">
                <span className="inline-flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  By {blog.author}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {blog.date}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 leading-tight mb-6">
                {blog.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                {blog.excerpt}
              </p>
            </div>
            <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-6 shadow-xl flex flex-col items-center justify-center">
              {blog.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={blog.imageUrl} alt={blog.title} className="w-full aspect-[1.5] object-cover rounded-2xl border border-slate-100" />
              ) : (
                <div className="w-full aspect-[1.5] bg-purple-50 border border-purple-100 rounded-2xl flex flex-col items-center justify-center text-center p-4">
                  <Sparkles className="w-8 h-8 text-purple-600 mb-2 animate-pulse" />
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">{blog.category} Spotlight</span>
                </div>
              )}
            </div>
          </div>
        </section>
        )}

        {/* Blog Content — block-based or legacy */}
        {blog.blocks?.length > 0 ? (
          <BlogBlocksDisplay
            blocks={blog.blocks}
            blogMeta={{ title: blog.title, excerpt: blog.excerpt, author: blog.author, category: blog.category, date: blog.date }}
          />
        ) : (
          <>
        {/* Rich Content Sections */}
        {blog.contentSections?.length > 0 ? (
          <BlogContentDisplay sections={blog.contentSections} />
        ) : (
          <>
        {/* Legacy: Challenge & Technical Solution */}
        {(blog.problem || blog.solution) && (
          <section className="py-10 md:py-12 lg:py-16 bg-white/40 border-y border-[#eae6fa]/25">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="reveal-item text-3xl font-extrabold font-outfit text-slate-900 text-center mb-16">Deep Analysis</h2>
              <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {blog.problem && (
                  <div className="hover-box group p-8 rounded-3xl border border-slate-200/60 bg-white shadow-sm">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center border border-rose-100 bg-rose-50 text-rose-600 mb-6 font-bold">
                      01
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">The Core Challenge</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{blog.problem}</p>
                  </div>
                )}

                {blog.solution && (
                  <div className="hover-box group p-8 rounded-3xl border border-slate-200/60 bg-white shadow-sm">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center border border-purple-100 bg-purple-50 text-purple-600 mb-6 font-bold">
                      02
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">Our Assessment</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{blog.solution}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
          </>
        )}
          </>
        )}

        {/* Tech Stack Spotlight — only for legacy blogs without blocks */}
        {!blog.blocks?.length && blog.tech_stack?.length > 0 && (
          <section className="py-10 md:py-12">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center justify-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-600" /> Technologies Addressed
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {blog.tech_stack.map((tech, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs — only for legacy blogs without blocks */}
        {!blog.blocks?.length && blog.faqs?.length > 0 && (
          <section className="py-10 md:py-12 lg:py-16">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold font-outfit text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-4">
                {blog.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm overflow-hidden transition-all">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-6 text-left font-bold font-outfit text-slate-900 hover:text-purple-600 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-purple-500 shrink-0" />
                          {faq.q}
                        </span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="p-6 pt-0 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Related Articles — same category */}
        {relatedBlogs.length > 0 && (
          <section className="py-10 md:py-12 lg:py-16 bg-gradient-to-tr from-[#fcfaff]/40 to-[#f4f2ff]/40 backdrop-blur-[6px] border-t border-[#eae6fa]/40">
            <div className="max-w-7xl mx-auto px-6">
              <div className="reveal-item flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full">
                    {blog.category}
                  </span>
                  <h2 className="text-3xl font-extrabold font-outfit text-slate-900 mt-4">
                    More in this category
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 hover:text-slate-900 transition-colors group shrink-0"
                >
                  View More
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedBlogs.map((art) => (
                  <Link
                    key={art.id}
                    href={`/blog/${art.slug}`}
                    className="p-6 hover-btn rounded-3xl border border-slate-200/40 bg-white/80 hover:bg-white hover:shadow-xl hover:shadow-purple-50/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {art.imageUrl && (
                        <div className="w-full aspect-[1.8] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 mb-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-bold mb-3">
                        <span className="inline-flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {art.author || "Yunawise Contributor"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {art.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-outfit text-slate-900 mb-3 group-hover:text-purple-600 transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors border-t border-slate-100 pt-4 mt-6">
                      Read Article
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
