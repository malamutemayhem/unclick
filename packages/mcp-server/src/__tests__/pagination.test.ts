import { describe, it, expect } from "vitest";
import { paginate, cursorPaginate, pageRange } from "../pagination.js";

describe("paginate", () => {
  it("calculates page info", () => {
    const info = paginate(100, 1, 10);
    expect(info.totalPages).toBe(10);
    expect(info.hasNextPage).toBe(true);
    expect(info.hasPrevPage).toBe(false);
    expect(info.startIndex).toBe(0);
    expect(info.endIndex).toBe(9);
  });

  it("last page", () => {
    const info = paginate(25, 3, 10);
    expect(info.totalPages).toBe(3);
    expect(info.hasNextPage).toBe(false);
    expect(info.hasPrevPage).toBe(true);
    expect(info.startIndex).toBe(20);
    expect(info.endIndex).toBe(24);
  });

  it("clamps page to valid range", () => {
    expect(paginate(50, 100, 10).page).toBe(5);
    expect(paginate(50, 0, 10).page).toBe(1);
  });

  it("handles zero items", () => {
    const info = paginate(0, 1, 10);
    expect(info.totalPages).toBe(1);
    expect(info.endIndex).toBe(-1);
  });
});

describe("cursorPaginate", () => {
  const items = [
    { id: "a", name: "Alice" },
    { id: "b", name: "Bob" },
    { id: "c", name: "Carol" },
    { id: "d", name: "Dave" },
  ];

  it("first page without cursor", () => {
    const page = cursorPaginate(items, 2, null, (i) => i.id);
    expect(page.items).toHaveLength(2);
    expect(page.items[0].id).toBe("a");
    expect(page.nextCursor).toBe("b");
    expect(page.hasPrevPage).toBe(false);
  });

  it("next page with cursor", () => {
    const page = cursorPaginate(items, 2, "b", (i) => i.id);
    expect(page.items).toHaveLength(2);
    expect(page.items[0].id).toBe("c");
    expect(page.hasPrevPage).toBe(true);
  });

  it("last page has null cursor", () => {
    const page = cursorPaginate(items, 2, "b", (i) => i.id);
    expect(page.nextCursor).toBeNull();
  });
});

describe("pageRange", () => {
  it("returns window around current page", () => {
    expect(pageRange(5, 10, 5)).toEqual([3, 4, 5, 6, 7]);
  });

  it("clamps at start", () => {
    expect(pageRange(1, 10, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("clamps at end", () => {
    expect(pageRange(10, 10, 5)).toEqual([6, 7, 8, 9, 10]);
  });
});
