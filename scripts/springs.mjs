// Prints the site's spring curves as CSS linear() easings, for --spring and --spring-firm in src/styles/global.css.
// A spring is set the way Apple sets them: how long it takes to look settled, and how much it bounces
// (0 = no overshoot). Run: bun scripts/springs.mjs
const spring = (bounce) => {
  const zeta = 1 - bounce; // damping ratio
  const omega = (2 * Math.PI) / 0.62; // settles visually by the end of the duration
  const x = (t) => {
    if (zeta >= 1) return 1 - (1 + omega * t) * Math.exp(-omega * t);
    const wd = omega * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
  };
  const N = 40;
  const pts = Array.from({ length: N + 1 }, (_, i) => (i === 0 ? "0" : i === N ? "1" : `${+x(i / N).toFixed(4)} ${((i / N) * 100).toFixed(1)}%`));
  return `linear(${pts.join(", ")})`;
};
console.log(`--spring: ${spring(0)};`);
console.log(`--spring-firm: ${spring(0.15)};`);
