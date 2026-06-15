// Site-wide interactive effects
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // Page load fade
  const loader = document.getElementById("page-loader");
  if (loader) {
    window.addEventListener("load", () => {
      loader.classList.add("page-loader--done");
      setTimeout(() => loader.remove(), 600);
    });
  }

  if (reduced) return;

  // Cursor spotlight + dot (desktop)
  const spotlight = document.getElementById("cursor-spotlight");
  const dot = document.getElementById("cursor-dot");
  let mouseX = 0;
  let mouseY = 0;
  let spotX = 0;
  let spotY = 0;

  if (finePointer && spotlight) {
    document.body.classList.add("has-custom-cursor");
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }
    });

    function animateSpotlight() {
      spotX += (mouseX - spotX) * 0.08;
      spotY += (mouseY - spotY) * 0.08;
      spotlight.style.left = `${spotX}px`;
      spotlight.style.top = `${spotY}px`;
      requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();

    document.querySelectorAll("a, button, .tilt-card, .skill-tag").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  // 3D tilt cards
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Magnetic buttons
  document.querySelectorAll(".btn-magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  // Click ripple
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Stagger children on reveal
  document.querySelectorAll(".reveal-stagger").forEach((group) => {
    const children = group.querySelectorAll(":scope > .reveal, :scope > .tilt-card, :scope > .explore-link, :scope > .ai-capability, :scope > .preview-card, :scope > .project-card");
    children.forEach((child, i) => {
      if (child.classList.contains("reveal")) {
        child.style.transitionDelay = `${i * 0.1}s`;
      }
    });
  });

  // Parallax hero content
  const hero = document.querySelector(".hero__inner");
  if (hero) {
    window.addEventListener(
      "scroll",
      () => {
        const offset = window.scrollY * 0.25;
        hero.style.transform = `translateY(${offset}px)`;
        hero.style.opacity = `${1 - Math.min(window.scrollY / 600, 0.4)}`;
      },
      { passive: true }
    );
  }
})();
