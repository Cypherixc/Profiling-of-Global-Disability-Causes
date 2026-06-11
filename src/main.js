import "./style.css";
import { renderHero } from "./sections/hero.js";
import { renderRegionShare } from "./sections/region-share.js";

const app = document.querySelector("#app");

app.append(renderHero());

const main = document.createElement("div");
main.id = "main";
main.append(renderRegionShare());
app.append(main);
