import { readFileSync } from "node:fs";
import { Recipe, type RecipeRecord } from "../domain/recipe.js";
import { mulberry32, shuffleInPlace } from "../services/date-random.js";

export class MemoryRepository {
  readonly recipes: readonly Recipe[];

  constructor(recipes: readonly Recipe[]) {
    this.recipes = [...recipes].sort((a, b) => a.name.localeCompare(b.name));
  }

  static fromJsonFile(filePath: string): MemoryRepository {
    const raw = readFileSync(filePath, "utf8");
    const records = JSON.parse(raw) as RecipeRecord[];
    return new MemoryRepository(records.map((record) => new Recipe(record)));
  }

  getAllRecipes(): readonly Recipe[] {
    return this.recipes;
  }

  getRecipeById(recipeId: number): Recipe | undefined {
    return this.recipes.find((recipe) => recipe.id === recipeId);
  }

  getRandomRecipes(
    count: number,
    seed: number,
    excludedIds: readonly number[] = [],
  ): Recipe[] {
    const excluded = new Set(excludedIds);
    const pool = this.recipes.filter((recipe) => !excluded.has(recipe.id));
    return shuffleInPlace([...pool], mulberry32(seed)).slice(0, count);
  }
}
