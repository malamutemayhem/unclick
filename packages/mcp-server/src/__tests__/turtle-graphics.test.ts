import { describe, it, expect } from "vitest";
import { Turtle, drawPolygon, drawStar, drawSpiral } from "../turtle-graphics.js";

describe("Turtle", () => {
  it("starts at origin by default", () => {
    const t = new Turtle();
    expect(t.getPosition()).toEqual({ x: 0, y: 0 });
    expect(t.getAngle()).toBe(0);
  });

  it("starts at custom position", () => {
    const t = new Turtle(10, 20);
    expect(t.getPosition()).toEqual({ x: 10, y: 20 });
  });

  it("moves forward", () => {
    const t = new Turtle();
    t.forward(10);
    const pos = t.getPosition();
    expect(pos.x).toBeCloseTo(10);
    expect(pos.y).toBeCloseTo(0);
  });

  it("moves backward", () => {
    const t = new Turtle();
    t.backward(5);
    const pos = t.getPosition();
    expect(pos.x).toBeCloseTo(-5);
  });

  it("turns right", () => {
    const t = new Turtle();
    t.right(90).forward(10);
    const pos = t.getPosition();
    expect(pos.x).toBeCloseTo(0);
    expect(pos.y).toBeCloseTo(10);
  });

  it("turns left", () => {
    const t = new Turtle();
    t.left(90).forward(10);
    const pos = t.getPosition();
    expect(pos.x).toBeCloseTo(0);
    expect(pos.y).toBeCloseTo(-10);
  });

  it("records lines with pen down", () => {
    const t = new Turtle();
    t.forward(10);
    expect(t.getLines().length).toBe(1);
  });

  it("does not record lines with pen up", () => {
    const t = new Turtle();
    t.penUp().forward(10);
    expect(t.getLines().length).toBe(0);
  });

  it("resumes recording after pen down", () => {
    const t = new Turtle();
    t.penUp().forward(5).penDown2().forward(5);
    expect(t.getLines().length).toBe(1);
  });

  it("goto draws line when pen is down", () => {
    const t = new Turtle();
    t.goto(10, 10);
    expect(t.getLines().length).toBe(1);
    expect(t.getPosition()).toEqual({ x: 10, y: 10 });
  });

  it("sets color and width", () => {
    const t = new Turtle();
    t.setColor("red").setWidth(3).forward(10);
    const line = t.getLines()[0];
    expect(line.color).toBe("red");
    expect(line.width).toBe(3);
  });

  it("pushes and pops state", () => {
    const t = new Turtle();
    t.forward(10);
    t.pushState();
    t.right(90).forward(5);
    t.popState();
    const pos = t.getPosition();
    expect(pos.x).toBeCloseTo(10);
    expect(pos.y).toBeCloseTo(0);
  });

  it("computes bounds", () => {
    const t = new Turtle();
    t.forward(100).right(90).forward(50);
    const b = t.getBounds();
    expect(b.minX).toBeCloseTo(0);
    expect(b.maxX).toBeCloseTo(100);
    expect(b.maxY).toBeCloseTo(50);
  });

  it("generates SVG", () => {
    const t = new Turtle();
    t.forward(50).right(90).forward(30);
    const svg = t.toSVG();
    expect(svg).toContain("<svg");
    expect(svg).toContain("<line");
    expect(svg).toContain("</svg>");
  });

  it("clears lines", () => {
    const t = new Turtle();
    t.forward(10);
    expect(t.getLines().length).toBe(1);
    t.clear();
    expect(t.getLines().length).toBe(0);
  });

  it("sets angle", () => {
    const t = new Turtle();
    t.setAngle(45);
    expect(t.getAngle()).toBe(45);
  });
});

describe("drawPolygon", () => {
  it("draws a square", () => {
    const t = new Turtle();
    drawPolygon(t, 4, 10);
    expect(t.getLines().length).toBe(4);
    const pos = t.getPosition();
    expect(pos.x).toBeCloseTo(0, 0);
    expect(pos.y).toBeCloseTo(0, 0);
  });

  it("draws a triangle", () => {
    const t = new Turtle();
    drawPolygon(t, 3, 20);
    expect(t.getLines().length).toBe(3);
  });
});

describe("drawStar", () => {
  it("draws a 5-point star", () => {
    const t = new Turtle();
    drawStar(t, 5, 50);
    expect(t.getLines().length).toBe(5);
  });
});

describe("drawSpiral", () => {
  it("draws expanding spiral", () => {
    const t = new Turtle();
    drawSpiral(t, 20, 5, 2, 90);
    expect(t.getLines().length).toBe(20);
  });
});
