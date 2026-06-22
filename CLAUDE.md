# trainer — deliberate training/assessment fixture (do NOT "fix" it)

This repo is an **intentional fixture**, not production code. The bad code and the merge
conflict are **deliberate and must be preserved**. Do not refactor, "fix," complete, or
"improve" it unless explicitly asked.

## What's intentionally wrong (keep it)

Planted code-review issues live in `src/users/users.controller.ts` and `src/users/users.service.ts`:

- No DTOs / no input validation
- Password handled in plaintext — **logged to console** (controller) **and stored raw** (service)
- Raw caught error returned to the client (`return error`)
- Nonsense variable names (`x`, `data2`, `tmp`)
- No explicit HTTP status codes

> Code-review task: point the reviewer at **both** `users.controller.ts` and `users.service.ts`
> (the plaintext password is logged in one and stored in the other).

## The planted merge conflict (keep branches unmerged)

`src/users/user.entity.ts` conflicts between two branches that are left **unmerged** on purpose:

- `feature/add-username-field` — plain `username` + a `displayName` column
- `feature/add-username-validation` — `username` with `@Column({ unique: true })`

**Exercise:** merge `feature/add-username-validation` **into** `feature/add-username-field` and
resolve. A correct resolution keeps **both** sides (the `unique: true` constraint **and**
`displayName`) — neither "accept ours" nor "accept theirs" alone is correct.

Note: merging either branch into `main` is a clean fast-forward (no conflict). The conflict is
**branch-vs-branch only**.

## Intentionally absent — do NOT add

This is an entry-level candidate assessment; the candidate builds these **from scratch**, so their
absence is by design (the repo is not incomplete):

- No `todos` table / SQL schema, no foreign keys
- No todos CRUD API
- No auth (bcrypt / JWT / guards)
- No React frontend

The candidate's build tasks use a "todos" domain while this repo is "users" — that mismatch is
known and accepted as cosmetic.

## Stack notes

- NestJS 10 + TypeORM. SQLite via **sql.js** (pure-JS, no native build required). `synchronize: true`.
- `npm install`, then `npm run start` → API on `http://localhost:3000`, routes under `/users`.
- Remote: `github.com/vladimir-poljakovic-dev/trainer` (all three branches pushed).
