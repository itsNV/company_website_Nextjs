"use client";

import React, { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminNavbar from "@/components/AdminNavbar";

import { 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  PlusCircle, 
  Edit3, 
  Search, 
  Save, 
  X, 
  Plus, 
  Trash2,
  Cpu,
  CheckCircle2,
  Compass,
  Palette,
  Award,
  ShieldCheck,
  HelpCircle,
  Laptop
} from "lucide-react";
import { db } from "@/lib/firebase/firebase";
import { collection, setDoc, getDocs, doc, updateDoc, deleteDoc, query } from "firebase/firestore";

// Helper map to match string names to Lucide icons
const iconMap = {
  Palette: Palette,
  Compass: Compass,
  ShieldCheck: ShieldCheck,
  Award: Award,
  Laptop: Laptop,
  HelpCircle: HelpCircle,
  Sparkles: Sparkles,
  Cpu: Cpu,
};

const iconOptions = Object.keys(iconMap);

export default function SolutionsAdminPage() {
  const [solutions, setSolutions] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeTab, setActiveTab] = useState("create"); // "create" or "edit"
  const [editingSolutionId, setEditingSolutionId] = useState(null);
  
  // Message feedback
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Solution form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [heroBadge, setHeroBadge] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");

  // Dynamic lists states
  const [benefits, setBenefits] = useState([]);
  const [newBenefit, setNewBenefit] = useState("");

  // const [featuresOffered, setFeaturesOffered] = useState([]);
  // const [newFeatureOffered, setNewFeatureOffered] = useState("");

  // Features
  const [features, setFeatures] = useState([]);
  const [newFeatureTitle, setNewFeatureTitle] = useState("");
  const [newFeatureDesc, setNewFeatureDesc] = useState("");
  const [newFeatureIcon, setNewFeatureIcon] = useState("Cpu");

  // Process Steps
  // const [processSteps, setProcessSteps] = useState([]);
  // const [newStepNumber, setNewStepNumber] = useState("");
  // const [newStepTitle, setNewStepTitle] = useState("");
  // const [newStepDesc, setNewStepDesc] = useState("");

  // FAQs
  // const [faqs, setFaqs] = useState([]);
  // const [newFaqQuestion, setNewFaqQuestion] = useState("");
  // const [newFaqAnswer, setNewFaqAnswer] = useState("");

  // SEO
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // New fields: Industry we served & Overview Section
  const [industriesServed, setIndustriesServed] = useState([]);
  const [newIndustryServed, setNewIndustryServed] = useState("");
  const [overviewTitle, setOverviewTitle] = useState("");
  const [overviewDescription, setOverviewDescription] = useState("");

  // Auto-slug generator
  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")          // Replace spaces with -
      .replace(/[^\w\-]+/g, "")       // Remove all non-word chars
      .replace(/\-\-+/g, "-");        // Replace multiple - with single -
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setSlug(generateSlug(val));
  };

  const fetchSolutions = async () => {
    setLoadingList(true);
    try {
      const q = query(collection(db, "solutions"));
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSolutions(fetched);
    } catch (e) {
      console.error("Error fetching solutions:", e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  // Benefit handlers
  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index) => {
    setBenefits(benefits.filter((_, idx) => idx !== index));
  };

  // Feature offered handlers
  // const addFeatureOffered = () => {
  //   if (newFeatureOffered.trim()) {
  //     setFeaturesOffered([...featuresOffered, newFeatureOffered.trim()]);
  //     setNewFeatureOffered("");
  //   }
  // };

  // const removeFeatureOffered = (index) => {
  //   setFeaturesOffered(featuresOffered.filter((_, idx) => idx !== index));
  // };

  // Feature handlers
  const addFeature = () => {
    if (newFeatureTitle.trim() && newFeatureDesc.trim()) {
      setFeatures([
        ...features,
        {
          title: newFeatureTitle.trim(),
          desc: newFeatureDesc.trim(),
          icon: newFeatureIcon
        }
      ]);
      setNewFeatureTitle("");
      setNewFeatureDesc("");
      setNewFeatureIcon("Cpu");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, idx) => idx !== index));
  };

  // Process Steps handlers
  // const addProcessStep = () => {
  //   if (newStepNumber.trim() && newStepTitle.trim() && newStepDesc.trim()) {
  //     setProcessSteps([
  //       ...processSteps,
  //       {
  //         step: newStepNumber.trim(),
  //         title: newStepTitle.trim(),
  //         desc: newStepDesc.trim()
  //       }
  //     ]);
  //     setNewStepNumber("");
  //     setNewStepTitle("");
  //     setNewStepDesc("");
  //   }
  // };

  // const removeProcessStep = (index) => {
  //   setProcessSteps(processSteps.filter((_, idx) => idx !== index));
  // };

  // FAQ handlers
  // const addFaq = () => {
  //   if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
  //     setFaqs([
  //       ...faqs,
  //       {
  //         q: newFaqQuestion.trim(),
  //         a: newFaqAnswer.trim()
  //       }
  //     ]);
  //     setNewFaqQuestion("");
  //     setNewFaqAnswer("");
  //   }
  // };

  // const removeFaq = (index) => {
  //   setFaqs(faqs.filter((_, idx) => idx !== index));
  // };

  // Industry handlers
  const addIndustryServed = () => {
    if (newIndustryServed.trim()) {
      setIndustriesServed([...industriesServed, newIndustryServed.trim()]);
      setNewIndustryServed("");
    }
  };

  const removeIndustryServed = (index) => {
    setIndustriesServed(industriesServed.filter((_, idx) => idx !== index));
  };

  // Reset form helper
  const resetForm = () => {
    setName("");
    setSlug("");
    setHeroBadge("");
    setHeroDescription("");
    setCtaText("");
    setCtaLink("");
    setBenefits([]);
    // setFeaturesOffered([]);
    setFeatures([]);
    // setProcessSteps([]);
    // setFaqs([]);
    setSeoTitle("");
    setSeoDescription("");
    setIndustriesServed([]);
    setNewIndustryServed("");
    setOverviewTitle("");
    setOverviewDescription("");
    setEditingSolutionId(null);
  };

  // Form submit handler (Create/Update)
  const handleSubmitSolution = async (e) => {
    e.preventDefault();
    if (!name || !slug) {
      setMessage({ type: "error", text: "Solution name and slug are required." });
      return;
    }

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    const solutionData = {
      name,
      slug,
      heroBadge,
      heroDescription,
      ctaText,
      ctaLink,
      benefits,
      // featuresOffered,
      features,
      // processSteps,
      // faqs,
      seoTitle,
      seoDescription,
      industriesServed,
      overviewTitle,
      overviewDescription,
      updatedAt: new Date().toISOString()
    };

    try {
      if (editingSolutionId) {
        // Edit Mode
        const docRef = doc(db, "solutions", editingSolutionId);
        await updateDoc(docRef, solutionData);
        setMessage({ type: "success", text: "Solution updated successfully!" });
      } else {
        // Create Mode
        await setDoc(doc(db, "solutions", slug  ), {
          ...solutionData,
          createdAt: new Date().toISOString()
        });
        setMessage({ type: "success", text: "Solution created successfully!" });
      }

      resetForm();
      fetchSolutions();
      setActiveTab("edit");
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to save solution details." });
    } finally {
      setSubmitting(false);
    }
  };

  // Edit action
  const handleEditSelect = (solution) => {
    setEditingSolutionId(solution.id);
    setName(solution.name || "");
    setSlug(solution.slug || "");
    setHeroBadge(solution.heroBadge || "");
    setHeroDescription(solution.heroDescription || "");
    setCtaText(solution.ctaText || "");
    setCtaLink(solution.ctaLink || "");
    setBenefits(solution.benefits || []);
    // setFeaturesOffered(solution.featuresOffered || []);
    setFeatures(solution.features || []);
    // setProcessSteps(solution.processSteps || []);
    // setFaqs(solution.faqs || []);
    setSeoTitle(solution.seoTitle || "");
    setSeoDescription(solution.seoDescription || "");
    setIndustriesServed(solution.industriesServed || []);
    setOverviewTitle(solution.overviewTitle || "");
    setOverviewDescription(solution.overviewDescription || "");
    setActiveTab("create"); // Switch to form
  };

  // Delete action
  const handleDeleteSolution = async (id) => {
    if (!window.confirm("Are you sure you want to delete this solution permanently?")) return;
    try {
      await deleteDoc(doc(db, "solutions", id));
      fetchSolutions();
    } catch (err) {
      alert("Error deleting solution: " + err.message);
    }
  };

  const filteredSolutions = solutions.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminGuard>
      <div className="flex flex-col min-h-screen bg-[#f3f9fc] text-slate-800 font-sans relative z-10">
        <AdminNavbar />
        <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />

        <main className="flex-grow pt-28 pb-16 px-6 max-w-7xl mx-auto w-full z-10">
          {/* Top glow effects */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-[140px] pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200 pb-6 mb-10">
            <div>
              <h1 className="text-3xl font-black font-outfit text-slate-900 tracking-wide flex items-center gap-1.5">
                Solutions Center
                <span className="text-emerald-600">.</span>
              </h1>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">
                Yunawise Enterprise System Parameters Console
              </p>
            </div>

            {/* Mode selection buttons */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => { setActiveTab("create"); resetForm(); }}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "create" && !editingSolutionId
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <PlusCircle className="w-4 h-4" /> Create Solution
              </button>
              <button
                onClick={() => { setActiveTab("edit"); }}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === "edit" || editingSolutionId
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Edit3 className="w-4 h-4" /> Edit Solutions {editingSolutionId && "(Active)"}
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
            <form onSubmit={handleSubmitSolution} className="max-w-4xl mx-auto space-y-8">
              {/* Form Heading info */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Cpu className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider font-outfit">
                    {editingSolutionId ? "Modify Existing Solution" : "New Solution Configuration"}
                  </h2>
                </div>

                {/* Basic Information section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Solution Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ERP Software Integration"
                      value={name}
                      onChange={handleNameChange}
                      className="w-full h-11 px-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider font-semibold">URL Slug (Auto-Generated)</label>
                    <input
                      type="text"
                      required
                      placeholder="erp-software-integration"
                      value={slug}
                      onChange={(e) => setSlug(generateSlug(e.target.value))}
                      className="w-full h-11 px-4 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm outline-none cursor-not-allowed"
                      readOnly
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Hero Badge Text</label>
                    <input
                      type="text"
                      placeholder="e.g. Enterprise Systems & Workflows"
                      value={heroBadge}
                      onChange={(e) => setHeroBadge(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Hero Description</label>
                    <textarea
                      rows={4}
                      placeholder="High-converting explanation displayed directly below hero badge..."
                      value={heroDescription}
                      onChange={(e) => setHeroDescription(e.target.value)}
                      className="w-full p-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">CTA Button Text</label>
                    <input
                      type="text"
                      placeholder="e.g. Design ERP Blueprint"
                      value={ctaText}
                      onChange={(e) => setCtaText(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">CTA Target Link</label>
                    <input
                      type="text"
                      placeholder="e.g. /contact"
                      value={ctaLink}
                      onChange={(e) => setCtaLink(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Overview Section */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider font-outfit">
                    Overview Section
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Overview Title/Headline</label>
                    <input
                      type="text"
                      placeholder="e.g. Revolutionizing Business Efficiency"
                      value={overviewTitle}
                      onChange={(e) => setOverviewTitle(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Overview Description</label>
                    <textarea
                      rows={4}
                      placeholder="Comprehensive overview copy explaining this enterprise solution..."
                      value={overviewDescription}
                      onChange={(e) => setOverviewDescription(e.target.value)}
                      className="w-full p-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Industry We Served Section */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-2">
                  <Laptop className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">Industries Served</h3>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Healthcare, Manufacturing, Retail"
                    value={newIndustryServed}
                    onChange={(e) => setNewIndustryServed(e.target.value)}
                    className="flex-grow h-11 px-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addIndustryServed(); } }}
                  />
                  <button
                    type="button"
                    onClick={addIndustryServed}
                    className="h-11 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Industry
                  </button>
                </div>

                {industriesServed.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-3">
                    {industriesServed.map((ind, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold">
                        {ind}
                        <button type="button" onClick={() => removeIndustryServed(idx)} className="hover:text-emerald-900 focus:outline-none">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Benefits Section */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">Benefits Array</h3>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Enhances credibility"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="flex-grow h-11 px-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addBenefit(); } }}
                  />
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="h-11 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Benefit
                  </button>
                </div>

                {benefits.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-3">
                    {benefits.map((b, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold">
                        {b}
                        <button type="button" onClick={() => removeBenefit(idx)} className="hover:text-emerald-900 focus:outline-none">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions / Features Offered Section */}
              {/* <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-2">
                  <PlusCircle className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">Solutions/Features Offered</h3>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. ERP System Blueprint Design"
                    value={newFeatureOffered}
                    onChange={(e) => setNewFeatureOffered(e.target.value)}
                    className="flex-grow h-11 px-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeatureOffered(); } }}
                  />
                  <button
                    type="button"
                    onClick={addFeatureOffered}
                    className="h-11 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Feature
                  </button>
                </div>

                {featuresOffered.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-3">
                    {featuresOffered.map((s, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-semibold">
                        {s}
                        <button type="button" onClick={() => removeFeatureOffered(idx)} className="hover:text-teal-900 focus:outline-none">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div> */}

              {/* Features Repeatable Section */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-4">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">Core Solutions Scope</h3>
                </div>

                {/* Sub-inputs to add a feature */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 border border-slate-200/50 rounded-2xl p-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Feature Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Scalable System Architecture"
                      value={newFeatureTitle}
                      onChange={(e) => setNewFeatureTitle(e.target.value)}
                      className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Feature Icon</label>
                    <select
                      value={newFeatureIcon}
                      onChange={(e) => setNewFeatureIcon(e.target.value)}
                      className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-emerald-500"
                    >
                      {iconOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 md:col-span-3">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Feature Description</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Modern UI structure configured from strategy maps."
                      value={newFeatureDesc}
                      onChange={(e) => setNewFeatureDesc(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end">
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Feature Item
                    </button>
                  </div>
                </div>

                {features.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Features Added ({features.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {features.map((feat, idx) => {
                        const Icon = iconMap[feat.icon] || Cpu;
                        return (
                          <div key={idx} className="relative p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-start gap-4 pr-10">
                            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shrink-0">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-bold text-sm text-slate-900">{feat.title}</h5>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feat.desc}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFeature(idx)}
                              className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Process Steps Section */}
              {/* <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-4">
                  <Compass className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">Process Steps Timeline</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 border border-slate-200/50 rounded-2xl p-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Step Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 01"
                      value={newStepNumber}
                      onChange={(e) => setNewStepNumber(e.target.value)}
                      className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Step Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Requirements Gathering"
                      value={newStepTitle}
                      onChange={(e) => setNewStepTitle(e.target.value)}
                      className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-3">
                    <label className="text-[10px] font-black uppercase text-slate-550 tracking-wider">Step Description</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Deep analysis of business flows and CRM specifications."
                      value={newStepDesc}
                      onChange={(e) => setNewStepDesc(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end">
                    <button
                      type="button"
                      onClick={addProcessStep}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Process Step
                    </button>
                  </div>
                </div>

                {processSteps.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Lifecycle Steps Added ({processSteps.length})</h4>
                    <div className="space-y-3">
                      {processSteps.map((step, idx) => (
                        <div key={idx} className="relative p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-start gap-4 pr-10">
                          <span className="text-2xl font-black font-outfit text-emerald-600 shrink-0">{step.step}</span>
                          <div>
                            <h5 className="font-bold text-sm text-slate-900">{step.title}</h5>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeProcessStep(idx)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div> */}

              {/* FAQs repeat section */}
              {/* <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-4">
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">Frequently Asked Questions</h3>
                </div>

                <div className="grid grid-cols-1 gap-4 bg-slate-50/50 border border-slate-200/50 rounded-2xl p-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-555 tracking-wider">Question text</label>
                    <input
                      type="text"
                      placeholder="e.g. What is enterprise integration?"
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-555 tracking-wider">Answer detail</label>
                    <textarea
                      rows={3}
                      placeholder="Enterprise integration consists of connecting software layers..."
                      value={newFaqAnswer}
                      onChange={(e) => setNewFaqAnswer(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={addFaq}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add FAQ Item
                    </button>
                  </div>
                </div>

                {faqs.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">FAQs Added ({faqs.length})</h4>
                    <div className="space-y-3">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="relative p-5 rounded-2xl border border-slate-200 bg-white shadow-sm pr-12">
                          <h5 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            {faq.q}
                          </h5>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed pl-4 border-l border-slate-100">{faq.a}</p>
                          <button
                            type="button"
                            onClick={() => removeFaq(idx)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div> */}

              {/* SEO parameters */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-outfit">SEO Optimization Meta</h3>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-555 tracking-wider">SEO Title Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. ERP Integration & CRM Solutions | Yunawise"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-555 tracking-wider">SEO Meta Description</label>
                    <textarea
                      rows={3}
                      placeholder="Search index snippet description under 160 characters..."
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="w-full p-4 bg-slate-55/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                {editingSolutionId ? (
                  <button
                    type="button"
                    onClick={() => { resetForm(); setActiveTab("edit"); }}
                    className="h-12 px-6 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-2xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    Cancel Edit
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-100 flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving Details...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> {editingSolutionId ? "Save Solution Changes" : "Deploy Enterprise Solution"}
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Edit and Search Solutions Mode */
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search solution parameters or SEO metadata..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200/80 rounded-2xl text-sm text-slate-800 placeholder-slate-400 outline-none shadow-sm focus:border-emerald-500"
                />
              </div>

              {loadingList ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                  <span className="text-xs uppercase font-bold tracking-wider">Syncing Core Collections...</span>
                </div>
              ) : filteredSolutions.length === 0 ? (
                <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center text-slate-500 shadow-md">
                  <p className="text-sm font-semibold">No solutions found matching current queries.</p>
                  <button
                    onClick={() => { setActiveTab("create"); resetForm(); }}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Setup First Solution
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredSolutions.map((solution) => (
                    <div key={solution.id} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 text-[10px] font-black uppercase rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {solution.heroBadge || "Solution"}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 font-mono">
                            /{solution.slug}
                          </span>
                        </div>
                        <h3 className="text-lg font-black font-outfit text-slate-900 pt-1">
                          {solution.name}
                        </h3>
                        <p className="text-slate-500 text-xs line-clamp-1 max-w-xl">
                          {solution.heroDescription || "No hero description specified."}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => handleEditSelect(solution)}
                          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSolution(solution.id)}
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
