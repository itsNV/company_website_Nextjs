"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

const WIDGET_ID = process.env.NEXT_PUBLIC_WIDGE_ID; 

const fallbackReviews = [
  {
    name: "Rajesh Mehta",
    role: "Director, Satcure",
    rating: 5,
    text: "Yunawise delivered our custom database software on time and with zero bugs. Their engineering standards are second to none in Ahmedabad.",
    date: "2 months ago"
  },
  {
    name: "Amit Patel",
    role: "Founder, Evehica",
    rating: 5,
    text: "Excellent web design and seamless CMS integration. Our website traffic has grown by 150% since we launched the new layout. Highly recommended!",
    date: "1 month ago"
  }, 
  {
    name: "Sneha Sharma",
    role: "Marketing Head, Aakar Publication",
    rating: 5,
    text: "The team is extremely professional and responsive. They built a custom dashboard that solved our operations bottlenecks. A pleasure to work with.",
    date: "3 weeks ago"
  }
];

export default function Testimonials() {
  const [useFallback, setUseFallback] = useState(false);

  // Ensure we don't duplicate the prefix if WIDGET_ID is pasted with "elfsight-app-"
  const widgetClass = WIDGET_ID.startsWith("elfsight-app-") 
    ? WIDGET_ID 
    : `elfsight-app-${WIDGET_ID}`;  

  useEffect(() => {
    // Dynamic MutationObserver to search inside shadowroots and hide branding
    const hideElfsightElements = () => {
      const scanAndHide = (root) => {
        if (!root) return;

        // ONLY hide direct links to elfsight.com (which covers watermarks/badges)
        root.querySelectorAll('a[href*="elfsight.com"]').forEach(el => {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('opacity', '0', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('height', '0', 'important');
        });

        // Hide specific text nodes containing watermark labels
        root.querySelectorAll('*').forEach(el => {
          if (el.textContent && el.textContent.trim() === 'Free Google Reviews Widget') {
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('opacity', '0', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
            el.style.setProperty('height', '0', 'important');
          }

          // Recurse into nested Shadow DOMs
          if (el.shadowRoot) {
            scanAndHide(el.shadowRoot);
          }
        });
      };

      scanAndHide(document);
    };

    hideElfsightElements();
    
    const observer = new MutationObserver(hideElfsightElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    const interval = setInterval(hideElfsightElements, 600);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // If after 4.5 seconds the widget element is still completely empty (Elfsight load failed), activate fallback reviews
    const timer = setTimeout(() => {
      const widgetEl = document.querySelector(`.${widgetClass}`);
      if (widgetEl && widgetEl.children.length === 0) {
        setUseFallback(true);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [widgetClass]);

  return (
    <section id="testimonials" className="py-20 bg-transparent relative z-10">
      {/* Hide Elfsight branding / watermark / tabs */}
      <style>{`
        /* Targeted rules to hide Elfsight branding watermarks and floating banner tabs */
        a[href*="elfsight.com"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          height: 0 !important;
          width: 0 !important;
          pointer-events: none !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center reveal-item">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
          Client Feedback
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold font-outfit text-slate-900 mt-2">
          What our clients <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">say about us</span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 overflow-hidden">
        {useFallback ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fallbackReviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[2rem] border border-slate-200/50 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <svg key={i} className="w-4.5 h-4.5 text-amber-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    "{rev.text}"
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center mt-auto">
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 font-outfit">{rev.name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{rev.role}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 font-semibold">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Elfsight's platform script — loads once, lazy, non-blocking */}
            <Script
              src="https://static.elfsight.com/platform/platform.js"
              strategy="lazyOnload"
              onError={() => setUseFallback(true)}
            />

            {/* The actual widget mount point */}
            <div className={`${widgetClass} min-h-[300px] pb-10`} data-elfsight-app-lazy />

            {/* Positional cover-up line mask that hides the footer watermark under a beautiful section divider */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f3f9fc] z-30 pointer-events-auto">
              {/* Beautiful glowing divider line that spans across the container */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
