import type { Hono } from "hono";
import type { MemoryRepository } from "../repository/memory-repo.js";
import { paginate } from "../lib/pagination.js";
import { renderTemplate } from "../lib/templates.js";
import { getDateDigit } from "../services/date-random.js";

export function registerRecipes(app: Hono, repo: MemoryRepository): void {
  app.get("/recipes", (c) => {
    const page = Number.parseInt(c.req.query("page") ?? "1", 10);
    const { slice, pagination } = paginate(repo.getAllRecipes(), Number.isFinite(page) ? page : 1, 12, (n) =>
      `/recipes?page=${n}`,
    );
    const html = renderTemplate("recipes.html", {
      nav: "recipes",
      recipes: slice,
      pagination,
    });
    return c.html(html);
  });

  app.get("/recipes/:id", (c) => {
    const recipeId = Number.parseInt(c.req.param("id"), 10);
    const recipe = repo.getRecipeById(recipeId);
    if (recipe === undefined) {
      return c.text("Recipe not found", 404);
    }
    const others = repo.getRandomRecipes(6, getDateDigit() + recipeId, [recipeId]);
    const html = renderTemplate("recipe-detail.html", {
      nav: "recipes",
      recipe,
      others,
    });
    return c.html(html);
  });
}
