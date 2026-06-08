import { describe, it, expect } from "vitest";
import { CsvQuery } from "../csv-query.js";

describe("CsvQuery", () => {
  const csv = "name,age,city\nAlice,30,NYC\nBob,25,LA\nCharlie,35,NYC";

  it("parse creates row objects", () => {
    const rows = CsvQuery.parse(csv);
    expect(rows.length).toBe(3);
    expect(rows[0].name).toBe("Alice");
    expect(rows[0].age).toBe("30");
  });

  it("select picks columns", () => {
    const rows = CsvQuery.parse(csv);
    const selected = CsvQuery.select(rows, ["name", "city"]);
    expect(Object.keys(selected[0])).toEqual(["name", "city"]);
  });

  it("where filters rows", () => {
    const rows = CsvQuery.parse(csv);
    const filtered = CsvQuery.where(rows, r => r.city === "NYC");
    expect(filtered.length).toBe(2);
  });

  it("orderBy sorts by column", () => {
    const rows = CsvQuery.parse(csv);
    const sorted = CsvQuery.orderBy(rows, "age", "asc");
    expect(sorted[0].name).toBe("Bob");
    expect(sorted[2].name).toBe("Charlie");
  });

  it("limit returns subset", () => {
    const rows = CsvQuery.parse(csv);
    expect(CsvQuery.limit(rows, 2).length).toBe(2);
    expect(CsvQuery.limit(rows, 1, 1)[0].name).toBe("Bob");
  });

  it("distinct returns unique values", () => {
    const rows = CsvQuery.parse(csv);
    const cities = CsvQuery.distinct(rows, "city");
    expect(cities.sort()).toEqual(["LA", "NYC"]);
  });

  it("groupBy groups rows", () => {
    const rows = CsvQuery.parse(csv);
    const groups = CsvQuery.groupBy(rows, "city");
    expect(groups["NYC"].length).toBe(2);
    expect(groups["LA"].length).toBe(1);
  });

  it("sum computes total", () => {
    const rows = CsvQuery.parse(csv);
    expect(CsvQuery.sum(rows, "age")).toBe(90);
  });

  it("avg computes average", () => {
    const rows = CsvQuery.parse(csv);
    expect(CsvQuery.avg(rows, "age")).toBe(30);
  });

  it("toCsv reconstructs CSV", () => {
    const rows = CsvQuery.parse(csv);
    const result = CsvQuery.toCsv(rows);
    expect(result.split("\n").length).toBe(4);
    expect(result).toContain("name,age,city");
  });
});
