// Shared interactions across all pages

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile navigation (injected by layout.js)
function initNav() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (!navToggle || !navMenu) return;

  const navLinks = document.querySelectorAll(".nav__link, .nav__resume, .nav__logo");

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("nav__links--open");
    navToggle.classList.toggle("nav__toggle--open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav__links--open");
      navToggle.classList.remove("nav__toggle--open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("nav-open");
    });
  });
}

initNav();

// Scroll progress, header shadow, back to top
const scrollProgress = document.getElementById("scroll-progress");
const header = document.getElementById("header");
const backToTop = document.getElementById("back-to-top");

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) scrollProgress.style.width = `${progress}%`;
  if (header) header.classList.toggle("header--scrolled", scrollTop > 40);
  if (backToTop) {
    backToTop.classList.toggle("is-visible", scrollTop > 500);
    backToTop.hidden = scrollTop <= 500;
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
}

// Animated stat counters (any page with [data-count] elements)
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

if (statElements.length) {
  if (prefersReducedMotion) {
    statElements.forEach((el) => {
      el.textContent = `${el.dataset.count}${el.dataset.suffix || ""}`;
    });
  } else {
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
  }
}

// Page-exit transition on internal navigation
if (!prefersReducedMotion) {
  document.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const link = e.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;

    e.preventDefault();
    document.body.classList.add("page-exit");
    setTimeout(() => {
      window.location.href = link.href;
    }, 250);
  });
}

// Copy email
const copyBtn = document.getElementById("copy-email");
const copyToast = document.getElementById("copy-toast");

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("is-copied");
      if (copyToast) {
        copyToast.textContent = "Email copied";
        copyToast.classList.add("is-visible");
      }
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("is-copied");
        if (copyToast) copyToast.classList.remove("is-visible");
      }, 2000);
    } catch {
      if (copyToast) {
        copyToast.textContent = "Copy failed — use the email link";
        copyToast.classList.add("is-visible");
        setTimeout(() => copyToast.classList.remove("is-visible"), 2500);
      }
    }
  });
}
