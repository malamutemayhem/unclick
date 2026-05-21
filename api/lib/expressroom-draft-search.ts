export type ExpressRoomDraftRow = Record<string, unknown>;

export type ExpressRoomDraftQueryResult = {
  data: ExpressRoomDraftRow[] | null;
  error: unknown;
};

export type ExpressRoomDraftQuery = {
  eq(column: string, value: string): ExpressRoomDraftQuery;
  ilike(column: string, pattern: string): ExpressRoomDraftQuery;
  order(column: string, options: { ascending: boolean }): ExpressRoomDraftQuery;
  limit(count: number): PromiseLike<ExpressRoomDraftQueryResult>;
};

export const EXPRESSROOM_MIRROR_SEARCH_COLUMNS = [
  "job_name_mirror",
  "short_description",
  "brief_markdown",
  "source_chat_session_id",
] as const;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function escapeExpressRoomIlikePattern(value: string): string {
  return value.replace(/[%_\\]/g, (char) => `\\${char}`);
}

function updatedAtTime(draft: ExpressRoomDraftRow): number {
  const parsed = Date.parse(String(draft.updated_at ?? ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function mergeExpressRoomDraftRows(
  draftGroups: Array<ExpressRoomDraftRow[] | null | undefined>,
  limit: number,
): ExpressRoomDraftRow[] {
  const draftsById = new Map<string, ExpressRoomDraftRow>();

  for (const group of draftGroups) {
    for (const draft of group ?? []) {
      const id = String(draft.id ?? "");
      if (!id || draftsById.has(id)) continue;
      draftsById.set(id, draft);
    }
  }

  return Array.from(draftsById.values())
    .sort((left, right) => updatedAtTime(right) - updatedAtTime(left))
    .slice(0, limit);
}

export async function findExpressRoomDraftsByMirror(params: {
  createQuery: () => ExpressRoomDraftQuery;
  expressStatus: string | null;
  officialJobMirror: string;
  officialTodoId: string | null;
  limit: number;
}): Promise<ExpressRoomDraftRow[]> {
  const mirrorNeedle = params.officialJobMirror.trim();
  if (!mirrorNeedle) return [];

  const mirrorPattern = `%${escapeExpressRoomIlikePattern(mirrorNeedle)}%`;

  const applyCommonFilters = (query: ExpressRoomDraftQuery): ExpressRoomDraftQuery => {
    let filtered = query;
    if (params.expressStatus) {
      filtered = filtered.eq("express_status", params.expressStatus);
    }
    if (params.officialTodoId) {
      filtered = filtered.eq("official_todo_id", params.officialTodoId);
    }
    return filtered;
  };

  const queries = EXPRESSROOM_MIRROR_SEARCH_COLUMNS.map((column) =>
    applyCommonFilters(params.createQuery())
      .ilike(column, mirrorPattern)
      .order("updated_at", { ascending: false })
      .limit(params.limit),
  );

  if (!params.officialTodoId && UUID_RE.test(mirrorNeedle)) {
    queries.push(
      applyCommonFilters(params.createQuery())
        .eq("official_todo_id", mirrorNeedle)
        .order("updated_at", { ascending: false })
        .limit(params.limit),
    );
  }

  const results = await Promise.all(queries);
  const failedResult = results.find((result) => result.error);
  if (failedResult?.error) throw failedResult.error;

  return mergeExpressRoomDraftRows(
    results.map((result) => result.data),
    params.limit,
  );
}
