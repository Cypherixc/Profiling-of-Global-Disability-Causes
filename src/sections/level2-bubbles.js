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
    (byCause[r.cause] = byCause[r.cause] || {})[r.region] = r.mean;
  });
  const ranks = {};
  REGIONS.forEach(({ key }) => {
    const sorted = Object.entries(byCause)
      .map(([cause, v]) => ({ cause, m: v[key] || 0 }))
      .sort((a, b) => b.m - a.m);
    sorted.slice(0, 5).forEach((x, i) => {
      (ranks[x.cause] = ranks[x.cause] || {})[key] = i + 1;
    });
  });
  return { byCause, ranks };
}

function bubbleCell({ value, color, rank, edge, z }) {
  const d = diameter(value);
  const edgeClass = edge ? ` l2-cell--${edge}` : "";
  return `
    <div class="l2-cell${edgeClass}" style="z-index:${z}">
      ${rank ? `<span class="l2-rank" style="color:${color}">${rank}</span>` : ""}
      <span class="l2-ring" style="width:${REF_3PCT}px;height:${REF_3PCT}px"></span>
      <span class="l2-bubble" style="width:${d}px;height:${d}px;background:${color}"></span>
    </div>
  `;
}

// Annotated sample explaining how to read a cell — exported from Figma
// (node 1435:3504) as a self-contained SVG.
function howToReadDiagram() {
  return `<img class="level2__howto" src="/assets/how-to-read.svg"
    alt="How to read a cell: the health condition name, its rank, circle size showing prevalence, and a 3% size reference ring." />`;
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
        value: byCause[cause]?.[r.key] || 0,
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
          <div class="level2__scale">
            ${[0.01, 0.03, 0.05, 0.065]
              .map(
                (v) => `
              <div class="level2__scale-item">
                <span class="l2-bubble" style="width:${diameter(v)}px;height:${diameter(v)}px"></span>
                <span class="level2__scale-label">${(v * 100).toFixed(v === 0.065 ? 1 : 0)}%</span>
              </div>`
              )
              .join("")}
          </div>
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
  `;
  return section;
}
