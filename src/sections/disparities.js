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
      {
        condition: "Respiratory Infections and Tuberculosis",
        image: "/assets/photos/sea-respiratory.jpg",
        paragraph:
          "Due to a relatively lower level of public health, the prevalence of disability caused by respiratory infections and tuberculosis in South-East Asia accounts for approximately 1.60% of the global disability population, which is roughly 170% higher than the average observed in the other five WHO regions.",
        stats: [
          { value: "35.0%", label: "of individuals with disabilities caused by respiratory infections and tuberculosis globally" },
          { value: "170%", label: higher },
        ],
        axisMax: 1.75,
        bars: { AFR: 0.65, AMR: 0.75, EMR: 0.6, EUR: 0.74, SEAR: 1.6, WPR: 0.22 },
        note: note("respiratory infections and tuberculosis"),
      },
      {
        condition: "Mental Disorders",
        image: "/assets/photos/sea-mental.jpg",
        paragraph:
          "As the second leading cause of disabilities globally, mental health as a cause of disabilities is particularly prevalent in South-East Asia, where they account for 5.22% of the global disability population, which is approximately 74% greater than the average found in the other five WHO regions.",
        stats: [
          { value: "25.9%", label: "of individuals with disabilities caused by mental disorders globally" },
          { value: "74%", label: higher },
        ],
        axisMax: 5.5,
        bars: { AFR: 2.85, AMR: 3.34, EMR: 2.16, EUR: 2.75, SEAR: 5.22, WPR: 3.84 },
        note: note("mental disorders"),
      },
    ],
  },
  {
    region: "WPR",
    cards: [
      {
        condition: "Cardiovascular Diseases",
        image: "/assets/photos/western-pacific.jpg",
        paragraph:
          "In the Western Pacific region, factors like an unhealthy diet, insufficient physical exercise, and lower socio-economic status in some areas contribute to a higher prevalence of disability caused by Cardiovascular Diseases. As a result, approximately 1.98% of the global disability population in this region is attributed to Cardiovascular Diseases. This proportion is roughly 143% higher than the average observed in the other five WHO regions.",
        stats: [
          { value: "31.7%", label: "of individuals with disabilities caused by cardiovascular diseases globally" },
          { value: "143%", label: higher },
        ],
        axisMax: 2.0,
        bars: { AFR: 0.46, AMR: 0.98, EMR: 0.34, EUR: 1.23, SEAR: 1.06, WPR: 1.98 },
        note: note("cardiovascular diseases"),
      },
    ],
  },
];

function barChart(card, focusRegion) {
  const { axisMax } = card;
  const gridVals = [axisMax, axisMax / 2, 0];
  const grid = gridVals
    .map(
      (v) => `
      <div class="disp-grid" style="bottom:${(v / axisMax) * 100}%">
        <span class="disp-grid-label">${v.toFixed(v < 1 ? 1 : 1)}%</span>
      </div>`
    )
    .join("");

  const bars = REGION_ORDER.map((rg) => {
    const v = card.bars[rg];
    const hPct = Math.min((v / axisMax) * 100, 100);
    const isFocus = rg === focusRegion;
    const cls = isFocus ? `disp-bar disp-bar--focus disp-bar--${focusRegion}` : "disp-bar";
    return `
      <div class="disp-bar-col">
        <div class="disp-bar-wrap">
          <span class="disp-bar-val">${v.toFixed(2)}%</span>
          <div class="${cls}" style="--bar-color:${REGION_COLOR[rg]}; --bar-h:${hPct}%"></div>
        </div>
        <div class="disp-bar-name">${REGION_LABEL[rg]}</div>
      </div>`;
  }).join("");

  return `
    <div class="disp-chart">
      <div class="disp-plot">
        ${grid}
        <div class="disp-bars">${bars}</div>
      </div>
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
