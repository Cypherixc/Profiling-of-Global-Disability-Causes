// "Top 5 level 3 Health Conditions Causing Disability by WHO Regions"
// Mirrors Figma node 1435:3692. Six region columns × five ranked rows; each
// cell is a bubble (area ∝ prevalence %, coloured by region) with the specific
// cause name beneath it. Rank 1–5 runs down the left.
//
// Ranking/values come straight from PR #1 `topLevel3` (verified against the
// Tableau Level-3 export). Note: Africa is data-accurate (Low back pain #1),
// which differs from a manual ordering slip in the original Figma.

import data from "../data/disability.json";

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

// Annotated "How to read it" — hand-built to match Figma node 1435:3899.
function howToReadDiagram() {
  const teal = "#24aca4";
  const line = "rgba(255,255,255,1)";
  const callout = (x, topY, lines) => `
    <line x1="${x}" y1="${topY}" x2="${x}" y2="250" stroke="${line}" stroke-width="0.5"/>
    <circle cx="${x}" cy="${topY}" r="1.6" fill="${line}"/>
    <text x="${x + 8}" y="${topY + 4}" fill="#cfcfcf" font-size="12">${lines
      .map((t, i) => `<tspan x="${x + 8}" dy="${i === 0 ? 0 : 15}">${t}</tspan>`)
      .join("")}</text>`;

  const cx = 60;
  const cy = 250;
  return `
    <svg class="level3__howto" viewBox="0 0 360 330" role="img"
      aria-label="How to read a cell: the rank, the specific health condition name, circle size as a percentage of the global disability population, and 2% and 4% size references.">
      ${callout(70, 14, ["The Rank of Health Conditions", "Causing Disability"])}
      ${callout(96, 70, ["Circle Size Reference: 4.00%"])}
      ${callout(108, 116, ["Circle Size Reference: 2.00%"])}
      ${callout(120, 168, ["Percentage of Global", "Disability Population"])}

      <!-- sample bubble with 4% and 2% reference rings -->
      <circle cx="${cx}" cy="${cy}" r="${REF_4PCT / 2}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.5"/>
      <circle cx="${cx}" cy="${cy}" r="${diameter(0.02) / 2}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.5"/>
      <circle cx="${cx}" cy="${cy}" r="${diameter(0.018) / 2}" fill="${teal}" stroke="#202020" stroke-width="1"/>
      <text x="${cx}" y="14" fill="#cfcfcf" font-size="22" font-weight="600" text-anchor="middle">1</text>
      <line x1="${cx}" y1="24" x2="${cx}" y2="${cy - REF_4PCT / 2}" stroke="${line}" stroke-width="0.5"/>

      <text x="${cx + 36}" y="${cy + 40}" fill="#cfcfcf" font-size="12">Specific Health</text>
      <text x="${cx + 36}" y="${cy + 55}" fill="#cfcfcf" font-size="12">Condition Name</text>
      <line x1="${cx}" y1="${cy + 22}" x2="${cx + 30}" y2="${cy + 42}" stroke="${line}" stroke-width="0.5"/>
      <text x="${cx}" y="${cy + 78}" fill="#fff" font-size="13" text-anchor="middle">Low Back Pain</text>
    </svg>`;
}

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
          <h3 class="level3__how">How to read it?</h3>
          ${howToReadDiagram()}
          <p class="level3__paragraph">${PARAGRAPH}</p>
        </aside>

        <div class="level3__matrix-wrap">
          <div class="level3__matrix">
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
