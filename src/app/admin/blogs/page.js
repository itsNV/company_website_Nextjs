"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import AdminNavbar from "@/components/AdminNavbar";
import { 
  Sparkles, 
  Upload, 
  Loader2, 
  BookOpen, 
  AlertCircle, 
  PlusCircle, 
  Edit3, 
  Search, 
  Cpu, 
  ChevronRight,
  Save,
  X,
  FileText,
  ImageIcon,
  MessageSquare
} from "lucide-react";
import { db, storage } from "@/lib/firebase/firebase";
import { collection, setDoc, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeTab, setActiveTab] = useState("create"); // "create" or "edit"

  // Creation Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("IT Strategy");
  const [author, setAuthor] = useState("Yunawise Editor");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Search & Edit states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [activeEditSection, setActiveEditSection] = useState(null); // "header", "image", "story", "tech"
  const [savingSection, setSavingSection] = useState(false);

  // Section edit temporary inputs
  const [editTitle, setEditTitle] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editProblem, setEditProblem] = useState("");
  const [editSolution, setEditSolution] = useState("");
  const [editTechStack, setEditTechStack] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState("");

  const categories = ["IT Strategy", "Ecommerce", "Digital Marketing", "Software Development", "Branding"];

  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")          // Replace spaces with -
      .replace(/[^\w\-]+/g, "")       // Remove all non-word chars
      .replace(/\-\-+/g, "-");        // Replace multiple - with single -
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(generateSlug(val));
  };

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!title || !description || !slug || !author) {
      setMessage({ type: "error", text: "Please fill in all text fields." });
      return;
    }
    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      let imageUrl = "";
      if (imageFile) {
        const fileRef = ref(storage, `blogs/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(fileRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await setDoc(doc(db, "blogs", slug), {
        title,
        excerpt: description,
        slug,
        category,
        author,
        imageUrl,
        problem: "",
        solution: "",
        tech_stack: [],
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        createdAt: new Date().toISOString(),
      });

      setMessage({ type: "success", text: "Blog post published successfully!" });
      setTitle("");
      setDescription("");
      setSlug("");
      setCategory("IT Strategy");
      setAuthor("Yunawise Editor");
      setImageFile(null);
      setImagePreview("");
      fetchBlogs();
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to publish blog post." });
    } finally {
      setUploading(false);
    }
  };

  // Select blog to initialize section edits
  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    setActiveEditSection(null);
  };

  const openSectionEditor = (section) => {
    setActiveEditSection(section);
    if (section === "header") {
      setEditTitle(selectedBlog.title || "");
      setEditExcerpt(selectedBlog.excerpt || "");
      setEditSlug(selectedBlog.slug || "");
      setEditCategory(selectedBlog.category || "IT Strategy");
      setEditAuthor(selectedBlog.author || "Yunawise Editor");
    } else if (section === "image") {
      setEditImagePreview(selectedBlog.imageUrl || "");
      setEditImageFile(null);
    } else if (section === "story") {
      setEditProblem(selectedBlog.problem || "");
      setEditSolution(selectedBlog.solution || "");
    } else if (section === "tech") {
      setEditTechStack(Array.isArray(selectedBlog.tech_stack) ? selectedBlog.tech_stack.join(", ") : "");
    }
  };

  const handleUpdateSection = async (e) => {
    e.preventDefault();
    if (!selectedBlog) return;
    setSavingSection(true);

    try {
      const blogDocRef = doc(db, "blogs", selectedBlog.id);
      let updatedData = {};

      if (activeEditSection === "header") {
        updatedData = {
          title: editTitle,
          excerpt: editExcerpt,
          slug: editSlug,
          category: editCategory,
          author: editAuthor,
        };
      } else if (activeEditSection === "image") {
        let imageUrl = selectedBlog.imageUrl || "";
        if (editImageFile) {
          const fileRef = ref(storage, `blogs/${Date.now()}_${editImageFile.name}`);
          const snapshot = await uploadBytes(fileRef, editImageFile);
          imageUrl = await getDownloadURL(snapshot.ref);
        }
        updatedData = { imageUrl };
      } else if (activeEditSection === "story") {
        updatedData = {
          problem: editProblem,
          solution: editSolution,
        };
      } else if (activeEditSection === "tech") {
        const stackArray = editTechStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        updatedData = {
          tech_stack: stackArray,
        };
      }

      await updateDoc(blogDocRef, updatedData);

      // Refresh list and selected blog state
      const updatedBlog = { ...selectedBlog, ...updatedData };
      setSelectedBlog(updatedBlog);
      
      // Update global blogs state locally to prevent roundtrip
      setBlogs(blogs.map((b) => (b.id === selectedBlog.id ? updatedBlog : b)));
      
      setActiveEditSection(null);
      setMessage({ type: "success", text: "Section updated successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      alert("Error updating section: " + err.message);
    } finally {
      setSavingSection(false);
    }
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

          {/* Creation Tab Layout */}
          {activeTab === "create" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Submission Form panel */}
              <div className="lg:col-span-5 bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider font-outfit">New Publication</h2>
                </div>

                {message.text && (
                  <div className={`p-4 mb-6 rounded-2xl text-xs flex items-start gap-2.5 border ${
                    message.type === "success" 
                      ? "bg-teal-50 border-teal-200 text-teal-700" 
                      : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}>
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="font-semibold">{message.text}</span>
                  </div>
                )}

                <form onSubmit={handleCreateBlog} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Blog Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10 Features for eCommerce in 2026"
                      value={title}
                      onChange={handleTitleChange}
                      className="w-full h-11 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">URL Slug (Auto-Generated)</label>
                    <input
                      type="text"
                      required
                      placeholder="ecommerce-features-2026"
                      value={slug}
                      onChange={(e) => setSlug(generateSlug(e.target.value))}
                      className="w-full h-11 px-4 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm outline-none cursor-not-allowed"
                      readOnly
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-white text-slate-800">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Author Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nishith Prajapati"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Description</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Brief excerpt describing the post..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Cover Image</label>
                    <div className="relative border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-2xl bg-slate-50/30 p-4 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {imagePreview ? (
                        <div className="flex flex-col items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imagePreview} alt="Preview" className="h-28 object-cover rounded-xl border border-slate-200" />
                          <span className="text-xs text-purple-600 font-bold">Change Cover Image</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 text-center">
                          <Upload className="w-8 h-8 text-slate-400 mb-2" />
                          <span className="text-xs font-bold text-slate-500">Click to upload cover photo</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <span>Publish Blog Post</span>
                    )}
                  </button>
                </form>
              </div>

              {/* Right panel: Listing existing */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider font-outfit">Feed Status</h2>
                </div>
                {loadingList ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white/70 border border-slate-200/60 rounded-3xl">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                  </div>
                ) : blogs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {blogs.map((b) => (
                      <div key={b.id} className="p-5 rounded-2xl border border-slate-200 bg-white/80 hover:border-purple-500/20 hover:shadow-md transition-all flex items-center gap-4">
                        {b.imageUrl && (
                          <div className="w-24 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-snug">{b.title}</h3>
                          <div className="flex flex-wrap gap-2 items-center mt-2.5">
                            <span className="text-[9px] bg-purple-50 text-purple-600 font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-purple-100">
                              {b.category || "IT Strategy"}
                            </span>
                            <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md">
                              By {b.author || "Yunawise Editor"}
                            </span>
                            <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md">
                              /{b.slug}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-center py-10">No items detected.</p>
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
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-450 text-sm text-center py-8">No articles matched your search.</p>
                    )}
                  </div>
                </div>
              ) : (
                
                /* Step 2: Blog Selected (Shows Two Column Section Editor Workspace) */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Side-panel Editor Input form */}
                  <div className="lg:col-span-5 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl relative h-fit">
                    {activeEditSection ? (
                      <>
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                          <div className="flex items-center gap-2">
                            <Edit3 className="w-4 h-4 text-purple-600" />
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">
                              Editing {activeEditSection} Section
                            </h3>
                          </div>
                          <button 
                            onClick={() => setActiveEditSection(null)} 
                            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-800 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <form onSubmit={handleUpdateSection} className="space-y-5">
                          
                          {activeEditSection === "header" && (
                            <>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Title</label>
                                <input
                                  type="text"
                                  required
                                  value={editTitle}
                                  onChange={(e) => {
                                    setEditTitle(e.target.value);
                                    setEditSlug(generateSlug(e.target.value));
                                  }}
                                  className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">URL Slug (Auto-Derived)</label>
                                <input
                                  type="text"
                                  required
                                  value={editSlug}
                                  onChange={(e) => setEditSlug(generateSlug(e.target.value))}
                                  className="w-full h-11 px-4 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm outline-none cursor-not-allowed"
                                  readOnly
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Category</label>
                                <select
                                  value={editCategory}
                                  onChange={(e) => setEditCategory(e.target.value)}
                                  className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all"
                                >
                                  {categories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-white text-slate-850">
                                      {cat}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Author Name</label>
                                <input
                                  type="text"
                                  required
                                  value={editAuthor}
                                  onChange={(e) => setEditAuthor(e.target.value)}
                                  className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-850 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Excerpt / Description</label>
                                <textarea
                                  required
                                  rows={4}
                                  value={editExcerpt}
                                  onChange={(e) => setEditExcerpt(e.target.value)}
                                  className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all resize-none"
                                />
                              </div>
                            </>
                          )}

                          {activeEditSection === "image" && (
                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Upload New Image</label>
                              <div className="relative border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-2xl bg-slate-50/30 p-4 transition-colors">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      setEditImageFile(file);
                                      setEditImagePreview(URL.createObjectURL(file));
                                    }
                                  }}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {editImagePreview ? (
                                  <div className="flex flex-col items-center gap-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={editImagePreview} alt="Preview" className="h-28 object-cover rounded-xl border border-slate-200" />
                                    <span className="text-xs text-purple-600 font-bold">Replace File</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center py-4 text-center">
                                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                    <span className="text-xs font-bold text-slate-500">Click to upload photo</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {activeEditSection === "story" && (
                            <>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">The Challenge (Problem)</label>
                                <textarea
                                  rows={4}
                                  value={editProblem}
                                  onChange={(e) => setEditProblem(e.target.value)}
                                  placeholder="Describe the hurdles..."
                                  className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all resize-none"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Our Solution</label>
                                <textarea
                                  rows={4}
                                  value={editSolution}
                                  onChange={(e) => setEditSolution(e.target.value)}
                                  placeholder="Explain the solution..."
                                  className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all resize-none"
                                />
                              </div>
                            </>
                          )}

                          {activeEditSection === "tech" && (
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Tech Stack (comma-separated)</label>
                              <input
                                type="text"
                                value={editTechStack}
                                onChange={(e) => setEditTechStack(e.target.value)}
                                placeholder="React, Next.js, Firestore"
                                className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all"
                              />
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={savingSection}
                            className="w-full h-11 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                          >
                            {savingSection ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Saving Changes...</span>
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                <span>Save Section</span>
                              </>
                            )}
                          </button>

                        </form>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-24 text-center text-slate-400">
                        <Edit3 className="w-10 h-10 mb-4 opacity-30 text-purple-600" />
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-800">Section Editor Idle</p>
                        <p className="text-[11px] text-slate-500 mt-1 max-w-xs leading-relaxed">
                          Click any section's <span className="text-purple-600 font-bold">Edit Section</span> button on the right to open editing fields inside this side-panel.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Preview with edit section buttons */}
                  <div className="lg:col-span-7 bg-white/70 border border-slate-200/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                    
                    {/* Header bar to reset selection */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">
                          Editing Preview
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedBlog(null)}
                        className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-850 border border-slate-200 px-3.5 py-1.5 rounded-xl bg-slate-50 cursor-pointer"
                      >
                        Change Selected Blog
                      </button>
                    </div>

                    {/* SECTION 1: HEADER SECTION */}
                    <div className="relative border border-slate-100 bg-slate-50/50 rounded-2xl p-5 group/section">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Header Section</span>
                        </div>
                        <button
                          onClick={() => openSectionEditor("header")}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" /> Edit Section
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{selectedBlog.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3">{selectedBlog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] bg-purple-50 text-purple-600 font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-purple-100">
                          {selectedBlog.category || "IT Strategy"}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 rounded-md border border-slate-200">
                          By {selectedBlog.author || "Yunawise Editor"}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                          /{selectedBlog.slug}
                        </span>
                      </div>
                    </div>

                    {/* SECTION 2: COVER IMAGE SECTION */}
                    <div className="relative border border-slate-100 bg-slate-50/50 rounded-2xl p-5 group/section">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-black uppercase text-slate-550 tracking-wider">Cover Image</span>
                        </div>
                        <button
                          onClick={() => openSectionEditor("image")}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" /> Edit Section
                        </button>
                      </div>
                      {selectedBlog.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={selectedBlog.imageUrl} alt="Blog image" className="h-32 object-cover rounded-xl border border-slate-200" />
                      ) : (
                        <p className="text-slate-400 text-xs italic">No cover image uploaded.</p>
                      )}
                    </div>

                    {/* SECTION 3: STORY / DETAILS SECTION */}
                    <div className="relative border border-slate-100 bg-slate-50/50 rounded-2xl p-5 group/section">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Story Details</span>
                        </div>
                        <button
                          onClick={() => openSectionEditor("story")}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" /> Edit Section
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1">The Challenge (Problem)</p>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {selectedBlog.problem || <span className="italic text-slate-400">No content declared.</span>}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-550 tracking-wider mb-1">Our Solution</p>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {selectedBlog.solution || <span className="italic text-slate-400">No content declared.</span>}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: TECH STACK SECTION */}
                    <div className="relative border border-slate-100 bg-slate-50/50 rounded-2xl p-5 group/section">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-black uppercase text-slate-550 tracking-wider">Technologies Delivered</span>
                        </div>
                        <button
                          onClick={() => openSectionEditor("tech")}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" /> Edit Section
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(selectedBlog.tech_stack) && selectedBlog.tech_stack.length > 0 ? (
                          selectedBlog.tech_stack.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 text-xs italic">No technologies defined.</span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </AdminGuard>
  );
}
