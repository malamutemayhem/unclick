import { describe, it, expect } from "vitest";
import {
  detailResolution, etchEase, printEditions, inkHold,
  plateCost, nonToxic, reusable, plateMetal,
  bestUse, etchingPlates,
} from "../etching-plate-calc.js";

describe("detailResolution", () => {
  it("copper traditional fine best detail", () => {
    expect(detailResolution("copper_traditional_fine")).toBeGreaterThan(detailResolution("aluminum_light_easy"));
  });
});

describe("etchEase", () => {
  it("aluminum light easy easiest to etch", () => {
    expect(etchEase("aluminum_light_easy")).toBeGreaterThan(etchEase("steel_durable_hard"));
  });
});

describe("printEditions", () => {
  it("copper traditional fine most editions", () => {
    expect(printEditions("copper_traditional_fine")).toBeGreaterThan(printEditions("aluminum_light_easy"));
  });
});

describe("inkHold", () => {
  it("copper traditional fine best ink hold", () => {
    expect(inkHold("copper_traditional_fine")).toBeGreaterThan(inkHold("aluminum_light_easy"));
  });
});

describe("plateCost", () => {
  it("copper traditional fine most expensive", () => {
    expect(plateCost("copper_traditional_fine")).toBeGreaterThan(plateCost("zinc_affordable_soft"));
  });
});

describe("nonToxic", () => {
  it("photopolymer light safe is non toxic", () => {
    expect(nonToxic("photopolymer_light_safe")).toBe(true);
  });
  it("copper traditional fine is not non toxic", () => {
    expect(nonToxic("copper_traditional_fine")).toBe(false);
  });
});

describe("reusable", () => {
  it("copper traditional fine is reusable", () => {
    expect(reusable("copper_traditional_fine")).toBe(true);
  });
  it("photopolymer light safe is not reusable", () => {
    expect(reusable("photopolymer_light_safe")).toBe(false);
  });
});

describe("plateMetal", () => {
  it("zinc affordable soft uses zinc alloy rolled", () => {
    expect(plateMetal("zinc_affordable_soft")).toBe("zinc_alloy_rolled");
  });
});

describe("bestUse", () => {
  it("copper traditional fine best for fine art intaglio", () => {
    expect(bestUse("copper_traditional_fine")).toBe("fine_art_intaglio");
  });
});

describe("etchingPlates", () => {
  it("returns 5 types", () => {
    expect(etchingPlates()).toHaveLength(5);
  });
});
