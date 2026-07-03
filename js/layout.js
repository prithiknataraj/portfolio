/**
 * Shared header & footer for all pages.
 * Set <body data-page="home|education|projects|..."> on each page.
 */
(function () {
  const currentPage = document.body.dataset.page || "home";

  const navLinks = [
    { href: "index.html", label: "Home", page: "home" },
    { href: "education.html", label: "Education", page: "education" },
    { href: "experience.html", label: "Experience", page: "experience" },
    { href: "projects.html", label: "Projects", page: "projects" },
    { href: "hackathons.html", label: "Hackathons", page: "hackathons" },
    { href: "achievements.html", label: "Achievements", page: "achievements" },
    { href: "gallery.html", label: "Gallery", page: "gallery" },
    { href: "contact.html", label: "Contact", page: "contact" },
  ];

  const navItems = navLinks
    .map(
      ({ href, label, page }) =>
        `<li><a href="${href}" class="nav__link${page === currentPage ? " nav__link--active" : ""}">${label}</a></li>`
    )
    .join("");

  const headerHtml = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="cursor-spotlight" id="cursor-spotlight" aria-hidden="true"></div>
    <div class="cursor-dot" id="cursor-dot" aria-hidden="true"></div>
    <div class="page-loader" id="page-loader" aria-hidden="true"></div>
    <div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>
    <header class="header" id="header">
      <nav class="nav container" aria-label="Main navigation">
        <a href="index.html" class="nav__logo">
          <span class="nav__logo-name">Prithik Nataraj</span>
          <span class="nav__logo-tag">Software Developer</span>
        </a>
        <button class="nav__toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
          <span class="nav__toggle-bar"></span>
          <span class="nav__toggle-bar"></span>
          <span class="nav__toggle-bar"></span>
        </button>
        <ul class="nav__links" id="nav-menu">
          ${navItems}
          <li>
            <a href="assets/resume/Prithik_Nataraj_Resume.pdf" class="nav__resume btn btn--small" download>Resume</a>
          </li>
        </ul>
      </nav>
    </header>
  `;

  const footerHtml = `
    <footer class="footer">
      <div class="container footer__inner">
        <p class="footer__copy">&copy; <span id="year"></span> Prithik Nataraj</p>
        <p class="footer__tagline">Software Developer · AI-assisted workflow · Hosted on GitHub Pages</p>
      </div>
    </footer>
    <button class="back-to-top" id="back-to-top" type="button" aria-label="Back to top" hidden>↑</button>
  `;

  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");

  if (headerSlot) headerSlot.innerHTML = headerHtml;
  if (footerSlot) footerSlot.innerHTML = footerHtml;
})();
