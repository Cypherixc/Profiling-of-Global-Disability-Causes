// "Disparities in the Prevalence of Causes of Disability by WHO Regions"
// Mirrors Figma nodes 1435:3521 ff. One container with region tabs; switching a
// tab cross-fades the photo + content and re-grows the bar chart.
// Bar values and stat callouts are the published figures from the original viz.

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

const CARDS = [
  {
    tab: "Africa",
    focus: "AFR",
    image: "/assets/photos/africa.jpg",
    condition: "HIV/AIDS and Sexually Transmitted Infections",
    paragraph:
      "In Africa, due to high rates of HIV/AIDS and sexually transmitted infections, limited prevention and support services, and comparably lower public awareness (data source: UNAIDS data 2022), the proportion of individuals with disabilities caused by AIDS and sexually transmitted infections is about 0.34% of the global disability population. This is roughly 13 times higher than the average in other five WHO regions.",
    stats: [
      { value: "74.6%", label: "of individuals with disabilities caused by AIDS and sexually transmitted infections globally" },
      { value: "13 times", label: "higher than other five WHO regions" },
    ],
    bars: { AFR: 0.34, AMR: 0.03, EMR: 0.02, EUR: 0.03, SEAR: 0.03, WPR: 0.02 },
    note: "Note: This bar chart illustrates the percentage of individuals with disabilities caused by AIDS and sexually transmitted infections among the global population with disabilities across all six WHO regions.",
  },
  {
    tab: "Americas",
    focus: "AMR",
    image: "/assets/photos/americas.jpg",
    condition: "Substance Use Disorders",
    paragraph:
      "The proportion of people with disabilities caused by substance use disorders in the Americas is approximately 0.96% of the global disability population, which is approximately 220% higher than the average observed in the other five WHO regions. This disparity can be attributed to factors such as less stringent drug regulation, drug abuse and overdose problems, which are more prevalent in the Americas. (Source: IHME, Global Burden of Disease 2019)",
    stats: [
      { value: "38.6%", label: "of individuals with disabilities caused by substance use disorders globally" },
      { value: "220%", label: "higher than other five WHO regions" },
    ],
    bars: { AFR: 0.16, AMR: 0.96, EMR: 0.25, EUR: 0.57, SEAR: 0.23, WPR: 0.3 },
    note: "Note: This bar chart illustrates the percentage of individuals with disabilities caused by substance use disorders among the global population with disabilities across all six WHO regions.",
  },
  {
    tab: "South-East Asia",
    focus: "SEAR",
    image: "/assets/photos/south-east-asia.jpg",
    condition: "Maternal and Neonatal Disorders",
    paragraph:
      "In South-East Asia, limited medical resources, services, and challenges such as malnutrition and poor sanitation may contribute to a higher prevalence of disability caused by Maternal and Neonatal Disorders. (Source: IHME, Global Burden of Disease 2019) This accounts for approximately 0.86% of the global disability population, which is roughly 103% higher than the average observed in the other five WHO regions.",
    stats: [
      { value: "29.0%", label: "of individuals with disabilities caused by maternal and neonatal disorders globally" },
      { value: "103%", label: "higher than other five WHO regions" },
    ],
    bars: { AFR: 0.49, AMR: 0.4, EMR: 0.58, EUR: 0.34, SEAR: 0.86, WPR: 0.3 },
    note: "Note: This bar chart illustrates the percentage of individuals with disabilities caused by maternal and neonatal disorders among the global population with disabilities across all six WHO regions.",
  },
];

const BAR_MAX_H = 200; // px at the card's largest value

function barChart(card) {
  const max = Math.max(...Object.values(card.bars));
  const cols = REGION_ORDER.map((rg) => {
    const v = card.bars[rg];
    const h = Math.round((v / max) * BAR_MAX_H);
    const isFocus = rg === card.focus;
    const cls = isFocus ? "disp-bar disp-bar--focus" : "disp-bar";
    return `
      <div class="disp-bar-col">
        <div class="disp-bar-val">${(v).toFixed(2)}%</div>
        <div class="${cls}" style="--bar-color:${REGION_COLOR[rg]}; --bar-h:${h}px"></div>
        <div class="disp-bar-name">${REGION_LABEL[rg]}</div>
      </div>`;
  }).join("");
  return `<div class="disp-chart">${cols}</div>`;
}

function cardPanel(card, i) {
  return `
    <div class="disp-panel${i === 0 ? " is-active" : ""}" data-index="${i}">
      <div class="disp-photo" style="background-image:url('${card.image}')" role="img"
        aria-label="${card.tab}"></div>
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
        ${barChart(card)}
        <p class="disp-note">${card.note}</p>
      </div>
    </div>`;
}

export function renderDisparities() {
  const section = document.createElement("section");
  section.className = "section disparities";

  const tabs = CARDS.map(
    (c, i) =>
      `<button class="disp-tab${i === 0 ? " is-active" : ""}" data-index="${i}"
        style="--tab-color:${REGION_COLOR[c.focus]}">${c.tab}</button>`
  ).join("");

  section.innerHTML = `
    <div class="container">
      <h2 class="section__title">Disparities in the Prevalence of Causes of Disability by WHO Regions</h2>
      <div class="section__rule"></div>
      <div class="disp-tabs" role="tablist">${tabs}</div>
      <div class="disp-stage">
        ${CARDS.map(cardPanel).join("")}
      </div>
    </div>
  `;

  wireTabs(section);
  return section;
}

function growBars(panel) {
  panel.querySelectorAll(".disp-bar").forEach((bar, i) => {
    bar.style.height = "0px";
    // stagger the grow for a gentle cascade
    requestAnimationFrame(() => {
      bar.style.transitionDelay = `${i * 60}ms`;
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

  // grow the first panel's bars once it's on screen
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          growBars(panels[tabs.findIndex((t) => t.classList.contains("is-active"))]);
          io.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );
  io.observe(section);
}
