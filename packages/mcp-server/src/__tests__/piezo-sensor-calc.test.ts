import { describe, it, expect } from "vitest";
import {
  sensitivity, frequencyRange, flexibility, durability,
  piezoCost, selfPowered, forVibration, elementType,
  bestUse, piezoSensors,
} from "../piezo-sensor-calc.js";

describe("sensitivity", () => {
  it("bimorph bender disp most sensitive", () => {
    expect(sensitivity("bimorph_bender_disp")).toBeGreaterThan(sensitivity("stack_actuator_force"));
  });
});

describe("frequencyRange", () => {
  it("rope sensor inline widest frequency range", () => {
    expect(frequencyRange("rope_sensor_inline")).toBeGreaterThan(frequencyRange("bimorph_bender_disp"));
  });
});

describe("flexibility", () => {
  it("film strip flexible most flexible", () => {
    expect(flexibility("film_strip_flexible")).toBeGreaterThan(flexibility("stack_actuator_force"));
  });
});

describe("durability", () => {
  it("stack actuator force most durable", () => {
    expect(durability("stack_actuator_force")).toBeGreaterThan(durability("film_strip_flexible"));
  });
});

describe("piezoCost", () => {
  it("stack actuator force most expensive", () => {
    expect(piezoCost("stack_actuator_force")).toBeGreaterThan(piezoCost("disc_element_basic"));
  });
});

describe("selfPowered", () => {
  it("disc element basic is self powered", () => {
    expect(selfPowered("disc_element_basic")).toBe(true);
  });
  it("stack actuator force not self powered", () => {
    expect(selfPowered("stack_actuator_force")).toBe(false);
  });
});

describe("forVibration", () => {
  it("film strip flexible is for vibration", () => {
    expect(forVibration("film_strip_flexible")).toBe(true);
  });
  it("stack actuator force not for vibration", () => {
    expect(forVibration("stack_actuator_force")).toBe(false);
  });
});

describe("elementType", () => {
  it("rope sensor inline uses coaxial piezo cable", () => {
    expect(elementType("rope_sensor_inline")).toBe("coaxial_piezo_cable");
  });
});

describe("bestUse", () => {
  it("bimorph bender disp best for displacement measure", () => {
    expect(bestUse("bimorph_bender_disp")).toBe("displacement_measure");
  });
});

describe("piezoSensors", () => {
  it("returns 5 types", () => {
    expect(piezoSensors()).toHaveLength(5);
  });
});
