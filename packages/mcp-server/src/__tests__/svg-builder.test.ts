import { describe, it, expect } from "vitest";
import { SVGElement, SVGBuilder, createBarChart } from "../svg-builder.js";

describe("SVGElement", () => {
  it("renders self-closing tag", () => {
    const el = new SVGElement("rect", { x: 0, y: 0, width: 10, height: 10 });
    expect(el.render()).toContain("<rect");
    expect(el.render()).toContain("/>");
  });

  it("renders tag with text content", () => {
    const el = new SVGElement("text", { x: 5, y: 10 }, [], "Hello");
    const rendered = el.render();
    expect(rendered).toContain("<text");
    expect(rendered).toContain("Hello");
    expect(rendered).toContain("</text>");
  });

  it("renders nested children", () => {
    const child = new SVGElement("circle", { cx: 5, cy: 5, r: 3 });
    const parent = new SVGElement("g", {}, [child]);
    const rendered = parent.render();
    expect(rendered).toContain("<g>");
    expect(rendered).toContain("<circle");
    expect(rendered).toContain("</g>");
  });

  it("indents children", () => {
    const child = new SVGElement("rect", { x: 0, y: 0 });
    const parent = new SVGElement("g", {}, [child]);
    const lines = parent.render().split("\n");
    expect(lines[1]).toMatch(/^\s+<rect/);
  });
});

describe("SVGBuilder", () => {
  it("builds valid SVG with xmlns", () => {
    const svg = new SVGBuilder(100, 100).build();
    expect(svg).toContain("xmlns=");
    expect(svg).toContain("viewBox=");
  });

  it("adds rect", () => {
    const svg = new SVGBuilder(100, 100).rect(0, 0, 50, 50).build();
    expect(svg).toContain("<rect");
    expect(svg).toContain('width="50"');
  });

  it("adds circle", () => {
    const svg = new SVGBuilder(100, 100).circle(50, 50, 25).build();
    expect(svg).toContain("<circle");
    expect(svg).toContain('r="25"');
  });

  it("adds ellipse", () => {
    const svg = new SVGBuilder(100, 100).ellipse(50, 50, 30, 20).build();
    expect(svg).toContain("<ellipse");
    expect(svg).toContain('rx="30"');
  });

  it("adds line", () => {
    const svg = new SVGBuilder(100, 100).line(0, 0, 100, 100).build();
    expect(svg).toContain("<line");
    expect(svg).toContain('x2="100"');
  });

  it("adds polyline", () => {
    const svg = new SVGBuilder(100, 100).polyline([[0, 0], [50, 50], [100, 0]]).build();
    expect(svg).toContain("<polyline");
    expect(svg).toContain("0,0 50,50 100,0");
  });

  it("adds polygon", () => {
    const svg = new SVGBuilder(100, 100).polygon([[0, 0], [50, 100], [100, 0]]).build();
    expect(svg).toContain("<polygon");
  });

  it("adds path", () => {
    const svg = new SVGBuilder(100, 100).path("M0 0 L100 100").build();
    expect(svg).toContain("<path");
    expect(svg).toContain("M0 0 L100 100");
  });

  it("adds text", () => {
    const svg = new SVGBuilder(100, 100).text(10, 20, "Hello").build();
    expect(svg).toContain("<text");
    expect(svg).toContain("Hello");
  });

  it("adds group with children", () => {
    const child = new SVGElement("rect", { x: 0, y: 0, width: 10, height: 10 });
    const svg = new SVGBuilder(100, 100).group({ fill: "red" }, [child]).build();
    expect(svg).toContain("<g");
    expect(svg).toContain("<rect");
  });

  it("adds defs", () => {
    const gradient = new SVGElement("linearGradient", { id: "grad1" });
    const svg = new SVGBuilder(100, 100).addDef(gradient).build();
    expect(svg).toContain("<defs>");
    expect(svg).toContain("linearGradient");
  });

  it("tracks element count", () => {
    const builder = new SVGBuilder(100, 100);
    expect(builder.elementCount).toBe(0);
    builder.rect(0, 0, 10, 10);
    builder.circle(50, 50, 5);
    expect(builder.elementCount).toBe(2);
  });

  it("chains methods", () => {
    const svg = new SVGBuilder(200, 200)
      .rect(0, 0, 200, 200, { fill: "white" })
      .circle(100, 100, 50, { fill: "blue" })
      .line(0, 0, 200, 200)
      .build();
    expect(svg).toContain("<rect");
    expect(svg).toContain("<circle");
    expect(svg).toContain("<line");
  });
});

describe("createBarChart", () => {
  it("creates SVG with bars", () => {
    const data = [
      { label: "A", value: 10 },
      { label: "B", value: 20 },
      { label: "C", value: 30 },
    ];
    const svg = createBarChart(data);
    expect(svg).toContain("<svg");
    expect(svg).toContain("<rect");
    expect(svg).toContain("<text");
    expect(svg).toContain("A");
    expect(svg).toContain("B");
    expect(svg).toContain("C");
  });

  it("uses custom dimensions", () => {
    const data = [{ label: "X", value: 5 }];
    const svg = createBarChart(data, 800, 600);
    expect(svg).toContain('width="800"');
    expect(svg).toContain('height="600"');
  });
});
