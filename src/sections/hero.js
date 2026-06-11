// Hero section — title block + decorative concentric rings as one composed unit.
// Mirrors Figma node 1435:4559 (Frame 121, 1327×620): text on the left,
// rings on the right, overlapping in the middle.

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
    <div class="hero__stage">
      <img class="hero__rings" src="/assets/hero-rings.svg" alt="" aria-hidden="true" />
      <div class="hero__content">
        <h1 class="hero__title">${TITLE}</h1>
        <p class="hero__body">${BODY}</p>
      </div>
    </div>
    <a class="hero__scroll" href="#main" aria-label="Scroll down">
      <span>Scroll down</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
  `;

  return section;
}
