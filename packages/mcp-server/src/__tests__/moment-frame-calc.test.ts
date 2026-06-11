import { describe, it, expect } from "vitest";
import {
  ductility, drift, stiffness, detailing,
  mfCost, special, forSeismic, connection,
  bestUse, momentFrameTypes,
} from "../moment-frame-calc.js";

describe("ductility", () => {
  it("special moment most ductile", () => {
    expect(ductility("special_moment_smf")).toBeGreaterThan(ductility("ordinary_moment_omf"));
  });
});

describe("drift", () => {
  it("ordinary best drift (highest score)", () => {
    expect(drift("ordinary_moment_omf")).toBeGreaterThan(drift("special_truss_stmf"));
  });
});

describe("stiffness", () => {
  it("concrete special stiffest", () => {
    expect(stiffness("concrete_special_smrf")).toBeGreaterThan(stiffness("ordinary_moment_omf"));
  });
});

describe("detailing", () => {
  it("ordinary simplest detailing", () => {
    expect(detailing("ordinary_moment_omf")).toBeGreaterThan(detailing("special_moment_smf"));
  });
});

describe("mfCost", () => {
  it("special moment most expensive", () => {
    expect(mfCost("special_moment_smf")).toBeGreaterThan(mfCost("ordinary_moment_omf"));
  });
});

describe("special", () => {
  it("special moment is special", () => {
    expect(special("special_moment_smf")).toBe(true);
  });
  it("ordinary not special", () => {
    expect(special("ordinary_moment_omf")).toBe(false);
  });
});

describe("forSeismic", () => {
  it("special moment for seismic", () => {
    expect(forSeismic("special_moment_smf")).toBe(true);
  });
  it("ordinary not for seismic", () => {
    expect(forSeismic("ordinary_moment_omf")).toBe(false);
  });
});

describe("connection", () => {
  it("special moment uses dogbone", () => {
    expect(connection("special_moment_smf")).toBe("reduced_beam_section_dogbone");
  });
});

describe("bestUse", () => {
  it("ordinary for low seismic", () => {
    expect(bestUse("ordinary_moment_omf")).toBe("low_seismic_wind_governed");
  });
});

describe("momentFrameTypes", () => {
  it("returns 5 types", () => {
    expect(momentFrameTypes()).toHaveLength(5);
  });
});
