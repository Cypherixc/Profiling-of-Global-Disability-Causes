import "./style.css";
import { renderHero } from "./sections/hero.js";

const app = document.querySelector("#app");

app.append(renderHero());
