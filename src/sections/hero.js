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
      <svg class="hero__rings" viewBox="0 0 670 620" fill="none" aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg">
        <circle class="hr hr--1" cx="259.159" cy="310.309" r="181.309" stroke="url(#hr-p0)" stroke-width="10"/>
        <circle class="hr hr--2" cx="311.529" cy="309.936" r="129.054" stroke="url(#hr-p1)" stroke-width="10"/>
        <circle class="hr hr--3" cx="215.625" cy="310.175" r="163.35" stroke="url(#hr-p2)" stroke-width="10"/>
        <circle class="hr hr--4" cx="149.119" cy="309.936" r="96.8443" stroke="url(#hr-p3)" stroke-width="10"/>
        <path class="hr hr--5" d="M372.561 5C533.408 5.00002 664.173 141.343 664.173 310C664.173 478.657 533.408 615 372.561 615C211.715 615 80.95 478.657 80.95 310C80.95 141.343 211.715 5 372.561 5Z" stroke="url(#hr-p4)" stroke-width="10"/>
        <path class="hr hr--6" d="M271.469 31.35C418.43 31.35 537.937 155.911 537.938 310.033C537.938 464.155 418.43 588.716 271.469 588.716C124.507 588.716 5 464.155 5 310.033C5.00019 155.911 124.507 31.3501 271.469 31.35Z" stroke="url(#hr-p5)" stroke-width="10"/>
        <defs>
          <linearGradient id="hr-p0" x1="259.159" y1="124" x2="259.159" y2="496.618" gradientUnits="userSpaceOnUse">
            <stop stop-color="#84B9E1" stop-opacity="0"/><stop offset="1" stop-color="#84B9E1"/>
          </linearGradient>
          <linearGradient id="hr-p1" x1="311.529" y1="175.881" x2="311.529" y2="443.99" gradientUnits="userSpaceOnUse">
            <stop stop-color="#84B9E1" stop-opacity="0"/><stop offset="1" stop-color="#4690CD"/>
          </linearGradient>
          <linearGradient id="hr-p2" x1="215.625" y1="141.825" x2="215.625" y2="478.525" gradientUnits="userSpaceOnUse">
            <stop stop-color="#B297C7"/><stop offset="1" stop-color="#B297C7" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="hr-p3" x1="149.119" y1="208.091" x2="149.119" y2="411.78" gradientUnits="userSpaceOnUse">
            <stop stop-color="#8C6CC6"/><stop offset="1" stop-color="#8C6CC6" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="hr-p4" x1="372.561" y1="0" x2="372.561" y2="620" gradientUnits="userSpaceOnUse">
            <stop stop-color="#24ACA4"/><stop offset="1" stop-color="#24ACA4" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="hr-p5" x1="271.469" y1="26.35" x2="271.469" y2="593.716" gradientUnits="userSpaceOnUse">
            <stop stop-color="#63C1C2"/><stop offset="1" stop-color="#63C1C2" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg>
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
