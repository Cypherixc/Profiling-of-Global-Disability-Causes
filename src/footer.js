// Page footer: partner logos + a conventional data-viz credit line.
// The VFSG lockup ships in two versions; CSS shows the one that suits the theme.

export function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container site-footer__inner">
      <div class="site-footer__logos">
        <img class="site-footer__who" src="/assets/who-logo.svg"
          alt="World Health Organization" />
        <img class="vfsg vfsg--on-dark" src="/assets/vfsg-on-dark.png"
          alt="Project and visualization by Viz for Social Good" />
        <img class="vfsg vfsg--on-light" src="/assets/vfsg-on-light.png"
          alt="Project and visualization by Viz for Social Good" />
      </div>
      <p class="site-footer__credit">
        Design &amp; visualization by Si Zheng. Created for Viz for Social Good in
        partnership with the World Health Organization.
        <span class="site-footer__source">Data source: WHO Disability Prevalence Dataset.</span>
      </p>
    </div>`;
  return footer;
}
