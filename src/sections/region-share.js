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

// Numeric value, rank (1 = largest share) and bar length (relative to the
// largest region) derived once from REGIONS.
const META = (() => {
  const nums = REGIONS.map((r) => parseFloat(r.value));
  const max = Math.max(...nums);
  const order = REGIONS.map((r, i) => ({ key: r.key, n: nums[i] })).sort(
    (a, b) => b.n - a.n
  );
  const rank = {};
  order.forEach((r, i) => (rank[r.key] = i + 1));
  const meta = {};
  REGIONS.forEach((r, i) => {
    meta[r.key] = { num: nums[i], pct: (nums[i] / max) * 100, rank: rank[r.key] };
  });
  return meta;
})();

const statBlock = ({ key, name, value, color }) => `
  <div class="region-stat" data-region="${key}" style="--accent:${color}">
    <span class="region-stat__value" data-target="${META[key].num}">${value}</span>
    <span class="region-stat__bar"><span class="region-stat__bar-fill" style="--pct:${META[key].pct}%"></span></span>
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
          <div class="region-tooltip" role="status" aria-hidden="true">
            <span class="region-tooltip__name"></span>
            <span class="region-tooltip__meta">
              <span class="region-tooltip__value"></span>
              <span class="region-tooltip__rank"></span>
            </span>
          </div>
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
  wireReveal(section);
  return section;
}

// Region name lookup for the tooltip.
const REGION_BY_KEY = Object.fromEntries(REGIONS.map((r) => [r.key, r]));

// Count the figures up from zero and grow the bars when the module first
// scrolls into view. Values render at their final text up-front, so they stay
// correct even where IntersectionObserver doesn't fire.
function wireReveal(section) {
  const stats = section.querySelector(".region-share__stats");
  const values = [...section.querySelectorAll(".region-stat__value")];
  let done = false;

  const reveal = () => {
    if (done) return;
    done = true;
    // Grow the bars to their share width (CSS transition handles the motion).
    section.querySelectorAll(".region-stat__bar-fill").forEach((f) => {
      f.style.width = f.style.getPropertyValue("--pct");
    });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    values.forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const start = performance.now();
      const dur = 900;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(2) + "%";
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(2) + "%";
      };
      requestAnimationFrame(tick);
    });
  };

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && reveal()),
    { threshold: 0.35 }
  );
  io.observe(stats);
  // Safety net for environments/timing where the observer never fires.
  setTimeout(reveal, 2500);
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
  const mapWrap = section.querySelector(".region-share__map");
  const tip = section.querySelector(".region-tooltip");

  const setActive = (region) => {
    section.classList.toggle("is-highlighting", Boolean(region));
    section.querySelectorAll("[data-region]").forEach((el) => {
      el.classList.toggle("is-dimmed", region != null && el.dataset.region !== region);
    });
  };

  const showTip = (region, clientX, clientY) => {
    const r = REGION_BY_KEY[region];
    if (!r) return hideTip();
    const box = mapWrap.getBoundingClientRect();
    tip.style.setProperty("--accent", r.color);
    tip.querySelector(".region-tooltip__name").textContent = r.name;
    tip.querySelector(".region-tooltip__value").textContent = r.value;
    tip.querySelector(".region-tooltip__rank").textContent = `Rank #${META[region].rank}`;
    tip.style.left = `${clientX - box.left}px`;
    tip.style.top = `${clientY - box.top}px`;
    tip.classList.add("is-visible");
  };
  const hideTip = () => tip.classList.remove("is-visible");

  // Event delegation: hovering any tagged element drives the highlight.
  const onMove = (e) => {
    const el = e.target.closest("[data-region]");
    setActive(el ? el.dataset.region : null);
  };
  // The tooltip follows the cursor over the map only.
  const onMapMove = (e) => {
    const el = e.target.closest("[data-region]");
    if (el) showTip(el.dataset.region, e.clientX, e.clientY);
    else hideTip();
  };

  svg?.addEventListener("mousemove", (e) => {
    onMove(e);
    onMapMove(e);
  });
  svg?.addEventListener("mouseleave", () => {
    setActive(null);
    hideTip();
  });
  stats.addEventListener("mousemove", onMove);
  stats.addEventListener("mouseleave", () => setActive(null));
}
