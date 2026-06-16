"use client";

import React, { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminNavbar from "@/components/AdminNavbar";
import { Save, Loader2, AlertCircle, X, Settings, Image as ImageIcon, Sparkles } from "lucide-react";
import { db, storage } from "@/lib/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
      }
    } catch (e) {
      console.error("Error loading settings:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      let finalLogoUrl = logoUrl;
      let finalFaviconUrl = faviconUrl;

      // 1. Upload Logo if changed
      if (logoFile) {
        const logoRef = ref(storage, `settings_media/logo_${Date.now()}_${logoFile.name}`);
        const snapshot = await uploadBytes(logoRef, logoFile);
        finalLogoUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Upload Favicon if changed
      if (faviconFile) {
        const faviconRef = ref(storage, `settings_media/favicon_${Date.now()}_${faviconFile.name}`);
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
                      accept="image/*"
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
                      accept="image/*"
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
