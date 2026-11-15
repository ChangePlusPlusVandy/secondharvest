# SOP library implementation backlog

The first milestone is the SOP and policy library. All twelve tickets below are published in GitHub; GitHub is authoritative for status and assignees.

Start with #1 (agree the scope) and #2 (adopt the starter), then #3 (backend setup). Each ticket lists its prerequisites. Development work can begin against the sample repository while the client resolves scope decisions.

## [#1: [P0] Agree the SOP and policy library MVP with the client](https://github.com/ChangePlusPlusVandy/secondharvest/issues/1)

Ticket key: `scope`

### Goal
Confirm the first release of the centralized SOP and policy library before implementing client-specific behavior.

### Scope
The MOU calls for current procedures and related resources, organized by department or functional area, with searchable access. This milestone covers that library only. Inspections, training tracking, corrective actions, recurring tasks, and dashboards belong to later milestones.

### Acceptance criteria
- [ ] Record the pilot departments, document types, sample documents, and who owns each department's content.
- [ ] Agree who may read, create, update, publish, or archive documents. Map the client's roles to the library permissions.
- [ ] Agree whether documents are uploaded files, external links, or both; identify the initial permitted file formats and upload size limit.
- [ ] Define whether MVP search covers titles/descriptions/tags or document contents. Treat PDF/Word text extraction as additional work unless explicitly included.
- [ ] Confirm the minimum document fields and what makes a version current; agree whether an approval step is required. Version history and a publishing workflow are proposed implementation choices, not assumed final requirements.
- [ ] Record pilot acceptance scenarios and identify the client reviewer who can accept the result.
- [ ] Save the agreed scope and open decisions in the repository without confidential documents or personal data.

### Priority
P0 — blocks client-specific implementation.

## [#2: [P0] Complete developer setup and validate the starter CI workflow](https://github.com/ChangePlusPlusVandy/secondharvest/issues/2)

Ticket key: `bootstrap`

### Goal
Give every contributor a reproducible local setup and a reliable check before merging.

### Scope
The starter PR provides the Next.js App Router, TypeScript, Tailwind, Vitest, sample-data library screens, and a repository boundary. It is boilerplate, not a connected production library. This ticket covers adoption and verification of that scaffold.

### Acceptance criteria
- [ ] Merge or otherwise agree the starter PR as the team's baseline.
- [ ] Verify a fresh checkout can install dependencies with the committed lockfile and run the documented development command.
- [ ] Verify lint, type checks, meaningful existing tests, and the production build run in CI on pull requests.
- [ ] Document the supported Node version, environment setup, directory structure, and normal branch/PR workflow.
- [ ] Confirm a second contributor can follow the README without undocumented setup steps.
- [ ] Agree the review/merge process and configure repository checks if the maintainers choose to require them.

### Priority
P0 — foundation for all implementation tickets.

## [#3: [P0] Provision development Supabase and document environment configuration](https://github.com/ChangePlusPlusVandy/secondharvest/issues/3)

Ticket key: `supabase`

Depends on: [#1](https://github.com/ChangePlusPlusVandy/secondharvest/issues/1), [#2](https://github.com/ChangePlusPlusVandy/secondharvest/issues/2)

### Goal
Prepare an organization-controlled backend for the library.

### Scope
Provision a development environment and decide the production ownership model. Use synthetic or de-identified fixtures for development. Obtain the client's written approval before incurring a new recurring cost on its behalf.

### Acceptance criteria
- [ ] Confirm project ownership, authorized maintainers, region, and the separation between development and production.
- [ ] Create/configure the development Supabase project and document how contributors obtain approved access.
- [ ] Add the required variable names to the example environment file without credentials.
- [ ] Store local and hosted credentials through the approved environment/secrets mechanism; keep privileged keys server-only.
- [ ] Verify the application can connect to the development backend using the intended client/server boundary.
- [ ] Document how to reset the development backend and what steps production provisioning will require.

### Priority
P0 — backend foundation.

## [#4: [P0] Add migrations and synthetic seed data for library records](https://github.com/ChangePlusPlusVandy/secondharvest/issues/4)

Ticket key: `schema`

Depends on: [#1](https://github.com/ChangePlusPlusVandy/secondharvest/issues/1), [#3](https://github.com/ChangePlusPlusVandy/secondharvest/issues/3)

### Goal
Replace the sample-only domain model with a reproducible database structure.

### Scope
Translate the agreed library fields into migrations for departments, library entries, resource metadata, user access, and the minimal revision/audit information the agreed scope needs. Preserve the scaffold's repository boundary so UI components do not depend on database details.

### Acceptance criteria
- [ ] Add committed migrations with explicit keys, relationships, constraints, and indexes for the agreed browse/search queries.
- [ ] Distinguish uploaded-file resources from linked resources and reject records that have an invalid combination of resource fields.
- [ ] Define how current and archived content is represented, consistent with the discovery decision.
- [ ] Add synthetic seeds for at least two departments and representative SOP/policy entries.
- [ ] Verify migrations and seeds run from an empty development database.
- [ ] Document the schema and any unresolved decisions. No real client files or employee data belong in seeds.

### Priority
P0 — data foundation.

## [#5: [P0] Add staff sign-in, sign-out, and session handling](https://github.com/ChangePlusPlusVandy/secondharvest/issues/5)

Ticket key: `auth`

Depends on: [#1](https://github.com/ChangePlusPlusVandy/secondharvest/issues/1), [#3](https://github.com/ChangePlusPlusVandy/secondharvest/issues/3), [#2](https://github.com/ChangePlusPlusVandy/secondharvest/issues/2)

### Goal
Require authenticated staff access before the app handles real internal documents.

### Scope
Implement the identity provider and account-provisioning method agreed during discovery. Microsoft sign-in is an option to confirm with the client, not an assumption that tenant access is already available.

### Acceptance criteria
- [ ] Implement sign-in and sign-out with an approved account-provisioning flow.
- [ ] Restrict membership to approved staff accounts; an arbitrary successful sign-in must not grant library access.
- [ ] Establish and validate sessions on the server for protected routes and operations.
- [ ] Handle expired sessions and failed sign-in attempts with a usable recovery path.
- [ ] Verify unauthenticated requests cannot read real library records or file-download endpoints.
- [ ] Document local testing accounts and provider configuration without recording credentials.

### Priority
P0 — prerequisite for private client data.

## [#6: [P0] Enforce library permissions in database and storage policies](https://github.com/ChangePlusPlusVandy/secondharvest/issues/6)

Ticket key: `permissions`

Depends on: [#1](https://github.com/ChangePlusPlusVandy/secondharvest/issues/1), [#4](https://github.com/ChangePlusPlusVandy/secondharvest/issues/4), [#5](https://github.com/ChangePlusPlusVandy/secondharvest/issues/5)

### Goal
Enforce the agreed read/edit/admin permissions when requests bypass the UI.

### Scope
Use the confirmed client roles and department visibility rules. UI visibility is a convenience; database and storage authorization must independently protect the data.

### Acceptance criteria
- [ ] Add version-controlled authorization policies for library records, revisions, and department access.
- [ ] Ensure a normal user cannot assign themselves a more privileged role or change another user's access.
- [ ] Protect uploaded objects and prevent a public bucket or guessed object path from bypassing staff permissions.
- [ ] Make server-side operations check membership and authorization before performing privileged work.
- [ ] Add meaningful integration coverage for an authorized reader, an editor/admin, an unauthorized user, and an unauthenticated request.
- [ ] Document the permission matrix and how authorized administrators provision or revoke access.

### Priority
P0 — required before uploading client documents.

## [#7: [P1] Implement private document upload, viewing, and download](https://github.com/ChangePlusPlusVandy/secondharvest/issues/7)

Ticket key: `files`

Depends on: [#4](https://github.com/ChangePlusPlusVandy/secondharvest/issues/4), [#5](https://github.com/ChangePlusPlusVandy/secondharvest/issues/5), [#6](https://github.com/ChangePlusPlusVandy/secondharvest/issues/6)

### Goal
Let authorized staff attach SOP/policy files and let permitted readers retrieve them.

### Scope
Implement the first agreed file formats and maximum size. In-browser preview is only required for formats supported by the chosen viewer; provide a download fallback.

### Acceptance criteria
- [ ] Validate allowed file type and size on the server, use unique storage keys, and preserve a display filename separately.
- [ ] Store uploads in private storage and connect each successful upload to its library metadata.
- [ ] Make upload failures recoverable without publishing a broken library entry; clean up or track orphaned objects.
- [ ] Authorize view/download requests and use controlled access such as short-lived signed URLs.
- [ ] Show an understandable error for missing files or denied access.
- [ ] Verify authorized upload/download, unauthorized attempts, invalid files, and partial failure handling.

### Priority
P1 — core library functionality.

## [#8: [P1] Build library entry forms and linked-resource support](https://github.com/ChangePlusPlusVandy/secondharvest/issues/8)

Ticket key: `metadata`

Depends on: [#4](https://github.com/ChangePlusPlusVandy/secondharvest/issues/4), [#5](https://github.com/ChangePlusPlusVandy/secondharvest/issues/5), [#6](https://github.com/ChangePlusPlusVandy/secondharvest/issues/6), [#7](https://github.com/ChangePlusPlusVandy/secondharvest/issues/7)

### Goal
Allow approved editors to maintain useful metadata and related resources.

### Scope
Build create/edit forms for the fields agreed in discovery, such as title, summary, department, document type, and tags. Support both uploaded files and external resources if both are in the agreed MVP.

### Acceptance criteria
- [ ] Create and edit an entry using validated server-side operations and the existing repository boundary.
- [ ] Provide required-field validation and preserve user input when a submission fails.
- [ ] Associate a file through the upload flow or save a validated external resource URL; permit only approved URL schemes such as HTTPS.
- [ ] Clearly identify external resources to readers. Do not imply the app controls access on an external site.
- [ ] Confirm readers cannot modify entries through either the UI or direct requests.
- [ ] Record the editor and update time for successful changes.
- [ ] Verify create/edit and invalid-input paths with representative synthetic entries.

### Priority
P1 — content administration.

## [#9: [P1] Implement agreed current-version and archive behavior](https://github.com/ChangePlusPlusVandy/secondharvest/issues/9)

Ticket key: `versions`

Depends on: [#1](https://github.com/ChangePlusPlusVandy/secondharvest/issues/1), [#4](https://github.com/ChangePlusPlusVandy/secondharvest/issues/4), [#6](https://github.com/ChangePlusPlusVandy/secondharvest/issues/6), [#8](https://github.com/ChangePlusPlusVandy/secondharvest/issues/8)

### Goal
Make it clear which procedure is current and prevent accidental loss of prior content.

### Scope
Implement the version/archive decisions made in discovery. Start with the smallest agreed workflow; do not add multistage approvals unless the client explicitly requests them for this milestone.

### Acceptance criteria
- [ ] Replace a document through the agreed revision flow without silently overwriting the prior file.
- [ ] Enforce one current revision per entry, including concurrent update handling.
- [ ] Display the current version/effective information selected in discovery and retain the agreed history.
- [ ] Allow authorized staff to archive an entry and remove it from the ordinary current-document search.
- [ ] Record who changed the current version or archived an entry and when.
- [ ] Verify permission failures, duplicate-current prevention, and retrieval of any retained history according to the agreed access rules.

### Priority
P1 — document lifecycle; final details depend on discovery.

## [#10: [P1] Connect library browsing, department filters, search, and detail pages](https://github.com/ChangePlusPlusVandy/secondharvest/issues/10)

Ticket key: `browse`

Depends on: [#4](https://github.com/ChangePlusPlusVandy/secondharvest/issues/4), [#5](https://github.com/ChangePlusPlusVandy/secondharvest/issues/5), [#6](https://github.com/ChangePlusPlusVandy/secondharvest/issues/6), [#8](https://github.com/ChangePlusPlusVandy/secondharvest/issues/8), [#9](https://github.com/ChangePlusPlusVandy/secondharvest/issues/9)

### Goal
Help staff quickly find the current procedure they need.

### Scope
Replace the scaffold's example-data repository with real authorized data. Keep the sample-data mode for development only. Implement the search coverage agreed in discovery and clearly document what is searchable.

### Acceptance criteria
- [ ] Browse current library entries and filter by department or functional area.
- [ ] Search the agreed fields and combine search with filters predictably.
- [ ] Open an entry's details and its authorized file or linked resource.
- [ ] Handle loading, empty results, permission failures, and backend errors.
- [ ] Add bounded queries/pagination so the UI does not need to load every document.
- [ ] Preserve usable labels, keyboard interaction, readable mobile layouts, and a clear reset-filters action.
- [ ] Verify archived or unauthorized entries do not leak through search, counts, or detail routes.

### Priority
P1 — main reader workflow.

## [#11: [P1] Run SOP-library workflow testing and a controlled staff pilot](https://github.com/ChangePlusPlusVandy/secondharvest/issues/11)

Ticket key: `pilot`

Depends on: [#7](https://github.com/ChangePlusPlusVandy/secondharvest/issues/7), [#8](https://github.com/ChangePlusPlusVandy/secondharvest/issues/8), [#9](https://github.com/ChangePlusPlusVandy/secondharvest/issues/9), [#10](https://github.com/ChangePlusPlusVandy/secondharvest/issues/10)

### Goal
Show that the library supports the agreed real workflow before expanding its use.

### Scope
Test this module with approved pilot users and representative content. Keep the first pilot limited to the departments and acceptance scenarios agreed in discovery.

### Acceptance criteria
- [ ] Add end-to-end coverage for sign-in, authorized create/update, search/filter, viewing/downloading, and archiving.
- [ ] Include negative access cases and verify private files cannot be retrieved by unauthorized users.
- [ ] Check keyboard access and the primary workflow on a small mobile screen.
- [ ] Have pilot users complete the agreed tasks and record results, issues, and prioritized feedback.
- [ ] Fix release-blocking defects and obtain the client's acceptance of the scoped result or document remaining gaps.
- [ ] Record feedback without committing confidential files, employee details, or production credentials.

### Priority
P1 — release acceptance.

## [#12: [P1] Deploy the approved library pilot and prepare operating documentation](https://github.com/ChangePlusPlusVandy/secondharvest/issues/12)

Ticket key: `handoff`

Depends on: [#3](https://github.com/ChangePlusPlusVandy/secondharvest/issues/3), [#5](https://github.com/ChangePlusPlusVandy/secondharvest/issues/5), [#6](https://github.com/ChangePlusPlusVandy/secondharvest/issues/6), [#7](https://github.com/ChangePlusPlusVandy/secondharvest/issues/7), [#8](https://github.com/ChangePlusPlusVandy/secondharvest/issues/8), [#9](https://github.com/ChangePlusPlusVandy/secondharvest/issues/9), [#10](https://github.com/ChangePlusPlusVandy/secondharvest/issues/10)

### Goal
Make the library available in an approved environment and transferable to the food bank's maintainers.

### Scope
Deployment and handoff cover the library only. Production release follows the pilot/acceptance decision; preparing deployment can happen before the pilot ticket is complete.

### Acceptance criteria
- [ ] Confirm client-approved hosting, ownership, costs, domain, and production credentials before provisioning paid services.
- [ ] Configure deployment and environment variables with separate development/production data and correct authentication redirects.
- [ ] Apply migrations and verify a deployed sign-in, authorized search, and file retrieval smoke check.
- [ ] Document deployment, rollback/recovery, dependencies, environment-variable names, backup/restore responsibilities, and known issues.
- [ ] Write concise reader/editor/admin instructions and a procedure for granting/revoking access.
- [ ] Ensure the client or its nominated maintainer has the agreed source-code, administrator, and deployment access.
- [ ] Confirm pilot acceptance before broader production use; record the maintenance owner and any limitations after student handoff.

### Priority
P1 — deployment and transition.
