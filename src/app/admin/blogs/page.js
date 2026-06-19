"use client";
import React, { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminNavbar from "@/components/AdminNavbar";
import { 
  Sparkles, 
  Loader2, 
  BookOpen, 
  PlusCircle, 
  Edit3, 
  Search, 
  ChevronRight,
  Trash2
} from "lucide-react";
import { collection, setDoc, getDocs, doc, query, orderBy, deleteDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import BlogPageBuilder from "../_components/BlogPageBuilder";
import {
  getDefaultBlocks,
  blogToBlocks,
  blocksToBlogPayload,
  uploadBlockImages,
} from "@/lib/blogBlocks";

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeTab, setActiveTab] = useState("create"); // "create" or "edit"

  // Builder state
  const [createBlocks, setCreateBlocks] = useState(getDefaultBlocks());
  const [editBlocks, setEditBlocks] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Search & Edit states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const categories = ["IT Strategy", "Ecommerce", "Digital Marketing", "Software Development", "Branding"];

  const validateBlocks = (blocks) => {
    const header = blocks.find((b) => b.type === "header");
    if (!header?.data?.title?.trim()) {
      return "Add a Header block with a title.";
    }
    if (!header?.data?.excerpt?.trim()) {
      return "Add an excerpt in the Header block.";
    }
    if (!header?.data?.slug?.trim()) {
      return "Header block needs a valid slug (add a title).";
    }
    return null;
  };

  const saveBlogFromBlocks = async (blocks, existingId = null) => {
    const error = validateBlocks(blocks);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const uploadedBlocks = await uploadBlockImages(
        blocks,
        storage,
        uploadBytes,
        getDownloadURL,
        ref
      );
      const payload = blocksToBlogPayload(uploadedBlocks);
      const docId = existingId || payload.slug;

      await setDoc(doc(db, "blogs", docId), {
        ...payload,
        date: existingId
          ? selectedBlog?.date ||
            new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
        createdAt: existingId ? selectedBlog?.createdAt || new Date().toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      setMessage({
        type: "success",
        text: existingId ? "Blog updated successfully!" : "Blog post published successfully!",
      });

      if (!existingId) {
        setCreateBlocks(getDefaultBlocks());
      } else {
        const updated = { id: docId, ...payload };
        setSelectedBlog(updated);
        setEditBlocks(blogToBlocks(updated));
      }

      fetchBlogs();
      setTimeout(() => setMessage({ type: "", text: "" }), 4000);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to save blog post." });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateBlog = () => saveBlogFromBlocks(createBlocks);
  const handleUpdateBlog = () => saveBlogFromBlocks(editBlocks, selectedBlog?.id);

  const fetchBlogs = async () => {
    setLoadingList(true);
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(fetched);
    } catch (e) {
      console.error("Error fetching blogs:", e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    setEditBlocks(blogToBlocks(blog));
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteBlog = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this blog post permanently?")) return;
    try {
      await deleteDoc(doc(db, "blogs", id));
      fetchBlogs();
      if (selectedBlog?.id === id) {
        setSelectedBlog(null);
      }
    } catch (err) {
      alert("Error deleting blog: " + err.message);
    }
  };

  return (
    <AdminGuard>
      <AdminNavbar />
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

      <main className="flex-grow pt-28 pb-16 bg-[#f3f9fc] text-slate-800 min-h-screen relative z-10 font-sans">
        
        {/* Top Glow effects */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200 pb-6 mb-10">
            <div>
              <h1 className="text-3xl font-black font-outfit text-slate-900 tracking-wide flex items-center gap-1.5">
                Blogs Management
                <span className="text-purple-600">.</span>
              </h1>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">
                Yunawise Insights CMS Console
              </p>
            </div>

            {/* Mode selection buttons */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => { setActiveTab("create"); setSelectedBlog(null); }}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "create"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <PlusCircle className="w-4 h-4" /> Create Blog
              </button>
              <button
                onClick={() => { setActiveTab("edit"); }}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "edit"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Edit3 className="w-4 h-4" /> Edit Blog
              </button>
            </div>
          </div>

          {/* Creation Tab — Drag & Drop Builder */}
          {activeTab === "create" && (
            <div className="space-y-8">
              <BlogPageBuilder
                blocks={createBlocks}
                onChange={setCreateBlocks}
                categories={categories}
                onPublish={handleCreateBlog}
                publishing={uploading}
                publishLabel="Publish Blog Post"
                message={message}
              />

              <div className="border-t border-slate-200 pt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">
                    Published Articles
                  </h2>
                </div>
                {loadingList ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                  </div>
                ) : blogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogs.slice(0, 6).map((b) => (
                      <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-white/80 flex items-center gap-3">
                        {b.imageUrl && (
                          <div className="w-16 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={b.imageUrl} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="text-xs font-bold text-slate-900 truncate">{b.title}</h3>
                          <span className="text-[9px] text-purple-600 font-bold uppercase">{b.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-center py-6 text-sm">No articles yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Edit Tab Layout */}
          {activeTab === "edit" && (
            <div className="space-y-6">
              
              {/* Step 1: Searching for Blogs */}
              {!selectedBlog ? (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search publications by title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-purple-500 transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Search Results</h3>
                    {filteredBlogs.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {filteredBlogs.map((b) => (
                          <div 
                            key={b.id} 
                            onClick={() => handleSelectBlog(b)}
                            className="p-5 rounded-2xl border border-slate-200 bg-white/80 hover:border-purple-500/40 hover:bg-white hover:shadow-md cursor-pointer flex items-center justify-between group transition-all"
                          >
                            <div className="flex items-center gap-4">
                              {b.imageUrl && (
                                <div className="w-20 h-14 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div>
                                <h4 className="text-sm font-bold text-slate-905 leading-snug group-hover:text-purple-600 transition-colors">
                                  {b.title}
                                </h4>
                                <div className="flex flex-wrap gap-2 items-center mt-1.5">
                                  <span className="text-[9px] bg-purple-50 text-purple-600 font-extrabold uppercase px-2 py-0.5 rounded-full border border-purple-100">
                                    {b.category || "IT Strategy"}
                                  </span>
                                  <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                                    By {b.author || "Yunawise Editor"}
                                  </span>
                                  <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                                    /{b.slug}
                                  </span>
                                </div>
                                {/* Show active blog section blocks */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {(b.blocks || blogToBlocks(b) || []).map((block) => (
                                    <span 
                                      key={block.id || block.type} 
                                      className="text-[8px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/50 text-slate-500 uppercase tracking-wider"
                                    >
                                      {block.type}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <button
                                onClick={(e) => handleDeleteBlog(b.id, e)}
                                className="p-2 hover:bg-rose-50 border border-transparent hover:border-rose-100 text-rose-500 rounded-xl transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-450 text-sm text-center py-8">No articles matched your search.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-slate-900">{selectedBlog.title}</span>
                    </div>
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="text-xs font-bold uppercase text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-xl bg-slate-50"
                    >
                      Change Blog
                    </button>
                  </div>
                  <BlogPageBuilder
                    blocks={editBlocks}
                    onChange={setEditBlocks}
                    categories={categories}
                    onPublish={handleUpdateBlog}
                    publishing={uploading}
                    publishLabel="Save Changes"
                    message={message}
                  />
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      
    </AdminGuard>
  );
}
