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
      <div class="hero__credit">
        <img class="hero__credit-who" src="/assets/who-logo.svg"
          alt="World Health Organization" />
        <span class="hero__credit-sep" aria-hidden="true"></span>
        <img class="vfsg vfsg--on-dark" src="/assets/vfsg-on-dark.png"
          alt="Project and visualization by Viz for Social Good" />
        <img class="vfsg vfsg--on-light" src="/assets/vfsg-on-light.png"
          alt="Project and visualization by Viz for Social Good" />
      </div>
      <svg class="hero__rings" viewBox="0 0 670 620" fill="none" aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg">
        <!-- All true circles, so each spins about its own centre without
             distortion or sweeping outside its footprint. -->
        <circle class="hr hr--1" cx="259" cy="310" r="181" stroke="url(#hr-p0)" stroke-width="10"/>
        <circle class="hr hr--2" cx="311" cy="310" r="129" stroke="url(#hr-p1)" stroke-width="10"/>
        <circle class="hr hr--3" cx="215" cy="310" r="163" stroke="url(#hr-p2)" stroke-width="10"/>
        <circle class="hr hr--4" cx="149" cy="310" r="97" stroke="url(#hr-p3)" stroke-width="10"/>
        <circle class="hr hr--5" cx="372" cy="310" r="290" stroke="url(#hr-p4)" stroke-width="10"/>
        <circle class="hr hr--6" cx="275" cy="310" r="263" stroke="url(#hr-p5)" stroke-width="10"/>
        <defs>
          <linearGradient id="hr-p0" x1="259" y1="129" x2="259" y2="491" gradientUnits="userSpaceOnUse">
            <stop stop-color="#84B9E1" stop-opacity="0"/><stop offset="1" stop-color="#84B9E1"/>
          </linearGradient>
          <linearGradient id="hr-p1" x1="311" y1="181" x2="311" y2="439" gradientUnits="userSpaceOnUse">
            <stop stop-color="#84B9E1" stop-opacity="0"/><stop offset="1" stop-color="#4690CD"/>
          </linearGradient>
          <linearGradient id="hr-p2" x1="215" y1="147" x2="215" y2="473" gradientUnits="userSpaceOnUse">
            <stop stop-color="#B297C7"/><stop offset="1" stop-color="#B297C7" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="hr-p3" x1="149" y1="213" x2="149" y2="407" gradientUnits="userSpaceOnUse">
            <stop stop-color="#8C6CC6"/><stop offset="1" stop-color="#8C6CC6" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="hr-p4" x1="372" y1="20" x2="372" y2="600" gradientUnits="userSpaceOnUse">
            <stop stop-color="#24ACA4"/><stop offset="1" stop-color="#24ACA4" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="hr-p5" x1="275" y1="47" x2="275" y2="573" gradientUnits="userSpaceOnUse">
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
