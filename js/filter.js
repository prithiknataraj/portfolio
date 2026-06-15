// Generic filter for project cards and gallery items
document.querySelectorAll(".filter-bar").forEach((bar) => {
  const buttons = bar.querySelectorAll(".filter-bar__btn");
  const group = bar.querySelector("[data-filter-group]")?.dataset.filterGroup;
  const gridId = bar.parentElement.querySelector("[id$='-grid']")?.id;

  let items;
  if (gridId === "project-grid") {
    items = document.querySelectorAll(".project-card[data-category]");
  } else if (gridId === "gallery-grid") {
    items = document.querySelectorAll(".gallery-item[data-category]");
  } else {
    items = bar.parentElement.querySelectorAll("[data-category]");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => {
        b.classList.toggle("filter-bar__btn--active", b === btn);
        b.setAttribute("aria-selected", b === btn);
      });

      items.forEach((item) => {
        const categories = (item.dataset.category || "").split(/\s+/);
        const show = filter === "all" || categories.includes(filter);
        item.classList.toggle("is-hidden", !show);
        if (show) {
          item.classList.remove("is-filtered-in");
          void item.offsetWidth;
          item.classList.add("is-filtered-in");
        }
      });
    });
  });
});
