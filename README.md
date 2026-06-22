# Candidate Assessment

Welcome. This repo is a small NestJS + TypeORM (SQLite via `sql.js`) starter you'll
build on. Work through the tasks below **in order** — later tasks depend on earlier ones.

Commit as you go with meaningful messages, and don't be shy about asking questions.

## System requirements

You need very little installed — the app deliberately uses a **pure-JavaScript SQLite**
so there's nothing to compile.

**Required:**
- **Node.js 18 LTS or newer** (tested through Node 26). Includes `npm`. — https://nodejs.org
- **Git** — https://git-scm.com

**NOT required** (don't waste time installing these):
- A separate **SQLite** engine. The app's database is **SQLite running in-process via
  [`sql.js`](https://sql.js.org)** (SQLite compiled to WebAssembly, pulled in by `npm install`).
- Native build tools — no Python, no Visual Studio Build Tools, no `node-gyp`. The stack has
  zero native dependencies, which is why any modern Node version works.

**Optional, only for the standalone SQL task (#3):** if you want to run your SQL interactively,
install the **`sqlite3` CLI** (https://www.sqlite.org/download.html) or a GUI like
**DB Browser for SQLite** (https://sqlitebrowser.org). Neither is needed to run the Nest app.

## Setup

```bash
npm install
npm run start        # API on http://localhost:3000 (use start:dev for watch mode)
```

Existing routes live under `/users`.

**About the database:** it's SQLite, persisted to a file named `trainer.sqlite` in the project
root (see `src/app.module.ts`). The file is created automatically on first run and, because the
app uses `synchronize: true`, TypeORM builds the tables from the entities for you — there are no
migrations to run. The file is git-ignored, so it stays local to your machine; delete it any time
to start from a clean database.

---

## Tasks

### 1. Git — branch, commit, PR
- Create a branch `feature/your-name`.
- Make a small change, literally anything, add a comment if nothing else. Commit it with a clear message, push.
- Open a pull request against `main`.

### 2. Git — resolve a merge conflict
Two branches already exist on the remote:
- `feature/add-username-field`
- `feature/add-username-validation`

Fetch both, then **merge `feature/add-username-validation` into `feature/add-username-field`**
and resolve the conflict. Both branches changed the same file — your resolution should
**lose no one's changes**. Push the resolved branch.

```bash
git fetch origin
git switch feature/add-username-field
git merge origin/feature/add-username-validation
# resolve, commit, push
```

### 3. SQL
Using SQLite, design and query a schema by hand (a `.sql` file is fine — this task is independent of the Nest app):
- Create a `users` table and a `todos` table, with `todos` linked to `users` via a foreign key.
- Write queries for: insert, select all, select one by id, update, delete.
- Get all todos for a specific user using a `JOIN`.
- Count todos per user.

### 4. NestJS — todos CRUD API
Build a **todos** feature (the existing `users` module is a reference for structure — module
/ controller / service):
- Full CRUD with correct HTTP status codes (e.g. `201` on create, `204` on delete).
- DTOs with validation.
- Return `404` when a record isn't found.

Dependencies to add:
```bash
npm install class-validator class-transformer
```
Then enable validation globally in `src/main.ts` (`app.useGlobalPipes(new ValidationPipe(...))`).

### 5. NestJS — auth
- `POST /auth/register` and `POST /auth/login`.
- Hash passwords with **bcrypt**; issue a **JWT** on login.
- Protect the todo endpoints with a JWT guard.

Dependencies to add:
```bash
npm install bcrypt @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/bcrypt @types/passport-jwt
```

### 6. React — todos UI
A separate frontend (scaffold one however you like, e.g. Vite). It should talk to the
todos API from tasks 4–5:
- Fetch and display the list of todos.
- A form to create a new todo.
- A loading state while fetching.
- Basic error handling if the request fails.

> You'll likely need to enable CORS in the Nest app (`app.enableCors()` in `src/main.ts`)
> so the browser can call the API.

