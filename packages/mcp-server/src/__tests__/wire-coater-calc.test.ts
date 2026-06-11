import { describe, it, expect } from "vitest";
import {
  coatUniformity, throughput, insulationGrade, adhesionStrength,
  wcCost, highTemp, forMagnet, coaterConfig,
  bestUse, wireCoaterTypes,
} from "../wire-coater-calc.js";

describe("coatUniformity", () => {
  it("enamel coater best coat uniformity", () => {
    expect(coatUniformity("enamel_coater")).toBeGreaterThan(coatUniformity("dip_coater"));
  });
});

describe("throughput", () => {
  it("extrusion coater highest throughput", () => {
    expect(throughput("extrusion_coater")).toBeGreaterThan(throughput("dip_coater"));
  });
});

describe("insulationGrade", () => {
  it("enamel coater best insulation grade", () => {
    expect(insulationGrade("enamel_coater")).toBeGreaterThan(insulationGrade("dip_coater"));
  });
});

describe("adhesionStrength", () => {
  it("enamel coater best adhesion strength", () => {
    expect(adhesionStrength("enamel_coater")).toBeGreaterThan(adhesionStrength("dip_coater"));
  });
});

describe("wcCost", () => {
  it("uv cure coater most expensive", () => {
    expect(wcCost("uv_cure_coater")).toBeGreaterThan(wcCost("dip_coater"));
  });
});

describe("highTemp", () => {
  it("enamel coater is high temp", () => {
    expect(highTemp("enamel_coater")).toBe(true);
  });
  it("extrusion coater not high temp", () => {
    expect(highTemp("extrusion_coater")).toBe(false);
  });
});

describe("forMagnet", () => {
  it("enamel coater for magnet wire", () => {
    expect(forMagnet("enamel_coater")).toBe(true);
  });
  it("extrusion coater not for magnet", () => {
    expect(forMagnet("extrusion_coater")).toBe(false);
  });
});

describe("coaterConfig", () => {
  it("powder coater wire uses fluidized bed electrostatic fuse coat thick", () => {
    expect(coaterConfig("powder_coater_wire")).toBe("powder_coater_wire_fluidized_bed_electrostatic_fuse_coat_thick");
  });
});

describe("bestUse", () => {
  it("uv cure coater for fiber optic fast cure thin coat optical", () => {
    expect(bestUse("uv_cure_coater")).toBe("fiber_optic_uv_cure_wire_coater_fast_cure_thin_coat_optical");
  });
});

describe("wireCoaterTypes", () => {
  it("returns 5 types", () => {
    expect(wireCoaterTypes()).toHaveLength(5);
  });
});
