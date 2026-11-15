# Contributing

Use Node.js 24, run `npm ci`, and start the preview with `npm run dev`.

1. Pick one issue and agree on its acceptance criteria.
2. Create a branch from current `main` (for example `feat/library-search`).
3. Keep changes within the SOP and policy library milestone.
4. Use synthetic content for development and screenshots.
5. Run `npm run check` and manually review the affected workflow.
6. Open a pull request linking the issue and request a team review.

Keep database access behind the library repository boundary. UI components should
not embed storage credentials, call privileged APIs, or decide authorization on
their own. Add tests for behavior with meaningful failure modes, such as access
control and current-version selection. Do not add tests solely to mirror markup.

The starter is a public sample-data preview. There is no login, upload API, or
production data connection yet. Never add real policy documents to this repository.

Before introducing a paid service or recurring cost, record it in the relevant
issue and obtain the organization's approval. Ownership and maintenance details
belong in the deployment/handoff work before a real pilot.
