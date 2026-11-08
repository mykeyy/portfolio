// The e-ink refresh between pages: the same language as the menu's cells, but ordered. The new page arrives
// covered in the old page's ground color; square cells clear in a clean ring spreading out from the point that was
// clicked, each flashing the new page's figure color once (the erase) before showing the page underneath.
// No randomness here: the order is the distance from the click, so the front reads as one deliberate wave.

const FLASH = 60;

export function revealPage(from: { x: number; y: number }, ground: string, flash: string, duration = 560) {
  return new Promise<void>((done) => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:100;pointer-events:none";
    document.body.appendChild(canvas);

    // Whole device pixels throughout, so neighbouring cells never leave seams at 125% or 150% scaling: the canvas
    // is sized in device pixels, cells are a multiple of 4 CSS px, and each cell runs from its rounded edge to its
    // neighbour's rounded edge.
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = innerWidth, h = innerHeight;
    canvas.width = Math.ceil(w * dpr);
    canvas.height = Math.ceil(h * dpr);
    const ctx = canvas.getContext("2d")!;
    const size = Math.max(16, Math.round(Math.min(w, h) / 22 / 4) * 4);
    const edge = (n: number) => Math.round(n * size * dpr);
    const cols = Math.ceil(w / size), rows = Math.ceil(h / size);
    const far = Math.hypot(Math.max(from.x, w - from.x), Math.max(from.y, h - from.y));
    const spread = duration - FLASH;
    const starts = Float32Array.from({ length: cols * rows }, (_, i) => {
      const cx = (i % cols) * size + size / 2, cy = Math.floor(i / cols) * size + size / 2;
      return (Math.hypot(cx - from.x, cy - from.y) / far) * spread;
    });
    const t0 = performance.now();

    const frame = (now: number) => {
      const t = now - t0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < starts.length; i++) {
        const p = t - starts[i];
        if (p >= FLASH) continue;
        ctx.fillStyle = p < 0 ? ground : flash;
        const c = i % cols, r = Math.floor(i / cols);
        ctx.fillRect(edge(c), edge(r), edge(c + 1) - edge(c), edge(r + 1) - edge(r));
      }
      if (t < duration) requestAnimationFrame(frame);
      else {
        canvas.remove();
        done();
      }
    };
    // The first frame is drawn before the cover is lifted, so the page never shows uncovered in between
    frame(t0);
  });
}
