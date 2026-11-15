import { demoDepartments, demoEntries } from "./demo-data";
import type { Department, LibraryEntry, LibraryFilters, LibraryRepository } from "./types";

function normalize(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}

/** Metadata search only. Full document-content search belongs in the future data adapter. */
export function filterPublishedEntries(
  entries: readonly LibraryEntry[],
  departments: readonly Department[],
  filters: LibraryFilters = {},
): LibraryEntry[] {
  const query = normalize(filters.query ?? "");
  const departmentId = normalize(filters.departmentId ?? "");

  return entries.filter((entry) => {
    if (entry.status !== "published") return false;
    if (departmentId && normalize(entry.departmentId) !== departmentId) return false;

    const department = departments.find((item) => item.id === entry.departmentId);
    const searchableText = normalize(
      [entry.title, entry.summary, entry.kind, department?.name ?? "", ...entry.tags].join(" "),
    );
    return !query || searchableText.includes(query);
  });
}

export const demoLibraryRepository: LibraryRepository = {
  async listDepartments() {
    return demoDepartments;
  },
  async listPublished(filters = {}) {
    return filterPublishedEntries(demoEntries, demoDepartments, filters);
  },
  async getPublishedById(id) {
    return demoEntries.find((entry) => entry.id === id && entry.status === "published") ?? null;
  },
};
