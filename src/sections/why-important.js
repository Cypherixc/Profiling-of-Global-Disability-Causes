// "Why understanding and comparing the prevalence of causes of disability
// in various regions globally is important?"
// Horizontal accordion — click a panel to expand it (collapses the others).
// Titles are from Si's Figma; bodies transcribed from the (faint) mockup and
// pending Si's confirmation.

const REASONS = [
  {
    color: "#4690cd",
    title: "Revealing Resource Allocation and Intervention Priorities",
    body: "By understanding the diverse causes of disability in different regions, policymakers and decision-makers can better allocate resources and set the priority of interventions. Different regions face distinct challenges and needs, and understanding these differences helps formulate targeted health policies and strategies.",
  },
  {
    color: "#24aca4",
    title: "Guiding Prevention and Control Measures",
    body: "Comparing the causes of disability across regions helps identify the key risk factors and diseases affecting specific areas, which guides the development of prevention and control measures. This supports policies and health strategies that reduce disability rates and improve the overall health of populations.",
  },
  {
    color: "#63c1c2",
    title: "Improving Healthcare Services and Resource Distribution",
    body: "Understanding how the causes of disability vary worldwide helps reveal inequalities in healthcare services and resource distribution. This knowledge promotes equity in healthcare and ensures resources are distributed fairly to meet the specific needs of different regions.",
  },
  {
    color: "#b297c7",
    title: "Increasing Awareness and Knowledge Dissemination",
    body: "Comparing the causes of disability across global regions fosters knowledge exchange and sharing. It raises public awareness and improves health literacy, encouraging positive change and healthier communities.",
  },
  {
    color: "#8169ab",
    title: "Supporting Global Collaboration and Cooperative Efforts",
    body: "Understanding the causes of disability across regions globally fosters international collaboration and joint effort. It facilitates extensive knowledge sharing, technology transfer and collaborative projects to address global health challenges collectively.",
  },
];

function itemEl(r, i) {
  return `
    <button class="acc-item${i === 0 ? " is-active" : ""}" type="button"
      style="--c:${r.color}" data-index="${i}" aria-expanded="${i === 0}">
      <span class="acc-item__num">${i + 1}</span>
      <div class="acc-item__panel">
        <h3 class="acc-item__title">${r.title}</h3>
        <p class="acc-item__body">${r.body}</p>
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
