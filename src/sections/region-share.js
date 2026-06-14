// "Percentage of Total Global Disabilities by WHO Regions"
// Mirrors Figma node 1435:3481. World map + six regional share stats + legend.
//
// Hovering a region (on the map or in the stats) keeps that region at full
// opacity and dims every other region — map paths and stats alike — to 20%.
//
// The six figures are the published values from the original visualization,
// reproducible from the dataset as each region's share of the summed all-cause
// prevalence rate (percentage metric, level 1, both sexes, moderate & severe)
// to within ~0.3pp.

// Inlined so individual country paths are addressable for the hover linking.
import mapSvg from "../assets/who-map.svg?raw";

// Region key ← the fill colour each country path carries in the source SVG.
const COLOR_TO_REGION = {
  "#4690cd": "africa",
  "#84b9e1": "americas",
  "#8169ab": "eastern-mediterranean",
  "#b297c7": "europe",
  "#24aca4": "south-east-asia",
  "#63c1c2": "western-pacific",
};

const REGIONS = [
  { key: "africa", name: "Africa", value: "12.80%", color: "#4690cd" },
  { key: "americas", name: "Americas", value: "19.38%", color: "#84b9e1" },
  { key: "eastern-mediterranean", name: "Eastern Mediterranean", value: "14.78%", color: "#8169ab" },
  { key: "europe", name: "Europe", value: "19.96%", color: "#b297c7" },
  { key: "south-east-asia", name: "South-East Asia", value: "15.63%", color: "#24aca4" },
  { key: "western-pacific", name: "Western Pacific", value: "15.37%", color: "#63c1c2" },
];

const statBlock = ({ key, name, value, color }) => `
  <div class="region-stat" data-region="${key}" style="--accent:${color}">
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
      <p class="section__intro">The WHO divides the world into six regions. The map and figures below show how the global burden of disability is shared among them — each region's portion of the total prevalence of disability worldwide. Hover over a region to isolate its share from the rest.</p>

      <div class="region-share__body">
        <div class="region-share__map">
          <div class="region-share__map-svg">${mapSvg}</div>
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

  wireHover(section);
  return section;
}

function wireHover(section) {
  const svg = section.querySelector(".region-share__map-svg svg");
  if (svg) {
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    // Tag each filled country path with the region it belongs to.
    svg.querySelectorAll("path[fill]").forEach((path) => {
      const fill = (path.getAttribute("fill") || "").toLowerCase();
      const region = COLOR_TO_REGION[fill];
      if (region) {
        path.classList.add("map-region");
        path.dataset.region = region;
      }
    });
  }

  const stats = section.querySelector(".region-share__stats");

  const setActive = (region) => {
    section.classList.toggle("is-highlighting", Boolean(region));
    section.querySelectorAll("[data-region]").forEach((el) => {
      el.classList.toggle("is-dimmed", region != null && el.dataset.region !== region);
    });
  };

  // Event delegation: hovering any tagged element drives the highlight.
  const onMove = (e) => {
    const el = e.target.closest("[data-region]");
    setActive(el ? el.dataset.region : null);
  };
  svg?.addEventListener("mousemove", onMove);
  svg?.addEventListener("mouseleave", () => setActive(null));
  stats.addEventListener("mousemove", onMove);
  stats.addEventListener("mouseleave", () => setActive(null));
}
