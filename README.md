# recipes-web-app

[English](#english) | [中文](#中文)

Recipe browser rewritten in Node.js, TypeScript, and pnpm. The server is Hono on `@hono/node-server`. Routes and data are not ported yet.

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

`GET /` currently returns the text `Recipo`. `pnpm build` compiles to `dist/`.

### Layout

```text
src/app.ts      createApp()
src/index.ts    Node HTTP listener
legacy/flask    previous Flask implementation
```

Recipe JSON and photos will stay out of git. A GitHub Release can hold them later.

---

## 中文

用 Node.js、TypeScript、pnpm 重写的食谱站，Hono 跑在 Node 上。业务路由还没搬。

Flask 复刻在 `legacy/flask`。先前的公开副本 https://github.com/dimnoll/RecipesWebApp 已归档并设为私有：提交里有个人邮箱，图片和数据库进了 git。

```text
pnpm install
pnpm dev
```
