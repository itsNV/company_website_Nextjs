"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function ContactPage() {
  useEffect(() => {
    // Reveal animation initial triggers
    const timer = setTimeout(() => {
      const animatableElements = document.querySelectorAll(
        "section, .reveal-item, .reveal-stagger, .split-line-mask"
      );
      animatableElements.forEach((el) => el.classList.add("active"));
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar activeSection="contact" />
      {/* Premium Top Satin Gradient Vignette Mask */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#f3f9fc] via-[#f3f9fc]/90 to-transparent z-40 pointer-events-none" />
      <main className="flex-grow reveal-container relative z-[1] pt-16 sm:pt-20 lg:pt-24">
       
        <Contact />
      </main>
      <Footer />
    </>
  );
}
