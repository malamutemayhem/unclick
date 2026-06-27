import { describe, it, expect } from "vitest";
import { query, queryFirst } from "../json-path.js";

const data = {
  store: {
    books: [
      { title: "A", price: 10 },
      { title: "B", price: 20 },
      { title: "C", price: 30 },
    ],
    name: "BookShop",
  },
};

describe("query", () => {
  it("root returns whole object", () => {
    expect(query(data, "$")).toEqual([data]);
  });

  it("child access", () => {
    expect(query(data, "$.store.name")).toEqual(["BookShop"]);
  });

  it("array index", () => {
    expect(query(data, "$.store.books[0].title")).toEqual(["A"]);
  });

  it("wildcard on array", () => {
    const titles = query(data, "$.store.books[*].title");
    expect(titles).toEqual(["A", "B", "C"]);
  });

  it("recursive descent", () => {
    const prices = query(data, "$..price");
    expect(prices).toEqual([10, 20, 30]);
  });

  it("slice", () => {
    const result = query(data, "$.store.books[0:2]");
    expect(result.length).toBe(2);
  });

  it("negative index", () => {
    expect(query(data, "$.store.books[-1].title")).toEqual(["C"]);
  });
});

describe("queryFirst", () => {
  it("returns first match", () => {
    expect(queryFirst(data, "$.store.name")).toBe("BookShop");
  });

  it("returns undefined for no match", () => {
    expect(queryFirst(data, "$.store.missing")).toBeUndefined();
  });
});
