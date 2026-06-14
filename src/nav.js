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

  // Top-bar links (if present) share the active state with the side dots.
  const topLinks = new Map();
  document
    .querySelectorAll(".topbar__link")
    .forEach((l) => topLinks.set(l.dataset.id, l));

  const setActive = (id) => {
    dots.forEach((d, key) => {
      const on = key === id;
      d.classList.toggle("is-active", on);
      if (on) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
    topLinks.forEach((l, key) => l.classList.toggle("is-active", key === id));
  };

  const ids = items.map((it) => it.id);
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

  let currentId = null;

  // The active module is the last one whose top has scrolled past a reference
  // line ~40% down the viewport. Scroll-position based (rather than
  // IntersectionObserver) so it stays correct at the very top and bottom.
  const computeActive = () => {
    const line = window.innerHeight * 0.4;
    let best = sections[0] && sections[0].id;
    for (const s of sections) {
      if (s.getBoundingClientRect().top - line <= 1) best = s.id;
    }
    const doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
      best = sections[sections.length - 1].id; // pin last at page bottom
    }
    return best;
  };

  const update = () => {
    const next = computeActive();
    if (next && next !== currentId) {
      currentId = next;
      setActive(currentId);
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();

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
