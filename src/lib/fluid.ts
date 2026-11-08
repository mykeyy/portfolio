// Fluid layout. Most of the site already scales smoothly as the window changes (clamp() sizes), but at a few
// points the layout changes shape: the cover name breaks onto two lines, the ledgers fold their columns, the
// article's contents list moves above the text. Without help those changes jump in a single frame. This watches
// for the frame where the layout changes shape and slides every visible block from where it was to where it now
// sits, on the site's firm spring, so phone, tablet and desktop flow into each other instead of snapping.
//
// How: the position of each tracked block is recorded at the end of every frame that resized. When the next resize
// finds the layout's "shape" changed (a breakpoint was crossed), each block is animated from its recorded position
// to its new one (FLIP). Blocks marked data-fluid-scale also scale, for type that changes size at the break.

const TRACK = [
  "[data-fluid]",
  "main h1",
  "main h2",
  ".line > span",
  ".filters",
  ".head",
  ".rows > li",
  ".contents",
  ".front > div",
  ".lead-block",
  ".prose > *",
  ".contacts > li",
  "main figure",
  ".site-header .brand",
  ".site-header .menu-btn",
  "body > footer",
].join(", ");

// The shape of the layout: which breakpoints are on. A change here means blocks jumped.
const QUERIES = ["(width < 47.5em)", "(max-aspect-ratio: 17/20) and (width < 64em)"].map((q) => matchMedia(q));
const shape = () =>
  QUERIES.map((q) => (q.matches ? 1 : 0)).join("") +
  [...document.querySelectorAll<HTMLElement>("[data-fluid-shape]")].map((el) => getComputedStyle(el).display).join();

export function fluid() {
  const calm = matchMedia("(prefers-reduced-motion: reduce)");
  let rects = new Map<Element, DOMRect>();
  let last = shape();
  let pending = 0;

  // Only blocks near the screen, and never one inside another tracked block (it would move twice)
  const blocks = () => {
    const all = [...document.querySelectorAll(TRACK)];
    const set = new Set(all);
    return all.filter((el) => {
      // Parts marked data-fluid move on their own, so the block around them stays put
      if (el.querySelector("[data-fluid]")) return false;
      if (el.hasAttribute("data-fluid")) return true;
      for (let p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false;
      return true;
    });
  };

  const record = () => {
    rects = new Map();
    const h = innerHeight;
    for (const el of blocks()) {
      const r = el.getBoundingClientRect();
      if (r.bottom > -h * 0.5 && r.top < h * 1.5) rects.set(el, r);
    }
  };

  const spring = () => getComputedStyle(document.documentElement).getPropertyValue("--spring-firm").trim() || "ease-out";

  // Phones resize the window's height whenever the address bar shows or hides during a scroll; only a change of
  // width can change the layout's shape, so height-only resizes never start a morph
  let width = innerWidth;
  const running = new Set<Animation>();

  addEventListener(
    "resize",
    () => {
      const now = shape();
      const widthChanged = innerWidth !== width;
      width = innerWidth;
      const doc = document as Document & { activeViewTransition?: unknown };
      if (
        widthChanged &&
        now !== last &&
        !calm.matches &&
        !document.documentElement.classList.contains("menu-open") &&
        !doc.activeViewTransition
      ) {
        // Three passes, so no measurement is taken mid-animation and nothing is measured between writes:
        // 1. stop any morph still running (a quick cross back would otherwise measure a block mid-slide),
        running.forEach((a) => a.cancel());
        running.clear();
        // 2. read every block's new place,
        const moves = [...rects].flatMap(([el, from]) => {
          if (!el.isConnected) return [];
          const to = el.getBoundingClientRect();
          const dx = from.left - to.left, dy = from.top - to.top;
          const s = (el as HTMLElement).hasAttribute("data-fluid-scale") && to.width ? from.width / to.width : 1;
          if (Math.abs(dx) + Math.abs(dy) < 2 && Math.abs(s - 1) < 0.01) return [];
          if (to.bottom < -100 || to.top > innerHeight + 100) return [];
          return [{ el: el as HTMLElement, dx, dy, s }];
        });
        // 3. then start every slide. The scale origin is a plain style, not part of the animation, so the browser
        // can run the animation off the main thread.
        const easing = spring();
        moves.forEach(({ el, dx, dy, s }, i) => {
          const keyframes: Keyframe[] =
            s === 1
              ? [{ translate: `${dx}px ${dy}px` }, { translate: "0px 0px" }]
              : [{ translate: `${dx}px ${dy}px`, scale: String(s) }, { translate: "0px 0px", scale: "1" }];
          if (s !== 1) el.style.transformOrigin = "0 0";
          const a = el.animate(keyframes, { duration: 560, delay: Math.min(i * 12, 120), easing, fill: "backwards" });
          running.add(a);
          a.finished.then(() => running.delete(a), () => running.delete(a));
        });
      }
      last = now;
      if (!pending)
        pending = requestAnimationFrame(() => {
          pending = 0;
          record();
        });
    },
    { passive: true },
  );

  // Positions also change by scrolling; keep the record current (cheaply, once per settled scroll)
  let idle = 0;
  addEventListener(
    "scroll",
    () => {
      clearTimeout(idle);
      idle = window.setTimeout(record, 120);
    },
    { passive: true },
  );

  record();
}
