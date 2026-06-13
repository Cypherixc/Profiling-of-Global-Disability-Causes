// "Top 5 level 3 Health Conditions Causing Disability by WHO Regions"
// Mirrors Figma node 1435:3692. Six region columns × five ranked rows; each
// cell is a bubble (area ∝ prevalence %, coloured by region) with the specific
// cause name beneath it. Rank 1–5 runs down the left.
//
// Ranking/values come straight from PR #1 `topLevel3` (verified against the
// Tableau Level-3 export). Note: Africa is data-accurate (Low back pain #1),
// which differs from a manual ordering slip in the original Figma.

import data from "../data/disability.json";
import { conditionInfo } from "../data/conditions.js";

// Detail view ("focus") scale — larger than the grid, calibrated to 4%.
const DET_MAXR = 120;
const detRadius = (v) => Math.sqrt(Math.max(v, 0) / 0.04) * DET_MAXR;
const DET_RINGS = [0.01, 0.02, 0.03, 0.04];

const REGIONS = [
  { key: "AFR", name: "Africa", color: "#4690cd" },
  { key: "AMR", name: "Americas", color: "#84b9e1" },
  { key: "EMR", name: "Eastern Mediterranean", color: "#8169ab" },
  { key: "EUR", name: "Europe", color: "#b297c7" },
  { key: "SEAR", name: "South-East Asia", color: "#24aca4" },
  { key: "WPR", name: "Western Pacific", color: "#63c1c2" },
];

// Bubble sizing — area proportional, calibrated to the 4% reference.
const V_MAX = 0.04;
const D_MAX = 56;
const diameter = (v) => Math.sqrt(Math.max(v, 0) / V_MAX) * D_MAX;
const REF_4PCT = diameter(0.04);

const pctText = (v) => (v == null ? "—" : (v * 100).toFixed(2) + "%");

const PARAGRAPH =
  "This visualization explores the top 5 level 3 health conditions causing " +
  "disability in 6 WHO regions. It is based on data obtained from the WHO " +
  "Disability Prevalence Dataset. The primary data utilized is the Prevalence " +
  "Number under level 3 health conditions, which estimates the number of " +
  "individuals with disabilities caused by more specific causes/health " +
  "conditions. This estimation is calculated using a statistical model that " +
  "incorporates various data sources, such as medical records, scientific " +
  "articles, health surveys, and insurance data.";

function bubbleCell(region, item, z) {
  const value = item.mean;
  const d = diameter(value);
  const dataAttrs =
    `data-cause="${item.cause}" data-region="${region.name}" data-color="${region.color}" ` +
    `data-mean="${value}" data-lower="${item.lower ?? ""}" data-upper="${item.upper ?? ""}" ` +
    `data-rank="${item.rank}"`;
  return `
    <div class="l3-cell" style="z-index:${z}">
      <div class="l3-mark">
        <span class="l3-ring" style="width:${REF_4PCT}px;height:${REF_4PCT}px"></span>
        <span class="l3-bubble" ${dataAttrs} style="width:${d}px;height:${d}px;background:${region.color}"></span>
      </div>
      <div class="l3-label">${item.cause}</div>
    </div>
  `;
}

export function renderLevel3Top5() {
  const section = document.createElement("section");
  section.className = "section level3";

  const header = `
    <div class="l3-rankcell"></div>
    ${REGIONS.map((r) => `<div class="l3-head">${r.name}</div>`).join("")}
  `;

  const rows = [0, 1, 2, 3, 4]
    .map((rowIdx) => {
      const rank = rowIdx + 1;
      const z = 5 - rowIdx;
      const cells = REGIONS.map((r) => {
        const item = data.topLevel3[r.key][rowIdx];
        return bubbleCell(r, item, z);
      }).join("");
      return `<div class="l3-rankcell" style="z-index:${z}">${rank}</div>${cells}`;
    })
    .join("");

  section.innerHTML = `
    <div class="container">
      <h2 class="section__title">Top 5 level 3 Health Conditions Causing Disability by WHO Regions</h2>
      <div class="section__rule"></div>

      <div class="level3__body">
        <aside class="level3__aside">
          <div class="level3__focus">
            <svg class="level3__focus-svg" viewBox="0 0 300 300" aria-hidden="true">
              <!-- filled bubble first, reference rings drawn on top so they stay visible -->
              <circle class="level3__focus-bubble" cx="150" cy="150" r="0" fill="#4690cd" />
              ${DET_RINGS.map((v) => {
                const r = detRadius(v);
                return `<circle cx="150" cy="150" r="${r}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                  <text x="150" y="${150 - r - 5}" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.5)">${v * 100}%</text>`;
              }).join("")}
            </svg>
            <div class="level3__particles" aria-hidden="true"></div>
          </div>

          <div class="level3__detail-info">
            <div class="level3__detail-head">
              <div class="level3__detail-icon"></div>
              <div>
                <div class="level3__detail-rank"></div>
                <h3 class="level3__detail-cause"></h3>
                <div class="level3__detail-region"></div>
              </div>
            </div>
            <div class="level3__detail-stat">
              <span>Prevalence</span><strong class="level3__detail-prev"></strong>
            </div>
            <div class="level3__detail-stat">
              <span>95% CI</span><span class="level3__detail-ci"></span>
            </div>
            <p class="level3__detail-desc"></p>
          </div>
        </aside>

        <div class="level3__matrix-col">
          <div class="level3__matrix-wrap">
            <div class="level3__matrix">
              ${header}
              ${rows}
            </div>
          </div>
          <div class="level3__hint">Click any bubble to explore each condition</div>
        </div>
      </div>

      <p class="level3__paragraph">${PARAGRAPH}</p>
    </div>
    <div class="l2-tooltip" role="status" aria-live="polite" hidden></div>
  `;

  wireBubbleHover(section);
  wireDetail(section);
  return section;
}

function wireDetail(section) {
  const bubble = section.querySelector(".level3__focus-bubble");
  const particles = section.querySelector(".level3__particles");
  const iconEl = section.querySelector(".level3__detail-icon");
  const rankEl = section.querySelector(".level3__detail-rank");
  const causeEl = section.querySelector(".level3__detail-cause");
  const regionEl = section.querySelector(".level3__detail-region");
  const descEl = section.querySelector(".level3__detail-desc");
  const prevEl = section.querySelector(".level3__detail-prev");
  const ciEl = section.querySelector(".level3__detail-ci");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const burst = (color) => {
    if (reduce) return;
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("span");
      const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
      const dist = 60 + Math.random() * 50;
      p.className = "level3__particle";
      p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
      p.style.background = color;
      particles.appendChild(p);
      p.addEventListener("animationend", () => p.remove());
    }
  };

  const select = (el) => {
    const { cause, region, color, mean, lower, upper, rank } = el.dataset;
    section.querySelectorAll(".l3-bubble.is-selected").forEach((b) => b.classList.remove("is-selected"));
    el.classList.add("is-selected");

    bubble.setAttribute("r", detRadius(+mean).toFixed(1));
    bubble.setAttribute("fill", color);

    const info = conditionInfo(cause);
    iconEl.innerHTML = info.icon;
    iconEl.style.color = color;
    rankEl.textContent = `#${rank} in ${region}`;
    causeEl.textContent = cause;
    regionEl.innerHTML = `<span class="level3__detail-dot" style="background:${color}"></span>${region}`;
    descEl.textContent = info.desc;
    prevEl.textContent = pctText(+mean);
    ciEl.textContent = lower && upper ? `${pctText(+lower)}–${pctText(+upper)}` : "—";
    burst(color);
  };

  section.querySelector(".level3__matrix").addEventListener("click", (e) => {
    const b = e.target.closest(".l3-bubble");
    if (b) select(b);
  });

  // Default selection: the global maximum (Europe — Low back pain).
  const def = section.querySelector('.l3-bubble[data-region="Europe"][data-rank="1"]');
  if (def) select(def);
}

function wireBubbleHover(section) {
  const matrix = section.querySelector(".level3__matrix");
  const tip = section.querySelector(".l2-tooltip");
  let active = null;
  let savedZ = "";

  const show = (bubble) => {
    if (active === bubble) return;
    clear();
    active = bubble;
    section.classList.add("is-bubble-hover");
    bubble.classList.add("is-active");
    bubble.style.boxShadow = `0 0 24px 0 ${bubble.dataset.color}66`;
    const cell = bubble.closest(".l3-cell");
    savedZ = cell.style.zIndex;
    cell.style.zIndex = "999";

    const { cause, region, color, mean, lower, upper, rank } = bubble.dataset;
    const ci = lower && upper ? `${pctText(+lower)}–${pctText(+upper)}` : "—";
    tip.innerHTML = `
      <div class="l2-tooltip__cause">${cause}</div>
      <div class="l2-tooltip__region"><span class="l2-tooltip__dot" style="background:${color}"></span>${region}</div>
      <div class="l2-tooltip__row"><span>Prevalence</span><strong>${pctText(+mean)}</strong></div>
      <div class="l2-tooltip__row"><span>95% CI</span><span class="l2-tooltip__ci">${ci}</span></div>
      <div class="l2-tooltip__rank">#${rank} in ${region}</div>
    `;
    tip.hidden = false;
  };

  const move = (e) => {
    if (!active) return;
    const pad = 14;
    let x = e.clientX + pad;
    let y = e.clientY + pad;
    if (x + tip.offsetWidth > window.innerWidth - 8) x = e.clientX - tip.offsetWidth - pad;
    if (y + tip.offsetHeight > window.innerHeight - 8) y = e.clientY - tip.offsetHeight - pad;
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
  };

  const clear = () => {
    if (!active) return;
    section.classList.remove("is-bubble-hover");
    active.classList.remove("is-active");
    active.style.boxShadow = "";
    const cell = active.closest(".l3-cell");
    if (cell) cell.style.zIndex = savedZ;
    tip.hidden = true;
    active = null;
  };

  matrix.addEventListener("mouseover", (e) => {
    const b = e.target.closest(".l3-bubble");
    if (b) show(b);
  });
  matrix.addEventListener("mousemove", move);
  matrix.addEventListener("mouseout", (e) => {
    const to = e.relatedTarget;
    if (active && (!to || !active.contains(to))) clear();
  });
}
