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

// Alt text for each region's photo (shown in the corner chip + as aria-label).
const ALT = {
  AFR: "A woman and a girl wait at a clinic doorway.",
  AMR: "A pregnant woman and a boy above a hillside city.",
  EMR: "Two girls sit together against a worn wall.",
  EUR: "An older woman and a younger woman embrace.",
  SEAR: "A farmer in a conical hat crosses a rice paddy.",
  WPR: "A smiling boy holds a basketball in an alley.",
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

// ---------- Persistent frame: build once, animate content on tab change ----------

function renderBars() {
  // Six fixed columns. Pattern is fixed per region; colour/height/value update.
  return REGION_ORDER.map(
    (rg) => `
      <div class="disp-bar-col">
        <span class="disp-bar-val" data-region="${rg}"></span>
        <div class="disp-bar" data-region="${rg}" style="background-image:${patternURI(rg)}"></div>
      </div>`
  ).join("");
}

export function renderDisparities() {
  const section = document.createElement("section");
  section.className = "section disparities";

  const tabs = TABS.map(
    (t, i) =>
      `<button class="disp-tab${i === 0 ? " is-active" : ""}" data-index="${i}"
        style="--tab-color:${REGION_COLOR[t.region]}">${REGION_LABEL[t.region]}</button>`
  ).join("");

  const xlabels = REGION_ORDER.map(
    (rg) => `<span class="disp-xlabel">${REGION_LABEL[rg]}</span>`
  ).join("");

  section.innerHTML = `
    <div class="container">
      <h2 class="section__title">Disparities in the Prevalence of Causes of Disability by WHO Regions</h2>
      <div class="section__rule"></div>
      <div class="disp-tabs" role="tablist">${tabs}</div>

      <div class="disp-card">
        <div class="disp-photo">
          <div class="disp-alt" tabindex="0" role="note">
            <span class="disp-alt__label">Alt Text</span>
            <span class="disp-alt__desc"></span>
          </div>
        </div>
        <div class="disp-content">
          <h3 class="disp-condition"></h3>
          <p class="disp-paragraph"></p>
          <div class="disp-stats">
            <div class="disp-stat"><div class="disp-stat-value"></div><div class="disp-stat-label"></div></div>
            <div class="disp-stat"><div class="disp-stat-value"></div><div class="disp-stat-label"></div></div>
          </div>
          <div class="disp-chart">
            <div class="disp-plot">
              <span class="disp-axis-label disp-axis-label--max"></span>
              <span class="disp-axis-label disp-axis-label--zero">0.0%</span>
              <div class="disp-ref"></div>
              <div class="disp-bars">${renderBars()}</div>
            </div>
            <div class="disp-xlabels">${xlabels}</div>
          </div>
          <p class="disp-note"></p>
        </div>
      </div>
    </div>
  `;

  wireTabs(section);
  return section;
}

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function parseStat(s) {
  const m = String(s).match(/^([\d.]+)(.*)$/);
  if (!m) return { num: 0, decimals: 0, suffix: String(s) };
  const decimals = (m[1].split(".")[1] || "").length;
  return { num: parseFloat(m[1]), decimals, suffix: m[2] };
}

function countUp(el, value) {
  const { num, decimals, suffix } = parseStat(value);
  if (reduceMotion()) {
    el.textContent = num.toFixed(decimals) + suffix;
    return;
  }
  const dur = 650;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (num * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = num.toFixed(decimals) + suffix;
  };
  requestAnimationFrame(tick);
}

function wireTabs(section) {
  const tabs = [...section.querySelectorAll(".disp-tab")];
  const photo = section.querySelector(".disp-photo");
  const conditionEl = section.querySelector(".disp-condition");
  const paragraphEl = section.querySelector(".disp-paragraph");
  const noteEl = section.querySelector(".disp-note");
  const maxLabel = section.querySelector(".disp-axis-label--max");
  const statVals = [...section.querySelectorAll(".disp-stat-value")];
  const statLabels = [...section.querySelectorAll(".disp-stat-label")];
  const bars = [...section.querySelectorAll(".disp-bar")];
  const barVals = [...section.querySelectorAll(".disp-bar-val")];
  const altChip = section.querySelector(".disp-alt");
  const altDesc = section.querySelector(".disp-alt__desc");
  let current = -1;

  // Fix the paragraph height to the tallest card so the chart never shifts.
  const equalizeParagraph = () => {
    const prev = paragraphEl.textContent;
    paragraphEl.style.minHeight = "0px";
    let maxH = 0;
    TABS.forEach((t) => {
      paragraphEl.textContent = t.cards[0].paragraph;
      maxH = Math.max(maxH, paragraphEl.offsetHeight);
    });
    paragraphEl.textContent = prev;
    paragraphEl.style.minHeight = `${maxH}px`;
  };

  const update = (index) => {
    if (index === current) return;
    const first = current === -1;
    current = index;
    const card = TABS[index].cards[0];
    const focus = TABS[index].region;

    tabs.forEach((t, i) => t.classList.toggle("is-active", i === index));

    if (first || reduceMotion()) {
      photo.style.backgroundImage = `url('${card.image}')`;
    } else {
      photo.classList.add("is-swapping");
      setTimeout(() => {
        photo.style.backgroundImage = `url('${card.image}')`;
        photo.classList.remove("is-swapping");
      }, 200);
    }

    const alt = ALT[focus] || card.condition;
    altDesc.textContent = alt;
    altChip.setAttribute("aria-label", `Image description: ${alt}`);

    conditionEl.textContent = card.condition;
    paragraphEl.textContent = card.paragraph;
    noteEl.textContent = card.note;
    maxLabel.textContent =
      card.axisMax.toFixed(card.axisMax < 1 ? 2 : 1) + "%";

    card.stats.forEach((s, i) => {
      statLabels[i].textContent = s.label;
      countUp(statVals[i], s.value);
    });

    REGION_ORDER.forEach((rg, i) => {
      const isFocus = rg === focus;
      bars[i].style.backgroundColor = isFocus
        ? REGION_COLOR[rg]
        : NON_FOCUS_GRAY;
      barVals[i].textContent = card.bars[rg].toFixed(2) + "%";
      barVals[i].classList.toggle("is-focus", isFocus);
      // Tween directly from the current height to the new one.
      bars[i].style.height =
        Math.min((card.bars[rg] / card.axisMax) * 100, 100) + "%";
    });
  };

  tabs.forEach((t) =>
    t.addEventListener("click", () => update(Number(t.dataset.index)))
  );

  // Measure once layout is ready (after the section is in the DOM), then paint.
  requestAnimationFrame(() => {
    equalizeParagraph();
    update(0);
  });
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(equalizeParagraph, 150);
  });
}
