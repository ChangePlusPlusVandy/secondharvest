# Library architecture

The scaffold has one feature: an SOP and policy library. Routes use a typed
repository interface so the sample adapter can later be replaced without moving
database calls into presentation components.

## Current flow

The `/library` server component reads `q` and `department` from the URL, asks the
repository for published entries, and renders the result. GET forms make searches
shareable without client-side state. `/library/[id]` requests one published entry;
unknown, draft, and archived sample IDs return 404. The root route redirects to
the library.

`repository.ts` imports `server-only` and selects the demo adapter. The fixtures
are synthetic and public. Status filtering is a product behavior, not a security
boundary. This adapter provides no authentication or real persistence.

## Next integration

Implement a Supabase adapter behind `LibraryRepository` after the team agrees on
the schema, staff membership, and document permissions. Database and storage
policies must enforce access independently of hidden UI controls. If an adapter
needs the current user's identity, establish it in the request context; never keep
a per-user session in a process-wide singleton.

Plan separate tables for agreed document metadata and file revisions, and use
private storage for uploaded files. Link records should validate their resource
URL. Keep the effective/current revision rule consistent across list, detail,
search, and downloads. Confirm approval and archive behavior in discovery before
building a workflow.

Public Supabase keys are not secrets and do not replace row-level policies.
Privileged keys must never be exposed to browser code. No Supabase SDK or service
credentials are needed in this sample-only scaffold.

## Search and lifecycle decisions

Current sample search is a case-insensitive substring match across title, summary,
document type, tags, and department name. It combines with the department filter.
A production adapter will need bounded queries and agreed search coverage.
Searching inside uploaded files requires extraction/indexing work and is not
implicitly part of this scaffold.

Version history, approvals, and exact role names remain proposed implementation
decisions. They are not finalized client requirements. The first release's scope
and acceptance scenarios should be recorded in the discovery issue.

## Explicitly deferred

Login and invitation flows; user/role administration; database/storage provisioning;
upload validation; file viewing/downloading; metadata editing; publishing/archive
mutations; audit history; error monitoring; and deployment/handoff. No additional
intranet modules are included.
