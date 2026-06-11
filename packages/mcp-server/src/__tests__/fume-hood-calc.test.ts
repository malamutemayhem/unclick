import { describe, it, expect } from "vitest";
import {
  containment, energy, safety, flexibility,
  fhCost, ducted, forChemistry, airflow,
  bestUse, fumeHoodTypes,
} from "../fume-hood-calc.js";

describe("containment", () => {
  it("perchloric best containment", () => {
    expect(containment("perchloric_acid_wash")).toBeGreaterThan(containment("ductless_filtered"));
  });
});

describe("energy", () => {
  it("ductless most energy efficient", () => {
    expect(energy("ductless_filtered")).toBeGreaterThan(energy("perchloric_acid_wash"));
  });
});

describe("safety", () => {
  it("radioisotope safest", () => {
    expect(safety("radioisotope_shielded")).toBeGreaterThan(safety("ductless_filtered"));
  });
});

describe("flexibility", () => {
  it("ductless most flexible", () => {
    expect(flexibility("ductless_filtered")).toBeGreaterThan(flexibility("perchloric_acid_wash"));
  });
});

describe("fhCost", () => {
  it("radioisotope most expensive", () => {
    expect(fhCost("radioisotope_shielded")).toBeGreaterThan(fhCost("ductless_filtered"));
  });
});

describe("ducted", () => {
  it("conventional is ducted", () => {
    expect(ducted("conventional_bypass")).toBe(true);
  });
  it("ductless not ducted", () => {
    expect(ducted("ductless_filtered")).toBe(false);
  });
});

describe("forChemistry", () => {
  it("vav for chemistry", () => {
    expect(forChemistry("variable_air_volume")).toBe(true);
  });
  it("radioisotope not chemistry", () => {
    expect(forChemistry("radioisotope_shielded")).toBe(false);
  });
});

describe("airflow", () => {
  it("vav uses sash sensor", () => {
    expect(airflow("variable_air_volume")).toBe("vav_sash_sensor_face_velocity");
  });
});

describe("bestUse", () => {
  it("ductless for low hazard", () => {
    expect(bestUse("ductless_filtered")).toBe("solvent_weighing_low_hazard");
  });
});

describe("fumeHoodTypes", () => {
  it("returns 5 types", () => {
    expect(fumeHoodTypes()).toHaveLength(5);
  });
});
