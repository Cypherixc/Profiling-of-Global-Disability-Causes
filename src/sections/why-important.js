// "Why understanding and comparing the prevalence of causes of disability
// in various regions globally is important?"
// Horizontal accordion — click a panel to expand it (collapses the others).
// Titles are from Si's Figma; bodies transcribed from the (faint) mockup and
// pending Si's confirmation.

const REASONS = [
  {
    color: "#4690cd",
    illo: "/assets/why/why-1.svg",
    title: "Revealing Resource Allocation and Intervention Priorities",
    body: "By understanding the diverse causes of disability across different regions, policymakers and decision-makers can allocate resources more effectively and set clearer priorities for intervention. Each region faces a distinct mix of challenges — shaped by its economy, environment, demographics, and health infrastructure — so a one-size-fits-all approach rarely works. Comparing these differences makes it possible to direct funding, staff, and programmes to where they will have the greatest impact, and to design targeted health policies and strategies that respond to the specific needs of each population.",
  },
  {
    color: "#24aca4",
    illo: "/assets/why/why-2.svg",
    title: "Guiding Prevention and Control Measures",
    body: "Comparing the causes of disability between regions helps identify the key risk factors and conditions that affect each area most heavily. This insight is essential for shaping prevention and control measures that fit local circumstances, rather than generic guidance applied everywhere. By pinpointing where a particular disease or injury is concentrated, public-health teams can design tailored screening, vaccination, and awareness programmes, intervene earlier, and ultimately reduce disability rates while improving the overall health and resilience of the populations they serve.",
  },
  {
    color: "#63c1c2",
    illo: "/assets/why/why-3.svg",
    title: "Improving Healthcare Services and Resource Distribution",
    body: "Understanding how the causes of disability vary around the world brings inequalities in healthcare services and resource distribution into sharp focus. Some regions carry a far heavier burden yet have far fewer clinicians, facilities, and funds to address it. Recognising these gaps is the first step toward closing them: it supports fairer allocation of medical resources, encourages investment where shortages are greatest, and promotes genuine equity in care, so that people everywhere have a comparable opportunity to prevent, treat, and live well with disability.",
  },
  {
    color: "#b297c7",
    illo: "/assets/why/why-4.svg",
    title: "Increasing Awareness and Knowledge Dissemination",
    body: "Comparing the causes of disability across global regions creates valuable opportunities for knowledge exchange and shared learning. When findings, data, and successful approaches move freely between countries, communities can learn from one another instead of repeating the same mistakes. This wider awareness helps the public, clinicians, and educators understand the specific health issues and risk factors that matter most in their context, encouraging informed behaviour change, stronger health literacy, and healthier, better-prepared communities over the long term.",
  },
  {
    color: "#8169ab",
    illo: "/assets/why/why-5.svg",
    title: "Supporting Global Collaboration and Cooperative Efforts",
    body: "Understanding the causes of disability in different regions lays the foundation for genuine international collaboration. Many of the challenges behind disability — from chronic disease to injury and ageing populations — cross borders and cannot be solved by any single country alone. A shared, comparable picture of the data makes it easier to pool expertise, transfer technology, coordinate research, and run joint projects, so that nations can tackle global health challenges collectively and turn individual insights into coordinated, lasting progress.",
  },
];

function itemEl(r, i) {
  return `
    <button class="acc-item${i === 0 ? " is-active" : ""}" type="button"
      style="--c:${r.color}" data-index="${i}" aria-expanded="${i === 0}">
      <div class="acc-item__head">
        <span class="acc-item__num">${i + 1}</span>
        <h3 class="acc-item__title">${r.title}</h3>
        <span class="acc-item__chevron" aria-hidden="true"></span>
      </div>
      <div class="acc-item__bodywrap">
        <div class="acc-item__inner">
          <p class="acc-item__body">${r.body}</p>
          <img class="acc-item__illo" src="${r.illo}" alt="" aria-hidden="true" />
        </div>
      </div>
    </button>`;
}

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
    item.addEventListener("click", () => {
      if (item.classList.contains("is-active")) return;
      items.forEach((it) => {
        const on = it === item;
        it.classList.toggle("is-active", on);
        it.setAttribute("aria-expanded", String(on));
      });
    });
  });

  return section;
}
