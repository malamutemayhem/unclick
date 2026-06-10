import { describe, it, expect } from "vitest";
import {
  cleaningSpeed, acidSafety, capacity, tempControl,
  potCost, heatsPickle, hasUltrasonic, vesselMaterial,
  bestUse, picklePots,
} from "../pickle-pot-calc.js";

describe("cleaningSpeed", () => {
  it("ultrasonic clean combo fastest cleaning", () => {
    expect(cleaningSpeed("ultrasonic_clean_combo")).toBeGreaterThan(cleaningSpeed("glass_jar_cold"));
  });
});

describe("acidSafety", () => {
  it("glass jar cold safest acid handling", () => {
    expect(acidSafety("glass_jar_cold")).toBeGreaterThan(acidSafety("copper_lined_fast"));
  });
});

describe("capacity", () => {
  it("copper lined fast most capacity", () => {
    expect(capacity("copper_lined_fast")).toBeGreaterThan(capacity("glass_jar_cold"));
  });
});

describe("tempControl", () => {
  it("electric heated warm best temp control", () => {
    expect(tempControl("electric_heated_warm")).toBeGreaterThan(tempControl("glass_jar_cold"));
  });
});

describe("potCost", () => {
  it("ultrasonic clean combo most expensive", () => {
    expect(potCost("ultrasonic_clean_combo")).toBeGreaterThan(potCost("ceramic_crock_slow"));
  });
});

describe("heatsPickle", () => {
  it("electric heated warm heats pickle", () => {
    expect(heatsPickle("electric_heated_warm")).toBe(true);
  });
  it("glass jar cold does not heat pickle", () => {
    expect(heatsPickle("glass_jar_cold")).toBe(false);
  });
});

describe("hasUltrasonic", () => {
  it("ultrasonic clean combo has ultrasonic", () => {
    expect(hasUltrasonic("ultrasonic_clean_combo")).toBe(true);
  });
  it("electric heated warm has no ultrasonic", () => {
    expect(hasUltrasonic("electric_heated_warm")).toBe(false);
  });
});

describe("vesselMaterial", () => {
  it("glass jar cold uses borosilicate glass jar", () => {
    expect(vesselMaterial("glass_jar_cold")).toBe("borosilicate_glass_jar");
  });
});

describe("bestUse", () => {
  it("ultrasonic clean combo best for fine detail clean", () => {
    expect(bestUse("ultrasonic_clean_combo")).toBe("fine_detail_clean");
  });
});

describe("picklePots", () => {
  it("returns 5 types", () => {
    expect(picklePots()).toHaveLength(5);
  });
});
