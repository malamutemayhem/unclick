import { describe, it, expect } from "vitest";
import {
  batchSpeed, mixConsistency, capacity, automation,
  cbCost, mobile, forReadyMix, plantConfig,
  bestUse, concreteBatchingTypes,
} from "../concrete-batching-calc.js";

describe("batchSpeed", () => {
  it("wet batch fastest batch speed", () => {
    expect(batchSpeed("wet_batch")).toBeGreaterThan(batchSpeed("mobile_transit"));
  });
});

describe("mixConsistency", () => {
  it("wet batch best mix consistency", () => {
    expect(mixConsistency("wet_batch")).toBeGreaterThan(mixConsistency("mobile_transit"));
  });
});

describe("capacity", () => {
  it("stationary central largest capacity", () => {
    expect(capacity("stationary_central")).toBeGreaterThan(capacity("mobile_transit"));
  });
});

describe("automation", () => {
  it("precast automated highest automation", () => {
    expect(automation("precast_automated")).toBeGreaterThan(automation("mobile_transit"));
  });
});

describe("cbCost", () => {
  it("precast automated most expensive", () => {
    expect(cbCost("precast_automated")).toBeGreaterThan(cbCost("mobile_transit"));
  });
});

describe("mobile", () => {
  it("mobile transit is mobile", () => {
    expect(mobile("mobile_transit")).toBe(true);
  });
  it("stationary central not mobile", () => {
    expect(mobile("stationary_central")).toBe(false);
  });
});

describe("forReadyMix", () => {
  it("wet batch for ready mix", () => {
    expect(forReadyMix("wet_batch")).toBe(true);
  });
  it("precast automated not for ready mix", () => {
    expect(forReadyMix("precast_automated")).toBe(false);
  });
});

describe("plantConfig", () => {
  it("mobile transit uses truck drum batch on site", () => {
    expect(plantConfig("mobile_transit")).toBe("mobile_transit_mix_truck_drum_batch_on_site_remote_location");
  });
});

describe("bestUse", () => {
  it("precast automated for panel beam pipe", () => {
    expect(bestUse("precast_automated")).toBe("precast_panel_beam_pipe_automated_batch_precise_mix_mold_cure");
  });
});

describe("concreteBatchingTypes", () => {
  it("returns 5 types", () => {
    expect(concreteBatchingTypes()).toHaveLength(5);
  });
});
