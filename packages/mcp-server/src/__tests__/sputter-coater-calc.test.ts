import { describe, it, expect } from "vitest";
import {
  depositionRate, filmUniformity, filmDensity, targetUtilization,
  scCost, reactive, forOptical, coaterConfig,
  bestUse, sputterCoaterTypes,
} from "../sputter-coater-calc.js";

describe("depositionRate", () => {
  it("dc magnetron fastest deposition rate", () => {
    expect(depositionRate("dc_magnetron")).toBeGreaterThan(depositionRate("ion_beam"));
  });
});

describe("filmUniformity", () => {
  it("ion beam best film uniformity", () => {
    expect(filmUniformity("ion_beam")).toBeGreaterThan(filmUniformity("dc_magnetron"));
  });
});

describe("filmDensity", () => {
  it("ion beam and hipims best film density", () => {
    expect(filmDensity("ion_beam")).toBeGreaterThan(filmDensity("dc_magnetron"));
  });
});

describe("targetUtilization", () => {
  it("hipims best target utilization", () => {
    expect(targetUtilization("hipims")).toBeGreaterThan(targetUtilization("reactive_sputter"));
  });
});

describe("scCost", () => {
  it("hipims most expensive", () => {
    expect(scCost("hipims")).toBeGreaterThan(scCost("dc_magnetron"));
  });
});

describe("reactive", () => {
  it("reactive sputter is reactive", () => {
    expect(reactive("reactive_sputter")).toBe(true);
  });
  it("dc magnetron not reactive", () => {
    expect(reactive("dc_magnetron")).toBe(false);
  });
});

describe("forOptical", () => {
  it("ion beam for optical", () => {
    expect(forOptical("ion_beam")).toBe(true);
  });
  it("dc magnetron not for optical", () => {
    expect(forOptical("dc_magnetron")).toBe(false);
  });
});

describe("coaterConfig", () => {
  it("hipims uses high power impulse magnetron", () => {
    expect(coaterConfig("hipims")).toBe("hipims_high_power_impulse_magnetron_sputter_dense_hard_coating");
  });
});

describe("bestUse", () => {
  it("dc magnetron for metal thin film", () => {
    expect(bestUse("dc_magnetron")).toBe("metal_thin_film_aluminum_copper_titanium_dc_magnetron_sputter");
  });
});

describe("sputterCoaterTypes", () => {
  it("returns 5 types", () => {
    expect(sputterCoaterTypes()).toHaveLength(5);
  });
});
