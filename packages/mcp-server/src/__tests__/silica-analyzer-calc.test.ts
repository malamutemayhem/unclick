import { describe, it, expect } from "vitest";
import {
  accuracy, sensitivity, automation, maintenance,
  saCost, online, forUltratrace, method,
  bestUse, silicaAnalyzerTypes,
} from "../silica-analyzer-calc.js";

describe("accuracy", () => {
  it("icp oes most accurate", () => {
    expect(accuracy("icp_oes_lab")).toBeGreaterThan(accuracy("online_reagent_auto"));
  });
});

describe("sensitivity", () => {
  it("icp oes most sensitive", () => {
    expect(sensitivity("icp_oes_lab")).toBeGreaterThan(sensitivity("colorimetric_molybdate"));
  });
});

describe("automation", () => {
  it("online reagent auto most automated", () => {
    expect(automation("online_reagent_auto")).toBeGreaterThan(automation("colorimetric_molybdate"));
  });
});

describe("maintenance", () => {
  it("online reagent auto lowest maintenance", () => {
    expect(maintenance("online_reagent_auto")).toBeGreaterThan(maintenance("icp_oes_lab"));
  });
});

describe("saCost", () => {
  it("icp oes most expensive", () => {
    expect(saCost("icp_oes_lab")).toBeGreaterThan(saCost("colorimetric_molybdate"));
  });
});

describe("online", () => {
  it("photometric continuous is online", () => {
    expect(online("photometric_continuous")).toBe(true);
  });
  it("icp oes not online", () => {
    expect(online("icp_oes_lab")).toBe(false);
  });
});

describe("forUltratrace", () => {
  it("icp oes for ultratrace", () => {
    expect(forUltratrace("icp_oes_lab")).toBe(true);
  });
  it("colorimetric not for ultratrace", () => {
    expect(forUltratrace("colorimetric_molybdate")).toBe(false);
  });
});

describe("method", () => {
  it("icp oes uses plasma optical emission", () => {
    expect(method("icp_oes_lab")).toBe("inductively_coupled_plasma_optical_emit");
  });
});

describe("bestUse", () => {
  it("photometric for power plant steam cycle", () => {
    expect(bestUse("photometric_continuous")).toBe("power_plant_steam_cycle_continuous_sio2");
  });
});

describe("silicaAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(silicaAnalyzerTypes()).toHaveLength(5);
  });
});
