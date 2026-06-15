// Floating code particles in hero
(function () {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  const symbols = ["{ }", "</>", "=>", "fn", "git", "AI", "01", "λ", "npm", "&&"];
  let items = [];
  let animId;

  function resize() {
    const hero = canvas.closest(".hero");
    if (!hero) return;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    const count = Math.min(18, Math.floor(canvas.width / 80));
    items = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      text: symbols[Math.floor(Math.random() * symbols.length)],
      speed: 0.2 + Math.random() * 0.4,
      opacity: 0.08 + Math.random() * 0.15,
      size: 11 + Math.random() * 8,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    items.forEach((p) => {
      p.y -= p.speed;
      if (p.y < -20) {
        p.y = canvas.height + 20;
        p.x = Math.random() * canvas.width;
      }
      ctx.font = `${p.size}px Space Grotesk, monospace`;
      ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`;
      ctx.fillText(p.text, p.x, p.y);
    });
    animId = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
})();
