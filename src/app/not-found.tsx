import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-lg py-10">
      <h1 className="text-3xl font-semibold">Document not found</h1>
      <p className="mt-4 leading-7 text-slate-600">This document is unavailable in the current library. Check the link or browse the available sample entries.</p>
      <Link href="/library" className="mt-6 inline-block font-semibold text-emerald-900 underline underline-offset-4">Back to library</Link>
    </section>
  );
}
