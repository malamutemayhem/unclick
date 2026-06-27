import { describe, it, expect } from "vitest";
import {
  accuracy, sensitivity, automation, maintenance,
  naCost, online, forUltratrace, method,
  bestUse, sodiumAnalyzerTypes,
} from "../sodium-analyzer-calc.js";

describe("accuracy", () => {
  it("icp ms most accurate", () => {
    expect(accuracy("icp_ms_ultratrace")).toBeGreaterThan(accuracy("colorimetric_reagent"));
  });
});

describe("sensitivity", () => {
  it("icp ms most sensitive", () => {
    expect(sensitivity("icp_ms_ultratrace")).toBeGreaterThan(sensitivity("colorimetric_reagent"));
  });
});

describe("automation", () => {
  it("online ise most automated", () => {
    expect(automation("online_ise_continuous")).toBeGreaterThan(automation("colorimetric_reagent"));
  });
});

describe("maintenance", () => {
  it("online ise highest maintenance score", () => {
    expect(maintenance("online_ise_continuous")).toBeGreaterThan(maintenance("icp_ms_ultratrace"));
  });
});

describe("naCost", () => {
  it("icp ms most expensive", () => {
    expect(naCost("icp_ms_ultratrace")).toBeGreaterThan(naCost("colorimetric_reagent"));
  });
});

describe("online", () => {
  it("online ise is online", () => {
    expect(online("online_ise_continuous")).toBe(true);
  });
  it("flame photometer not online", () => {
    expect(online("flame_photometer")).toBe(false);
  });
});

describe("forUltratrace", () => {
  it("icp ms for ultratrace", () => {
    expect(forUltratrace("icp_ms_ultratrace")).toBe(true);
  });
  it("flame photometer not for ultratrace", () => {
    expect(forUltratrace("flame_photometer")).toBe(false);
  });
});

describe("method", () => {
  it("flame photometer uses 589nm emission", () => {
    expect(method("flame_photometer")).toBe("flame_emission_589nm_sodium_d_line");
  });
});

describe("bestUse", () => {
  it("online ise for power plant condensate", () => {
    expect(bestUse("online_ise_continuous")).toBe("power_plant_steam_condensate_online_na");
  });
});

describe("sodiumAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(sodiumAnalyzerTypes()).toHaveLength(5);
  });
});
