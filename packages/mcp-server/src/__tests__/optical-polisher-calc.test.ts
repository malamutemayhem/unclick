import { describe, it, expect } from "vitest";
import {
  surfaceFinish, throughput, figureControl, subsurfaceDamage,
  opCost, deterministic, forUltraflat, polisherConfig,
  bestUse, opticalPolisherTypes,
} from "../optical-polisher-calc.js";

describe("surfaceFinish", () => {
  it("ion beam figuring best surface finish", () => {
    expect(surfaceFinish("ion_beam_figuring")).toBeGreaterThan(surfaceFinish("pitch_lap"));
  });
});

describe("throughput", () => {
  it("cmp optical highest throughput", () => {
    expect(throughput("cmp_optical")).toBeGreaterThan(throughput("ion_beam_figuring"));
  });
});

describe("figureControl", () => {
  it("ion beam figuring best figure control", () => {
    expect(figureControl("ion_beam_figuring")).toBeGreaterThan(figureControl("pitch_lap"));
  });
});

describe("subsurfaceDamage", () => {
  it("ion beam figuring best subsurface damage", () => {
    expect(subsurfaceDamage("ion_beam_figuring")).toBeGreaterThan(subsurfaceDamage("pitch_lap"));
  });
});

describe("opCost", () => {
  it("ion beam figuring most expensive", () => {
    expect(opCost("ion_beam_figuring")).toBeGreaterThan(opCost("pitch_lap"));
  });
});

describe("deterministic", () => {
  it("ion beam figuring is deterministic", () => {
    expect(deterministic("ion_beam_figuring")).toBe(true);
  });
  it("pitch lap not deterministic", () => {
    expect(deterministic("pitch_lap")).toBe(false);
  });
});

describe("forUltraflat", () => {
  it("cmp optical for ultraflat", () => {
    expect(forUltraflat("cmp_optical")).toBe(true);
  });
  it("pitch lap not for ultraflat", () => {
    expect(forUltraflat("pitch_lap")).toBe(false);
  });
});

describe("polisherConfig", () => {
  it("bonnet polish uses inflated tool precession freeform", () => {
    expect(polisherConfig("bonnet_polish")).toBe("bonnet_optical_polisher_inflated_tool_precession_freeform");
  });
});

describe("bestUse", () => {
  it("ion beam figuring for space optics nanometer correction", () => {
    expect(bestUse("ion_beam_figuring")).toBe("space_optics_ion_beam_figuring_polisher_nanometer_correction");
  });
});

describe("opticalPolisherTypes", () => {
  it("returns 5 types", () => {
    expect(opticalPolisherTypes()).toHaveLength(5);
  });
});
