import type { Department, LibraryEntry } from "./types";

// Synthetic examples only. These are not Second Harvest policies or instructions.
export const demoDepartments: readonly Department[] = [
  { id: "operations", name: "Operations" },
  { id: "people", name: "People & onboarding" },
];

export const demoEntries: readonly LibraryEntry[] = [
  {
    id: "sample-procedure",
    title: "Sample operating procedure",
    summary: "A placeholder showing how a departmental SOP will appear in the library.",
    kind: "sop",
    status: "published",
    departmentId: "operations",
    tags: ["sample", "procedure"],
    updatedAt: "2026-11-01",
    content: [
      "This is a synthetic example for the project scaffold. It contains no operational instructions.",
      "An approved procedure and its supporting resources will appear here after document management is implemented.",
    ],
  },
  {
    id: "sample-policy",
    title: "Sample staff policy",
    summary: "An example policy entry with a department, description, and searchable tags.",
    kind: "policy",
    status: "published",
    departmentId: "people",
    tags: ["sample", "onboarding"],
    updatedAt: "2026-11-02",
    content: [
      "This placeholder is not an employee policy and must not be used as guidance.",
      "The team will agree on policy ownership and publication rules with the project owner before connecting real documents.",
    ],
  },
  {
    id: "sample-resource",
    title: "Sample reference link",
    summary: "A placeholder for a related website or resource that supports a procedure.",
    kind: "resource",
    status: "published",
    departmentId: "operations",
    tags: ["sample", "reference"],
    updatedAt: "2026-11-03",
    content: [
      "Related resources can sit alongside SOPs and policies. This demonstration points to example.org, an example domain, rather than a real organizational resource.",
    ],
    resourceUrl: "https://example.org",
  },
  {
    id: "sample-draft",
    title: "Sample unpublished draft",
    summary: "A draft fixture for checking that unpublished entries stay out of staff views.",
    kind: "sop",
    status: "draft",
    departmentId: "operations",
    tags: ["sample"],
    updatedAt: "2026-11-04",
    content: ["Synthetic draft fixture. This entry should not appear in the staff library."],
  },
  {
    id: "sample-archived",
    title: "Sample archived policy",
    summary: "An archived fixture for checking that retired entries stay out of current views.",
    kind: "policy",
    status: "archived",
    departmentId: "people",
    tags: ["sample"],
    updatedAt: "2026-10-01",
    content: ["Synthetic archived fixture. This entry should not appear in the staff library."],
  },
];
