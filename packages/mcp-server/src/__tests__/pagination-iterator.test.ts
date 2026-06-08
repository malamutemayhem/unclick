import { describe, it, expect } from "vitest";
import { paginate, collectAll, collectFirst } from "../pagination-iterator.js";
import type { PageResult } from "../pagination-iterator.js";

function mockFetcher(totalItems: number, pageSize: number) {
  const allItems = Array.from({ length: totalItems }, (_, i) => i + 1);
  return async (cursor: string | undefined, limit: number): Promise<PageResult<number>> => {
    const offset = cursor ? Number(cursor) : 0;
    const items = allItems.slice(offset, offset + Math.min(limit, pageSize));
    const nextOffset = offset + items.length;
    return {
      items,
      hasMore: nextOffset < totalItems,
      nextCursor: nextOffset < totalItems ? String(nextOffset) : undefined,
    };
  };
}

describe("paginate", () => {
  it("iterates through all pages", async () => {
    const pages: number[][] = [];
    for await (const page of paginate(mockFetcher(10, 3), { limit: 3 })) {
      pages.push(page);
    }
    expect(pages).toHaveLength(4);
    expect(pages.flat()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("respects maxPages", async () => {
    const pages: number[][] = [];
    for await (const page of paginate(mockFetcher(100, 10), { limit: 10, maxPages: 2 })) {
      pages.push(page);
    }
    expect(pages).toHaveLength(2);
  });

  it("respects maxItems", async () => {
    const items: number[] = [];
    for await (const page of paginate(mockFetcher(100, 10), { limit: 10, maxItems: 25 })) {
      items.push(...page);
    }
    expect(items.length).toBeLessThanOrEqual(30);
  });

  it("handles empty results", async () => {
    const pages: number[][] = [];
    const emptyFetcher = async () => ({ items: [] as number[], hasMore: false });
    for await (const page of paginate(emptyFetcher)) {
      pages.push(page);
    }
    expect(pages).toHaveLength(0);
  });

  it("stops when hasMore is false", async () => {
    const fetcher = async () => ({ items: [1, 2], hasMore: false as boolean });
    const pages: number[][] = [];
    for await (const page of paginate(fetcher)) {
      pages.push(page);
    }
    expect(pages).toHaveLength(1);
  });
});

describe("collectAll", () => {
  it("collects all items into a flat array", async () => {
    const items = await collectAll(mockFetcher(7, 3), { limit: 3 });
    expect(items).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});

describe("collectFirst", () => {
  it("collects only the requested number of items", async () => {
    const items = await collectFirst(mockFetcher(100, 10), 5);
    expect(items).toHaveLength(5);
    expect(items).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns fewer if not enough items exist", async () => {
    const items = await collectFirst(mockFetcher(3, 10), 10);
    expect(items).toEqual([1, 2, 3]);
  });
});
