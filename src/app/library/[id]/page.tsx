import Link from "next/link";
import { notFound } from "next/navigation";
import { documentKindLabels, formatDocumentDate } from "@/features/library/presentation";
import { libraryRepository } from "@/features/library/repository";

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await libraryRepository.getPublishedById(id);
  if (!entry) notFound();

  const departments = await libraryRepository.listDepartments();
  const department = departments.find((item) => item.id === entry.departmentId);

  return (
    <article className="max-w-3xl">
      <Link href="/library" className="text-sm font-medium text-emerald-900 underline underline-offset-4">Back to library</Link>
      <p className="mb-3 mt-9 text-xs font-semibold uppercase tracking-wider text-emerald-800">{documentKindLabels[entry.kind]}</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{entry.title}</h1>
      <p className="mt-4 text-lg leading-7 text-slate-600">{entry.summary}</p>

      <dl className="my-8 grid gap-5 border-y border-emerald-950/10 py-5 text-sm sm:grid-cols-3">
        <div><dt className="text-slate-500">Department</dt><dd className="mt-1 font-medium">{department?.name ?? "Unassigned"}</dd></div>
        <div><dt className="text-slate-500">Last updated</dt><dd className="mt-1 font-medium"><time dateTime={entry.updatedAt}>{formatDocumentDate(entry.updatedAt)}</time></dd></div>
        <div><dt className="text-slate-500">Tags</dt><dd className="mt-1 font-medium">{entry.tags.join(", ")}</dd></div>
      </dl>

      <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8" aria-labelledby="content-title">
        <h2 id="content-title" className="text-xl font-semibold">Sample content</h2>
        {entry.content.map((paragraph, index) => <p key={index} className="mt-4 leading-7 text-slate-600">{paragraph}</p>)}
        {entry.resourceUrl && (
          <a href={entry.resourceUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-semibold text-emerald-900 underline underline-offset-4">
            Open example resource (new tab)
          </a>
        )}
      </section>
    </article>
  );
}
