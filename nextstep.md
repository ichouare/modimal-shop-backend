# Next steps — E-commerce backend (lead review)

Assessment as a milestone review. The base is workable for an MVP; several items block **production-ready** status.

---

## What's working well

- **Clear layering:** routes → middleware → controllers → Mongoose modules.
- **Validation direction:** Zod + `@asteasolutions/zod-to-openapi` (single source of truth for API + Swagger).
- **Env validation** at startup (`validateEnvFile.ts`).
- **Core flows exist:** auth, admin product CRUD, list/filter, Stripe checkout, `ShoppingCart` as order doc.
- **Modern stack:** Express 5, Mongoose 9, Zod 4, Stripe 22.

---

## Code feedback (prioritized)

### P2 — Maintainability ✅

- ~~Filename typos~~ — fixed (`authentication.controller`, `shoppingCart`, `uploadmulter`, `resetPassword` / `resetPassword.schema`).
- ~~Debug `console.log` in `GetFilterProduct`~~ — removed.
- ~~`@types/*` in `dependencies`; unused `swagger-jsdoc` types~~ — types in `devDependencies`; `@types/swagger-jsdoc` removed.

### P3 — Product / API gaps

- **Shopping cart:** model exists, no REST API.
- **Favorites:** field on user, no endpoints.
- **Orders:** no `GET /orders` or `GET /orders/:id`.
- **Stock:** not decremented on payment.
- **Uploads:** no static route to serve files.
- **Swagger:** product + stripe done; auth still missing logout, refresh, reset-password.
- **CI workflow** invalid YAML—CI doesn't run.

---

## Milestones to complete the server

### Milestone 1 — Safe MVP (1–2 weeks)

1. Fix all P0 items.
2. Implement **`GET /product/:id`** and real **pagination**.
3. Align **color** field (Zod / Mongoose / filter).
4. **Stripe webhook** → complete order; optional stock decrement.
5. Remove or secure **`order-status`** if webhook replaces it.
6. **`GET /orders`** and **`GET /orders/:id`**.
7. Finish Swagger for remaining auth routes.
8. Add **`express.d.ts`** for `req.userId` (and optionally `req.role`).

### Milestone 2 — Real e-commerce (2–3 weeks)

| Feature         | Work                                    |
| --------------- | --------------------------------------- |
| Cart API        | CRUD on `ShoppingCart` per user         |
| Categories      | Schema + admin CRUD + filter on Product |
| Favorites       | Add/remove/list `favoritsProduct`       |
| Upload pipeline | Admin upload + static or CDN URLs       |
| Email           | Forgot-password flow                    |
| Validation      | Stripe line items vs DB prices          |

### Milestone 3 — Production ready (2–4 weeks)

- Tests (Supertest/Jest): auth, products, stripe webhook mock
- CI: lint, `tsc`, optional integration tests
- Docker + `docker-compose`, `.env.example`, README
- Rate limit auth, helmet, logging
- Config: `CORS_ORIGIN`, `FRONTEND_URL`, SMTP from env
- `GET /health` (DB + optional Stripe)

### Milestone 4 — Scale (later)

Microservices / RabbitMQ from `todos.md` — **only after** Milestone 3.

---

## Top 5 next actions

1. **Stripe webhook** + stop trusting client `success`.
2. **Protect upload** + fix TS build / `req.userId` types.
3. **`GET /product/:id`** + pagination + filter fixes.
4. **Cart + orders read APIs** for frontend checkout.
5. **Tests + working CI**.

---

## Maturity snapshot

| Area                   | Status |
| ---------------------- | ------ |
| Auth (local)           | ~80%   |
| Products               | ~65%   |
| Payments               | ~40%   |
| Cart / orders UX       | ~25%   |
| Categories / favorites | ~5%    |
| Docs / DX              | ~60%   |
| Production readiness   | ~20%   |

---

## Process note

Keep `todos.md` in sync with reality (or use GitHub Issues with `P0` / `MVP` / `post-MVP` labels). See also `AGENT.md` for architecture reference.
