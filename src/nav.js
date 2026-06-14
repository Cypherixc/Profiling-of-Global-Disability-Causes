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

  const ids = items.map((it) => it.id);
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

  let currentId = ids[0];

  // A thin band across the viewport centre decides the active module.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          currentId = e.target.id;
          setActive(currentId);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));

  // Arrow up/down (and PageUp/PageDown) step between modules.
  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))
      return;

    let dir = 0;
    if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
    else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
    if (!dir) return;

    const i = ids.indexOf(currentId);
    const next = ids[Math.min(ids.length - 1, Math.max(0, i + dir))];
    if (next === currentId) return;
    e.preventDefault();
    currentId = next;
    setActive(next);
    document.getElementById(next).scrollIntoView({ behavior: "smooth" });
  });
}
