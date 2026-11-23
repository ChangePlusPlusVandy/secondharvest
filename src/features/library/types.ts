export type DocumentKind = "sop" | "policy" | "resource";
export type DocumentStatus = "draft" | "published" | "archived";

export interface Department {
  id: string;
  name: string;
}

export interface LibraryEntry {
  id: string;
  title: string;
  summary: string;
  kind: DocumentKind;
  status: DocumentStatus;
  departmentId: Department["id"];
  tags: readonly string[];
  /** ISO date only, without a time or timezone. */
  updatedAt: string;
  content: readonly string[];
  /** Optional external resource. Uploaded files will use a separate storage adapter. */
  resourceUrl?: string;
}

export interface LibraryFilters {
  query?: string;
  departmentId?: string;
}

/** Staff-facing reads. A production adapter must enforce access server-side. */
export interface LibraryRepository {
  listDepartments(): Promise<readonly Department[]>;
  listPublished(filters?: LibraryFilters): Promise<readonly LibraryEntry[]>;
  getPublishedById(id: string): Promise<LibraryEntry | null>;
}
