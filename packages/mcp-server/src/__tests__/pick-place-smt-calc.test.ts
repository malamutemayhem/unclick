import { describe, it, expect } from "vitest";
import {
  placementAccuracy, throughput, componentRange, feederCapacity,
  ppCost, highSpeed, forFine, placerConfig,
  bestUse, pickPlaceSmtTypes,
} from "../pick-place-smt-calc.js";

describe("placementAccuracy", () => {
  it("gantry head best placement accuracy", () => {
    expect(placementAccuracy("gantry_head")).toBeGreaterThan(placementAccuracy("chip_shooter"));
  });
});

describe("throughput", () => {
  it("chip shooter highest throughput", () => {
    expect(throughput("chip_shooter")).toBeGreaterThan(throughput("flexible_placer"));
  });
});

describe("componentRange", () => {
  it("gantry head best component range", () => {
    expect(componentRange("gantry_head")).toBeGreaterThan(componentRange("chip_shooter"));
  });
});

describe("feederCapacity", () => {
  it("multi head best feeder capacity", () => {
    expect(feederCapacity("multi_head")).toBeGreaterThan(feederCapacity("flexible_placer"));
  });
});

describe("ppCost", () => {
  it("multi head most expensive", () => {
    expect(ppCost("multi_head")).toBeGreaterThan(ppCost("flexible_placer"));
  });
});

describe("highSpeed", () => {
  it("chip shooter is high speed", () => {
    expect(highSpeed("chip_shooter")).toBe(true);
  });
  it("gantry head not high speed", () => {
    expect(highSpeed("gantry_head")).toBe(false);
  });
});

describe("forFine", () => {
  it("gantry head for fine pitch", () => {
    expect(forFine("gantry_head")).toBe(true);
  });
  it("chip shooter not for fine", () => {
    expect(forFine("chip_shooter")).toBe(false);
  });
});

describe("placerConfig", () => {
  it("multi head uses parallel heads simultaneous pick place", () => {
    expect(placerConfig("multi_head")).toBe("multi_head_smt_placer_parallel_heads_simultaneous_pick_place");
  });
});

describe("bestUse", () => {
  it("flexible placer for prototype lab npi small batch", () => {
    expect(bestUse("flexible_placer")).toBe("prototype_lab_flexible_smt_placer_npi_small_batch_odd_form");
  });
});

describe("pickPlaceSmtTypes", () => {
  it("returns 5 types", () => {
    expect(pickPlaceSmtTypes()).toHaveLength(5);
  });
});
