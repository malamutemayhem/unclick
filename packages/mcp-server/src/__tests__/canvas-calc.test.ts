import { describe, it, expect } from "vitest";
import {
  paintAbsorption, surfaceTexture, archivalQuality, portability,
  canvasCost, preStretched, preGessoed, weaveType,
  bestMedium, canvases,
} from "../canvas-calc.js";

describe("paintAbsorption", () => {
  it("raw unstretched most absorbent", () => {
    expect(paintAbsorption("raw_unstretched")).toBeGreaterThan(paintAbsorption("linen_fine"));
  });
});

describe("surfaceTexture", () => {
  it("linen fine best surface texture", () => {
    expect(surfaceTexture("linen_fine")).toBeGreaterThan(surfaceTexture("canvas_pad"));
  });
});

describe("archivalQuality", () => {
  it("linen fine best archival quality", () => {
    expect(archivalQuality("linen_fine")).toBeGreaterThan(archivalQuality("canvas_pad"));
  });
});

describe("portability", () => {
  it("canvas pad most portable", () => {
    expect(portability("canvas_pad")).toBeGreaterThan(portability("cotton_stretched"));
  });
});

describe("canvasCost", () => {
  it("linen fine most expensive", () => {
    expect(canvasCost("linen_fine")).toBeGreaterThan(canvasCost("canvas_pad"));
  });
});

describe("preStretched", () => {
  it("cotton stretched is pre stretched", () => {
    expect(preStretched("cotton_stretched")).toBe(true);
  });
  it("canvas panel is not", () => {
    expect(preStretched("canvas_panel")).toBe(false);
  });
});

describe("preGessoed", () => {
  it("cotton stretched is pre gessoed", () => {
    expect(preGessoed("cotton_stretched")).toBe(true);
  });
  it("raw unstretched is not", () => {
    expect(preGessoed("raw_unstretched")).toBe(false);
  });
});

describe("weaveType", () => {
  it("linen fine uses tight linen plain weave", () => {
    expect(weaveType("linen_fine")).toBe("tight_linen_plain_weave");
  });
});

describe("bestMedium", () => {
  it("linen fine for oil paint fine detail", () => {
    expect(bestMedium("linen_fine")).toBe("oil_paint_fine_detail");
  });
});

describe("canvases", () => {
  it("returns 5 types", () => {
    expect(canvases()).toHaveLength(5);
  });
});
