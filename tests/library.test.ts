import { describe, expect, it } from "vitest";
import { demoLibraryRepository, filterPublishedEntries } from "@/features/library/demo-repository";
import { demoDepartments, demoEntries } from "@/features/library/demo-data";

describe("sample library visibility", () => {
  it("excludes drafts and archived entries from browse and matching searches", async () => {
    const entries = await demoLibraryRepository.listPublished();
    expect(entries.map((entry) => entry.id)).toEqual([
      "sample-procedure", "sample-policy", "sample-resource",
    ]);
    expect(await demoLibraryRepository.listPublished({ query: "unpublished draft" })).toEqual([]);
    expect(await demoLibraryRepository.listPublished({ query: "archived policy" })).toEqual([]);
  });

  it.each(["sample-draft", "sample-archived", "unknown-id"])(
    "does not resolve %s through the published detail lookup",
    async (id) => expect(await demoLibraryRepository.getPublishedById(id)).toBeNull(),
  );

  it("resolves a published resource with its example URL", async () => {
    expect(await demoLibraryRepository.getPublishedById("sample-resource"))
      .toMatchObject({ kind: "resource", resourceUrl: "https://example.org" });
  });
});

describe("metadata filtering", () => {
  it("combines a case-insensitive query and department instead of matching either", () => {
    const matches = filterPublishedEntries(demoEntries, demoDepartments, {
      query: "  SAMPLE   STAFF  ", departmentId: " PEOPLE ",
    });
    expect(matches.map((entry) => entry.id)).toEqual(["sample-policy"]);
    expect(filterPublishedEntries(demoEntries, demoDepartments, {
      query: "sample staff", departmentId: "operations",
    })).toEqual([]);
  });

  it("returns no results for an unknown department", async () => {
    expect(await demoLibraryRepository.listPublished({ departmentId: "does-not-exist" })).toEqual([]);
  });

  it("searches tags and department names, including whitespace-only reset", async () => {
    expect((await demoLibraryRepository.listPublished({ query: "onboarding" }))
      .map((entry) => entry.id)).toEqual(["sample-policy"]);
    expect((await demoLibraryRepository.listPublished({ query: "operations" }))
      .map((entry) => entry.id)).toEqual(["sample-procedure", "sample-resource"]);
    expect(await demoLibraryRepository.listPublished({ query: "   " }))
      .toEqual(await demoLibraryRepository.listPublished());
  });

  it("treats search text as literal input", async () => {
    expect(await demoLibraryRepository.listPublished({ query: ".*" })).toEqual([]);
    expect(await demoLibraryRepository.listPublished({ query: "<script>alert(1)</script>" })).toEqual([]);
  });
});
