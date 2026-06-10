import { describe, it, expect } from "vitest";
import {
  groutPush, surfaceFinish, controlFeel, durability,
  floatCost, forCleanup, forThinset, padMaterial,
  bestTask, groutFloats,
} from "../grout-float-calc.js";

describe("groutPush", () => {
  it("epoxy hard float best grout push", () => {
    expect(groutPush("epoxy_hard_float")).toBeGreaterThan(groutPush("sponge_cleanup_soft"));
  });
});

describe("surfaceFinish", () => {
  it("sponge cleanup soft best surface finish", () => {
    expect(surfaceFinish("sponge_cleanup_soft")).toBeGreaterThan(surfaceFinish("notched_spread_thinset"));
  });
});

describe("controlFeel", () => {
  it("margin small tight best control feel", () => {
    expect(controlFeel("margin_small_tight")).toBeGreaterThan(controlFeel("epoxy_hard_float"));
  });
});

describe("durability", () => {
  it("epoxy hard float most durable", () => {
    expect(durability("epoxy_hard_float")).toBeGreaterThan(durability("sponge_cleanup_soft"));
  });
});

describe("floatCost", () => {
  it("epoxy hard float more expensive than rubber pad", () => {
    expect(floatCost("epoxy_hard_float")).toBeGreaterThan(floatCost("rubber_pad_standard"));
  });
});

describe("forCleanup", () => {
  it("sponge cleanup soft is for cleanup", () => {
    expect(forCleanup("sponge_cleanup_soft")).toBe(true);
  });
  it("rubber pad standard is not for cleanup", () => {
    expect(forCleanup("rubber_pad_standard")).toBe(false);
  });
});

describe("forThinset", () => {
  it("notched spread thinset is for thinset", () => {
    expect(forThinset("notched_spread_thinset")).toBe(true);
  });
  it("rubber pad standard is not for thinset", () => {
    expect(forThinset("rubber_pad_standard")).toBe(false);
  });
});

describe("padMaterial", () => {
  it("sponge cleanup soft uses cellulose sponge soft", () => {
    expect(padMaterial("sponge_cleanup_soft")).toBe("cellulose_sponge_soft");
  });
});

describe("bestTask", () => {
  it("margin small tight best for mosaic detail grout", () => {
    expect(bestTask("margin_small_tight")).toBe("mosaic_detail_grout");
  });
});

describe("groutFloats", () => {
  it("returns 5 types", () => {
    expect(groutFloats()).toHaveLength(5);
  });
});
