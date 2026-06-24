"use client";

import React, { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminNavbar from "@/components/AdminNavbar";
import { Save, Loader2, AlertCircle, X, Settings, Image as ImageIcon, Sparkles } from "lucide-react";
import { db, storage } from "@/lib/firebase/firebase";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default function SettingsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Settings State
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [focusKeywords, setFocusKeywords] = useState("");
  const [structuredSchema, setStructuredSchema] = useState("");

  const [heroBadge, setHeroBadge] = useState("");
  const [heroTitleLine1, setHeroTitleLine1] = useState("");
  const [heroTitleLine2, setHeroTitleLine2] = useState("");
  const [heroTitleLine3, setHeroTitleLine3] = useState("");
  const [heroTitleLine4, setHeroTitleLine4] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [ctaText1, setCtaText1] = useState("");
  const [ctaLink1, setCtaLink1] = useState("");
  const [ctaText2, setCtaText2] = useState("");
  const [ctaLink2, setCtaLink2] = useState("");
  const [throwableTags, setThrowableTags] = useState("");

  // Workflow
  const [aboutWorkflowTitle, setAboutWorkflowTitle] = useState("");
  const [aboutWorkflowSubtitle, setAboutWorkflowSubtitle] = useState("");
  const [aboutWorkflowDesc, setAboutWorkflowDesc] = useState("");
  const [step1Title, setStep1Title] = useState("");
  const [step1Desc, setStep1Desc] = useState("");
  const [step2Title, setStep2Title] = useState("");
  const [step2Desc, setStep2Desc] = useState("");
  const [step3Title, setStep3Title] = useState("");
  const [step3Desc, setStep3Desc] = useState("");

  // Media
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [faviconUrl, setFaviconUrl] = useState("");
  const [faviconFile, setFaviconFile] = useState(null);

  // New Fields
  const [companyName, setCompanyName] = useState("");
  const [companySubName, setCompanySubName] = useState("");
  const [servicesSubtitle, setServicesSubtitle] = useState("");
  const [servicesTitle, setServicesTitle] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  // Clients state
  const [clients, setClients] = useState([]);
  const [clientLoading, setClientLoading] = useState(false);
  const [clientForm, setClientForm] = useState({ id: "", name: "", domain: "", file: null, imageUrl: "" });
  const [clientSubmitLoading, setClientSubmitLoading] = useState(false);
  const [clientMessage, setClientMessage] = useState({ type: "", text: "" });

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const fetchClients = async () => {
    setClientLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClients(list);
    } catch (e) {
      console.error("Error loading clients:", e);
    } finally {
      setClientLoading(false);
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    if (!clientForm.name.trim()) {
      setClientMessage({ type: "error", text: "Client name is required." });
      return;
    }
    
    setClientSubmitLoading(true);
    setClientMessage({ type: "", text: "" });

    try {
      const slug = generateSlug(clientForm.name);
      let finalImageUrl = clientForm.imageUrl;

      const deleteStorageFile = async (url) => {
        if (!url || !url.includes("firebasestorage.googleapis.com")) return;
        try {
          const fileRef = ref(storage, url);
          await deleteObject(fileRef);
        } catch (e) {
          console.warn("Failed to delete client logo from Storage:", e);
        }
      };

      if (clientForm.id) {
        // --- UPDATE MODE ---
        const oldClient = clients.find(c => c.id === clientForm.id);
        const oldSlug = oldClient.id;
        const newSlug = slug;

        if (clientForm.file) {
          // New image uploaded
          if (oldClient.imageUrl) {
            await deleteStorageFile(oldClient.imageUrl);
          }
          const extension = clientForm.file.name.split('.').pop();
          const storageRef = ref(storage, `client_logos/${newSlug}.${extension}`);
          const snapshot = await uploadBytes(storageRef, clientForm.file);
          finalImageUrl = await getDownloadURL(snapshot.ref);
        } else if (newSlug !== oldSlug) {
          // Slug changed, but no new file uploaded -> Rename file in storage by downloading blob & re-uploading
          if (oldClient.imageUrl) {
            try {
              const response = await fetch(oldClient.imageUrl);
              const blob = await response.blob();
              const oldExt = oldClient.imageUrl.split('?')[0].split('.').pop() || 'png';
              const storageRef = ref(storage, `client_logos/${newSlug}.${oldExt}`);
              const snapshot = await uploadBytes(storageRef, blob);
              finalImageUrl = await getDownloadURL(snapshot.ref);
              await deleteStorageFile(oldClient.imageUrl);
            } catch (err) {
              console.error("Failed to migrate image to new slug name:", err);
            }
          }
        }

        // If the slug changed, delete the old document and create a new one
        if (newSlug !== oldSlug) {
          await deleteDoc(doc(db, "clients", oldSlug));
        }

        await setDoc(doc(db, "clients", newSlug), {
          name: clientForm.name,
          slug: newSlug,
          imageUrl: finalImageUrl,
          domain: clientForm.domain || "",
          updatedAt: new Date().toISOString()
        });

        setClientMessage({ type: "success", text: "Client updated successfully!" });
      } else {
        // --- ADD MODE ---
        if (!clientForm.file) {
          setClientMessage({ type: "error", text: "Logo image file is required to add a client." });
          setClientSubmitLoading(false);
          return;
        }

        // Check if slug already exists
        const existsRef = doc(db, "clients", slug);
        const existsSnap = await getDoc(existsRef);
        if (existsSnap.exists()) {
          setClientMessage({ type: "error", text: `A client with the slug '${slug}' already exists.` });
          setClientSubmitLoading(false);
          return;
        }

        const extension = clientForm.file.name.split('.').pop();
        const storageRef = ref(storage, `client_logos/${slug}.${extension}`);
        const snapshot = await uploadBytes(storageRef, clientForm.file);
        finalImageUrl = await getDownloadURL(snapshot.ref);

        await setDoc(doc(db, "clients", slug), {
          name: clientForm.name,
          slug,
          imageUrl: finalImageUrl,
          domain: clientForm.domain || "",
          createdAt: new Date().toISOString()
        });

        setClientMessage({ type: "success", text: "Client added successfully!" });
      }

      setClientForm({ id: "", name: "", domain: "", file: null, imageUrl: "" });
      fetchClients();
    } catch (err) {
      console.error("Error in handleClientSubmit:", err);
      setClientMessage({ type: "error", text: err.message || "Failed to save client." });
    } finally {
      setClientSubmitLoading(false);
    }
  };

  const handleClientDelete = async (client) => {
    if (!window.confirm(`Are you sure you want to delete ${client.name}?`)) return;
    
    try {
      if (client.imageUrl) {
        const fileRef = ref(storage, client.imageUrl);
        try {
          await deleteObject(fileRef);
        } catch (e) {
          console.warn("Image file not found or couldn't be deleted from Storage:", e);
        }
      }

      await deleteDoc(doc(db, "clients", client.id));
      
      setClientMessage({ type: "success", text: "Client deleted successfully!" });
      fetchClients();
    } catch (err) {
      setClientMessage({ type: "error", text: err.message || "Failed to delete client." });
    }
  };

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "settings", "homepage");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSeoTitle(data.seoTitle || "");
        setSeoDescription(data.seoDescription || "");
        setFocusKeywords(data.focusKeywords || "");
        setStructuredSchema(data.structuredSchema || "");
        setHeroBadge(data.heroBadge || "");
        setHeroTitleLine1(data.heroTitleLine1 || "");
        setHeroTitleLine2(data.heroTitleLine2 || "");
        setHeroTitleLine3(data.heroTitleLine3 || "");
        setHeroTitleLine4(data.heroTitleLine4 || "");
        setHeroDescription(data.heroDescription || "");
        setCtaText1(data.ctaText1 || "");
        setCtaLink1(data.ctaLink1 || "");
        setCtaText2(data.ctaText2 || "");
        setCtaLink2(data.ctaLink2 || "");
        setThrowableTags(data.throwableTags?.join(", ") || "");

        setAboutWorkflowTitle(data.aboutWorkflowTitle || "");
        setAboutWorkflowSubtitle(data.aboutWorkflowSubtitle || "");
        setAboutWorkflowDesc(data.aboutWorkflowDesc || "");
        setStep1Title(data.step1Title || "");
        setStep1Desc(data.step1Desc || "");
        setStep2Title(data.step2Title || "");
        setStep2Desc(data.step2Desc || "");
        setStep3Title(data.step3Title || "");
        setStep3Desc(data.step3Desc || "");

        setLogoUrl(data.logoUrl || "");
        setFaviconUrl(data.faviconUrl || "");

        setCompanyName(data.companyName || "");
        setCompanySubName(data.companySubName || "");
        setServicesSubtitle(data.servicesSubtitle || "");
        setServicesTitle(data.servicesTitle || "");
        setCompanyEmail(data.companyEmail || "");
        setCompanyPhone(data.companyPhone || "");
        setCompanyLocation(data.companyLocation || "");
        setInstagramUrl(data.instagramUrl || "");
        setLinkedinUrl(data.linkedinUrl || "");
        setGithubUrl(data.githubUrl || "");
      }
    } catch (e) {
      console.error("Error loading settings:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchClients();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      let finalLogoUrl = logoUrl;
      let finalFaviconUrl = faviconUrl;

      // Helper function to safely delete a file from storage by its URL
      const deleteStorageFile = async (url) => {
        if (!url || !url.includes("firebasestorage.googleapis.com")) return;
        try {
          const fileRef = ref(storage, url);
          await deleteObject(fileRef);
        } catch (e) {
          console.warn("Failed to delete previous media file from Storage:", e);
        }
      };

      // 1. Upload Logo if changed
      if (logoFile) {
        if (logoUrl) {
          await deleteStorageFile(logoUrl);
        }
        const logoRef = ref(storage, `web_images/logo_${Date.now()}_${logoFile.name}`);
        const snapshot = await uploadBytes(logoRef, logoFile);
        finalLogoUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Upload Favicon if changed
      if (faviconFile) {
        if (faviconUrl) {
          await deleteStorageFile(faviconUrl);
        }
        const faviconRef = ref(storage, `web_images/favicon_${Date.now()}_${faviconFile.name}`);
        const snapshot = await uploadBytes(faviconRef, faviconFile);
        finalFaviconUrl = await getDownloadURL(snapshot.ref);
      }

      const payload = {
        seoTitle,
        seoDescription,
        focusKeywords,
        structuredSchema,
        heroBadge,
        heroTitleLine1,
        heroTitleLine2,
        heroTitleLine3,
        heroTitleLine4,
        heroDescription,
        ctaText1,
        ctaLink1,
        ctaText2,
        ctaLink2,
        throwableTags: throwableTags.split(",").map(t => t.trim()).filter(Boolean),

        aboutWorkflowTitle,
        aboutWorkflowSubtitle,
        aboutWorkflowDesc,
        step1Title,
        step1Desc,
        step2Title,
        step2Desc,
        step3Title,
        step3Desc,

        logoUrl: finalLogoUrl,
        faviconUrl: finalFaviconUrl,
        
        companyName,
        companySubName,
        servicesSubtitle,
        servicesTitle,
        companyEmail,
        companyPhone,
        companyLocation,
        instagramUrl,
        linkedinUrl,
        githubUrl,

        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, "settings", "homepage"), payload);
      setMessage({ type: "success", text: "Global website settings updated successfully!" });
      setLogoFile(null);
      setFaviconFile(null);
      setLogoUrl(finalLogoUrl);
      setFaviconUrl(finalFaviconUrl);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to save settings." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex flex-col min-h-screen bg-[#f3f9fc] text-slate-800 font-sans">
          <AdminNavbar />
          <div className="flex-grow flex flex-col items-center justify-center pt-28">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Loading Configuration...</span>
          </div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="flex flex-col min-h-screen bg-[#f3f9fc] text-slate-800 font-sans relative z-10">
        <AdminNavbar />
        <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

        <main className="flex-grow pt-28 pb-16 px-6 max-w-5xl mx-auto w-full z-10">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-slate-200/20 rounded-full blur-[140px] pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200 pb-6 mb-10">
            <div>
              <h1 className="text-3xl font-black font-outfit text-slate-900 tracking-wide flex items-center gap-1.5">
                Global Settings
                <span className="text-blue-600">.</span>
              </h1>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">
                Manage website visuals, copy, and search meta tags
              </p>
            </div>
          </div>

          {message.text && (
            <div className={`p-4 mb-6 rounded-2xl text-xs flex items-start gap-2.5 border ${
              message.type === "success" 
                ? "bg-teal-50 border-teal-200 text-teal-700" 
                : "bg-rose-50 border-rose-200 text-rose-700"
            }`}>
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-semibold">{message.text}</span>
              <button type="button" className="ml-auto text-slate-400 hover:text-slate-600" onClick={() => setMessage({type: "", text: ""})}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-8">
            {/* SEO Section */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider font-outfit">
                  Search Engine Optimization (SEO)
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Meta Title Tag</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="Premium software Solutions Ahmedabad | Yunawise"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 resize-none"
                    placeholder="Search snippet summary..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Focus Keywords</label>
                  <input
                    type="text"
                    value={focusKeywords}
                    onChange={(e) => setFocusKeywords(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                    placeholder="e.g. software builder, logo design"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Structured JSON Schema Markup</label>
                  <textarea
                    rows={5}
                    value={structuredSchema}
                    onChange={(e) => setStructuredSchema(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none"
                    placeholder="JSON-LD Schema structure..."
                  />
                </div>
              </div>
            </div>

            {/* Global Media (Logo & Favicon) */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider font-outfit">
                  Website Media Files
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Company Logo</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl bg-slate-50 p-4 transition-colors text-center">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      onChange={(e) => setLogoFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {logoFile || logoUrl ? (
                      <div className="flex flex-col items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={logoFile ? URL.createObjectURL(logoFile) : logoUrl} 
                          alt="Logo Preview" 
                          className="max-h-16 object-contain bg-slate-800 p-2 rounded-xl" 
                        />
                        <span className="text-[10px] text-blue-600 font-bold uppercase mt-1">Change website Logo</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold">Upload Logo</span>
                    )}
                  </div>
                </div>

                {/* Favicon Upload */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Website Favicon</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl bg-slate-50 p-4 transition-colors text-center">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      onChange={(e) => setFaviconFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {faviconFile || faviconUrl ? (
                      <div className="flex flex-col items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={faviconFile ? URL.createObjectURL(faviconFile) : faviconUrl} 
                          alt="Favicon Preview" 
                          className="w-10 h-10 object-contain bg-white border rounded-xl" 
                        />
                        <span className="text-[10px] text-blue-600 font-bold uppercase mt-1">Change favicon</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold">Upload Favicon</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Configuration */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider font-outfit">
                  Hero Layout Details
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Hero Badge Text</label>
                  <input
                    type="text"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                    placeholder="e.g. Top Agency"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Headline Line 1</label>
                    <input type="text" value={heroTitleLine1} onChange={(e) => setHeroTitleLine1(e.target.value)} className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Headline Line 2</label>
                    <input type="text" value={heroTitleLine2} onChange={(e) => setHeroTitleLine2(e.target.value)} className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Headline Line 3</label>
                    <input type="text" value={heroTitleLine3} onChange={(e) => setHeroTitleLine3(e.target.value)} className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Headline Line 4</label>
                    <input type="text" value={heroTitleLine4} onChange={(e) => setHeroTitleLine4(e.target.value)} className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-555 tracking-wider">Badge Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={throwableTags}
                    onChange={(e) => setThrowableTags(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                    placeholder="React, Next.js, Headless CMS"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-555 tracking-wider">Sub-description</label>
                  <textarea
                    rows={3}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                    placeholder="High-converting description text..."
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">CTA 1 Text</label>
                    <input type="text" value={ctaText1} onChange={(e) => setCtaText1(e.target.value)} className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">CTA 1 Link</label>
                    <input type="text" value={ctaLink1} onChange={(e) => setCtaLink1(e.target.value)} className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">CTA 2 Text</label>
                    <input type="text" value={ctaText2} onChange={(e) => setCtaText2(e.target.value)} className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">CTA 2 Link</label>
                    <input type="text" value={ctaLink2} onChange={(e) => setCtaLink2(e.target.value)} className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Configuration */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider font-outfit">
                  About / Workflow Settings
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-555 tracking-wider">Workflow Section Title</label>
                  <input type="text" value={aboutWorkflowTitle} onChange={(e) => setAboutWorkflowTitle(e.target.value)} className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="Ways we build products" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-555 tracking-wider">Workflow Section Subtitle</label>
                  <input type="text" value={aboutWorkflowSubtitle} onChange={(e) => setAboutWorkflowSubtitle(e.target.value)} className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="How We Work" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-555 tracking-wider">Workflow Section Description</label>
                  <textarea rows={3} value={aboutWorkflowDesc} onChange={(e) => setAboutWorkflowDesc(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs" placeholder="Yunawise structures its lifecycle..." />
                </div>

                <div className="border-t border-slate-100 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Step 1 */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 py-1 px-3 rounded-full w-fit uppercase">Step 01</h4>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Title</label>
                      <input type="text" value={step1Title} onChange={(e) => setStep1Title(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
                      <textarea rows={3} value={step1Desc} onChange={(e) => setStep1Desc(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-purple-600 bg-purple-50 border border-purple-100 py-1 px-3 rounded-full w-fit uppercase">Step 02</h4>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Title</label>
                      <input type="text" value={step2Title} onChange={(e) => setStep2Title(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
                      <textarea rows={3} value={step2Desc} onChange={(e) => setStep2Desc(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-100 py-1 px-3 rounded-full w-fit uppercase">Step 03</h4>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Title</label>
                      <input type="text" value={step3Title} onChange={(e) => setStep3Title(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Description</label>
                      <textarea rows={3} value={step3Desc} onChange={(e) => setStep3Desc(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Profile & Contact details */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider font-outfit">
                  Company Identity & Contact Info
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="e.g. YUNAWISE"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Company Tagline / Sub-name</label>
                  <input
                    type="text"
                    value={companySubName}
                    onChange={(e) => setCompanySubName(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="e.g. TECHSOLVE LLP"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Contact Phone</label>
                  <input
                    type="text"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="e.g. +91 8153874988"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Contact Email</label>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="e.g. hello@yunawise.com"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Office Location / Address</label>
                  <input
                    type="text"
                    value={companyLocation}
                    onChange={(e) => setCompanyLocation(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="e.g. A-518, Moneyplant Highstreet, Jagatpur road, Gota, Ahmedabad"
                  />
                </div>
              </div>
            </div>

            {/* Homepage Services Settings & Social URLs */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider font-outfit">
                  Services Section Header & Social Links
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Services Section Subtitle</label>
                  <input
                    type="text"
                    value={servicesSubtitle}
                    onChange={(e) => setServicesSubtitle(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="e.g. Our Services"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Services Section Title</label>
                  <input
                    type="text"
                    value={servicesTitle}
                    onChange={(e) => setServicesTitle(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="e.g. Innovative digital solutions, built to scale."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">LinkedIn URL</label>
                  <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="LinkedIn Profile URL"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">GitHub URL</label>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="GitHub Organization/Profile URL"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Instagram URL</label>
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    placeholder="Instagram Page URL"
                  />
                </div>
              </div>
            </div>

            {/* Client Showcase Management Section */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-black text-slate-900 uppercase tracking-wider font-outfit">
                    Client Showcase Partners
                  </h2>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {clients.length} Partners
                </span>
              </div>

              {clientMessage.text && (
                <div className={`p-4 rounded-xl text-xs flex items-start gap-2.5 border ${
                  clientMessage.type === "success" 
                    ? "bg-teal-50 border-teal-200 text-teal-700" 
                    : "bg-rose-50 border-rose-200 text-rose-700"
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="font-semibold">{clientMessage.text}</span>
                  <button type="button" className="ml-auto text-slate-400 hover:text-slate-600" onClick={() => setClientMessage({type: "", text: ""})}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Form Row */}
              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  {clientForm.id ? "Update Showcase Client" : "Add New Showcase Client"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Client Name</label>
                    <input
                      type="text"
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      placeholder="e.g. Satcure"
                    />
                    {clientForm.name && (
                      <p className="text-[10px] text-slate-400 font-medium italic">
                        Slug: <span className="font-mono text-blue-600">{generateSlug(clientForm.name)}</span>
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Client Website Domain</label>
                    <input
                      type="text"
                      value={clientForm.domain}
                      onChange={(e) => setClientForm({ ...clientForm, domain: e.target.value })}
                      className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                      placeholder="e.g. satcuree.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Client Logo/Image</label>
                    <div className="relative border border-slate-200 hover:border-blue-500 rounded-xl bg-white h-11 flex items-center justify-center cursor-pointer overflow-hidden px-4">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        onChange={(e) => setClientForm({ ...clientForm, file: e.target.files[0] })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="text-xs text-slate-500 font-semibold truncate">
                        {clientForm.file ? clientForm.file.name : (clientForm.imageUrl ? "Keep current logo" : "Choose Image")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  {clientForm.id && (
                    <button
                      type="button"
                      onClick={() => setClientForm({ id: "", name: "", domain: "", file: null, imageUrl: "" })}
                      className="h-10 px-5 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleClientSubmit}
                    disabled={clientSubmitLoading}
                    className="h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    {clientSubmitLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                      </>
                    ) : (
                      clientForm.id ? "Update Client" : "Add Client"
                    )}
                  </button>
                </div>
              </div>

              {/* List View */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  Partner Directory
                </h3>
                {clientLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  </div>
                ) : clients.length === 0 ? (
                  <p className="text-xs text-slate-400 font-medium italic text-center py-6">
                    No custom clients found. Site will fall back to default marquee list.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {clients.map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center justify-between gap-3 p-4 bg-white border border-slate-150 rounded-2xl shadow-sm hover:border-slate-300 hover:shadow transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                            {client.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={client.imageUrl} alt={client.name} className="h-full w-full object-contain" />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-slate-300" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-800 font-outfit">{client.name}</span>
                            <span className="text-[9px] text-slate-400 font-mono leading-none mt-0.5">{client.domain || "no domain"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setClientForm({ id: client.id, name: client.name, domain: client.domain || "", file: null, imageUrl: client.imageUrl || "" })}
                            className="p-1.5 bg-slate-50 border border-slate-150 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                            title="Edit"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleClientDelete(client)}
                            className="p-1.5 bg-slate-50 border border-slate-150 rounded-lg text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                            title="Delete"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={submitting}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-100 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving Settings...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Website configuration
                  </>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </AdminGuard>
  );
}
