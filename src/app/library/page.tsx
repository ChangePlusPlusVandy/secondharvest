import Link from "next/link";
import { documentKindLabels, formatDocumentDate } from "@/features/library/presentation";
import { libraryRepository } from "@/features/library/repository";

type SearchParams = { q?: string | string[]; department?: string | string[] };

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function LibraryPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = firstValue(params.q).trim();
  const departmentId = firstValue(params.department).trim().toLowerCase();
  const [departments, entries] = await Promise.all([
    libraryRepository.listDepartments(),
    libraryRepository.listPublished({ query, departmentId }),
  ]);
  const unknownDepartment = Boolean(departmentId) && !departments.some((item) => item.id === departmentId);

  return (
    <>
      <div className="mb-9 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">SOP &amp; policy library</h1>
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Find current procedures, policies, and supporting resources by department.
          Explore the sample entries to see the starting structure.
        </p>
      </div>

      <form action="/library" method="get" className="grid gap-4 border-y border-emerald-950/10 py-6 sm:grid-cols-[1fr_15rem_auto] sm:items-end">
        <div>
          <label htmlFor="query" className="mb-2 block text-sm font-semibold">Search the library</label>
          <input
            id="query"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search titles, descriptions, or tags"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base"
          />
        </div>
        <div>
          <label htmlFor="department" className="mb-2 block text-sm font-semibold">Department</label>
          <select id="department" name="department" defaultValue={departmentId} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base">
            <option value="">All departments</option>
            {unknownDepartment && <option value={departmentId}>Unknown department</option>}
            {departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
          </select>
        </div>
        <button type="submit" className="rounded-md bg-emerald-900 px-5 py-2.5 font-semibold text-white hover:bg-emerald-800">
          Search
        </button>
      </form>

      <div className="flex items-center justify-between gap-4 py-5 text-sm">
        <p aria-live="polite" className="text-slate-600">{entries.length} {entries.length === 1 ? "entry" : "entries"}</p>
        {(query || departmentId) && <Link href="/library" className="font-medium text-emerald-900 underline underline-offset-4">Clear filters</Link>}
      </div>

      {entries.length === 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center" aria-label="Search results">
          <h2 className="text-lg font-semibold">No matching documents</h2>
          <p className="mt-2 text-slate-600">Try another search or select a different department.</p>
          <Link href="/library" className="mt-5 inline-block font-medium text-emerald-900 underline underline-offset-4">View all sample entries</Link>
        </section>
      ) : (
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white" aria-label="Library entries">
          {entries.map((entry) => {
            const department = departments.find((item) => item.id === entry.departmentId);
            return (
              <li key={entry.id} className="px-5 py-6 sm:px-7">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div className="max-w-2xl">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">{documentKindLabels[entry.kind]}</p>
                    <h2 className="text-xl font-semibold">
                      <Link href={`/library/${entry.id}`} className="decoration-emerald-800 underline-offset-4 hover:underline">{entry.title}</Link>
                    </h2>
                    <p className="mt-2 leading-6 text-slate-600">{entry.summary}</p>
                  </div>
                  <div className="shrink-0 text-sm text-slate-500 sm:text-right">
                    <p className="font-medium text-slate-700">{department?.name ?? "Unassigned"}</p>
                    <p className="mt-1">Updated <time dateTime={entry.updatedAt}>{formatDocumentDate(entry.updatedAt)}</time></p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
