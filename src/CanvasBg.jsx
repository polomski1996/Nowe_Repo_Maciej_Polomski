import React, { useEffect, useRef } from "react";

export default function CanvasBg() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    let t = 0;
    const STEP = 10;   // grid density
    const SEG  = 48;  // px per segment — controls curve smoothness

    // Three wave layers travelling in slightly different directions & speeds
    // Each layer: { amp, fy, fx_phase, speed } for vertical-line x-displacement
    //             { amp, fx, fy_phase, speed } mirrors for horizontal-line y-displacement
    const LAYERS = [
      { amp: 190,   fy: 0.008, fx: 0.003,  speed: 1.28 },
      { amp: 9,   fy: 0.015, fx: 0.006,  speed: 0.50 },
      { amp: 2,   fy: 0.026, fx: 0.011,  speed: 0.85 },
    ];

    // Horizontal displacement for a vertical line's point at (x, y)
    function waveX(x, y, t) {
      let d = 0;
      for (const L of LAYERS)
        d += L.amp * Math.sin(y * L.fy + x * L.fx + t * L.speed);
      return d;
    }

    // Vertical displacement for a horizontal line's point at (x, y)
    function waveY(x, y, t) {
      let d = 0;
      for (const L of LAYERS)
        d += L.amp * Math.sin(x * L.fy + y * L.fx + t * L.speed + 1.57);
      return d;
    }

    function draw() {
      t += 0.004;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(232,216,201,0.05)";
      ctx.lineWidth = 1;

      // Vertical lines — bend horizontally
      const vSegs = Math.ceil(h / SEG);
      for (let x = 0; x <= w; x += STEP) {
        ctx.beginPath();
        for (let i = 0; i <= vSegs; i++) {
          const y  = i * SEG;
          const bx = x + waveX(x, y, t);
          i === 0 ? ctx.moveTo(bx, y) : ctx.lineTo(bx, y);
        }
        ctx.stroke();
      }

      // Horizontal lines — bend vertically
      const hSegs = Math.ceil(w / SEG);
      for (let y = 0; y <= h; y += STEP) {
        ctx.beginPath();
        for (let i = 0; i <= hSegs; i++) {
          const x  = i * SEG;
          const by = y + waveY(x, y, t);
          i === 0 ? ctx.moveTo(x, by) : ctx.lineTo(x, by);
        }
        ctx.stroke();
      }

      // Soft scanline sweep
      const scanY = ((t * 50) % (h + 200)) - 100;
      const grad  = ctx.createLinearGradient(0, scanY - 100, 0, scanY + 100);
      grad.addColorStop(0,   "rgba(243,112,30,0)");
      grad.addColorStop(0.5, "rgba(243,112,30,0.05)");
      grad.addColorStop(1,   "rgba(243,112,30,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 100, w, 200);

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
