import { describe, it, expect } from "vitest";
import {
  oxideQuality, processSpeed, environmentalSafety, saltSprayLife,
  paCost, chromeFree, forStainless, chemistry,
  bestUse, passivationTypes,
} from "../passivation-calc.js";

describe("oxideQuality", () => {
  it("electrochemical best oxide quality", () => {
    expect(oxideQuality("electrochemical")).toBeGreaterThan(oxideQuality("chelant_based"));
  });
});

describe("processSpeed", () => {
  it("chelant based fastest process", () => {
    expect(processSpeed("chelant_based")).toBeGreaterThan(processSpeed("electrochemical"));
  });
});

describe("environmentalSafety", () => {
  it("citric acid safest for environment", () => {
    expect(environmentalSafety("citric_acid")).toBeGreaterThan(environmentalSafety("nitric_dichromate"));
  });
});

describe("saltSprayLife", () => {
  it("electrochemical longest salt spray life", () => {
    expect(saltSprayLife("electrochemical")).toBeGreaterThan(saltSprayLife("chelant_based"));
  });
});

describe("paCost", () => {
  it("electrochemical most expensive", () => {
    expect(paCost("electrochemical")).toBeGreaterThan(paCost("nitric_acid"));
  });
});

describe("chromeFree", () => {
  it("citric acid is chrome free", () => {
    expect(chromeFree("citric_acid")).toBe(true);
  });
  it("nitric dichromate not chrome free", () => {
    expect(chromeFree("nitric_dichromate")).toBe(false);
  });
});

describe("forStainless", () => {
  it("all types for stainless steel", () => {
    expect(forStainless("nitric_acid")).toBe(true);
    expect(forStainless("citric_acid")).toBe(true);
  });
});

describe("chemistry", () => {
  it("chelant based uses edta chelating agent", () => {
    expect(chemistry("chelant_based")).toBe("edta_nta_chelating_agent_spray_or_gel_on_site_application");
  });
});

describe("bestUse", () => {
  it("citric acid for medical device food contact", () => {
    expect(bestUse("citric_acid")).toBe("medical_device_food_contact_pharmaceutical_green_chemistry");
  });
});

describe("passivationTypes", () => {
  it("returns 5 types", () => {
    expect(passivationTypes()).toHaveLength(5);
  });
});
