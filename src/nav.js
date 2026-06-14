// Fixed side-dot navigation. One dot per module; highlights the module at the
// viewport centre and smooth-scrolls to it on click. Labels appear on hover.

export function renderNav(items) {
  const nav = document.createElement("nav");
  nav.className = "dotnav";
  nav.setAttribute("aria-label", "Section navigation");
  nav.innerHTML = `
    <ul>
      ${items
        .map(
          (it) => `
        <li>
          <a class="dotnav__dot" href="#${it.id}" data-id="${it.id}" aria-label="${it.label}">
            <span class="dotnav__label">${it.label}</span>
          </a>
        </li>`
        )
        .join("")}
    </ul>`;
  document.body.append(nav);

  const dots = new Map();
  nav.querySelectorAll(".dotnav__dot").forEach((d) => dots.set(d.dataset.id, d));

  const setActive = (id) => {
    dots.forEach((d, key) => {
      const on = key === id;
      d.classList.toggle("is-active", on);
      if (on) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
  };

  const sections = items
    .map((it) => document.getElementById(it.id))
    .filter(Boolean);

  // A thin band across the viewport centre decides the active module.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));
}
