// Metadata for the level-3 conditions shown in the Top-5 detail view.
// Icons are minimalist line placeholders (currentColor) — to be swapped for
// final illustrations later. Descriptions are short, factual, WHO-aligned
// and pending Si's review.

const icon = (inner) =>
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const CONDITIONS = {
  "Low back pain": {
    icon: icon(`
      <path d="M24 6c-2 0-3 1.4-3 3s1 3 3 3 3-1.4 3-3-1-3-3-3Z"/>
      <path d="M24 12v9m0 0-4 8m4-8 4 8"/>
      <path d="M19 17h10"/>
      <path d="M34 20l3-1m-3 4l3 1" opacity="0.7"/>`),
    desc: "The single leading cause of disability worldwide. Pain or stiffness in the lower spine — often with no specific identifiable cause — that can become long-lasting and limit everyday movement.",
  },
  Migraine: {
    icon: icon(`
      <path d="M30 30a10 10 0 1 0-12 0v6h12v-6Z"/>
      <path d="M21 22l3-3 2 4 3-4"/>
      <path d="M37 16l3-2m-3 7h4m-4 7l3 2" opacity="0.7"/>`),
    desc: "A recurring neurological disorder marked by moderate-to-severe headache, often with nausea and sensitivity to light and sound. Attacks can last from hours to days and disrupt work and daily life.",
  },
  "Major depressive disorder": {
    icon: icon(`
      <circle cx="24" cy="28" r="11"/>
      <path d="M19 30c2.5 2.5 7.5 2.5 10 0" transform="rotate(180 24 30)"/>
      <circle cx="20" cy="25" r="0.6" fill="currentColor"/>
      <circle cx="28" cy="25" r="0.6" fill="currentColor"/>
      <path d="M30 9c3 0 5 2 5 4.5M30 9c-2.5 0-4 1.5-4 3.5m4 3v3m4-3.5v2m-8-1v2" opacity="0.7"/>`),
    desc: "A common mental disorder of persistent low mood, loss of interest and reduced functioning. It is a leading contributor to disability and, when severe, raises the risk of suicide.",
  },
  "COVID-19": {
    icon: icon(`
      <circle cx="24" cy="24" r="9"/>
      <circle cx="24" cy="24" r="2" fill="currentColor"/>
      <path d="M24 15V9m0 30v-6m9-9h6M9 24h6m6.4-6.4-4.2-4.2m17 17-4.2-4.2m0-8.6 4.2-4.2m-17 17-4.2 4.2"/>
      <circle cx="24" cy="8" r="1.4" fill="currentColor"/><circle cx="24" cy="40" r="1.4" fill="currentColor"/>
      <circle cx="40" cy="24" r="1.4" fill="currentColor"/><circle cx="8" cy="24" r="1.4" fill="currentColor"/>`),
    desc: "Illness caused by the SARS-CoV-2 virus. Beyond the acute infection, lasting symptoms ('long COVID') such as fatigue and breathlessness can cause ongoing disability.",
  },
  "Anxiety disorders": {
    icon: icon(`
      <path d="M30 30a10 10 0 1 0-12 0v6h12v-6Z"/>
      <path d="M24 28c0-2 2.5-2 2.5-4S24 20 24 18s2.5-1.5 2.5-3.5"/>`),
    desc: "A group of mental disorders defined by excessive fear or worry. Among the most common mental health conditions, they can substantially impair everyday functioning.",
  },
  "Other musculoskeletal disorders": {
    icon: icon(`
      <path d="M16 16c-2-2-5 1-3 3l8 8c-2 2 1 5 3 3"/>
      <path d="M32 32c2 2 5-1 3-3l-8-8c2-2-1-5-3-3"/>
      <path d="M14 14c-1.5-1.5-1.5-3 0-3m3 0c1.5 0 1.5 1.5 0 3M34 34c1.5 1.5 1.5 3 0 3m-3 0c-1.5 0-1.5-1.5 0-3" opacity="0.85"/>`),
    desc: "Conditions of the muscles, joints, bones and connective tissue not classified elsewhere — such as widespread joint or soft-tissue pain — that limit mobility and dexterity.",
  },
  injuries: {
    icon: icon(`
      <rect x="16" y="16" width="16" height="16" rx="5" transform="rotate(45 24 24)"/>
      <circle cx="24" cy="24" r="3.5"/>
      <circle cx="21" cy="24" r="0.6" fill="currentColor"/><circle cx="27" cy="24" r="0.6" fill="currentColor"/>
      <circle cx="24" cy="21" r="0.6" fill="currentColor"/><circle cx="24" cy="27" r="0.6" fill="currentColor"/>`),
    desc: "Physical harm from accidents, falls, road traffic or violence. Lasting impairments such as limb loss or reduced mobility can result in long-term disability.",
  },
  "Chronic obstructive pulmonary disease": {
    icon: icon(`
      <path d="M24 10v9"/>
      <path d="M24 19c0 0-1 2-4 2-4 0-7 3-7 9 0 5 2 8 5 8 3 0 3-3 3-6v-4"/>
      <path d="M24 19c0 0 1 2 4 2 4 0 7 3 7 9 0 5-2 8-5 8-3 0-3-3-3-6v-4"/>
      <path d="M20 12h8" opacity="0.7"/>`),
    desc: "A progressive lung disease (including emphysema and chronic bronchitis) that obstructs airflow and makes breathing difficult, strongly linked to smoking and air pollution.",
  },
};

export const conditionInfo = (name) =>
  CONDITIONS[name] || { icon: "", desc: "" };
