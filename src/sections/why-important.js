// "Why understanding and comparing the prevalence of causes of disability
// in various regions globally is important?"
//
// Five parallel arguments as a vertical tab set: the titles stack in a left
// column, the selected reason's claim and detail fill the panel on the right.
// Standard WAI-ARIA tabs — roving tabindex, arrow/Home/End keys, one panel
// visible at a time.
//
// Titles are Si's, shortened to fit the tab column on one line. Each original
// stated its point twice — "Prevention and Control", "Awareness and Knowledge
// Dissemination", "Collaboration and Cooperative Efforts" — so the redundant
// half came off rather than the meaning.
//
// Bodies are Si's original prose, restored at full length. Each claim above
// them is new: the titles are abstract noun phrases, so without a claim an
// unselected tab tells the reader nothing.

const REASONS = [
  {
    color: "#4690cd",
    title: "Revealing Resource Priorities",
    claim:
      "Money spread evenly is money spread wrong — regions do not carry the same burden.",
    body: "By understanding the diverse causes of disability across different regions, policymakers and decision-makers can allocate resources more effectively and set clearer priorities for intervention. Each region faces a distinct mix of challenges, shaped by its economy, environment, demographics, and health infrastructure, so a one-size-fits-all approach rarely works. Comparing these differences makes it possible to direct funding, staff, and programmes to where they will have the greatest impact, and to design targeted health policies and strategies that respond to the specific needs of each population.",
  },
  {
    color: "#24aca4",
    title: "Guiding Prevention and Control",
    claim: "You cannot screen for a risk you have not located.",
    body: "Comparing the causes of disability between regions helps identify the key risk factors and conditions that affect each area most heavily. This insight is essential for shaping prevention and control measures that fit local circumstances, rather than generic guidance applied everywhere. By pinpointing where a particular disease or injury is concentrated, public-health teams can design tailored screening, vaccination, and awareness programmes, intervene earlier, and ultimately reduce disability rates while improving the overall health and resilience of the populations they serve.",
  },
  {
    color: "#63c1c2",
    title: "Improving Healthcare Equity",
    claim:
      "The regions carrying the heaviest burden are rarely the ones with the most clinicians.",
    body: "Understanding how the causes of disability vary around the world brings inequalities in healthcare services and resource distribution into sharp focus. Some regions carry a far heavier burden yet have far fewer clinicians, facilities, and funds to address it. Recognising these gaps is the first step toward closing them: it supports fairer allocation of medical resources, encourages investment where shortages are greatest, and promotes genuine equity in care, so that people everywhere have a comparable opportunity to prevent, treat, and live well with disability.",
  },
  {
    color: "#b297c7",
    title: "Increasing Awareness and Knowledge",
    claim: "A solution that works in one region is evidence, not coincidence.",
    body: "Comparing the causes of disability across global regions creates valuable opportunities for knowledge exchange and shared learning. When findings, data, and successful approaches move freely between countries, communities can learn from one another instead of repeating the same mistakes. This wider awareness helps the public, clinicians, and educators understand the specific health issues and risk factors that matter most in their context, encouraging informed behaviour change, stronger health literacy, and healthier, better-prepared communities over the long term.",
  },
  {
    color: "#8169ab",
    title: "Supporting Global Collaboration",
    claim: "The causes cross borders. No country can solve them alone.",
    body: "Understanding the causes of disability in different regions lays the foundation for genuine international collaboration. Many of the challenges behind disability, from chronic disease to injury and ageing populations, cross borders and cannot be solved by any single country alone. A shared, comparable picture of the data makes it easier to pool expertise, transfer technology, coordinate research, and run joint projects, so that nations can tackle global health challenges collectively and turn individual insights into coordinated, lasting progress.",
  },
];

// Chosen to follow what the dataset actually reports: the official programme,
// the people the numbers describe, then the two largest causes on the page.
// Every figure quoted here comes from the organisation's own material.
const RESOURCES = [
  {
    color: "#4690cd",
    label: "Official programme",
    name: "WHO Rehabilitation 2030",
    desc: "WHO's initiative to scale up rehabilitation worldwide. An estimated 2.4 billion people live with a condition rehabilitation could help; in low- and middle-income countries more than half of them receive none.",
    cta: "Read the evidence",
    href: "https://www.who.int/initiatives/rehabilitation-2030",
  },
  {
    color: "#24aca4",
    label: "Disabled people's own organisations",
    name: "International Disability Alliance",
    desc: "A network of more than 1,100 organisations of persons with disabilities across eight global and six regional networks, recognised by the UN as the representative voice of disabled people worldwide.",
    cta: "Follow the work",
    href: "https://www.internationaldisabilityalliance.org/",
  },
  {
    color: "#63c1c2",
    label: "Largest cause · Musculoskeletal",
    name: "Global Alliance for Musculoskeletal Health",
    desc: "Musculoskeletal conditions are the biggest single cause of disability in this dataset. By the Alliance's own account they remain among the most under-prioritised areas of global health policy.",
    cta: "Learn more",
    href: "https://gmusc.com/",
  },
  {
    color: "#b297c7",
    label: "Second largest · Mental health",
    name: "United for Global Mental Health",
    desc: "Campaigns for mental-health financing and rights-based policy, with a focus on low- and middle-income countries where the treatment gap is widest.",
    cta: "Get involved",
    href: "https://unitedgmh.org/",
  },
];

const tabEl = (r, i) => `
  <button class="why-tab${i === 0 ? " is-active" : ""}" role="tab" type="button"
    id="why-tab-${i}" aria-controls="why-panel-${i}"
    aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"
    style="--c:${r.color}">
    <span class="why-tab__num">${i + 1}</span>
    <span class="why-tab__title">${r.title}</span>
  </button>`;

const panelEl = (r, i) => `
  <div role="tabpanel" id="why-panel-${i}"
    aria-labelledby="why-tab-${i}" tabindex="0" style="--c:${r.color}"
    class="why-panel${i === 0 ? "" : " is-hidden"}">
    <div class="why-panel__rule"></div>
    <p class="why-panel__claim">${r.claim}</p>
    <p class="why-panel__body">${r.body}</p>
  </div>`;

const resourceEl = (r) => `
  <a class="why-res" style="--c:${r.color}" href="${r.href}"
    target="_blank" rel="noopener noreferrer">
    <span class="why-res__label">${r.label}</span>
    <span class="why-res__name">${r.name}</span>
    <span class="why-res__desc">${r.desc}</span>
    <span class="why-res__cta">${r.cta} <span aria-hidden="true">↗</span></span>
  </a>`;

export function renderWhyImportant() {
  const section = document.createElement("section");
  section.className = "section why";
  section.innerHTML = `
    <div class="container">
      <h2 class="section__title">Why understanding and comparing the prevalence of causes of disability in various regions globally is important?</h2>
      <div class="section__rule"></div>

      <div class="why__tabs">
        <div class="why-tablist" role="tablist" aria-orientation="vertical"
          aria-label="Reasons this comparison matters">
          ${REASONS.map(tabEl).join("")}
        </div>
        <div class="why-panels">
          ${REASONS.map(panelEl).join("")}
        </div>
      </div>

      <div class="why__resources-head">
        <h3 class="why__resources-title">Where this goes next</h3>
        <p class="why__resources-intro">
          A dataset can show the shape of the problem and where it falls hardest.
          These are the organisations working on it — they hold the evidence, they
          are led by the people the numbers describe, and they work on the causes
          this page ranks at the top.
        </p>
      </div>

      <div class="why__resources">
        ${RESOURCES.map(resourceEl).join("")}
      </div>

      <div class="back-to-top-wrap">
        <a class="back-to-top" href="#hero">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Back to top</span>
        </a>
      </div>
    </div>
  `;

  const tabs = [...section.querySelectorAll(".why-tab")];
  const panels = [...section.querySelectorAll(".why-panel")];

  function select(i, moveFocus) {
    tabs.forEach((tab, n) => {
      const on = n === i;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", String(on));
      // roving tabindex: only the selected tab is in the tab order
      tab.tabIndex = on ? 0 : -1;
      // not [hidden]: the panels stay stacked in one grid cell so the row
      // keeps the height of the tallest, and switching tabs never moves the
      // page. visibility:hidden still takes them out of the a11y tree.
      panels[n].classList.toggle("is-hidden", !on);
    });
    if (moveFocus) tabs[i].focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", (e) => {
      const last = tabs.length - 1;
      const to =
        e.key === "ArrowDown" || e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
        : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
        : e.key === "Home" ? 0
        : e.key === "End" ? last
        : null;
      if (to === null) return;
      e.preventDefault();
      select(to, true);
    });
  });

  return section;
}
