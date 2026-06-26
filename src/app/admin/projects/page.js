"use client";

import React, { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminNavbar from "@/components/AdminNavbar";
import { 
  PlusCircle, 
  Edit3, 
  Search, 
  X, 
  Trash2,
  AlertCircle,
  Briefcase,
  Upload
} from "lucide-react";
import { db, storage } from "@/lib/firebase/firebase";
import { collection, setDoc, getDocs, doc, deleteDoc, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProjectPageBuilder from "../_components/ProjectPageBuilder";
import { 
  getDefaultProjectBlocks, 
  projectPayloadToBlocks, 
  blocksToProjectPayload, 
  uploadProjectBlockImages 
} from "@/lib/projectBuilderBlocks";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeTab, setActiveTab] = useState("create"); // "create" or "edit"
  const [editingProjectId, setEditingProjectId] = useState(null);
  
  // Message feedback
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Basic Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [platformType, setPlatformType] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [techStackStr, setTechStackStr] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // Main Image Upload States
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");

  // Page builder blocks
  const [blocks, setBlocks] = useState([]);

  // Auto-slug generator
  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")          
      .replace(/[^\w\-]+/g, "")       
      .replace(/\-\-+/g, "-");        
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingProjectId) {
      setSlug(generateSlug(val));
    }
  };

  const fetchProjects = async () => {
    setLoadingList(true);
    try {
      const q = query(collection(db, "projects"));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(fetched);
    } catch (e) {
      console.error("Error fetching projects:", e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    setBlocks(getDefaultProjectBlocks());
  }, []);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setTagline("");
    setPlatformType("");
    setLiveUrl("");
    setTechStackStr("");
    setFeatured(false);
    setIsPublished(true);
    setMainImageFile(null);
    setMainImagePreview("");
    setExistingImageUrl("");
    setBlocks(getDefaultProjectBlocks());
    setEditingProjectId(null);
  };

  const handlePublish = async () => {
    if (!title || !slug) {
      setMessage({ type: "error", text: "Project Title and Slug are required to publish." });
      return;
    }

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Upload Main Cover Image to Firebase Storage if selected
      let finalImageUrl = existingImageUrl;
      if (mainImageFile) {
        const fileRef = ref(storage, `projects/${Date.now()}_${mainImageFile.name}`);
        const snapshot = await uploadBytes(fileRef, mainImageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Upload block-specific files/illustrations
      const uploadedBlocks = await uploadProjectBlockImages(blocks, storage, uploadBytes, getDownloadURL, ref);

      // 3. Map visual blocks payload
      const mappedPayload = blocksToProjectPayload(uploadedBlocks);

      const payload = {
        ...mappedPayload,
        title,
        slug,
        tagline,
        platform_type: platformType,
        live_url: liveUrl || null,
        tech_stack: techStackStr.split(",").map(t => t.trim()).filter(Boolean),
        featured,
        is_published: isPublished,
        image_url: finalImageUrl,
        updated_at: new Date().toISOString()
      };

      // 4. Save to Firestore
      const targetId = editingProjectId || slug;
      await setDoc(doc(db, "projects", targetId), {
        ...payload,
        created_at: editingProjectId ? (projects.find(p => p.id === editingProjectId)?.created_at || new Date().toISOString()) : new Date().toISOString()
      });

      setMessage({ 
        type: "success", 
        text: editingProjectId ? "Project showcase configurations saved successfully!" : "New Project showcase deployed successfully!" 
      });

      resetForm();
      fetchProjects();
      setActiveTab("edit");
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to publish project showcase details." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSelect = (project) => {
    setEditingProjectId(project.id);
    setTitle(project.title || "");
    setSlug(project.slug || "");
    setTagline(project.tagline || "");
    setPlatformType(project.platform_type || "");
    setLiveUrl(project.live_url || "");
    setTechStackStr(project.tech_stack?.join(", ") || "");
    setFeatured(project.featured || false);
    setIsPublished(project.is_published !== undefined ? project.is_published : true);
    setExistingImageUrl(project.image_url || "");
    setMainImagePreview("");
    setMainImageFile(null);
    
    // Parse layout payload back into visual blocks array
    const mappedBlocks = projectPayloadToBlocks(project);
    setBlocks(mappedBlocks.length > 0 ? mappedBlocks : getDefaultProjectBlocks());
    setActiveTab("create"); 
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project permanently?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    } catch (err) {
      alert("Error deleting project: " + err.message);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminGuard>
      <div className="flex flex-col min-h-screen bg-[#f3f9fc] text-slate-800 font-sans relative z-10">
        <AdminNavbar />
        <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

        <main className="flex-grow pt-28 pb-16 px-6 max-w-7xl mx-auto w-full z-10">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[140px] pointer-events-none" />

          {/* Header row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200 pb-6 mb-10">
            <div>
              <h1 className="text-3xl font-black font-outfit text-slate-900 tracking-wide flex items-center gap-1.5">
                Project Showcase Builder
                <span className="text-blue-600">.</span>
              </h1>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">
                Drag & Drop project timeline builder
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => { setActiveTab("create"); resetForm(); }}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "create" && !editingProjectId
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <PlusCircle className="w-4 h-4" /> Create Project
              </button>
              <button
                onClick={() => { setActiveTab("edit"); }}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "edit" || editingProjectId
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Edit3 className="w-4 h-4" /> Edit Projects {editingProjectId && "(Active)"}
              </button>
            </div>
          </div>

          {message.text && (
            <div className={`p-4 mb-6 rounded-2xl text-xs flex items-start gap-2.5 border max-w-3xl mx-auto ${
              message.type === "success" 
                ? "bg-teal-50 border-teal-200 text-teal-700" 
                : "bg-rose-50 border-rose-200 text-rose-700"
            }`}>
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-semibold">{message.text}</span>
              <button className="ml-auto text-slate-400 hover:text-slate-600 cursor-pointer" onClick={() => setMessage({type: "", text: ""})}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeTab === "create" ? (
            <div className="space-y-6">
              {/* Basic configuration box */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl max-w-5xl mx-auto">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-6">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">
                    {editingProjectId ? "Modify Showcase Details" : "Setup Showcase Parameters"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column: Input Fields */}
                  <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Project Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vested Finance"
                        value={title}
                        onChange={handleTitleChange}
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-semibold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">URL Slug</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. vested-finance"
                        value={slug}
                        onChange={(e) => setSlug(generateSlug(e.target.value))}
                        className="w-full h-11 px-4 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Platform Type</label>
                      <input
                        type="text"
                        placeholder="e.g. Fintech / Investment Platform"
                        value={platformType}
                        onChange={(e) => setPlatformType(e.target.value)}
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Tagline Description</label>
                      <input
                        type="text"
                        placeholder="e.g. A High-Performance Investment Platform for Global Investing"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Technology Stack (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. React, Next.js, Tailwind CSS, Firebase"
                        value={techStackStr}
                        onChange={(e) => setTechStackStr(e.target.value)}
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Live Platform URL (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. https://vestedfinance.com/"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Right Column: Image and Publish Options */}
                  <div className="md:col-span-4 flex flex-col gap-5 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Cover Image</label>
                      {mainImagePreview || existingImageUrl ? (
                        <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-50 max-h-[160px]">
                          <img 
                            src={mainImagePreview || existingImageUrl} 
                            alt="Cover preview" 
                            className="w-full h-full object-cover" 
                          />
                          <button
                            type="button"
                            onClick={() => { setMainImageFile(null); setMainImagePreview(""); setExistingImageUrl(""); }}
                            className="absolute top-2 right-2 p-1.5 rounded-xl bg-white/90 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-sm text-slate-500 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-400 transition-all p-8 bg-slate-50 cursor-pointer text-slate-400 group min-h-[140px]">
                          <Upload className="w-6 h-6 mb-1.5 group-hover:text-blue-600" />
                          <span className="text-[9px] font-black uppercase tracking-wider group-hover:text-blue-600">
                            Upload Banner
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setMainImageFile(file);
                                setMainImagePreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>

                    <div className="flex flex-col gap-2.5 pt-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="featured" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                          Feature on Homepage Showcase
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isPublished"
                          checked={isPublished}
                          onChange={(e) => setIsPublished(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="isPublished" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                          Publish (Public Visibility)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Builder */}
              <div className="mt-6">
                <ProjectPageBuilder 
                  blocks={blocks}
                  onChange={setBlocks}
                  onPublish={handlePublish}
                  publishing={submitting}
                  publishLabel={editingProjectId ? "Save Changes" : "Create Showcase Project"}
                />
              </div>
            </div>
          ) : (
            /* Edit List Mode */
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search project title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200/80 rounded-2xl text-sm text-slate-800 outline-none shadow-sm focus:border-blue-500"
                />
              </div>

              {loadingList ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs uppercase font-bold tracking-wider">Syncing showcase documents...</span>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center text-slate-500 shadow-md">
                  <p className="text-sm font-semibold">No projects found matching current query.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-lg border ${
                            project.featured 
                              ? "bg-purple-50 text-purple-700 border-purple-100" 
                              : "bg-blue-50 text-blue-700 border-blue-100"
                          }`}>
                            {project.featured ? "Featured showcase" : "Regular project"}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 font-mono">
                            /{project.slug}
                          </span>
                        </div>
                        <h3 className="text-lg font-black font-outfit text-slate-900 pt-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-normal line-clamp-1">{project.tagline}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => handleEditSelect(project)}
                          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="px-4 py-2 hover:bg-rose-50 border border-transparent hover:border-rose-100 text-rose-500 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}
