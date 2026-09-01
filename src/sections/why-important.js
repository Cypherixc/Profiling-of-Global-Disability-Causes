// "Why it matters" — the closing module.
//
// Structure follows the close of A Decade of Rain: state what the data found,
// then hand the reader somewhere to go. Three claims, each carrying a number,
// then four organisations working on what the numbers point at.
//
// The first two figures are COMPUTED from src/data/disability.json at render
// time rather than typed in, so they can never drift from the dataset. The
// third is external and is attributed in the copy.

import data from "../data/disability.json";

const REGION_COUNT = Object.keys(data.meta.regions).length;

// Six-region mean for every cause at a given level — the same "global"
// approximation the rest of the page uses.
function globalMeans(rows) {
  const totals = {};
  rows.forEach((r) => {
    totals[r.cause] = (totals[r.cause] || 0) + r.mean;
  });
  return Object.entries(totals)
    .map(([cause, sum]) => ({ cause, mean: sum / REGION_COUNT }))
    .sort((a, b) => b.mean - a.mean);
}

// Total level-2 burden carried by each region.
function regionTotals() {
  const totals = {};
  data.level2.forEach((r) => {
    totals[r.regionName] = (totals[r.regionName] || 0) + r.mean;
  });
  return Object.entries(totals)
    .map(([region, total]) => ({ region, total }))
    .sort((a, b) => b.total - a.total);
}

// Highest- and lowest-burden region for one level-2 cause.
function spread(cause) {
  const rows = data.level2
    .filter((r) => r.cause === cause)
    .sort((a, b) => b.mean - a.mean);
  const hi = rows[0];
  const lo = rows[rows.length - 1];
  return { hi, lo, ratio: hi.mean / lo.mean };
}

const pct = (v, digits = 2) => `${(v * 100).toFixed(digits)}%`;

const topCauses = globalMeans(data.level3);
const topCause = topCauses[0];
const runnersUp = topCauses.slice(1, 5).map((c) => c.cause.toLowerCase());

const totals = regionTotals();
const lightest = totals[totals.length - 1];
const heaviest = totals[0];
const hiv = spread("HIV/AIDS and sexually transmitted infections");

const CLAIMS = [
  {
    color: "#4690cd",
    value: pct(topCause.mean),
    // "Low back pain" — the largest single cause in the dataset.
    title: topCause.cause,
    body: `The single largest cause of disability on earth is not fatal, not rare, and not infectious. Behind it come ${runnersUp
      .slice(0, 3)
      .join(", ")} and ${runnersUp[3]} — chronic conditions, every one of them. What disables people is not what kills them.`,
  },
  {
    color: "#24aca4",
    value: `${hiv.ratio.toFixed(0)}×`,
    title: "The gap a global average hides",
    body: `${hiv.hi.regionName} carries ${hiv.ratio.toFixed(0)} times the HIV and STI burden of the ${
      hiv.lo.regionName
    } — yet it also has the lowest total disability prevalence of any WHO region (${pct(
      lightest.total,
      1
    )}, against ${heaviest.region}'s ${pct(
      heaviest.total,
      1
    )}). Read the average and you would miss both facts.`,
  },
  {
    color: "#b297c7",
    value: "$200bn",
    title: "Attention does not follow burden",
    body:
      "The minimum annual shortfall in global mental-health financing — for the second-largest cause of disability worldwide. Development aid for it fell from $300m to $200m between 2018 and 2021. Figures from United for Global Mental Health.",
  },
];

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

const claimEl = (c) => `
  <div class="why-claim" style="--c:${c.color}">
    <p class="why-claim__value">${c.value}</p>
    <div class="why-claim__rule"></div>
    <h3 class="why-claim__title">${c.title}</h3>
    <p class="why-claim__body">${c.body}</p>
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
      <h2 class="section__title">The leading causes of disability are not the leading causes of death.</h2>
      <div class="section__rule"></div>

      <div class="why__claims">
        ${CLAIMS.map(claimEl).join("")}
      </div>

      <div class="why__bridge">
        <p class="why__bridge-text">
          A dataset can show the shape of the problem and where it falls hardest.
          It cannot show what living inside it is like, and it cannot fix any of it.
          The organisations below can: they hold the evidence, they are led by the
          people the numbers describe, and they work on the causes this page found
          at the top of the list.
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
