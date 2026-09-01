// "Why understanding and comparing the prevalence of causes of disability
// in various regions globally is important?"
//
// Four parallel arguments as a 2x2 card grid — all visible, nothing to click.
// The resources row below is 1x4 and lighter, so the two blocks read as
// different kinds of thing rather than the same component twice.
//
// Down from five: "Supporting Global Collaboration" was the closest duplicate
// of "Increasing Awareness" (both are countries learning from each other) and
// the most generic of the set. Its sharpest point — that you cannot cooperate
// on a problem each country measures differently — is folded into reason 4,
// where it belongs anyway, since comparability is what this whole page is about.
//
// Titles are Si's, from the Figma. The claims and bodies replace the
// placeholder prose transcribed from the mockup: same arguments, roughly half
// the length, and deliberately five different sentence shapes — the originals
// were structurally identical, which is why they read as one paragraph.

const REASONS = [
  {
    color: "#4690cd",
    title: "Revealing Resource Allocation and Intervention Priorities",
    claim:
      "Money spread evenly is money spread wrong — regions do not carry the same burden.",
    body: "Each region faces a distinct mix of challenges, shaped by its economy, environment, demographics and health infrastructure. A one-size-fits-all response rarely works. Comparing the differences lets funders direct money, staff and programmes to where they will do the most, rather than spreading them evenly.",
  },
  {
    color: "#24aca4",
    title: "Guiding Prevention and Control Measures",
    claim: "You cannot screen for a risk you have not located.",
    body: "Comparison shows which risk factors concentrate where. That tells public-health teams what to screen for, whom to vaccinate and where to intervene early — decisions generic guidance, applied identically everywhere, cannot make for them. Intervening earlier is what actually lowers the rate.",
  },
  {
    color: "#63c1c2",
    title: "Improving Healthcare Services and Resource Distribution",
    claim:
      "The regions carrying the heaviest burden are rarely the ones with the most clinicians.",
    body: "Burden and capacity are not distributed the same way. Some regions carry far more disability and have far fewer clinicians, facilities and funds to meet it. Naming that mismatch is the first step to closing it, and to arguing for investment where the shortage is worst.",
  },
  {
    color: "#b297c7",
    title: "Increasing Awareness and Knowledge Dissemination",
    claim: "A solution that works in one region is evidence, not coincidence.",
    body: "When findings and working approaches move between countries, communities stop solving the same problem from scratch. But nothing transfers between places that count differently — comparable data is the precondition, and it is what shows clinicians, educators and the public which risks actually matter where they live.",
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

const reasonEl = (r, i) => `
  <article class="why-card" style="--c:${r.color}">
    <div class="why-card__head">
      <span class="why-card__num">${i + 1}</span>
      <h3 class="why-card__title">${r.title}</h3>
    </div>
    <p class="why-card__claim">${r.claim}</p>
    <p class="why-card__body">${r.body}</p>
  </article>`;

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

      <div class="why__cards">
        ${REASONS.map(reasonEl).join("")}
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

  return section;
}
