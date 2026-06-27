import { describe, it, expect } from "vitest";
import {
  capacityFactorPercent, lcoeUsdPerMwh, landUseKm2PerGw,
  lifespanYears, carbonPaybackMonths, intermittent,
  requiresCoastal, topCountry, storageNeeded, renewableSources,
} from "../renewable-source-calc.js";

describe("capacityFactorPercent", () => {
  it("geothermal highest capacity factor", () => {
    expect(capacityFactorPercent("geothermal")).toBeGreaterThan(
      capacityFactorPercent("solar_pv")
    );
  });
});

describe("lcoeUsdPerMwh", () => {
  it("tidal most expensive", () => {
    expect(lcoeUsdPerMwh("tidal")).toBeGreaterThan(
      lcoeUsdPerMwh("solar_pv")
    );
  });
});

describe("landUseKm2PerGw", () => {
  it("onshore wind uses most land", () => {
    expect(landUseKm2PerGw("onshore_wind")).toBeGreaterThan(
      landUseKm2PerGw("geothermal")
    );
  });
});

describe("lifespanYears", () => {
  it("tidal longest lifespan", () => {
    expect(lifespanYears("tidal")).toBeGreaterThan(
      lifespanYears("onshore_wind")
    );
  });
});

describe("carbonPaybackMonths", () => {
  it("geothermal fastest payback", () => {
    expect(carbonPaybackMonths("solar_pv")).toBeGreaterThan(
      carbonPaybackMonths("geothermal")
    );
  });
});

describe("intermittent", () => {
  it("solar is intermittent", () => {
    expect(intermittent("solar_pv")).toBe(true);
  });
  it("geothermal is not", () => {
    expect(intermittent("geothermal")).toBe(false);
  });
});

describe("requiresCoastal", () => {
  it("tidal requires coastal", () => {
    expect(requiresCoastal("tidal")).toBe(true);
  });
  it("solar does not", () => {
    expect(requiresCoastal("solar_pv")).toBe(false);
  });
});

describe("topCountry", () => {
  it("geothermal top country is iceland", () => {
    expect(topCountry("geothermal")).toBe("iceland");
  });
});

describe("storageNeeded", () => {
  it("geothermal needs no storage", () => {
    expect(storageNeeded("geothermal")).toBe("none");
  });
});

describe("renewableSources", () => {
  it("returns 5 sources", () => {
    expect(renewableSources()).toHaveLength(5);
  });
});
