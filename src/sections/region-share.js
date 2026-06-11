// "Percentage of Total Global Disabilities by WHO Regions"
// Mirrors Figma node 1435:3481. World map + six regional share stats + legend.
//
// The six figures are the published values from the original visualization.
// They are reproducible from the dataset as each region's share of the summed
// all-cause prevalence rate (percentage metric, level 1, both sexes,
// moderate and severe) to within ~0.3pp — see scripts verification.

const REGIONS = [
  { name: "Africa", value: "12.80%", color: "#4690cd" },
  { name: "Americas", value: "19.38%", color: "#84b9e1" },
  { name: "Eastern Mediterranean", value: "14.78%", color: "#8169ab" },
  { name: "Europe", value: "19.96%", color: "#b297c7" },
  { name: "South-East Asia", value: "15.63%", color: "#24aca4" },
  { name: "Western Pacific", value: "15.37%", color: "#63c1c2" },
];

const statBlock = ({ name, value, color }) => `
  <div class="region-stat" style="--accent:${color}">
    <span class="region-stat__value">${value}</span>
    <span class="region-stat__rule"></span>
    <span class="region-stat__name">${name}</span>
  </div>
`;

const legendItem = ({ name, color }) => `
  <li class="region-legend__item">
    <span class="region-legend__swatch" style="background:${color}"></span>${name}
  </li>
`;

export function renderRegionShare() {
  const section = document.createElement("section");
  section.className = "section region-share";

  section.innerHTML = `
    <div class="container">
      <h2 class="section__title">Percentage of Total Global Disabilities by WHO Regions</h2>
      <div class="section__rule"></div>

      <div class="region-share__body">
        <div class="region-share__map">
          <img src="/assets/region-map.svg" alt="World map shaded by WHO region" />
          <ul class="region-legend">
            ${REGIONS.map(legendItem).join("")}
            <li class="region-legend__item">
              <span class="region-legend__swatch region-legend__swatch--empty"></span>No data
            </li>
          </ul>
        </div>
        <div class="region-share__stats">
          ${REGIONS.map(statBlock).join("")}
        </div>
      </div>
    </div>
  `;

  return section;
}
