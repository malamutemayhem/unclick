import { describe, expect, it } from "vitest";
import {
  findExpressRoomDraftsByMirror,
  type ExpressRoomDraftQuery,
  type ExpressRoomDraftQueryResult,
  type ExpressRoomDraftRow,
} from "./expressroom-draft-search.js";

class FakeExpressRoomDraftQuery implements ExpressRoomDraftQuery {
  constructor(
    private readonly rows: ExpressRoomDraftRow[],
    private readonly filters: Array<(row: ExpressRoomDraftRow) => boolean> = [],
  ) {}

  eq(column: string, value: string): ExpressRoomDraftQuery {
    return new FakeExpressRoomDraftQuery(this.rows, [
      ...this.filters,
      (row) => String(row[column] ?? "") === value,
    ]);
  }

  ilike(column: string, pattern: string): ExpressRoomDraftQuery {
    const needle = pattern
      .replace(/^%/, "")
      .replace(/%$/, "")
      .replace(/\\([%_\\])/g, "$1")
      .toLowerCase();
    return new FakeExpressRoomDraftQuery(this.rows, [
      ...this.filters,
      (row) => String(row[column] ?? "").toLowerCase().includes(needle),
    ]);
  }

  order(): ExpressRoomDraftQuery {
    return this;
  }

  async limit(count: number): Promise<ExpressRoomDraftQueryResult> {
    return {
      data: this.rows.filter((row) => this.filters.every((filter) => filter(row))).slice(0, count),
      error: null,
    };
  }
}

describe("findExpressRoomDraftsByMirror", () => {
  it("returns an older mirror match when unfiltered newest rows exceed the public limit", async () => {
    const rows: ExpressRoomDraftRow[] = [
      {
        id: "newest-non-match",
        job_name_mirror: "Another job",
        brief_markdown: "No matching PR here.",
        updated_at: "2026-05-20T10:00:00Z",
      },
      {
        id: "older-match",
        job_name_mirror: "DraftRoom PR #970 follow-up",
        brief_markdown: "Relevant manual draft.",
        updated_at: "2026-05-19T10:00:00Z",
      },
    ];

    const drafts = await findExpressRoomDraftsByMirror({
      createQuery: () => new FakeExpressRoomDraftQuery(rows),
      expressStatus: null,
      officialJobMirror: "PR #970",
      officialTodoId: null,
      limit: 1,
    });

    expect(drafts.map((draft) => draft.id)).toEqual(["older-match"]);
  });

  it("keeps status and official todo filters on mirror searches", async () => {
    const todoId = "11111111-1111-4111-8111-111111111111";
    const rows: ExpressRoomDraftRow[] = [
      {
        id: "wrong-status",
        express_status: "inserted",
        official_todo_id: todoId,
        job_name_mirror: "HarnessKit PR #971",
        updated_at: "2026-05-20T10:00:00Z",
      },
      {
        id: "wrong-todo",
        express_status: "draft",
        official_todo_id: "22222222-2222-4222-8222-222222222222",
        job_name_mirror: "HarnessKit PR #971",
        updated_at: "2026-05-20T09:00:00Z",
      },
      {
        id: "matching-draft",
        express_status: "draft",
        official_todo_id: todoId,
        job_name_mirror: "HarnessKit PR #971",
        updated_at: "2026-05-20T08:00:00Z",
      },
    ];

    const drafts = await findExpressRoomDraftsByMirror({
      createQuery: () => new FakeExpressRoomDraftQuery(rows),
      expressStatus: "draft",
      officialJobMirror: "PR #971",
      officialTodoId: todoId,
      limit: 10,
    });

    expect(drafts.map((draft) => draft.id)).toEqual(["matching-draft"]);
  });
});
