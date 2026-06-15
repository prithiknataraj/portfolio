// Home page only: typing effect + stat counters + name animation
const typedEl = document.getElementById("typed-text");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Split hero name into animated letters
const heroName = document.querySelector(".hero__name--split");
if (heroName && !prefersReducedMotion) {
  const text = heroName.textContent.trim();
  heroName.textContent = "";
  heroName.setAttribute("aria-label", text);
  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.className = "hero__letter";
    span.textContent = char === " " ? "\u00a0" : char;
    span.style.animationDelay = `${0.4 + i * 0.04}s`;
    heroName.appendChild(span);
  });
}

if (typedEl && !prefersReducedMotion) {
  const roles = [
    "Software Developer",
    "Backend Developer",
    "Full-Stack Developer",
    "Python · AWS · React",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }

  typeEffect();
}

const statElements = document.querySelectorAll("[data-count]");

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${Math.round(eased * target)}${suffix}`;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

if (statElements.length && !prefersReducedMotion) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statElements.forEach((el) => statsObserver.observe(el));
} else {
  statElements.forEach((el) => {
    el.textContent = `${el.dataset.count}${el.dataset.suffix || ""}`;
  });
}

const heroPhoto = document.getElementById("hero-photo");
if (heroPhoto && !prefersReducedMotion) {
  heroPhoto.addEventListener("mousemove", (e) => {
    const rect = heroPhoto.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroPhoto.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  heroPhoto.addEventListener("mouseleave", () => {
    heroPhoto.style.transform = "";
  });
}
