import { describe, it, expect } from "vitest";
import { encodeCursor, decodeCursor, buildPage, buildOffsetPage } from "../cursor.js";

describe("encodeCursor / decodeCursor", () => {
  it("round-trips data", () => {
    const data = { id: "abc", offset: 42 };
    const cursor = encodeCursor(data);
    expect(decodeCursor(cursor)).toEqual(data);
  });

  it("returns undefined for invalid cursor", () => {
    expect(decodeCursor("not-valid!!!")).toBeUndefined();
  });

  it("produces url-safe string", () => {
    const cursor = encodeCursor({ key: "hello/world+foo" });
    expect(cursor).not.toMatch(/[+/=]/);
  });
});

describe("buildPage", () => {
  it("builds page with hasMore=true when items exceed limit", () => {
    const items = [1, 2, 3, 4, 5, 6];
    const page = buildPage(items, 5, (last) => ({ after: last }));
    expect(page.items).toHaveLength(5);
    expect(page.hasMore).toBe(true);
    expect(page.nextCursor).toBeDefined();
  });

  it("builds page with hasMore=false when items fit", () => {
    const items = [1, 2, 3];
    const page = buildPage(items, 5, (last) => ({ after: last }));
    expect(page.items).toHaveLength(3);
    expect(page.hasMore).toBe(false);
    expect(page.nextCursor).toBeUndefined();
  });

  it("cursor is decodable", () => {
    const items = [{ id: "a" }, { id: "b" }, { id: "c" }];
    const page = buildPage(items, 2, (last) => ({ after: last.id }));
    const decoded = decodeCursor(page.nextCursor!);
    expect(decoded).toEqual({ after: "b" });
  });
});

describe("buildOffsetPage", () => {
  it("builds offset page", () => {
    const page = buildOffsetPage(["a", "b", "c"], 10, 0, 3);
    expect(page.hasMore).toBe(true);
    expect(page.total).toBe(10);
  });

  it("hasMore false on last page", () => {
    const page = buildOffsetPage(["a", "b"], 5, 3, 3);
    expect(page.hasMore).toBe(false);
  });
});
