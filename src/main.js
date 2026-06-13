import "./style.css";
import { renderHero } from "./sections/hero.js";
import { renderRegionShare } from "./sections/region-share.js";
import { renderLevel2Bubbles } from "./sections/level2-bubbles.js";
import { renderLevel3Top5 } from "./sections/level3-top5.js";
import { renderDisparities } from "./sections/disparities.js";

const app = document.querySelector("#app");

app.append(renderHero());

const main = document.createElement("div");
main.id = "main";
main.append(renderRegionShare());
main.append(renderLevel2Bubbles());
main.append(renderLevel3Top5());
main.append(renderDisparities());
app.append(main);
