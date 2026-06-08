import { describe, it, expect } from "vitest";
import { AsciiDiagram } from "../ascii-diagram.js";

describe("AsciiDiagram", () => {
  it("flowchart creates boxes with arrows", () => {
    const result = AsciiDiagram.flowchart(["Start", "Process", "End"]);
    expect(result).toContain("Start");
    expect(result).toContain("Process");
    expect(result).toContain("End");
    expect(result).toContain("+");
    expect(result).toContain("v");
  });

  it("flowchart single step has no arrow", () => {
    const result = AsciiDiagram.flowchart(["Only"]);
    expect(result).toContain("Only");
    expect(result).not.toContain("v");
  });

  it("decision renders diamond-like shape", () => {
    const result = AsciiDiagram.decision("Is it ready?", "Deploy", "Fix bugs");
    expect(result).toContain("Is it ready?");
    expect(result).toContain("Yes: Deploy");
    expect(result).toContain("No:  Fix bugs");
  });

  it("sequence renders actors and messages", () => {
    const result = AsciiDiagram.sequence(
      ["Client", "Server"],
      [{ from: 0, to: 1, msg: "Request" }],
    );
    expect(result).toContain("Client");
    expect(result).toContain("Server");
    expect(result).toContain("Request");
    expect(result).toContain(">");
  });

  it("sequence handles reverse direction", () => {
    const result = AsciiDiagram.sequence(
      ["A", "B"],
      [{ from: 1, to: 0, msg: "Reply" }],
    );
    expect(result).toContain("<");
    expect(result).toContain("Reply");
  });

  it("tree renders parent with children", () => {
    const result = AsciiDiagram.tree("root", ["child1", "child2", "child3"]);
    expect(result).toContain("root");
    expect(result).toContain("|-- child1");
    expect(result).toContain("|-- child2");
    expect(result).toContain("+-- child3");
  });

  it("table renders headers and data rows", () => {
    const result = AsciiDiagram.table(
      ["Name", "Age"],
      [["Alice", "30"], ["Bob", "25"]],
    );
    expect(result).toContain("Name");
    expect(result).toContain("Age");
    expect(result).toContain("Alice");
    expect(result).toContain("Bob");
    const lines = result.split("\n");
    expect(lines.length).toBe(6);
  });

  it("banner wraps text with border characters", () => {
    const result = AsciiDiagram.banner("Hello");
    expect(result).toContain("Hello");
    expect(result).toContain("*");
    const lines = result.split("\n");
    expect(lines.length).toBe(3);
  });

  it("banner with custom char and padding", () => {
    const result = AsciiDiagram.banner("Test", "#", 3);
    expect(result).toContain("#");
    expect(result).toContain("Test");
  });

  it("divider creates a line of specified width", () => {
    const result = AsciiDiagram.divider(40, "=");
    expect(result).toBe("=".repeat(40));
  });

  it("divider uses defaults", () => {
    const result = AsciiDiagram.divider();
    expect(result).toBe("-".repeat(60));
  });
});
