import { describe, it, expect } from "vitest";
import {
  dryness, throughput, energy, maintenance,
  spCost, continuous, forMunicipal, mechanism,
  bestUse, sludgePressTypes,
} from "../sludge-press-calc.js";

describe("dryness", () => {
  it("plate frame driest cake", () => {
    expect(dryness("plate_frame_filter")).toBeGreaterThan(dryness("rotary_drum_thickener"));
  });
});

describe("throughput", () => {
  it("centrifuge highest throughput", () => {
    expect(throughput("centrifuge_decanter")).toBeGreaterThan(throughput("plate_frame_filter"));
  });
});

describe("energy", () => {
  it("screw press best energy", () => {
    expect(energy("screw_press_dewater")).toBeGreaterThan(energy("centrifuge_decanter"));
  });
});

describe("maintenance", () => {
  it("screw press lowest maintenance", () => {
    expect(maintenance("screw_press_dewater")).toBeGreaterThan(maintenance("plate_frame_filter"));
  });
});

describe("spCost", () => {
  it("centrifuge most expensive", () => {
    expect(spCost("centrifuge_decanter")).toBeGreaterThan(spCost("rotary_drum_thickener"));
  });
});

describe("continuous", () => {
  it("belt press is continuous", () => {
    expect(continuous("belt_filter_press")).toBe(true);
  });
  it("plate frame not continuous", () => {
    expect(continuous("plate_frame_filter")).toBe(false);
  });
});

describe("forMunicipal", () => {
  it("belt press for municipal", () => {
    expect(forMunicipal("belt_filter_press")).toBe(true);
  });
  it("plate frame not municipal", () => {
    expect(forMunicipal("plate_frame_filter")).toBe(false);
  });
});

describe("mechanism", () => {
  it("centrifuge uses scroll bowl", () => {
    expect(mechanism("centrifuge_decanter")).toBe("high_speed_scroll_bowl_decanter");
  });
});

describe("bestUse", () => {
  it("screw press for small wwtp", () => {
    expect(bestUse("screw_press_dewater")).toBe("small_wwtp_low_maintenance");
  });
});

describe("sludgePressTypes", () => {
  it("returns 5 types", () => {
    expect(sludgePressTypes()).toHaveLength(5);
  });
});
