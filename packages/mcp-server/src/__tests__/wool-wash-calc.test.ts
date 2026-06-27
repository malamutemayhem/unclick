import { describe, it, expect } from "vitest";
import {
  cleaningPower, fiberSafe, colorPreserve, easeOfUse,
  washCost, noRinse, forRawFleece, activeAgent,
  bestUse, woolWashes,
} from "../wool-wash-calc.js";

describe("cleaningPower", () => {
  it("enzyme scour raw strongest cleaning", () => {
    expect(cleaningPower("enzyme_scour_raw")).toBeGreaterThan(cleaningPower("soak_no_rinse_gentle"));
  });
});

describe("fiberSafe", () => {
  it("soak no rinse gentle safest for fiber", () => {
    expect(fiberSafe("soak_no_rinse_gentle")).toBeGreaterThan(fiberSafe("enzyme_scour_raw"));
  });
});

describe("colorPreserve", () => {
  it("vinegar rinse set best color preserve", () => {
    expect(colorPreserve("vinegar_rinse_set")).toBeGreaterThan(colorPreserve("enzyme_scour_raw"));
  });
});

describe("easeOfUse", () => {
  it("soak no rinse gentle easiest to use", () => {
    expect(easeOfUse("soak_no_rinse_gentle")).toBeGreaterThan(easeOfUse("enzyme_scour_raw"));
  });
});

describe("washCost", () => {
  it("soak no rinse gentle more expensive than vinegar", () => {
    expect(washCost("soak_no_rinse_gentle")).toBeGreaterThan(washCost("vinegar_rinse_set"));
  });
});

describe("noRinse", () => {
  it("soak no rinse gentle is no rinse", () => {
    expect(noRinse("soak_no_rinse_gentle")).toBe(true);
  });
  it("detergent fiber wash needs rinse", () => {
    expect(noRinse("detergent_fiber_wash")).toBe(false);
  });
});

describe("forRawFleece", () => {
  it("enzyme scour raw is for raw fleece", () => {
    expect(forRawFleece("enzyme_scour_raw")).toBe(true);
  });
  it("soak no rinse gentle is not for raw fleece", () => {
    expect(forRawFleece("soak_no_rinse_gentle")).toBe(false);
  });
});

describe("activeAgent", () => {
  it("vinegar rinse set uses acetic acid dilute", () => {
    expect(activeAgent("vinegar_rinse_set")).toBe("acetic_acid_dilute");
  });
});

describe("bestUse", () => {
  it("lanolin restore soft best for restore wool softness", () => {
    expect(bestUse("lanolin_restore_soft")).toBe("restore_wool_softness");
  });
});

describe("woolWashes", () => {
  it("returns 5 types", () => {
    expect(woolWashes()).toHaveLength(5);
  });
});
