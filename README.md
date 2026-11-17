# recipes-web-app

[English](#english) | [中文](#中文)

Recipe browser in Node.js, TypeScript, and pnpm. Hono serves the pages; Nunjucks renders the HTML5 UP Verti templates.

Flask replica (rewritten authors, binaries kept out of git): branch `legacy/flask`.  
Earlier public copy: https://github.com/dimnoll/RecipesWebApp  
That repository is archived and private. Its commits used a personal email, and it stored photos and SQLite in git.

---

## English

### Run

Node 20+ and pnpm:

```text
pnpm install
pnpm dev
```

`GET /` is the daily seven-recipe home page. `pnpm test` runs domain tests. `pnpm build` compiles to `dist/`.

### Layout

```text
src/app.ts              createApp()
src/domain/             Recipe + string helpers
src/repository/         JSON loaded into memory
src/routes/             home, recipes, search, about
templates/              Nunjucks (Verti)
public/static/          CSS, JS, fonts (no recipe photos)
data/recipes.json       Foodista text export
legacy/flask            previous Flask implementation
```

Recipe photos are not in git. Cards fall back to the Foodista image URL. A GitHub Release can hold a photo pack later.

Data licence: Foodista content is [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Verti is HTML5 UP, also CC BY 3.0. Code is MIT (`dimnoll`).

---

## 中文

用 Node.js、TypeScript、pnpm 重写的食谱站，Hono + Nunjucks，模板仍是 HTML5 UP Verti。

Flask 复刻在 `legacy/flask`。先前的公开副本 https://github.com/dimnoll/RecipesWebApp 已归档并设为私有：提交里有个人邮箱，图片和数据库进了 git。

```text
pnpm install
pnpm dev
```

食谱照片不进 git，页面回退到 Foodista 远程图。
