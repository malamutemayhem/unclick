import { describe, it, expect } from "vitest";
import { JsonPath } from "../json-path-query.js";

describe("JsonPath", () => {
  const data = {
    store: {
      books: [
        { title: "A", price: 10, author: "X" },
        { title: "B", price: 20, author: "Y" },
        { title: "C", price: 30, author: "Z" },
      ],
      name: "BookStore",
    },
  };

  it("queries simple property", () => {
    expect(JsonPath.value(data, "$.store.name")).toBe("BookStore");
  });

  it("queries nested property", () => {
    const result = JsonPath.query(data, "$.store.books[0].title");
    expect(result).toEqual(["A"]);
  });

  it("queries array index", () => {
    expect(JsonPath.value(data, "$.store.books[1].price")).toBe(20);
  });

  it("queries with wildcard", () => {
    const result = JsonPath.query(data, "$.store.books[*].title");
    expect(result).toEqual(["A", "B", "C"]);
  });

  it("queries with slice", () => {
    const result = JsonPath.query(data, "$.store.books[0:2].title");
    expect(result).toEqual(["A", "B"]);
  });

  it("recursive descent", () => {
    const result = JsonPath.query(data, "$..title");
    expect(result).toEqual(["A", "B", "C"]);
  });

  it("returns empty for non-existent path", () => {
    expect(JsonPath.query(data, "$.store.missing")).toEqual([]);
  });

  it("value returns undefined for missing", () => {
    expect(JsonPath.value(data, "$.nope")).toBeUndefined();
  });

  it("paths returns json paths", () => {
    const paths = JsonPath.paths(data, "$.store.name");
    expect(paths).toEqual(["$.store.name"]);
  });
});
