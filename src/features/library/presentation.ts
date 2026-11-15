import type { DocumentKind } from "./types";

export const documentKindLabels: Record<DocumentKind, string> = {
  sop: "SOP",
  policy: "Policy",
  resource: "Resource link",
};

export function formatDocumentDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
