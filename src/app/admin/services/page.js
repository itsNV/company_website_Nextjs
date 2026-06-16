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
  Laptop
} from "lucide-react";
import { db, storage } from "@/lib/firebase/firebase";
import { collection, setDoc, getDocs, doc, deleteDoc, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AdminPageBuilder from "@/components/admin/AdminPageBuilder";
import { 
  getDefaultPageBlocks, 
  pagePayloadToBlocks, 
  blocksToPagePayload, 
  uploadPageBlockImages 
} from "@/lib/pageBuilderBlocks";

export default function ServicesAdminPage() {
  const [services, setServices] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeTab, setActiveTab] = useState("create"); // "create" or "edit"
  const [editingServiceId, setEditingServiceId] = useState(null);
  
  // Message feedback
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Basic Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

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

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    const generated = generateSlug(val);
    setSlug(generated);

    // Sync hero title automatically if user hasn't customized it heavily
    const updated = blocks.map(b => {
      if (b.type === "hero") {
        return {
          ...b,
          data: {
            ...b.data,
            title: val,
            slug: generated
          }
        };
      }
      return b;
    });
    setBlocks(updated);
  };

  const fetchServices = async () => {
    setLoadingList(true);
    try {
      const q = query(collection(db, "services"));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(fetched);
    } catch (e) {
      console.error("Error fetching services:", e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchServices();
    setBlocks(getDefaultPageBlocks());
  }, []);

  const resetForm = () => {
    setName("");
    setSlug("");
    setBlocks(getDefaultPageBlocks());
    setEditingServiceId(null);
  };

  const handlePublish = async () => {
    if (!name || !slug) {
      setMessage({ type: "error", text: "Service Name and Slug are required to publish." });
      return;
    }

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Upload high-res images to Firebase Storage
      const uploadedBlocks = await uploadPageBlockImages(blocks, storage, uploadBytes, getDownloadURL, ref);

      // 2. Map visual blocks payload into dynamic & legacy fields
      const payload = {
        ...blocksToPagePayload(uploadedBlocks),
        name,
        slug,
        updatedAt: new Date().toISOString()
      };

      // 3. Save to Firestore
      const targetId = editingServiceId || slug;
      await setDoc(doc(db, "services", targetId), {
        ...payload,
        createdAt: editingServiceId ? (services.find(s => s.id === editingServiceId)?.createdAt || new Date().toISOString()) : new Date().toISOString()
      });

      setMessage({ 
        type: "success", 
        text: editingServiceId ? "Service configurations saved successfully!" : "New Service deployed successfully!" 
      });

      resetForm();
      fetchServices();
      setActiveTab("edit");
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to publish service catalog updates." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSelect = (service) => {
    setEditingServiceId(service.id);
    setName(service.name || "");
    setSlug(service.slug || "");
    
    // Parse layout payload back into visual drag-and-drop blocks array
    const mappedBlocks = pagePayloadToBlocks(service);
    setBlocks(mappedBlocks);
    setActiveTab("create"); 
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service permanently?")) return;
    try {
      await deleteDoc(doc(db, "services", id));
      fetchServices();
    } catch (err) {
      alert("Error deleting service: " + err.message);
    }
  };

  const filteredServices = services.filter((s) =>
    s.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
                Services Builder
                <span className="text-blue-600">.</span>
              </h1>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">
                Visual Drag & Drop service configurator
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => { setActiveTab("create"); resetForm(); }}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "create" && !editingServiceId
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <PlusCircle className="w-4 h-4" /> Create Service
              </button>
              <button
                onClick={() => { setActiveTab("edit"); }}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "edit" || editingServiceId
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Edit3 className="w-4 h-4" /> Edit Services {editingServiceId && "(Active)"}
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
              <button className="ml-auto text-slate-400 hover:text-slate-600" onClick={() => setMessage({type: "", text: ""})}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeTab === "create" ? (
            <div className="space-y-6">
              {/* Basic configuration box */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <Laptop className="w-5 h-5 text-blue-600" />
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">
                    {editingServiceId ? "Modify Catalog Details" : "Setup New Service Track"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Service Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Website Development"
                      value={name}
                      onChange={handleNameChange}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">URL Slug</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. website-development"
                      value={slug}
                      onChange={(e) => setSlug(generateSlug(e.target.value))}
                      className="w-full h-11 px-4 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Visual Page Builder */}
              <div className="mt-6">
                <AdminPageBuilder 
                  blocks={blocks}
                  onChange={setBlocks}
                  onPublish={handlePublish}
                  publishing={submitting}
                  publishLabel={editingServiceId ? "Save Changes" : "Create Service"}
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
                  placeholder="Search service title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200/80 rounded-2xl text-sm text-slate-800 outline-none shadow-sm focus:border-blue-500"
                />
              </div>

              {loadingList ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs uppercase font-bold tracking-wider">Syncing collection details...</span>
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center text-slate-500 shadow-md">
                  <p className="text-sm font-semibold">No services found matching current search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredServices.map((service) => (
                    <div key={service.id} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 text-[10px] font-black uppercase rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                            Service Track
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 font-mono">
                            /{service.slug}
                          </span>
                        </div>
                        <h3 className="text-lg font-black font-outfit text-slate-900 pt-1">
                          {service.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => handleEditSelect(service)}
                          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="px-4 py-2 hover:bg-rose-50 border border-transparent hover:border-rose-100 text-rose-500 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1"
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
