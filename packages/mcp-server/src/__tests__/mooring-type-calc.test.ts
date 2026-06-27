import { describe, it, expect } from "vitest";
import {
  holding, flexibility, depth, weatherLimit,
  mrCost, permanent, forTanker, system,
  bestUse, mooringTypes,
} from "../mooring-type-calc.js";

describe("holding", () => {
  it("dp best holding", () => {
    expect(holding("dynamic_positioning_dp")).toBeGreaterThan(holding("mediterranean_stern_to_quay"));
  });
});

describe("flexibility", () => {
  it("spm most flexible", () => {
    expect(flexibility("single_point_turret_spm")).toBeGreaterThan(flexibility("pile_mooring_fixed_dolphin"));
  });
});

describe("depth", () => {
  it("dp handles deepest", () => {
    expect(depth("dynamic_positioning_dp")).toBeGreaterThan(depth("mediterranean_stern_to_quay"));
  });
});

describe("weatherLimit", () => {
  it("spm best weather tolerance", () => {
    expect(weatherLimit("single_point_turret_spm")).toBeGreaterThan(weatherLimit("mediterranean_stern_to_quay"));
  });
});

describe("mrCost", () => {
  it("spm most expensive", () => {
    expect(mrCost("single_point_turret_spm")).toBeGreaterThan(mrCost("mediterranean_stern_to_quay"));
  });
});

describe("permanent", () => {
  it("pile mooring is permanent", () => {
    expect(permanent("pile_mooring_fixed_dolphin")).toBe(true);
  });
  it("dp not permanent", () => {
    expect(permanent("dynamic_positioning_dp")).toBe(false);
  });
});

describe("forTanker", () => {
  it("spm for tanker", () => {
    expect(forTanker("single_point_turret_spm")).toBe(true);
  });
  it("pile mooring not for tanker", () => {
    expect(forTanker("pile_mooring_fixed_dolphin")).toBe(false);
  });
});

describe("system", () => {
  it("dp uses thruster gps", () => {
    expect(system("dynamic_positioning_dp")).toBe("thruster_gps_computer_stationkeep");
  });
});

describe("bestUse", () => {
  it("pile mooring for port berth", () => {
    expect(bestUse("pile_mooring_fixed_dolphin")).toBe("port_berth_fixed_vessel_position");
  });
});

describe("mooringTypes", () => {
  it("returns 5 types", () => {
    expect(mooringTypes()).toHaveLength(5);
  });
});
