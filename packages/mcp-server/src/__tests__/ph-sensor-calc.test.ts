import { describe, it, expect } from "vitest";
import {
  accuracy, responseTime, durability, tempRange,
  phCost, maintenance, forInline, principle,
  bestUse, phSensors,
} from "../ph-sensor-calc.js";

describe("accuracy", () => {
  it("differential pair ref most accurate", () => {
    expect(accuracy("differential_pair_ref")).toBeGreaterThan(accuracy("antimony_metal"));
  });
});

describe("responseTime", () => {
  it("isfet solid state fastest response", () => {
    expect(responseTime("isfet_solid_state")).toBeGreaterThan(responseTime("optical_fluorescent"));
  });
});

describe("durability", () => {
  it("isfet solid state most durable", () => {
    expect(durability("isfet_solid_state")).toBeGreaterThan(durability("glass_electrode"));
  });
});

describe("tempRange", () => {
  it("differential pair ref widest temp range", () => {
    expect(tempRange("differential_pair_ref")).toBeGreaterThan(tempRange("antimony_metal"));
  });
});

describe("phCost", () => {
  it("optical fluorescent most expensive", () => {
    expect(phCost("optical_fluorescent")).toBeGreaterThan(phCost("antimony_metal"));
  });
});

describe("maintenance", () => {
  it("glass electrode needs maintenance", () => {
    expect(maintenance("glass_electrode")).toBe(true);
  });
  it("isfet solid state no maintenance", () => {
    expect(maintenance("isfet_solid_state")).toBe(false);
  });
});

describe("forInline", () => {
  it("isfet solid state for inline", () => {
    expect(forInline("isfet_solid_state")).toBe(true);
  });
  it("antimony metal not for inline", () => {
    expect(forInline("antimony_metal")).toBe(false);
  });
});

describe("principle", () => {
  it("optical fluorescent uses indicator dye emission", () => {
    expect(principle("optical_fluorescent")).toBe("indicator_dye_emission");
  });
});

describe("bestUse", () => {
  it("differential pair ref best for pharma validation audit", () => {
    expect(bestUse("differential_pair_ref")).toBe("pharma_validation_audit");
  });
});

describe("phSensors", () => {
  it("returns 5 types", () => {
    expect(phSensors()).toHaveLength(5);
  });
});
