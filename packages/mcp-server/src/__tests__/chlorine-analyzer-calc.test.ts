import { describe, it, expect } from "vitest";
import {
  accuracy, response, reagentFree, maintenance,
  caCost, online, forFreeChlorine, method,
  bestUse, chlorineAnalyzerTypes,
} from "../chlorine-analyzer-calc.js";

describe("accuracy", () => {
  it("colorimetric dpd most accurate", () => {
    expect(accuracy("colorimetric_dpd")).toBeGreaterThan(accuracy("ion_selective_electrode"));
  });
});

describe("response", () => {
  it("polarographic bare fastest response", () => {
    expect(response("polarographic_bare")).toBeGreaterThan(response("colorimetric_dpd"));
  });
});

describe("reagentFree", () => {
  it("polarographic bare most reagent free", () => {
    expect(reagentFree("polarographic_bare")).toBeGreaterThan(reagentFree("colorimetric_dpd"));
  });
});

describe("maintenance", () => {
  it("reagentless uv lowest maintenance", () => {
    expect(maintenance("reagentless_uv_abs")).toBeGreaterThan(maintenance("colorimetric_dpd"));
  });
});

describe("caCost", () => {
  it("reagentless uv most expensive", () => {
    expect(caCost("reagentless_uv_abs")).toBeGreaterThan(caCost("ion_selective_electrode"));
  });
});

describe("online", () => {
  it("all chlorine analyzers are online", () => {
    expect(online("amperometric_membrane")).toBe(true);
    expect(online("colorimetric_dpd")).toBe(true);
  });
});

describe("forFreeChlorine", () => {
  it("amperometric for free chlorine", () => {
    expect(forFreeChlorine("amperometric_membrane")).toBe(true);
  });
  it("reagentless uv not for free chlorine", () => {
    expect(forFreeChlorine("reagentless_uv_abs")).toBe(false);
  });
});

describe("method", () => {
  it("colorimetric uses dpd reagent", () => {
    expect(method("colorimetric_dpd")).toBe("dpd_reagent_color_photometric_measure");
  });
});

describe("bestUse", () => {
  it("amperometric for drinking water", () => {
    expect(bestUse("amperometric_membrane")).toBe("drinking_water_continuous_free_cl2");
  });
});

describe("chlorineAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(chlorineAnalyzerTypes()).toHaveLength(5);
  });
});
