import "./style.css";
import { renderHero } from "./sections/hero.js";
import { renderRegionShare } from "./sections/region-share.js";
import { renderLevel2Bubbles } from "./sections/level2-bubbles.js";

const app = document.querySelector("#app");

app.append(renderHero());

const main = document.createElement("div");
main.id = "main";
main.append(renderRegionShare());
main.append(renderLevel2Bubbles());
app.append(main);
