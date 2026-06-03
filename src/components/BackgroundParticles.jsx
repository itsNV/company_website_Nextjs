"use client";
import React, { useEffect, useRef } from "react";

export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    // Scroll parallax tracking
    let scrollY = 0;
    let targetScrollY = 0;

    // List of premium AI symbols / logic structures
    const LOGIC_GLYPHS = [
      "λ", "⨂", "⊓", "⨁", "W·x + b", "f(x)", "∑", "∫", 
      "μ", "σ", "∇", "[0 1 0]", "E = mc²", "ŷ", "z = σ(wᵀx)"
    ];

    // High-contrast HSL color sets for light theme (high visibility, luxury aesthetic)
    const COLOR_THEMES = [
      "hsl(210 90% 42% / 0.18)",  // Glacier Deep Blue
      "hsl(165 85% 36% / 0.16)",  // Aurora Deep Teal
      "hsl(275 80% 48% / 0.15)",  // Intelligent Royal Purple
      "hsl(45 95% 45% / 0.14)"    // Luxury Deep Amber
    ];

    // Memory block repository
    const maxBlocks = 18;
    const blocks = [];

    const spawnBlock = (force = false) => {
      if (blocks.length >= maxBlocks && !force) return;

      const blockWidth = 90 + Math.floor(Math.random() * 70);
      const blockHeight = 60 + Math.floor(Math.random() * 50);

      // Random position across canvas (with safe padding)
      const x = 50 + Math.random() * (width - blockWidth - 100);
      const y = 80 + Math.random() * (height + scrollY - blockHeight - 120);

      // Check overlaps to keep visual architecture tidy and clean
      let overlap = false;
      for (let b of blocks) {
        const dist = Math.sqrt(Math.pow(b.x - x, 2) + Math.pow(b.y - y, 2));
        if (dist < 180) {
          overlap = true;
          break;
        }
      }

      if (overlap && !force) return;

      blocks.push({
        id: Math.random(),
        x,
        y,
        w: blockWidth,
        h: blockHeight,
        glyph: LOGIC_GLYPHS[Math.floor(Math.random() * LOGIC_GLYPHS.length)],
        theme: COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)],
        state: "allocation", // allocation -> processing -> retrieval -> deallocation
        life: 0,
        maxLife: 250 + Math.random() * 300,
        opacity: 0,
        connections: [],
        impulses: [], // logic flow signals moving horizontally/vertically
      });
    };

    const initBlocks = () => {
      blocks.length = 0;
      for (let i = 0; i < 8; i++) {
        spawnBlock(true);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initBlocks();
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const draw = () => {
      time += 0.8;
      scrollY += (targetScrollY - scrollY) * 0.08;
      const parallaxY = scrollY * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Spawning / Deallocating blocks dynamically
      if (Math.random() < 0.02) {
        spawnBlock();
      }

      // Draw faint architectural background coordinate grids
      ctx.strokeStyle = "rgba(15, 30, 45, 0.02)";
      ctx.lineWidth = 0.5;
      const grid = 60;
      for (let x = 0; x < width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -(parallaxY % grid); y < height + grid; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update blocks state & calculate straight blueprint logic pathways
      blocks.forEach((b, idx) => {
        b.life += 1;
        const yParallax = b.y - parallaxY;

        // Simple State Machine
        if (b.life < 50) {
          // Allocation state: Fade in
          b.state = "allocation";
          b.opacity = b.life / 50;
        } else if (b.life > b.maxLife - 50) {
          // Deallocation state: Fade out
          b.state = "deallocation";
          b.opacity = (b.maxLife - b.life) / 50;
        } else {
          b.state = b.life % 120 < 60 ? "processing" : "retrieval";
          b.opacity = 1;
        }

        // Remove block if life cycle finishes
        if (b.life >= b.maxLife) {
          blocks.splice(idx, 1);
          return;
        }

        // Dynamically connect straight blueprint paths to adjacent blocks (L-shaped logic flows)
        if (b.state === "retrieval" && b.connections.length === 0 && Math.random() < 0.005) {
          // Find closest neighbor
          let closest = null;
          let minDist = 400;
          blocks.forEach((other) => {
            if (other.id === b.id) return;
            const dist = Math.sqrt(Math.pow(other.x - b.x, 2) + Math.pow(other.y - b.y, 2));
            if (dist < minDist) {
              minDist = dist;
              closest = other;
            }
          });

          if (closest) {
            b.connections.push(closest);
            // Trigger an active architectural data impulse!
            b.impulses.push({
              target: closest,
              progress: 0,
              speed: 0.008 + Math.random() * 0.01,
            });
          }
        }
      });

      // 1. Draw straight L-Shaped Logic blueprint pathways
      ctx.lineWidth = 1;
      blocks.forEach((b) => {
        const yParallax = b.y - parallaxY;

        b.connections.forEach((target) => {
          const targetYParallax = target.y - parallaxY;
          ctx.beginPath();
          ctx.moveTo(b.x + b.w / 2, yParallax + b.h / 2);
          
          // Draw clean, structured L-shaped paths (futuristic architectural alignment)
          ctx.lineTo(target.x + target.w / 2, yParallax + b.h / 2);
          ctx.lineTo(target.x + target.w / 2, targetYParallax + target.h / 2);
          
          ctx.strokeStyle = `rgba(15, 30, 45, ${0.08 * b.opacity * target.opacity})`;
          ctx.stroke();
        });
      });

      // 2. Draw memory impulses zipping through paths
      blocks.forEach((b) => {
        const yParallax = b.y - parallaxY;

        b.impulses.forEach((imp, impIdx) => {
          imp.progress += imp.speed;
          if (imp.progress >= 1) {
            // Remove impulse when destination reached
            b.impulses.splice(impIdx, 1);
            b.connections = []; // Reset connection to rebuild next cycle
          } else {
            const targetYParallax = imp.target.y - parallaxY;
            const startX = b.x + b.w / 2;
            const startY = yParallax + b.h / 2;
            const endX = imp.target.x + imp.target.w / 2;
            const endY = targetYParallax + imp.target.h / 2;

            // Trace L-shaped progression coordinates
            let curX = startX;
            let curY = startY;

            if (imp.progress < 0.5) {
              const localT = imp.progress * 2;
              curX = startX + (endX - startX) * localT;
            } else {
              const localT = (imp.progress - 0.5) * 2;
              curX = endX;
              curY = startY + (endY - startY) * localT;
            }

            // Draw micro glows as a sharp geometric data block instead of a circular particle
            ctx.fillStyle = b.theme.replace(" / 0.18", " / 0.9").replace(" / 0.16", " / 0.9").replace(" / 0.15", " / 0.9").replace(" / 0.14", " / 0.9");
            ctx.fillRect(curX - 3, curY - 3, 6, 6);
          }
        });
      });

      // 3. Draw architectural memory blocks
      blocks.forEach((b) => {
        const yParallax = b.y - parallaxY;
        const opacity = b.opacity;

        // Draw structural box backdrop
        ctx.fillStyle = b.theme.replace(" / 0.18", ` / ${0.03 * opacity}`).replace(" / 0.16", ` / ${0.03 * opacity}`).replace(" / 0.15", ` / ${0.03 * opacity}`).replace(" / 0.14", ` / ${0.02 * opacity}`);
        ctx.fillRect(b.x, yParallax, b.w, b.h);

        // Draw fine outline blueprint box
        ctx.strokeStyle = b.theme.replace(" / 0.18", ` / ${0.32 * opacity}`).replace(" / 0.16", ` / ${0.3 * opacity}`).replace(" / 0.15", ` / ${0.28 * opacity}`).replace(" / 0.14", ` / ${0.25 * opacity}`);
        ctx.lineWidth = 1.2;
        ctx.strokeRect(b.x, yParallax, b.w, b.h);

        // Architectural mechanical corners (crosshairs at corners representing logical constraints)
        const cross = 5;
        ctx.lineWidth = 1;
        
        const corners = [
          { cx: b.x, cy: yParallax },
          { cx: b.x + b.w, cy: yParallax },
          { cx: b.x, cy: yParallax + b.h },
          { cx: b.x + b.w, cy: yParallax + b.h }
        ];

        ctx.strokeStyle = b.theme.replace(" / 0.18", ` / ${0.5 * opacity}`).replace(" / 0.16", ` / ${0.5 * opacity}`).replace(" / 0.15", ` / ${0.5 * opacity}`).replace(" / 0.14", ` / ${0.4 * opacity}`);
        corners.forEach((c) => {
          ctx.beginPath();
          ctx.moveTo(c.cx - cross, c.cy); ctx.lineTo(c.cx + cross, c.cy);
          ctx.moveTo(c.cx, c.cy - cross); ctx.lineTo(c.cx, c.cy + cross);
          ctx.stroke();
        });

        // Draw structural logic glyph inside memory block (high contrast)
        ctx.fillStyle = b.theme.replace(" / 0.18", ` / ${0.85 * opacity}`).replace(" / 0.16", ` / ${0.85 * opacity}`).replace(" / 0.15", ` / ${0.85 * opacity}`).replace(" / 0.14", ` / ${0.85 * opacity}`);
        ctx.font = "bold 13px Outfit, Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.glyph, b.x + b.w / 2, yParallax + b.h / 2);

        // Mini memory state indicators (representing processing bytes / active data indexing)
        ctx.fillStyle = b.theme.replace(" / 0.18", ` / ${0.45 * opacity}`).replace(" / 0.16", ` / ${0.45 * opacity}`).replace(" / 0.15", ` / ${0.45 * opacity}`).replace(" / 0.14", ` / ${0.4 * opacity}`);
        ctx.font = "7px monospace";
        ctx.textAlign = "left";
        ctx.fillText("STATE: " + b.state.toUpperCase(), b.x + 8, yParallax + b.h - 10);
        
        ctx.textAlign = "right";
        ctx.fillText("IDX: 0x" + Math.floor(b.life / 3).toString(16).toUpperCase(), b.x + b.w - 8, yParallax + b.h - 10);
      });

      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden
    />
  );
}
