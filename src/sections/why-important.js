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
    body: "By understanding the diverse causes of disability in different regions, policymakers and decision-makers can better allocate resources and determine the priority of interventions. Different regions may face distinct challenges and needs, and understanding these differences can help formulate targeted health policies and strategies.",
  },
  {
    color: "#24aca4",
    illo: "/assets/why/why-2.svg",
    title: "Guiding Prevention and Control Measures",
    body: "Comparing the causes of disability in different regions can identify key risk factors and diseases affecting specific areas, thereby guiding the development of prevention and control measures. This aids in designing tailored public health strategies to reduce disability rates and improve the overall health of populations.",
  },
  {
    color: "#63c1c2",
    illo: "/assets/why/why-3.svg",
    title: "Improving Healthcare Services and Resource Distribution",
    body: "Understanding the variations in causes of disability worldwide helps identify inequalities in healthcare services and resource distribution. This knowledge promotes equity in healthcare services and ensures fair resource allocation to meet specific needs in different regions.",
  },
  {
    color: "#b297c7",
    illo: "/assets/why/why-4.svg",
    title: "Increasing Awareness and Knowledge Dissemination",
    body: "Comparing the causes of disability across global regions facilitates knowledge exchange and sharing. It helps raise public awareness about specific health issues and risk factors, promoting behavior change and healthier communities.",
  },
  {
    color: "#8169ab",
    illo: "/assets/why/why-5.svg",
    title: "Supporting Global Collaboration and Cooperative Efforts",
    body: "Understanding the causes of disability in different regions globally fosters international collaboration and joint efforts. It facilitates experience sharing, technology transfer, and collaborative projects to address global health challenges collectively.",
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
      <div class="why__acc">
        ${REASONS.map(itemEl).join("")}
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
