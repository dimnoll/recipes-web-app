import path from "node:path";
import { fileURLToPath } from "node:url";
import nunjucks from "nunjucks";

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const env = nunjucks.configure(path.join(repoRoot, "templates"), {
  autoescape: true,
  noCache: true,
});

env.addFilter("urlencode", (value: unknown) => encodeURIComponent(String(value ?? "")));

export function renderTemplate(name: string, context: Record<string, unknown>): string {
  return env.render(name, context);
}

export function defaultDataPath(): string {
  return path.join(repoRoot, "data", "recipes.json");
}
