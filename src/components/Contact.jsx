"use client";
import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Contact({ config }) {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contactConfig, setContactConfig] = useState(config || null);

  useEffect(() => {
    if (config) {
      setContactConfig(config);
      return;
    }
    async function loadConfig() {
      try {
        const docRef = doc(db, "settings", "homepage");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContactConfig(docSnap.data());
        }
      } catch (e) {
        console.error("Error loading config in Contact:", e);
      }
    }
    loadConfig();
  }, [config]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", msg: "" });
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setError("Failed to send message. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-4 md:py-12 lg:py-16 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Office Details */}
          <div className="reveal-item lg:col-span-5 flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full mb-6">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-outfit text-slate-900 leading-tight mb-6">
              Let's talk about <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">your next project</span>.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Have an idea for a web portal, headless CMS stack, or mobile app? Send us a message or schedule a direct architectural audit with our engineering team.
            </p>

            <div className="flex flex-col gap-6 w-full">
              {/* Address */}
              <div className="hover-box flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 font-outfit text-sm uppercase tracking-wider mb-1">Our Headquarters</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {contactConfig?.companyLocation || "A-518, Moneyplant Highstreet, Jagatpur road, Gota, Ahmedabad 382470"}
                  </p>
                </div>
              </div>

              {/* Call */}
              <div className="hover-box flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 font-outfit text-sm uppercase tracking-wider mb-1">Call Our Office</h4>
                  <a href={`tel:${contactConfig?.companyPhone || "+918153874988"}`} className="text-primary hover:text-slate-900 font-semibold text-sm transition-colors">
                    {contactConfig?.companyPhone || "+91 8153874988"}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="hover-box flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 font-outfit text-sm uppercase tracking-wider mb-1">Email Inquiries</h4>
                  <a href={`mailto:${contactConfig?.companyEmail || "nisargpatel2466@gmail.com"}`} className="text-primary hover:text-slate-900 font-semibold text-sm transition-colors">
                    {contactConfig?.companyEmail || "nisargpatel2466@gmail.com"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div
            className="reveal-item lg:col-span-7"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="hover-box w-full h-full bg-white rounded-[32px] border border-slate-200/60 shadow-xl p-8 md:p-12 relative overflow-hidden">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-md shadow-emerald-100">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black font-outfit text-slate-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-500 max-w-sm">
                    Thank you for contacting {contactConfig?.companyName || "Yunawise"} {contactConfig?.companySubName || "Techsolve LLP"}. Our principal consultant will review your inquiry and reach back within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-extrabold font-outfit text-slate-900 mb-2">Request Free Consultation</h3>
                    <p className="text-slate-500 text-sm">
                      Fill out the form below. We will analyze your specifications and build a custom implementation plan.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        suppressHydrationWarning
                        placeholder="e.g. Suresh Prajapati"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-slate-800 text-sm bg-slate-50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Work Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        suppressHydrationWarning
                        placeholder="e.g. name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-slate-800 text-sm bg-slate-50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      suppressHydrationWarning
                      placeholder="Tell us about your requirements (e.g. Headless CMS migration, e-commerce storefront, etc.)"
                      value={formData.msg}
                      onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-slate-800 text-sm bg-slate-50 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400 leading-normal">
                    By clicking Send Message, you agree to our privacy policy and consent to secure cookie storage to facilitate direct communication.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    suppressHydrationWarning
                    className="hover-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-primary w-full sm:w-auto self-start mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
