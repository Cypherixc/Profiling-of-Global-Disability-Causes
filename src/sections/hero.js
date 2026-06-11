// Hero section — title block + decorative concentric rings.
// Mirrors Figma node 1435:4559.

const TITLE = "Profiling of Global Disability Causes: Insights and Significance";

const BODY =
  "Comprehending the various health conditions contributing to disability " +
  "in different global regions and conducting comparisons offers valuable " +
  "insights to inform specific health policies, allocate resources effectively, " +
  "and implement targeted interventions. This process facilitates advancements " +
  "in healthcare services, facilitates the sharing of knowledge, and encourages " +
  "international collaboration to mitigate disability rates and improve overall " +
  "health of population worldwide.";

export function renderHero() {
  const section = document.createElement("section");
  section.className = "hero";

  section.innerHTML = `
    <img class="hero__rings" src="/assets/hero-rings.svg" alt="" aria-hidden="true" />
    <div class="container">
      <div class="hero__content">
        <h1 class="hero__title">${TITLE}</h1>
        <p class="hero__body">${BODY}</p>
      </div>
    </div>
  `;

  return section;
}
