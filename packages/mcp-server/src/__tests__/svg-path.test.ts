import { describe, it, expect } from "vitest";
import { SvgPathBuilder } from "../svg-path.js";

describe("SvgPathBuilder", () => {
  it("builds a simple path", () => {
    const d = new SvgPathBuilder()
      .moveTo(0, 0)
      .lineTo(100, 100)
      .close()
      .build();
    expect(d).toBe("M 0 0 L 100 100 Z");
  });

  it("builds with horizontal and vertical lines", () => {
    const d = new SvgPathBuilder()
      .moveTo(0, 0)
      .horizontalTo(100)
      .verticalTo(50)
      .build();
    expect(d).toContain("H 100");
    expect(d).toContain("V 50");
  });

  it("builds cubic bezier", () => {
    const d = new SvgPathBuilder()
      .moveTo(0, 0)
      .cubicBezier(10, 20, 30, 40, 50, 60)
      .build();
    expect(d).toContain("C 10 20");
  });

  it("builds quadratic bezier", () => {
    const d = new SvgPathBuilder()
      .moveTo(0, 0)
      .quadraticBezier(50, 50, 100, 0)
      .build();
    expect(d).toContain("Q 50 50");
  });

  it("builds arc", () => {
    const d = new SvgPathBuilder()
      .moveTo(0, 0)
      .arc(25, 25, 0, false, true, 50, 0)
      .build();
    expect(d).toContain("A 25 25 0 0 1 50 0");
  });

  it("counts commands", () => {
    const b = new SvgPathBuilder().moveTo(0, 0).lineTo(10, 10).close();
    expect(b.commandCount()).toBe(3);
  });

  it("creates rectangle", () => {
    const d = SvgPathBuilder.rectangle(10, 20, 100, 50);
    expect(d).toContain("M 10 20");
    expect(d).toContain("Z");
  });

  it("creates circle", () => {
    const d = SvgPathBuilder.circle(50, 50, 25);
    expect(d).toContain("A 25 25");
    expect(d).toContain("Z");
  });

  it("creates polygon", () => {
    const d = SvgPathBuilder.polygon([
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 50, y: 80 },
    ]);
    expect(d).toContain("M 0 0");
    expect(d).toContain("L 100 0");
    expect(d).toContain("Z");
  });

  it("creates star", () => {
    const d = SvgPathBuilder.star(50, 50, 40, 20, 5);
    expect(d).toContain("M ");
    expect(d).toContain("Z");
  });

  it("creates rounded rectangle", () => {
    const d = SvgPathBuilder.roundedRect(0, 0, 100, 50, 10);
    expect(d).toContain("A 10 10");
    expect(d).toContain("Z");
  });
});
