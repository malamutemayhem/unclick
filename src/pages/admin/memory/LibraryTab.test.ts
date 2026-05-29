import { describe, expect, it } from "vitest";
import { groupLibraryDocsByShelf, shelfLabelForDoc, type LibraryDoc } from "./LibraryTab";

function doc(patch: Partial<LibraryDoc>): LibraryDoc {
  return {
    id: patch.id ?? "doc-1",
    slug: patch.slug ?? "memory-taxonomy-15-data-memory",
    title: patch.title ?? "Data memory snapshot",
    category: patch.category,
    tags: patch.tags ?? [],
    version: patch.version ?? 1,
    updated_at: patch.updated_at ?? "2026-05-12T10:00:00.000Z",
    ...patch,
  };
}

describe("Library taxonomy shelves", () => {
  it("uses snapshot primary categories as shelf labels", () => {
    expect(
      shelfLabelForDoc(
        doc({
          category: "reference",
          primary_category: "15 Data & Memory",
        }),
      ),
    ).toBe("15 Data & Memory");
  });

  it("groups documents into ordered taxonomy shelves", () => {
    const groups = groupLibraryDocsByShelf([
      doc({
        id: "ops-old",
        title: "Ops old",
        primary_category: "27 Operations & Process",
        updated_at: "2026-05-11T10:00:00.000Z",
      }),
      doc({
        id: "data",
        title: "Data",
        primary_category: "15 Data & Memory",
        updated_at: "2026-05-12T10:00:00.000Z",
      }),
      doc({
        id: "ops-new",
        title: "Ops new",
        primary_category: "27 Operations & Process",
        updated_at: "2026-05-12T11:00:00.000Z",
      }),
    ]);

    expect(groups.map((group) => group.label)).toEqual([
      "15 Data & Memory",
      "27 Operations & Process",
    ]);
    expect(groups[1].docs.map((item) => item.id)).toEqual(["ops-new", "ops-old"]);
  });
});
