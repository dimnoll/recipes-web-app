import type { Hono } from "hono";
import { renderTemplate } from "../lib/templates.js";

export function registerAbout(app: Hono): void {
  app.get("/about", (c) => {
    const html = renderTemplate("about.html", { nav: "about" });
    return c.html(html);
  });
}
