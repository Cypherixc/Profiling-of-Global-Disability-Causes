// Minimal fixed top bar: wordmark · section links · theme toggle.
// Background stays invisible at the top of the page and fades in on scroll.

import { getTheme, toggleTheme } from "./theme.js";

const ICON_SUN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19"/></svg>`;
const ICON_MOON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5z"/></svg>`;

export function renderTopbar(items) {
  const bar = document.createElement("header");
  bar.className = "topbar";
  bar.innerHTML = `
    <div class="topbar__inner">
      <a class="topbar__brand" href="#hero">Global Disability Profile</a>
      <div class="topbar__right">
        <nav class="topbar__nav" aria-label="Sections">
          ${items
            .map(
              (it) =>
                `<a class="topbar__link" href="#${it.id}" data-id="${it.id}">${it.label}</a>`
            )
            .join("")}
        </nav>
        <button class="topbar__theme" type="button" aria-label="Toggle light or dark theme"></button>
      </div>
    </div>`;
  document.body.append(bar);

  // Fade the bar background in once the page is scrolled past the hero top.
  const onScroll = () =>
    bar.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Theme toggle — icon reflects the action (moon when light, sun when dark).
  const btn = bar.querySelector(".topbar__theme");
  const paint = () => {
    btn.innerHTML = getTheme() === "light" ? ICON_MOON : ICON_SUN;
  };
  paint();
  btn.addEventListener("click", () => {
    toggleTheme();
    paint();
  });

  return bar;
}
