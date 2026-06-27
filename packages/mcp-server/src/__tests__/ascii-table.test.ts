import { describe, it, expect } from "vitest";
import { table, markdownTable } from "../ascii-table.js";

describe("ascii-table", () => {
  describe("table", () => {
    it("renders basic table with headers", () => {
      const result = table([["Alice", "30"], ["Bob", "25"]], { headers: ["Name", "Age"] });
      expect(result).toContain("Alice");
      expect(result).toContain("Bob");
      expect(result).toContain("Name");
      expect(result).toContain("|");
    });

    it("renders without border", () => {
      const result = table([["a", "b"]], { border: false });
      expect(result).not.toContain("|");
    });

    it("handles right alignment", () => {
      const result = table([["1", "hello"]], { headers: ["Num", "Word"], align: ["right", "left"] });
      expect(result).toContain("1");
    });

    it("handles center alignment", () => {
      const result = table([["x"]], { headers: ["Col"], align: ["center"] });
      expect(result).toContain("x");
    });

    it("handles empty rows", () => {
      expect(table([])).toBe("");
    });

    it("pads missing cells", () => {
      const result = table([["a", "b"], ["c"]], { headers: ["X", "Y"] });
      expect(result).toContain("c");
    });
  });

  describe("markdownTable", () => {
    it("renders markdown format", () => {
      const result = markdownTable([["Alice", "30"]], ["Name", "Age"]);
      expect(result).toContain("| Name");
      expect(result).toContain("| ---");
      expect(result).toContain("| Alice");
    });

    it("supports right alignment", () => {
      const result = markdownTable([["1"]], ["Num"], ["right"]);
      expect(result).toContain("--:");
    });

    it("supports center alignment", () => {
      const result = markdownTable([["x"]], ["Col"], ["center"]);
      expect(result).toContain(":");
    });
  });
});
