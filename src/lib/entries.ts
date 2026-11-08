import { getCollection, type CollectionEntry } from "astro:content";

export type Kind = "project" | "research" | "note";

export const KIND_LABEL: Record<Kind, string> = { project: "Project", research: "Research", note: "Note" };

// One row of the ledger: a project or a piece of writing.
export interface Entry {
  no: number;
  kind: Kind;
  title: string;
  summary: string;
  date: Date;
  href: string;
  draft: boolean;
}

const published = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;
const newestFirst = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export async function getProjects(): Promise<CollectionEntry<"projects">[]> {
  return (await getCollection("projects", published)).sort(newestFirst);
}

export async function getWriting(): Promise<CollectionEntry<"writing">[]> {
  return (await getCollection("writing", published)).sort(newestFirst);
}

// Everything, listed newest first. Projects and writing are numbered separately, each in the order it was made
// (01 is the oldest), because each has its own page. The number belongs to the entry, so filtering never renumbers it.
export async function getLedger(): Promise<Entry[]> {
  const [projects, writing] = await Promise.all([getProjects(), getWriting()]);
  const rows = [
    ...projects.map((p) => ({
      kind: "project" as const,
      title: p.data.title,
      summary: p.data.summary,
      date: p.data.date,
      href: `/projects/${p.id}`,
      draft: p.data.draft,
    })),
    ...writing.map((w) => ({
      kind: w.data.kind,
      title: w.data.title,
      summary: w.data.summary,
      date: w.data.date,
      href: `/writing/${w.id}`,
      draft: w.data.draft,
    })),
  ].sort((a, b) => a.date.valueOf() - b.date.valueOf());

  const counts = { project: 0, writing: 0 };
  return rows.map((row) => ({ ...row, no: ++counts[row.kind === "project" ? "project" : "writing"] })).reverse();
}

export const pad = (n: number) => String(n).padStart(2, "0");

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Manila" });

// About 230 words a minute, rounded up, never less than one.
export const readingMinutes = (body = "") => Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 230));
