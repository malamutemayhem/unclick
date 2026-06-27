import { describe, it, expect } from "vitest";
import { CsvBuilder } from "../csv-builder.js";

describe("CsvBuilder", () => {
  it("builds CSV with header and rows", () => {
    const csv = new CsvBuilder()
      .setColumns(["name", "age"])
      .addRow(["Alice", "30"])
      .addRow(["Bob", "25"])
      .build();
    expect(csv).toBe("name,age\nAlice,30\nBob,25");
  });

  it("builds without header", () => {
    const csv = new CsvBuilder({ includeHeader: false })
      .setColumns(["a", "b"])
      .addRow(["1", "2"])
      .build();
    expect(csv).toBe("1,2");
  });

  it("escapes fields with delimiters", () => {
    const csv = new CsvBuilder()
      .setColumns(["note"])
      .addRow(["hello, world"])
      .build();
    expect(csv).toContain('"hello, world"');
  });

  it("escapes fields with quotes", () => {
    const csv = new CsvBuilder()
      .setColumns(["text"])
      .addRow(['say "hi"'])
      .build();
    expect(csv).toContain('"say ""hi"""');
  });

  it("uses custom delimiter", () => {
    const csv = new CsvBuilder({ delimiter: "\t" })
      .setColumns(["a", "b"])
      .addRow(["1", "2"])
      .build();
    expect(csv).toBe("a\tb\n1\t2");
  });

  it("adds objects using column order", () => {
    const csv = new CsvBuilder()
      .setColumns(["name", "score"])
      .addObject({ name: "Alice", score: 95 })
      .build();
    expect(csv).toBe("name,score\nAlice,95");
  });

  it("infers columns from first object", () => {
    const csv = new CsvBuilder()
      .addObject({ x: 1, y: 2 })
      .build();
    expect(csv).toBe("x,y\n1,2");
  });

  it("adds multiple objects", () => {
    const csv = new CsvBuilder()
      .addObjects([
        { a: "1", b: "2" },
        { a: "3", b: "4" },
      ])
      .build();
    expect(csv).toContain("a,b");
    expect(csv).toContain("3,4");
  });

  it("tracks row and column count", () => {
    const b = new CsvBuilder().setColumns(["a", "b"]).addRow(["1", "2"]).addRow(["3", "4"]);
    expect(b.rowCount()).toBe(2);
    expect(b.columnCount()).toBe(2);
  });

  it("clears rows", () => {
    const b = new CsvBuilder().setColumns(["a"]).addRow(["1"]);
    b.clear();
    expect(b.rowCount()).toBe(0);
  });

  it("parses CSV string", () => {
    const rows = CsvBuilder.parse("a,b\n1,2\n3,4");
    expect(rows).toHaveLength(3);
    expect(rows[0]).toEqual(["a", "b"]);
    expect(rows[1]).toEqual(["1", "2"]);
  });

  it("parses quoted CSV fields", () => {
    const rows = CsvBuilder.parse('a,b\n"hello, world",2');
    expect(rows[1][0]).toBe("hello, world");
  });
});
