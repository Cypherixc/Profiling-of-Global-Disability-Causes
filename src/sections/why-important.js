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
// half came off rather than the meaning. The claims and bodies replace the
// placeholder prose transcribed from the mockup: same arguments, roughly half
// the length, and deliberately five different sentence shapes — the originals
// were structurally identical, which is why they read as one paragraph.

const REASONS = [
  {
    color: "#4690cd",
    title: "Revealing Resource Priorities",
    claim:
      "Money spread evenly is money spread wrong — regions do not carry the same burden.",
    body: "Each region faces a distinct mix of challenges, shaped by its economy, environment, demographics and health infrastructure. A one-size-fits-all response rarely works. Comparing the differences lets funders direct money, staff and programmes to where they will do the most, rather than spreading them evenly.",
  },
  {
    color: "#24aca4",
    title: "Guiding Prevention and Control",
    claim: "You cannot screen for a risk you have not located.",
    body: "Comparison shows which risk factors concentrate where. That tells public-health teams what to screen for, whom to vaccinate and where to intervene early — decisions generic guidance, applied identically everywhere, cannot make for them. Intervening earlier is what actually lowers the rate.",
  },
  {
    color: "#63c1c2",
    title: "Improving Healthcare Equity",
    claim:
      "The regions carrying the heaviest burden are rarely the ones with the most clinicians.",
    body: "Burden and capacity are not distributed the same way. Some regions carry far more disability and have far fewer clinicians, facilities and funds to meet it. Naming that mismatch is the first step to closing it, and to arguing for investment where the shortage is worst.",
  },
  {
    color: "#b297c7",
    title: "Increasing Awareness and Knowledge",
    claim: "A solution that works in one region is evidence, not coincidence.",
    body: "When findings and working approaches move between countries, communities stop solving the same problem from scratch. Comparable data is what makes that transfer possible — it shows clinicians, educators and the public which risks actually matter where they live.",
  },
  {
    color: "#8169ab",
    title: "Supporting Global Collaboration",
    claim: "The causes cross borders. No country can solve them alone.",
    body: "Chronic disease, injury and ageing populations are not national problems with national fixes. A shared, comparable picture of the data is the precondition for pooling expertise, coordinating research and running joint programmes — you cannot cooperate on a problem each country measures differently.",
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
  <div class="why-panel" role="tabpanel" id="why-panel-${i}"
    aria-labelledby="why-tab-${i}" tabindex="0" style="--c:${r.color}"
    ${i === 0 ? "" : "hidden"}>
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
      panels[n].hidden = !on;
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
