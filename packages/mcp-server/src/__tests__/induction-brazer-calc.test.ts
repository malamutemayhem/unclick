import { describe, it, expect } from "vitest";
import {
  jointQuality, throughput, heatControl, repeatability,
  ibCost, automated, forPrecision, brazerConfig,
  bestUse, inductionBrazerTypes,
} from "../induction-brazer-calc.js";

describe("jointQuality", () => {
  it("vacuum braze best joint quality", () => {
    expect(jointQuality("vacuum_braze")).toBeGreaterThan(jointQuality("manual_coil"));
  });
});

describe("throughput", () => {
  it("conveyor inline highest throughput", () => {
    expect(throughput("conveyor_inline")).toBeGreaterThan(throughput("vacuum_braze"));
  });
});

describe("heatControl", () => {
  it("vacuum braze best heat control", () => {
    expect(heatControl("vacuum_braze")).toBeGreaterThan(heatControl("manual_coil"));
  });
});

describe("repeatability", () => {
  it("vacuum braze best repeatability", () => {
    expect(repeatability("vacuum_braze")).toBeGreaterThan(repeatability("manual_coil"));
  });
});

describe("ibCost", () => {
  it("vacuum braze most expensive", () => {
    expect(ibCost("vacuum_braze")).toBeGreaterThan(ibCost("manual_coil"));
  });
});

describe("automated", () => {
  it("rotary index is automated", () => {
    expect(automated("rotary_index")).toBe(true);
  });
  it("manual coil not automated", () => {
    expect(automated("manual_coil")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("vacuum braze for precision", () => {
    expect(forPrecision("vacuum_braze")).toBe(true);
  });
  it("conveyor inline not for precision", () => {
    expect(forPrecision("conveyor_inline")).toBe(false);
  });
});

describe("brazerConfig", () => {
  it("atmosphere braze uses nitrogen hydrogen shield flux free", () => {
    expect(brazerConfig("atmosphere_braze")).toBe("atmosphere_induction_brazer_nitrogen_hydrogen_shield_flux_free");
  });
});

describe("bestUse", () => {
  it("vacuum braze for aerospace heat exchanger oxide free", () => {
    expect(bestUse("vacuum_braze")).toBe("aerospace_heat_exchanger_vacuum_induction_brazer_oxide_free");
  });
});

describe("inductionBrazerTypes", () => {
  it("returns 5 types", () => {
    expect(inductionBrazerTypes()).toHaveLength(5);
  });
});
