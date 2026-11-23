# SecondHarvestPlatforms

## SOP and policy library starter

First module for Second Harvest Food Bank of Northeast Tennessee. This is a
development scaffold with synthetic documents, not a production intranet.

### Run locally

Use Node.js 24 (`nvm use` if you use nvm), then:

```sh
npm ci
npm run dev
```

Open <http://localhost:3000/library>. No account, API key, or environment file is
needed. `.env.example` reserves names for a future Supabase connection; setting
them does not connect a backend yet.

### Included

- Next.js App Router, React, TypeScript, and Tailwind CSS.
- Library list, metadata search, department filtering, and entry detail routes.
- Example SOP, policy, and external-resource entries, clearly marked as samples.
- Async repository interface with an in-memory adapter that serves published
  fixtures only. Drafts and archived fixtures return no public detail record.
- Vitest behavior tests, ESLint, type checking, production build, and a CI workflow.

### Still to build

Authentication, staff membership, server/database permissions, Supabase migrations,
private storage, document upload/download, editing, revision history, and deployment
are follow-up tickets. No real policy files or staff data may be added until those
controls are implemented. The demo's status filter is not an authorization system.
Search currently matches metadata only; it does not extract text from PDF or Word files.

### Structure

| Path | Purpose |
| --- | --- |
| `src/app/library/page.tsx` | Searchable sample library |
| `src/app/library/[id]/page.tsx` | Published sample entry details |
| `src/features/library/types.ts` | Domain types and repository contract |
| `src/features/library/repository.ts` | Server-only adapter selection |
| `src/features/library/demo-repository.ts` | Sample lookup and filtering |
| `src/features/library/demo-data.ts` | Synthetic fixtures |
| `tests/library.test.ts` | Visibility and filtering behavior |
| `docs/architecture.md` | Boundaries and planned integration |
| `docs/backlog.md` | Prioritized implementation tickets |

### Verify changes

```sh
npm run check
```

This runs lint, type generation/checking, tests, and the production build. To run
the built app, use `npm start`. CI runs on pull requests and pushes to `main` or
`codex/**`; it does not deploy anything. See [CONTRIBUTING.md](CONTRIBUTING.md).

### Scope

This milestone covers the centralized SOP/policy library and related resources.
Inspections, recurring tasks, corrective actions, training tracking, and dashboards
are later modules. Confirm pilot departments, permissions, required metadata,
version behavior, and searchable fields with the client before implementation.

Framework references: [Next.js setup](https://nextjs.org/docs/app/getting-started/installation),
[Vitest with Next.js](https://nextjs.org/docs/app/guides/testing/vitest), and
[Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys).
