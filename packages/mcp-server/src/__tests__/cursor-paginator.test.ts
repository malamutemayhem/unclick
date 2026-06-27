import { describe, it, expect } from "vitest";
import { CursorPaginator, paginateArray } from "../cursor-paginator.js";

const items = Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1), name: `item-${i + 1}` }));

describe("CursorPaginator", () => {
  it("returns first page", () => {
    const p = new CursorPaginator(items, 3, (i) => i.id);
    const page = p.getPage();
    expect(page.items.length).toBe(3);
    expect(page.items[0].id).toBe("1");
    expect(page.hasMore).toBe(true);
    expect(page.cursor).toBe("3");
    expect(page.total).toBe(10);
  });

  it("paginates with cursor", () => {
    const p = new CursorPaginator(items, 3, (i) => i.id);
    const page2 = p.getPage("3");
    expect(page2.items[0].id).toBe("4");
    expect(page2.items.length).toBe(3);
    expect(page2.hasMore).toBe(true);
  });

  it("last page has hasMore false", () => {
    const p = new CursorPaginator(items, 3, (i) => i.id);
    const page4 = p.getPage("9");
    expect(page4.items.length).toBe(1);
    expect(page4.hasMore).toBe(false);
  });

  it("invalid cursor returns from start", () => {
    const p = new CursorPaginator(items, 3, (i) => i.id);
    const page = p.getPage("invalid");
    expect(page.items[0].id).toBe("1");
  });

  it("getAllPages returns all pages", () => {
    const p = new CursorPaginator(items, 4, (i) => i.id);
    const pages = p.getAllPages();
    expect(pages.length).toBe(3);
    expect(pages[0].items.length).toBe(4);
    expect(pages[1].items.length).toBe(4);
    expect(pages[2].items.length).toBe(2);
  });

  it("totalItems and totalPages", () => {
    const p = new CursorPaginator(items, 3, (i) => i.id);
    expect(p.totalItems).toBe(10);
    expect(p.totalPages).toBe(4);
  });

  it("handles empty list", () => {
    const p = new CursorPaginator([], 5, () => "");
    const page = p.getPage();
    expect(page.items.length).toBe(0);
    expect(page.hasMore).toBe(false);
    expect(page.cursor).toBeNull();
  });
});

describe("paginateArray", () => {
  it("returns correct page", () => {
    const result = paginateArray([1, 2, 3, 4, 5], 2, 2);
    expect(result.items).toEqual([3, 4]);
    expect(result.page).toBe(2);
    expect(result.totalPages).toBe(3);
    expect(result.total).toBe(5);
  });

  it("first page", () => {
    const result = paginateArray([1, 2, 3], 1, 2);
    expect(result.items).toEqual([1, 2]);
  });

  it("beyond last page returns empty", () => {
    const result = paginateArray([1, 2, 3], 5, 2);
    expect(result.items).toEqual([]);
  });
});
