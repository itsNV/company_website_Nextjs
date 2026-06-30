"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/app/icon.png";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const chatbotId = process.env.NEXT_PUBLIC_CHATBOT_ID;
  const iframeUrl = `https://www.chatbase.co/chatbot-iframe/${chatbotId}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans pointer-events-none">
      {/* Chat Window Panel */}
      <div
        className={`mb-4 w-[380px] sm:w-[400px] h-[580px] max-h-[calc(100vh-120px)] max-w-[calc(100vw-48px)] bg-[#0f172a]/95 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Custom Header */}
        <div className="px-4 py-3 bg-[#1e293b]/70 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-slate-800/80 flex items-center justify-center p-1 border border-slate-700/50">
              <Image
                src={logo}
                alt="Yunawise Logo"
                className="w-full h-full object-contain"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0f172a] animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 tracking-wide font-outfit">
                Yunawise Assistant
              </h3>
              <p className="text-[10px] text-emerald-400 font-medium">
                Online & Ready to Help
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Chatbase Iframe container */}
        <div className="flex-1 w-full bg-slate-950 relative">
          <iframe
            src={iframeUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            className="absolute inset-0 w-full h-full rounded-b-2xl"
            title="Yunawise Chatbot"
          />
        </div>
      </div>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-[0_8px_30px_rgb(56,189,248,0.3)] hover:shadow-[0_8px_35px_rgb(56,189,248,0.55)] transition-all duration-300 flex items-center justify-center relative hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#0f172a]"
        aria-label="Toggle chat widget"
      >
        {/* Glow indicator ring when chatbot is closed */}
        {!isOpen && (
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 opacity-40 blur animate-pulse group-hover:opacity-75 transition-opacity" />
        )}
        
        <div className="relative w-6 h-6 flex items-center justify-center">
          {isOpen ? (
            // Close icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6 transition-transform duration-300 rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            // Custom chat icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 transform transition-transform duration-300 group-hover:rotate-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
