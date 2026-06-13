// "Disparities in the Prevalence of Causes of Disability by WHO Regions"
// One container with region tabs. Each tab holds one or more story cards
// (Africa 2, Americas 1, South-East Asia 3, Western Pacific 1). Switching a
// tab cross-fades the cards and re-grows the bar charts.
// Bar charts have a y-axis with reference gridlines and a per-region pattern
// on the highlighted (focal) region's bar.
// All figures are the published values from the original visualization.

const REGION_ORDER = ["AFR", "AMR", "EMR", "EUR", "SEAR", "WPR"];
const REGION_LABEL = {
  AFR: "Africa",
  AMR: "Americas",
  EMR: "Eastern Mediterranean",
  EUR: "Europe",
  SEAR: "South-East Asia",
  WPR: "Western Pacific",
};
const REGION_COLOR = {
  AFR: "#4690cd",
  AMR: "#84b9e1",
  EMR: "#8169ab",
  EUR: "#b297c7",
  SEAR: "#24aca4",
  WPR: "#63c1c2",
};

const note = (cause) =>
  `Note: This bar chart illustrates the percentage of individuals with disabilities caused by ${cause} among the global population with disabilities across all six WHO regions.`;

const higher = "higher than other five WHO regions";

const TABS = [
  {
    region: "AFR",
    cards: [
      {
        condition: "HIV/AIDS and Sexually Transmitted Infections",
        image: "/assets/photos/africa-hiv.jpg",
        paragraph:
          "In Africa, due to high rates of HIV/AIDS and sexually transmitted infections, limited prevention and support services, and comparably lower public awareness (data source: UNAIDS data 2022), the proportion of individuals with disabilities caused by AIDS and sexually transmitted infections is about 0.34% of the global disability population. This is roughly 13 times higher than the average in other five WHO regions.",
        stats: [
          { value: "74.6%", label: "of individuals with disabilities caused by AIDS and sexually transmitted infections globally" },
          { value: "13 times", label: higher },
        ],
        axisMax: 0.5,
        bars: { AFR: 0.34, AMR: 0.03, EMR: 0.02, EUR: 0.03, SEAR: 0.03, WPR: 0.02 },
        note: note("AIDS and sexually transmitted infections"),
      },
      {
        condition: "Neglected Tropical Diseases and Malaria",
        image: "/assets/photos/africa-ntd.jpg",
        paragraph:
          "Africa faces significant challenges related to neglected tropical diseases and malaria, coupled with limited access to medical resources and services in many areas. (Source: WHO Global report on neglected tropical diseases 2023) The proportion of disabilities caused by Neglected Tropical Diseases (NTDs) and malaria in Africa accounts for approximately 0.67% of the global disability population, which is roughly 5 times higher than the average observed in the other five WHO regions.",
        stats: [
          { value: "56.4%", label: "of individuals with disabilities caused by NTDs and malaria globally" },
          { value: "5 times", label: higher },
        ],
        axisMax: 0.8,
        bars: { AFR: 0.67, AMR: 0.21, EMR: 0.04, EUR: 0.04, SEAR: 0.11, WPR: 0.12 },
        note: note("neglected tropical diseases and malaria"),
      },
    ],
  },
  {
    region: "AMR",
    cards: [
      {
        condition: "Substance Use Disorders",
        image: "/assets/photos/americas.jpg",
        paragraph:
          "The proportion of people with disabilities caused by substance use disorders in the Americas is approximately 0.96% of the global disability population, which is approximately 220% higher than the average observed in the other five WHO regions. This disparity can be attributed to factors such as less stringent drug regulation, drug abuse and overdose problems, which are more prevalent in the Americas. (Source: IHME, Global Burden of Disease 2019)",
        stats: [
          { value: "38.6%", label: "of individuals with disabilities caused by substance use disorders globally" },
          { value: "220%", label: higher },
        ],
        axisMax: 1.0,
        bars: { AFR: 0.16, AMR: 0.96, EMR: 0.25, EUR: 0.57, SEAR: 0.23, WPR: 0.3 },
        note: note("substance use disorders"),
      },
    ],
  },
  {
    region: "EMR",
    cards: [
      {
        condition: "Nutritional Deficiencies",
        image: "/assets/photos/eastern-mediterranean.jpg",
        paragraph:
          "Across the Eastern Mediterranean Region, protracted armed conflict and humanitarian crises — in countries such as Afghanistan, Yemen, Sudan, Somalia and Syria — disrupt food systems, agriculture and health services, driving widespread undernutrition and micronutrient deficiencies. As a result, nutritional deficiencies account for approximately 0.06% of the global disability population in this region, roughly 178% higher than the average observed in the other five WHO regions. (Source: WHO EMRO; Global Burden of Disease 2021)",
        stats: [
          { value: "21.4%", label: "of individuals with disabilities caused by nutritional deficiencies globally" },
          { value: "178%", label: higher },
        ],
        axisMax: 0.08,
        bars: { AFR: 0.04, AMR: 0.01, EMR: 0.06, EUR: 0.01, SEAR: 0.04, WPR: 0.01 },
        note: note("nutritional deficiencies"),
      },
    ],
  },
  {
    region: "EUR",
    cards: [
      {
        condition: "Neoplasms",
        image: "/assets/photos/europe.jpg",
        paragraph:
          "Europe has the world's oldest population, and age is the single biggest risk factor for cancer. Combined with extensive screening and diagnosis, high exposure to lifestyle risk factors (tobacco, alcohol, diet) and advanced treatment that lets people live longer with disease, this gives Europe a high prevalence of disability from neoplasms. They account for approximately 0.31% of the global disability population in this region, roughly 160% higher than the average observed in the other five WHO regions. (Source: GLOBOCAN 2022; Global Burden of Disease 2021)",
        stats: [
          { value: "25.3%", label: "of individuals with disabilities caused by neoplasms globally" },
          { value: "160%", label: higher },
        ],
        axisMax: 0.4,
        bars: { AFR: 0.04, AMR: 0.24, EMR: 0.06, EUR: 0.31, SEAR: 0.06, WPR: 0.21 },
        note: note("neoplasms"),
      },
    ],
  },
  {
    region: "SEAR",
    cards: [
      {
        condition: "Maternal and Neonatal Disorders",
        image: "/assets/photos/sea-maternal.jpg",
        paragraph:
          "In South-East Asia, limited medical resources, services, and challenges such as malnutrition and poor sanitation may contribute to a higher prevalence of disability caused by Maternal and Neonatal Disorders. (Source: IHME, Global Burden of Disease 2019) This accounts for approximately 0.86% of the global disability population, which is roughly 103% higher than the average observed in the other five WHO regions.",
        stats: [
          { value: "29.0%", label: "of individuals with disabilities caused by maternal and neonatal disorders globally" },
          { value: "103%", label: higher },
        ],
        axisMax: 1.0,
        bars: { AFR: 0.49, AMR: 0.4, EMR: 0.58, EUR: 0.34, SEAR: 0.86, WPR: 0.3 },
        note: note("maternal and neonatal disorders"),
      },
    ],
  },
  {
    region: "WPR",
    cards: [
      {
        condition: "Chronic Respiratory Diseases",
        image: "/assets/photos/western-pacific.jpg",
        paragraph:
          "In the Western Pacific region, high smoking rates, widespread air pollution, occupational dust exposure and a rapidly ageing population — with China bearing much of the burden — contribute to a high prevalence of disability caused by chronic respiratory diseases such as COPD. This accounts for approximately 0.82% of the global disability population, which is roughly 46% higher than the average observed in the other five WHO regions. (Source: Global Burden of Disease 2021)",
        stats: [
          { value: "30.8%", label: "of individuals with disabilities caused by chronic respiratory diseases globally" },
          { value: "46%", label: higher },
        ],
        axisMax: 1.0,
        bars: { AFR: 0.27, AMR: 0.71, EMR: 0.4, EUR: 0.62, SEAR: 0.8, WPR: 0.82 },
        note: note("chronic respiratory diseases"),
      },
    ],
  },
];

// Per-region bar pattern (SVG tile, semi-transparent dark motif over the fill).
// Tiles are ~50% of the original size (denser). Europe is staggered short
// dashes; Western Pacific has a taller wave amplitude.
const PATTERNS = {
  AFR: [7, 7, `<path d="M2 2 L5 5 M5 2 L2 5" stroke="black" stroke-opacity="0.4" stroke-width="0.8"/>`], // cross
  AMR: [7, 7, `<path d="M2 2.5 L5 2.5 L3.5 5 Z" fill="black" fill-opacity="0.4"/>`], // inverted triangle
  EMR: [6, 6, `<circle cx="3" cy="3" r="0.9" fill="black" fill-opacity="0.42"/>`], // dots
  EUR: [7, 9, `<path d="M2 1 V4 M5 5.5 V8.5" stroke="black" stroke-opacity="0.4" stroke-width="1"/>`], // staggered short dashes
  SEAR: [5, 5, `<path d="M0 5 L5 0" stroke="black" stroke-opacity="0.4" stroke-width="0.8"/>`], // diagonal
  WPR: [26, 8, `<path d="M0 4 Q6.5 2 13 4 T26 4" stroke="black" stroke-opacity="0.45" stroke-width="1.2" fill="none"/>`], // wavy — long gentle waves, even rows
};

function patternURI(rg) {
  const [w, h, body] = PATTERNS[rg];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${body}</svg>`;
  return `url('data:image/svg+xml,${encodeURIComponent(svg)}')`;
}

const NON_FOCUS_GRAY = "#8d9096";

function barChart(card, focusRegion) {
  const { axisMax } = card;

  const bars = REGION_ORDER.map((rg) => {
    const v = card.bars[rg];
    const hPct = Math.min((v / axisMax) * 100, 100);
    const isFocus = rg === focusRegion;
    const color = isFocus ? REGION_COLOR[rg] : NON_FOCUS_GRAY;
    return `
      <div class="disp-bar-col">
        <span class="disp-bar-val${isFocus ? " is-focus" : ""}">${v.toFixed(2)}%</span>
        <div class="disp-bar" style="--bar-h:${hPct}%; background-color:${color}; background-image:${patternURI(rg)}"></div>
      </div>`;
  }).join("");

  const names = REGION_ORDER.map(
    (rg) => `<span class="disp-xlabel">${REGION_LABEL[rg]}</span>`
  ).join("");

  return `
    <div class="disp-chart">
      <div class="disp-plot">
        <span class="disp-axis-label disp-axis-label--max">${axisMax.toFixed(1)}%</span>
        <span class="disp-axis-label disp-axis-label--zero">0.0%</span>
        <div class="disp-ref"></div>
        <div class="disp-bars">${bars}</div>
      </div>
      <div class="disp-xlabels">${names}</div>
    </div>`;
}

function cardEl(card, focusRegion) {
  return `
    <article class="disp-card">
      <div class="disp-photo" style="background-image:url('${card.image}')" role="img" aria-label="${card.condition}"></div>
      <div class="disp-content">
        <h3 class="disp-condition">${card.condition}</h3>
        <p class="disp-paragraph">${card.paragraph}</p>
        <div class="disp-stats">
          ${card.stats
            .map(
              (s) => `
            <div class="disp-stat">
              <div class="disp-stat-value">${s.value}</div>
              <div class="disp-stat-label">${s.label}</div>
            </div>`
            )
            .join("")}
        </div>
        ${barChart(card, focusRegion)}
        <p class="disp-note">${card.note}</p>
      </div>
    </article>`;
}

export function renderDisparities() {
  const section = document.createElement("section");
  section.className = "section disparities";

  const tabs = TABS.map(
    (t, i) =>
      `<button class="disp-tab${i === 0 ? " is-active" : ""}" data-index="${i}"
        style="--tab-color:${REGION_COLOR[t.region]}">${REGION_LABEL[t.region]}</button>`
  ).join("");

  const panels = TABS.map(
    (t, i) => `
    <div class="disp-panel${i === 0 ? " is-active" : ""}" data-index="${i}">
      ${t.cards.map((c) => cardEl(c, t.region)).join("")}
    </div>`
  ).join("");

  section.innerHTML = `
    <div class="container">
      <h2 class="section__title">Disparities in the Prevalence of Causes of Disability by WHO Regions</h2>
      <div class="section__rule"></div>
      <div class="disp-tabs" role="tablist">${tabs}</div>
      <div class="disp-stage">${panels}</div>
    </div>
  `;

  wireTabs(section);
  return section;
}

function growBars(panel) {
  panel.querySelectorAll(".disp-bar").forEach((bar, i) => {
    bar.style.height = "0%";
    requestAnimationFrame(() => {
      bar.style.transitionDelay = `${(i % 6) * 55}ms`;
      bar.style.height = "var(--bar-h)";
    });
  });
}

function wireTabs(section) {
  const tabs = [...section.querySelectorAll(".disp-tab")];
  const panels = [...section.querySelectorAll(".disp-panel")];

  const activate = (index) => {
    tabs.forEach((t, i) => t.classList.toggle("is-active", i === index));
    panels.forEach((p, i) => {
      const on = i === index;
      p.classList.toggle("is-active", on);
      if (on) growBars(p);
    });
  };

  tabs.forEach((t) =>
    t.addEventListener("click", () => activate(Number(t.dataset.index)))
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const activeIdx = tabs.findIndex((t) => t.classList.contains("is-active"));
          growBars(panels[activeIdx]);
          io.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );
  io.observe(section);
}
