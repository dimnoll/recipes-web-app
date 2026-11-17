import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { defaultDataPath } from "./lib/templates.js";
import { MemoryRepository } from "./repository/memory-repo.js";
import { registerAbout } from "./routes/about.js";
import { registerHome } from "./routes/home.js";
import { registerRecipes } from "./routes/recipes.js";
import { registerSearch } from "./routes/search.js";

export function createApp(dataPath = defaultDataPath()): Hono {
  const app = new Hono();
  const repo = MemoryRepository.fromJsonFile(dataPath);

  app.use("/static/*", serveStatic({ root: "./public" }));
  registerHome(app, repo);
  registerRecipes(app, repo);
  registerSearch(app, repo);
  registerAbout(app);
  return app;
}
