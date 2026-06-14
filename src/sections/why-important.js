// "Why understanding and comparing the prevalence of causes of disability
// in various regions globally is important?"
// Five peelable sticky notes — click to peel the corner and reveal the reason.
// Placeholder copy (derived from the hero paragraph) pending Si's final text.

const REASONS = [
  {
    color: "#4690cd",
    hint: "Inform health policy",
    title: "Inform specific health policies",
    body: "Comparing how causes of disability differ between regions lets governments shape health policies around the problems that actually dominate locally, rather than a one-size-fits-all approach.",
  },
  {
    color: "#84b9e1",
    hint: "Allocate resources",
    title: "Allocate resources effectively",
    body: "When limited funding and staff are matched to the highest-burden causes in each region, every dollar and every clinician reaches more of the people who need them most.",
  },
  {
    color: "#8169ab",
    hint: "Target interventions",
    title: "Implement targeted interventions",
    body: "Region-specific patterns reveal where prevention, screening and treatment programmes should be focused — for example tackling HIV in Africa or substance use in the Americas.",
  },
  {
    color: "#24aca4",
    hint: "Share knowledge",
    title: "Share knowledge across regions",
    body: "Regions that have reduced a particular cause of disability can pass on what worked, helping others avoid repeating the same mistakes and adopt proven approaches faster.",
  },
  {
    color: "#63c1c2",
    hint: "Work together",
    title: "Encourage international collaboration",
    body: "A shared, comparable picture of disability worldwide builds the common ground that cross-border research, funding and coordinated action depend on.",
  },
];

function noteEl(r, i) {
  return `
    <article class="note" style="--note-color:${r.color}">
      <div class="note__content">
        <span class="note__num">0${i + 1}</span>
        <h3 class="note__title">${r.title}</h3>
        <p class="note__body">${r.body}</p>
      </div>
      <button class="note__cover" type="button"
        aria-expanded="false" aria-label="Reveal reason ${i + 1}: ${r.title}">
        <span class="note__num">0${i + 1}</span>
        <span class="note__hint">${r.hint}</span>
        <span class="note__peel" aria-hidden="true"></span>
      </button>
    </article>`;
}

export function renderWhyImportant() {
  const section = document.createElement("section");
  section.className = "section why";
  section.innerHTML = `
    <div class="container">
      <h2 class="section__title">Why understanding and comparing the prevalence of causes of disability in various regions globally is important?</h2>
      <div class="section__rule"></div>
      <p class="why__lead">Five reasons — tap a note to peel it open.</p>
      <div class="why__grid">
        ${REASONS.map(noteEl).join("")}
      </div>
    </div>
  `;

  section.querySelectorAll(".note").forEach((note) => {
    const cover = note.querySelector(".note__cover");
    cover.addEventListener("click", () => {
      const open = note.classList.toggle("is-open");
      cover.setAttribute("aria-expanded", String(open));
    });
  });

  return section;
}
