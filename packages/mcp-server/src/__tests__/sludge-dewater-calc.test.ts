import { describe, it, expect } from "vitest";
import {
  cakeDryness, throughput, polymerUsage, energyEfficiency,
  sdCost, continuous, forMunicipal, process,
  bestUse, sludgeDewaterTypes,
} from "../sludge-dewater-calc.js";

describe("cakeDryness", () => {
  it("plate frame press driest cake", () => {
    expect(cakeDryness("plate_frame_press")).toBeGreaterThan(cakeDryness("vacuum_drum_filter"));
  });
});

describe("throughput", () => {
  it("belt filter press highest throughput", () => {
    expect(throughput("belt_filter_press")).toBeGreaterThan(throughput("plate_frame_press"));
  });
});

describe("polymerUsage", () => {
  it("screw press lowest polymer usage", () => {
    expect(polymerUsage("screw_press")).toBeGreaterThan(polymerUsage("plate_frame_press"));
  });
});

describe("energyEfficiency", () => {
  it("screw press most energy efficient", () => {
    expect(energyEfficiency("screw_press")).toBeGreaterThan(energyEfficiency("plate_frame_press"));
  });
});

describe("sdCost", () => {
  it("centrifuge dewater most expensive", () => {
    expect(sdCost("centrifuge_dewater")).toBeGreaterThan(sdCost("vacuum_drum_filter"));
  });
});

describe("continuous", () => {
  it("belt filter press is continuous", () => {
    expect(continuous("belt_filter_press")).toBe(true);
  });
  it("plate frame press not continuous", () => {
    expect(continuous("plate_frame_press")).toBe(false);
  });
});

describe("forMunicipal", () => {
  it("belt filter press for municipal", () => {
    expect(forMunicipal("belt_filter_press")).toBe(true);
  });
  it("plate frame press not for municipal", () => {
    expect(forMunicipal("plate_frame_press")).toBe(false);
  });
});

describe("process", () => {
  it("screw press uses slow rotating screw", () => {
    expect(process("screw_press")).toBe("slow_rotating_screw_screen_cylinder_low_speed_gentle_press");
  });
});

describe("bestUse", () => {
  it("plate frame press for industrial sludge", () => {
    expect(bestUse("plate_frame_press")).toBe("industrial_sludge_mining_tailing_maximum_dryness_disposal");
  });
});

describe("sludgeDewaterTypes", () => {
  it("returns 5 types", () => {
    expect(sludgeDewaterTypes()).toHaveLength(5);
  });
});
