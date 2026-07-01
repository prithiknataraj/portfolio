// Sitewide animated neural-network background
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.id = "network-bg";
  canvas.className = "network-bg";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertAdjacentElement("afterbegin", canvas);

  const ctx = canvas.getContext("2d");
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const maxDist = 130;
  const mouseDist = maxDist * 1.4;
  let nodes = [];
  let animId;
  const mouse = { x: -9999, y: -9999, active: false };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const area = canvas.width * canvas.height;
    const count = Math.min(90, Math.max(28, Math.floor(area / 22000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / maxDist) * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDist) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / mouseDist) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(196, 181, 253, 0.35)";
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  resize();
  draw();

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });

  if (finePointer) {
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) mouse.active = false;
    });
  }
})();
