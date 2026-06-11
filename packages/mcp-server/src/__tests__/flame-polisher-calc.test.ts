import { describe, it, expect } from "vitest";
import {
  surfaceFinish, throughput, heatControl, edgeQuality,
  fpCost, contactFree, forOptical, polisherConfig,
  bestUse, flamePolisherTypes,
} from "../flame-polisher-calc.js";

describe("surfaceFinish", () => {
  it("laser reflow best surface finish", () => {
    expect(surfaceFinish("laser_reflow")).toBeGreaterThan(surfaceFinish("oxy_propane"));
  });
});

describe("throughput", () => {
  it("oxy propane highest throughput", () => {
    expect(throughput("oxy_propane")).toBeGreaterThan(throughput("laser_reflow"));
  });
});

describe("heatControl", () => {
  it("laser reflow best heat control", () => {
    expect(heatControl("laser_reflow")).toBeGreaterThan(heatControl("oxy_propane"));
  });
});

describe("edgeQuality", () => {
  it("laser reflow best edge quality", () => {
    expect(edgeQuality("laser_reflow")).toBeGreaterThan(edgeQuality("oxy_propane"));
  });
});

describe("fpCost", () => {
  it("laser reflow most expensive", () => {
    expect(fpCost("laser_reflow")).toBeGreaterThan(fpCost("oxy_propane"));
  });
});

describe("contactFree", () => {
  it("oxy hydrogen is contact free", () => {
    expect(contactFree("oxy_hydrogen")).toBe(true);
  });
});

describe("forOptical", () => {
  it("laser reflow for optical", () => {
    expect(forOptical("laser_reflow")).toBe(true);
  });
  it("oxy propane not for optical", () => {
    expect(forOptical("oxy_propane")).toBe(false);
  });
});

describe("polisherConfig", () => {
  it("acid polish uses hf vapor etch silica glass optical", () => {
    expect(polisherConfig("acid_polish")).toBe("acid_polish_flame_polisher_hf_vapor_etch_silica_glass_optical");
  });
});

describe("bestUse", () => {
  it("laser reflow for micro optic co2 beam precision surface", () => {
    expect(bestUse("laser_reflow")).toBe("micro_optic_laser_reflow_polisher_co2_beam_precision_surface");
  });
});

describe("flamePolisherTypes", () => {
  it("returns 5 types", () => {
    expect(flamePolisherTypes()).toHaveLength(5);
  });
});
