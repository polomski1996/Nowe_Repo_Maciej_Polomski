import React, { useEffect, useRef } from "react";

export default function CanvasBg() {
  const ref = useRef(null);
  const rawMouse = useRef({ x: -9999, y: -9999 });

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

    const onMove = (e) => {
      rawMouse.current.x = e.clientX;
      rawMouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    // Smoothed cursor position (lerped each frame)
    let sx = -9999, sy = -9999;

    let t = 0;
    const STEP = 5;
    const STRENGTH = 98;   // max pixel bend
    const RADIUS_SQ = 90 * 90; // gaussian falloff radius²
    const SEG = 48;        // pixels per segment — controls curve smoothness

    function draw() {
      t += 0.004;

      // Lerp toward real cursor
      const { x: mx, y: my } = rawMouse.current;
      if (sx < -1000) { sx = mx; sy = my; }
      sx += (mx - sx) * 0.09;
      sy += (my - sy) * 0.09;

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(232,216,201,0.05)";
      ctx.lineWidth = 1;

      const ox = Math.sin(t * 0.5) * 24;
      const oy = Math.cos(t * 0.4) * 18;

      // Vertical lines — each point bends horizontally away from cursor
      const vSegs = Math.ceil(h / SEG);
      for (let x = -STEP + (ox % STEP); x < w + STEP; x += STEP) {
        ctx.beginPath();
        for (let i = 0; i <= vSegs; i++) {
          const y = i * SEG;
          const dx = x - sx;
          const dy = y - sy;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq) + 0.001;
          const push = STRENGTH * Math.exp(-distSq / RADIUS_SQ);
          const bx = x + (dx / dist) * push;
          if (i === 0) ctx.moveTo(bx, y);
          else ctx.lineTo(bx, y);
        }
        ctx.stroke();
      }

      // Horizontal lines — each point bends vertically away from cursor
      const hSegs = Math.ceil(w / SEG);
      for (let y = -STEP + (oy % STEP); y < h + STEP; y += STEP) {
        ctx.beginPath();
        for (let i = 0; i <= hSegs; i++) {
          const x = i * SEG;
          const dx = x - sx;
          const dy = y - sy;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq) + 0.001;
          const push = STRENGTH * Math.exp(-distSq / RADIUS_SQ);
          const by = y + (dy / dist) * push;
          if (i === 0) ctx.moveTo(x, by);
          else ctx.lineTo(x, by);
        }
        ctx.stroke();
      }

      // Soft horizontal scanline
      const scanY = ((t * 50) % (h + 200)) - 100;
      const grad = ctx.createLinearGradient(0, scanY - 100, 0, scanY + 100);
      grad.addColorStop(0, "rgba(243,112,30,0)");
      grad.addColorStop(0.5, "rgba(243,112,30,0.05)");
      grad.addColorStop(1, "rgba(243,112,30,0)");
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
      window.removeEventListener("mousemove", onMove);
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
