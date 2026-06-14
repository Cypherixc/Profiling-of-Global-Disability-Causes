import "./style.css";
import { renderHero } from "./sections/hero.js";
import { renderRegionShare } from "./sections/region-share.js";
import { renderLevel2Bubbles } from "./sections/level2-bubbles.js";
import { renderLevel3Top5 } from "./sections/level3-top5.js";
import { renderDisparities } from "./sections/disparities.js";
import { renderWhyImportant } from "./sections/why-important.js";
import { renderNav } from "./nav.js";
import { renderTopbar } from "./topbar.js";

const app = document.querySelector("#app");

const hero = renderHero();
hero.id = "hero";
app.append(hero);

const main = document.createElement("div");
main.id = "main";

const sections = [
  [renderRegionShare(), "regions"],
  [renderLevel2Bubbles(), "level2"],
  [renderLevel3Top5(), "level3"],
  [renderDisparities(), "disparities"],
  [renderWhyImportant(), "why"],
];
sections.forEach(([el, id]) => {
  el.id = id;
  main.append(el);
});
app.append(main);

const navItems = [
  { id: "hero", label: "Intro" },
  { id: "regions", label: "By region" },
  { id: "level2", label: "Level 2 conditions" },
  { id: "level3", label: "Top 5 level 3" },
  { id: "disparities", label: "Disparities" },
  { id: "why", label: "Why it matters" },
];

// Top bar must exist before the nav so it can pick up the section links.
renderTopbar(navItems);
renderNav(navItems);
