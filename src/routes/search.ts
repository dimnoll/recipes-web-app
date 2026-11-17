import type { Hono } from "hono";
import type { MemoryRepository } from "../repository/memory-repo.js";
import { renderTemplate } from "../lib/templates.js";

export function registerSearch(app: Hono, repo: MemoryRepository): void {
  app.get("/search", (c) => {
    const docs = repo.getAllRecipes().map((recipe) => recipe.toSearchDoc());
    const recipesJson = JSON.stringify(docs).replaceAll("<", "\\u003c");
    const html = renderTemplate("search.html", {
      nav: "search",
      recipesJson,
    });
    return c.html(html);
  });
}
