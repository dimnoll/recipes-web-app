import type { Hono } from "hono";
import type { MemoryRepository } from "../repository/memory-repo.js";
import { getDateDigit } from "../services/date-random.js";
import { renderTemplate } from "../lib/templates.js";

export function registerHome(app: Hono, repo: MemoryRepository): void {
  app.get("/", (c) => {
    const daily = repo.getRandomRecipes(7, getDateDigit());
    const html = renderTemplate("home.html", {
      nav: "home",
      featured: daily.slice(0, 3),
      thumbs: daily.slice(3, 7),
    });
    return c.html(html);
  });
}
