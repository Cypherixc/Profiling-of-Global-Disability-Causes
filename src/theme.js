// Light/dark theme. The initial value is set by an inline script in index.html
// (before paint, to avoid a flash); here we only read and toggle it.

const KEY = "theme";

export function getTheme() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* private mode — ignore */
  }
}

export function toggleTheme() {
  const next = getTheme() === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}
