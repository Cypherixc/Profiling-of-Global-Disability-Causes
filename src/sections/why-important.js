// "Why understanding and comparing the prevalence of causes of disability
// in various regions globally is important?"
//
// Vertical accordion — click a panel to expand it (collapses the others),
// followed by the organisations working on what the page describes.
//
// Titles are from Si's Figma; bodies transcribed from the (faint) mockup and
// still pending Si's confirmation.

const REASONS = [
  {
    color: "#4690cd",
    title: "Revealing Resource Allocation and Intervention Priorities",
    body: "By understanding the diverse causes of disability across different regions, policymakers and decision-makers can allocate resources more effectively and set clearer priorities for intervention. Each region faces a distinct mix of challenges, shaped by its economy, environment, demographics, and health infrastructure, so a one-size-fits-all approach rarely works. Comparing these differences makes it possible to direct funding, staff, and programmes to where they will have the greatest impact, and to design targeted health policies and strategies that respond to the specific needs of each population.",
  },
  {
    color: "#24aca4",
    title: "Guiding Prevention and Control Measures",
    body: "Comparing the causes of disability between regions helps identify the key risk factors and conditions that affect each area most heavily. This insight is essential for shaping prevention and control measures that fit local circumstances, rather than generic guidance applied everywhere. By pinpointing where a particular disease or injury is concentrated, public-health teams can design tailored screening, vaccination, and awareness programmes, intervene earlier, and ultimately reduce disability rates while improving the overall health and resilience of the populations they serve.",
  },
  {
    color: "#63c1c2",
    title: "Improving Healthcare Services and Resource Distribution",
    body: "Understanding how the causes of disability vary around the world brings inequalities in healthcare services and resource distribution into sharp focus. Some regions carry a far heavier burden yet have far fewer clinicians, facilities, and funds to address it. Recognising these gaps is the first step toward closing them: it supports fairer allocation of medical resources, encourages investment where shortages are greatest, and promotes genuine equity in care, so that people everywhere have a comparable opportunity to prevent, treat, and live well with disability.",
  },
  {
    color: "#b297c7",
    title: "Increasing Awareness and Knowledge Dissemination",
    body: "Comparing the causes of disability across global regions creates valuable opportunities for knowledge exchange and shared learning. When findings, data, and successful approaches move freely between countries, communities can learn from one another instead of repeating the same mistakes. This wider awareness helps the public, clinicians, and educators understand the specific health issues and risk factors that matter most in their context, encouraging informed behaviour change, stronger health literacy, and healthier, better-prepared communities over the long term.",
  },
  {
    color: "#8169ab",
    title: "Supporting Global Collaboration and Cooperative Efforts",
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

// The heading wraps the button (not the other way round): a <button> may only
// contain phrasing content, so the old markup put an <h3> and a <p> inside one,
// which made screen readers read each full body as the button's name.
function itemEl(r, i) {
  const open = i === 0;
  return `
    <div class="acc-item${open ? " is-active" : ""}" style="--c:${r.color}">
      <h3 class="acc-item__heading">
        <button class="acc-item__head" type="button" id="why-btn-${i}"
          aria-expanded="${open}" aria-controls="why-panel-${i}">
          <span class="acc-item__num">${i + 1}</span>
          <span class="acc-item__title">${r.title}</span>
          <span class="acc-item__chevron" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="acc-item__bodywrap" id="why-panel-${i}" role="region"
        aria-labelledby="why-btn-${i}">
        <div class="acc-item__inner">
          <p class="acc-item__body">${r.body}</p>
        </div>
      </div>
    </div>`;
}

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

      <div class="why__acc">
        ${REASONS.map(itemEl).join("")}
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

  const items = [...section.querySelectorAll(".acc-item")];
  items.forEach((item) => {
    const btn = item.querySelector(".acc-item__head");
    btn.addEventListener("click", () => {
      if (item.classList.contains("is-active")) return;
      items.forEach((it) => {
        const on = it === item;
        it.classList.toggle("is-active", on);
        it.querySelector(".acc-item__head").setAttribute("aria-expanded", String(on));
      });
    });
  });

  return section;
}
