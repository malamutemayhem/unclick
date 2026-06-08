export function encodeCursor(data: Record<string, unknown>): string {
  return Buffer.from(JSON.stringify(data)).toString("base64url");
}

export function decodeCursor<T = Record<string, unknown>>(cursor: string): T | undefined {
  try {
    return JSON.parse(Buffer.from(cursor, "base64url").toString("utf-8")) as T;
  } catch {
    return undefined;
  }
}

export interface CursorPage<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}

export function buildPage<T>(
  items: T[],
  limit: number,
  cursorBuilder: (lastItem: T) => Record<string, unknown>,
): CursorPage<T> {
  const hasMore = items.length > limit;
  const pageItems = hasMore ? items.slice(0, limit) : items;
  const nextCursor = hasMore
    ? encodeCursor(cursorBuilder(pageItems[pageItems.length - 1]))
    : undefined;
  return { items: pageItems, nextCursor, hasMore };
}

export interface OffsetPage<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}

export function buildOffsetPage<T>(
  items: T[],
  total: number,
  offset: number,
  limit: number,
): OffsetPage<T> {
  return {
    items,
    total,
    offset,
    limit,
    hasMore: offset + items.length < total,
  };
}
