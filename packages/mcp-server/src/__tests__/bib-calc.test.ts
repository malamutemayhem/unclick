import { describe, it, expect } from "vitest";
import {
  absorbency, messProtect, cleanEase, babyComfort,
  bibCost, machineWash, hasCatchPocket, closureMethod,
  bestStage, bibs,
} from "../bib-calc.js";

describe("absorbency", () => {
  it("bandana drool snap most absorbent", () => {
    expect(absorbency("bandana_drool_snap")).toBeGreaterThan(absorbency("silicone_catch_trough"));
  });
});

describe("messProtect", () => {
  it("silicone catch trough best mess protect", () => {
    expect(messProtect("silicone_catch_trough")).toBeGreaterThan(messProtect("bandana_drool_snap"));
  });
});

describe("cleanEase", () => {
  it("silicone catch trough easiest to clean", () => {
    expect(cleanEase("silicone_catch_trough")).toBeGreaterThan(cleanEase("smock_long_sleeve"));
  });
});

describe("babyComfort", () => {
  it("bandana drool snap most baby comfort", () => {
    expect(babyComfort("bandana_drool_snap")).toBeGreaterThan(babyComfort("silicone_catch_trough"));
  });
});

describe("bibCost", () => {
  it("silicone catch trough more expensive than cotton", () => {
    expect(bibCost("silicone_catch_trough")).toBeGreaterThan(bibCost("cotton_pullover_basic"));
  });
});

describe("machineWash", () => {
  it("cotton pullover basic is machine washable", () => {
    expect(machineWash("cotton_pullover_basic")).toBe(true);
  });
  it("silicone catch trough is not machine washable", () => {
    expect(machineWash("silicone_catch_trough")).toBe(false);
  });
});

describe("hasCatchPocket", () => {
  it("silicone catch trough has catch pocket", () => {
    expect(hasCatchPocket("silicone_catch_trough")).toBe(true);
  });
  it("cotton pullover basic has no catch pocket", () => {
    expect(hasCatchPocket("cotton_pullover_basic")).toBe(false);
  });
});

describe("closureMethod", () => {
  it("bandana drool snap uses double snap back", () => {
    expect(closureMethod("bandana_drool_snap")).toBe("double_snap_back");
  });
});

describe("bestStage", () => {
  it("silicone catch trough best for solid food weaning", () => {
    expect(bestStage("silicone_catch_trough")).toBe("solid_food_weaning");
  });
});

describe("bibs", () => {
  it("returns 5 types", () => {
    expect(bibs()).toHaveLength(5);
  });
});
