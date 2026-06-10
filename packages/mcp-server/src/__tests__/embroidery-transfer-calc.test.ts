import { describe, it, expect } from "vitest";
import {
  lineClarity, removalEase, detailLevel, fabricRange,
  transferCost, noIronNeeded, reusablePattern, markType,
  bestUse, embroideryTransfers,
} from "../embroidery-transfer-calc.js";

describe("lineClarity", () => {
  it("lightbox trace through best line clarity", () => {
    expect(lineClarity("lightbox_trace_through")).toBeGreaterThan(lineClarity("prick_pounce_powder"));
  });
});

describe("removalEase", () => {
  it("water soluble pen easiest removal", () => {
    expect(removalEase("water_soluble_pen")).toBeGreaterThan(removalEase("iron_on_pencil"));
  });
});

describe("detailLevel", () => {
  it("lightbox trace through best detail level", () => {
    expect(detailLevel("lightbox_trace_through")).toBeGreaterThan(detailLevel("prick_pounce_powder"));
  });
});

describe("fabricRange", () => {
  it("prick pounce powder widest fabric range", () => {
    expect(fabricRange("prick_pounce_powder")).toBeGreaterThan(fabricRange("lightbox_trace_through"));
  });
});

describe("transferCost", () => {
  it("lightbox trace through more expensive than iron on", () => {
    expect(transferCost("lightbox_trace_through")).toBeGreaterThan(transferCost("iron_on_pencil"));
  });
});

describe("noIronNeeded", () => {
  it("water soluble pen needs no iron", () => {
    expect(noIronNeeded("water_soluble_pen")).toBe(true);
  });
  it("iron on pencil needs iron", () => {
    expect(noIronNeeded("iron_on_pencil")).toBe(false);
  });
});

describe("reusablePattern", () => {
  it("carbon tracing paper has reusable pattern", () => {
    expect(reusablePattern("carbon_tracing_paper")).toBe(true);
  });
  it("iron on pencil does not have reusable pattern", () => {
    expect(reusablePattern("iron_on_pencil")).toBe(false);
  });
});

describe("markType", () => {
  it("prick pounce powder uses chalk powder dot", () => {
    expect(markType("prick_pounce_powder")).toBe("chalk_powder_dot");
  });
});

describe("bestUse", () => {
  it("water soluble pen best for freehand draw direct", () => {
    expect(bestUse("water_soluble_pen")).toBe("freehand_draw_direct");
  });
});

describe("embroideryTransfers", () => {
  it("returns 5 types", () => {
    expect(embroideryTransfers()).toHaveLength(5);
  });
});
