import { describe, it, expect } from "vitest";
import {
  accuracy, response, durability, maintenance,
  pmCost, noGlass, forProcess, sensing,
  bestUse, phMeterTypes,
} from "../ph-meter-calc.js";

describe("accuracy", () => {
  it("glass electrode lab most accurate", () => {
    expect(accuracy("glass_electrode_lab")).toBeGreaterThan(accuracy("antimony_high_temp"));
  });
});

describe("response", () => {
  it("ISFET fastest response", () => {
    expect(response("isfet_solid_state")).toBeGreaterThan(response("optical_fluorescent"));
  });
});

describe("durability", () => {
  it("antimony most durable", () => {
    expect(durability("antimony_high_temp")).toBeGreaterThan(durability("glass_electrode_lab"));
  });
});

describe("maintenance", () => {
  it("optical fluorescent lowest maintenance", () => {
    expect(maintenance("optical_fluorescent")).toBeGreaterThan(maintenance("glass_electrode_lab"));
  });
});

describe("pmCost", () => {
  it("optical fluorescent most expensive", () => {
    expect(pmCost("optical_fluorescent")).toBeGreaterThan(pmCost("glass_electrode_lab"));
  });
});

describe("noGlass", () => {
  it("ISFET has no glass", () => {
    expect(noGlass("isfet_solid_state")).toBe(true);
  });
  it("glass electrode lab has glass", () => {
    expect(noGlass("glass_electrode_lab")).toBe(false);
  });
});

describe("forProcess", () => {
  it("glass electrode process for process", () => {
    expect(forProcess("glass_electrode_process")).toBe(true);
  });
  it("glass electrode lab not for process", () => {
    expect(forProcess("glass_electrode_lab")).toBe(false);
  });
});

describe("sensing", () => {
  it("ISFET uses ion sensitive FET chip", () => {
    expect(sensing("isfet_solid_state")).toBe("ion_sensitive_field_effect_chip");
  });
});

describe("bestUse", () => {
  it("optical for bioprocess fermentation", () => {
    expect(bestUse("optical_fluorescent")).toBe("bioprocess_fermentation_sterile");
  });
});

describe("phMeterTypes", () => {
  it("returns 5 types", () => {
    expect(phMeterTypes()).toHaveLength(5);
  });
});
