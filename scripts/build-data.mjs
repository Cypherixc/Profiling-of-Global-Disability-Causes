// Converts the WHO DisabilityPrevalence workbook into web-ready JSON.
// Run with: npm run build:data
import XLSX from "xlsx";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wb = XLSX.read(readFileSync(resolve(root, "data/DisabilityPrevalence.xlsx")));
const sheet = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name]);

const REGION_NAMES = {
  AFR: "Africa",
  AMR: "Americas",
  EMR: "Eastern Mediterranean",
  EUR: "Europe",
  SEAR: "South-East Asia",
  WPR: "Western Pacific",
};

const rows = sheet("regions");

// Default slice matching the published visualization:
// both sexes (sex_id 3), all ages (22), "moderate and severe", percentage metric (3).
const isBaseSlice = (r) =>
  r.sex_id === 3 && r.age_group_id === 22 && r.severity === "moderate and severe";

const pct = rows.filter((r) => r.metric_id === 3 && isBaseSlice(r));

const round = (n, d = 4) => (n == null ? null : Number(n.toFixed(d)));

const mapRow = (r) => ({
  region: r.Region,
  regionName: REGION_NAMES[r.Region],
  cause: r.cause_name,
  level: r.level,
  level2: r["level 2 cause"],
  mean: round(r.mean, 6),
  lower: round(r.lower, 6),
  upper: round(r.upper, 6),
});

const level2 = pct.filter((r) => r.level === 2).map(mapRow);
const level3 = pct.filter((r) => r.level === 3).map(mapRow);

// Top N level-3 causes per region (by mean), for the ranked bubble matrix.
const topLevel3 = {};
for (const code of Object.keys(REGION_NAMES)) {
  topLevel3[code] = level3
    .filter((r) => r.region === code)
    .sort((a, b) => b.mean - a.mean)
    .slice(0, 5)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

const out = {
  meta: {
    source: "WHO Disability Prevalence Dataset",
    year: 2021,
    metric: "Percentage of global disability population",
    slice: "both sexes, all ages, moderate and severe",
    regions: REGION_NAMES,
    generatedAt: new Date().toISOString(),
  },
  level2,
  level3,
  topLevel3,
};

mkdirSync(resolve(root, "src/data"), { recursive: true });
writeFileSync(resolve(root, "src/data/disability.json"), JSON.stringify(out));
console.log(
  `Wrote src/data/disability.json — level2: ${level2.length}, level3: ${level3.length}`
);
