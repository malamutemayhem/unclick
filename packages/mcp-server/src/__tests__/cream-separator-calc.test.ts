import { describe, it, expect } from "vitest";
import {
  separationEfficiency, fatAccuracy, throughput, bacteriaRemoval,
  csCost_, selfCleaning, forButter, separatorConfig,
  bestUse, creamSeparatorTypes,
} from "../cream-separator-calc.js";

describe("separationEfficiency", () => {
  it("hermetic centrifuge best separation efficiency", () => {
    expect(separationEfficiency("hermetic_centrifuge")).toBeGreaterThan(separationEfficiency("gravity_settling"));
  });
});

describe("fatAccuracy", () => {
  it("hermetic centrifuge best fat accuracy", () => {
    expect(fatAccuracy("hermetic_centrifuge")).toBeGreaterThan(fatAccuracy("gravity_settling"));
  });
});

describe("throughput", () => {
  it("hermetic centrifuge highest throughput", () => {
    expect(throughput("hermetic_centrifuge")).toBeGreaterThan(throughput("cold_separation"));
  });
});

describe("bacteriaRemoval", () => {
  it("bactofuge best bacteria removal", () => {
    expect(bacteriaRemoval("bactofuge")).toBeGreaterThan(bacteriaRemoval("disc_stack_centrifuge"));
  });
});

describe("csCost_", () => {
  it("hermetic centrifuge most expensive", () => {
    expect(csCost_("hermetic_centrifuge")).toBeGreaterThan(csCost_("gravity_settling"));
  });
});

describe("selfCleaning", () => {
  it("disc stack centrifuge is self cleaning", () => {
    expect(selfCleaning("disc_stack_centrifuge")).toBe(true);
  });
  it("gravity settling not self cleaning", () => {
    expect(selfCleaning("gravity_settling")).toBe(false);
  });
});

describe("forButter", () => {
  it("cold separation for butter", () => {
    expect(forButter("cold_separation")).toBe(true);
  });
  it("bactofuge not for butter", () => {
    expect(forButter("bactofuge")).toBe(false);
  });
});

describe("separatorConfig", () => {
  it("bactofuge uses bacteria spore separate clean milk", () => {
    expect(separatorConfig("bactofuge")).toBe("bactofuge_bacteria_removal_centrifuge_spore_separate_clean_milk");
  });
});

describe("bestUse", () => {
  it("hermetic centrifuge for large dairy air free", () => {
    expect(bestUse("hermetic_centrifuge")).toBe("large_dairy_hermetic_centrifuge_air_free_foam_free_fat_precision");
  });
});

describe("creamSeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(creamSeparatorTypes()).toHaveLength(5);
  });
});
