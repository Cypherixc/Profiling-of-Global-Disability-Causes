// "Top level 2 Health Conditions Causing Disability by WHO Regions"
// Mirrors Figma node 1435:3486. A 20-row × 6-region bubble matrix:
// bubble area ∝ prevalence %, coloured by region, with a 3% reference ring
// in every cell. Each region's top-5 causes carry a rank label.
//
// Bubble values, ranks and row order are all derived from PR #1 data and
// verified against the original Tableau export (Level 2 PDF) — AFR column
// matches to the rounding digit.

import data from "../data/disability.json";

const REGIONS = [
  { key: "AFR", name: "Africa", color: "#4690cd" },
  { key: "AMR", name: "Americas", color: "#84b9e1" },
  { key: "EMR", name: "Eastern Mediterranean", color: "#8169ab" },
  { key: "EUR", name: "Europe", color: "#b297c7" },
  { key: "SEAR", name: "South-East Asia", color: "#24aca4" },
  { key: "WPR", name: "Western Pacific", color: "#63c1c2" },
];

// Fixed row order = AFR descending, matching the Figma layout exactly.
const ROW_ORDER = [
  "Mental disorders",
  "Musculoskeletal disorders",
  "Neurological disorders",
  "Respiratory infections and tuberculosis",
  "Other non-communicable diseases",
  "Sense organ diseases",
  "Neglected tropical diseases and malaria",
  "Maternal and neonatal disorders",
  "Cardiovascular diseases",
  "Skin and subcutaneous diseases",
  "Injuries",
  "HIV/AIDS and sexually transmitted infections",
  "Chronic respiratory diseases",
  "Substance use disorders",
  "Diabetes and kidney diseases",
  "Digestive diseases",
  "Other infectious diseases",
  "Nutritional deficiencies",
  "Neoplasms",
  "Enteric infections",
];

// Bubble sizing — area proportional, calibrated to the global max (6.56%).
const V_MAX = 0.0656;
const D_MAX = 52; // px diameter at V_MAX
const diameter = (v) => Math.sqrt(Math.max(v, 0) / V_MAX) * D_MAX;
const REF_3PCT = diameter(0.03); // grey reference ring

const PARAGRAPH =
  "This visualization explores the leading level 2 health conditions causing " +
  "disability in various regions of the world, as per the WHO regional " +
  "classification. It is based on data obtained from the WHO Disability " +
  "Prevalence Dataset. The primary data utilized is the Prevalence Number, " +
  "which estimates the number of individuals with disabilities. This estimation " +
  "is calculated using a statistical model that incorporates various data " +
  "sources, such as medical records, scientific articles, health surveys, and " +
  "insurance data.";

// value lookup + per-region top-5 ranks
function buildModel() {
  const byCause = {};
  data.level2.forEach((r) => {
    (byCause[r.cause] = byCause[r.cause] || {})[r.region] = {
      mean: r.mean,
      lower: r.lower,
      upper: r.upper,
    };
  });
  const ranks = {};
  REGIONS.forEach(({ key }) => {
    const sorted = Object.entries(byCause)
      .map(([cause, v]) => ({ cause, m: v[key]?.mean || 0 }))
      .sort((a, b) => b.m - a.m);
    sorted.slice(0, 5).forEach((x, i) => {
      (ranks[x.cause] = ranks[x.cause] || {})[key] = i + 1;
    });
  });
  return { byCause, ranks };
}

const pctText = (v) => (v == null ? "—" : (v * 100).toFixed(2) + "%");

function bubbleCell({ cause, regionName, rec, color, rank, edge, z }) {
  const value = rec?.mean || 0;
  const d = diameter(value);
  // Hover hit-area: ~half the reference ring, but never smaller than the bubble.
  const hit = Math.max(REF_3PCT * 0.5, d);
  const edgeClass = edge ? ` l2-cell--${edge}` : "";
  const dataAttrs =
    `data-cause="${cause}" data-region="${regionName}" data-color="${color}" ` +
    `data-mean="${value}" data-lower="${rec?.lower ?? ""}" data-upper="${rec?.upper ?? ""}" ` +
    `data-rank="${rank || ""}"`;
  return `
    <div class="l2-cell${edgeClass}" style="z-index:${z}">
      ${rank ? `<span class="l2-rank" style="color:${color}">${rank}</span>` : ""}
      <span class="l2-ring" style="width:${REF_3PCT}px;height:${REF_3PCT}px"></span>
      <span class="l2-bubble" ${dataAttrs} style="width:${d}px;height:${d}px;background:${color}"></span>
      <span class="l2-hit" style="width:${hit}px;height:${hit}px"></span>
    </div>
  `;
}

// Annotated "How to read it" — hand-built to match Figma node 1435:3504.
// One graphic: four callout lines + a sample cell, then the size scale below.
// Geometry mirrors the Figma export (viewBox 346 x 471).
function howToReadDiagram() {
  const teal = "#24aca4";
  const line = "rgba(255,255,255,1)"; // full-opacity guide lines
  // callout line + its wrapped label
  const callout = (x, topY, lines) => `
    <line x1="${x}" y1="${topY}" x2="${x}" y2="252" stroke="${line}" stroke-width="0.5"/>
    <circle cx="${x}" cy="${topY}" r="1.6" fill="${line}"/>
    <text x="${x + 8}" y="${topY + 4}" fill="#cfcfcf" font-size="12">${lines
      .map((t, i) => `<tspan x="${x + 8}" dy="${i === 0 ? 0 : 15}">${t}</tspan>`)
      .join("")}</text>`;
  // size-scale bubble: label on top, line down to a centre dot inside the bubble
  const SCALE_LABEL_Y = 322;
  const SCALE_CY = 376;
  const scale = (cx, r, label) => `
    <text x="${cx}" y="${SCALE_LABEL_Y}" fill="#b8b8b8" font-size="12" text-anchor="middle">${label}</text>
    <line x1="${cx}" y1="${SCALE_LABEL_Y + 10}" x2="${cx}" y2="${SCALE_CY}" stroke="${line}" stroke-width="0.5"/>
    <circle cx="${cx}" cy="${SCALE_CY}" r="${r}" fill="${teal}" fill-opacity="0.8" stroke="#fff" stroke-width="0.5"/>
    <circle cx="${cx}" cy="${SCALE_CY}" r="1.6" fill="#fff"/>`;

  return `
    <svg class="level2__howto" viewBox="0 0 360 404" role="img"
      aria-label="How to read a cell: the health condition name, its rank, circle size showing prevalence, a 3% reference ring, and a size scale.">
      ${callout(40, 14, ["The Name of Health Conditions", "Causing Disability"])}
      ${callout(120, 58, ["The Rank of Health Conditions", "Causing Disability"])}
      ${callout(158, 112, [
        "Larger Circles Present higher",
        "Prevalence of Health Conditions",
        "Causing Disability in Specific Region",
      ])}
      ${callout(170, 210, ["Circle Size Reference: 3%"])}

      <!-- sample cell — guide line stops at the bubble's right edge (161 + r17) -->
      <line x1="92" y1="252" x2="178" y2="252" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
      <circle cx="92" cy="252" r="1.6" fill="rgba(255,255,255,0.2)"/>
      <text x="0" y="256" fill="#cfcfcf" font-size="13">Neoplasms</text>
      <text x="110" y="257" fill="${teal}" font-size="14" font-weight="600">5</text>
      <circle cx="161" cy="252" r="17" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.5"/>
      <circle cx="161" cy="252" r="12" fill="${teal}" stroke="#202020" stroke-width="1"/>

      <!-- size scale -->
      ${scale(35, 8, "1%")}
      ${scale(100, 15, "3%")}
      ${scale(178, 20, "5%")}
      ${scale(270, 23, "6.5%")}
    </svg>`;
}

export function renderLevel2Bubbles() {
  const { byCause, ranks } = buildModel();

  const header = `
    <div class="l2-cell l2-cell--label"></div>
    ${REGIONS.map((r) => `<div class="l2-head">${r.name}</div>`).join("")}
  `;

  const rows = ROW_ORDER.map((cause, rowIdx) => {
    // Upper rows stack above lower rows so an overlapping bubble covers the one below.
    const z = ROW_ORDER.length - rowIdx;
    const cells = REGIONS.map((r, i) =>
      bubbleCell({
        cause,
        regionName: r.name,
        rec: byCause[cause]?.[r.key],
        color: r.color,
        rank: ranks[cause]?.[r.key],
        edge: i === 0 ? "start" : i === REGIONS.length - 1 ? "end" : null,
        z,
      })
    ).join("");
    return `<div class="l2-cell l2-cell--label" style="z-index:${z}">${cause}</div>${cells}`;
  }).join("");

  const section = document.createElement("section");
  section.className = "section level2";
  section.innerHTML = `
    <div class="container">
      <h2 class="section__title">Top level 2 Health Conditions Causing Disability by WHO Regions</h2>
      <div class="section__rule"></div>

      <div class="level2__body">
        <aside class="level2__aside">
          <h3 class="level2__how">How to read it?</h3>
          ${howToReadDiagram()}
          <p class="level2__paragraph">${PARAGRAPH}</p>
        </aside>

        <div class="level2__matrix-wrap">
          <div class="level2__matrix">
            ${header}
            ${rows}
          </div>
        </div>
      </div>
    </div>
    <div class="l2-tooltip" role="status" aria-live="polite" hidden></div>
  `;

  wireBubbleHover(section);
  return section;
}

function wireBubbleHover(section) {
  const matrix = section.querySelector(".level2__matrix");
  const tip = section.querySelector(".l2-tooltip");
  let active = null;
  let savedZ = "";

  const show = (bubble) => {
    if (active === bubble) return;
    clear();
    active = bubble;
    section.classList.add("is-bubble-hover");
    bubble.classList.add("is-active");
    bubble.style.boxShadow = `0 0 24px 0 ${bubble.dataset.color}66`; // 40% alpha
    const cell = bubble.closest(".l2-cell");
    savedZ = cell.style.zIndex;
    cell.style.zIndex = "999";

    const { cause, region, color, mean, lower, upper, rank } = bubble.dataset;
    const ci = lower && upper ? ` <span class="l2-tooltip__ci">(${pctText(+lower)}–${pctText(+upper)})</span>` : "";
    tip.innerHTML = `
      <div class="l2-tooltip__cause">${cause}</div>
      <div class="l2-tooltip__region"><span class="l2-tooltip__dot" style="background:${color}"></span>${region}</div>
      <div class="l2-tooltip__row"><span>Prevalence</span><strong>${pctText(+mean)}</strong></div>
      <div class="l2-tooltip__row l2-tooltip__ci-row"><span>95% CI</span>${ci || "—"}</div>
      ${rank ? `<div class="l2-tooltip__rank">#${rank} in ${region}</div>` : ""}
    `;
    tip.hidden = false;
  };

  const move = (e) => {
    if (!active) return;
    const pad = 14;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    let x = e.clientX + pad;
    let y = e.clientY + pad;
    if (x + w > window.innerWidth - 8) x = e.clientX - w - pad;
    if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
  };

  const clear = () => {
    if (!active) return;
    section.classList.remove("is-bubble-hover");
    active.classList.remove("is-active");
    active.style.boxShadow = "";
    const cell = active.closest(".l2-cell");
    if (cell) cell.style.zIndex = savedZ;
    tip.hidden = true;
    active = null;
  };

  // The whole cell is the hover hit-area (small bubbles are otherwise hard to
  // hover); the glow/tooltip still apply to the bubble inside.
  matrix.addEventListener("mouseover", (e) => {
    const cell = e.target.closest(".l2-cell");
    if (!cell || cell.classList.contains("l2-cell--label")) return;
    const b = cell.querySelector(".l2-bubble");
    if (b) show(b);
  });
  matrix.addEventListener("mousemove", move);
  matrix.addEventListener("mouseout", (e) => {
    if (!active) return;
    const to = e.relatedTarget;
    const cell = active.closest(".l2-cell");
    if (!to || !cell.contains(to)) clear();
  });
}
