import { describe, it, expect } from "vitest";
import {
  accuracy, tempRange, responseSpeed, durability,
  pyroCost, digital, contactFree, sensorType,
  bestUse, pyrometerKilns,
} from "../pyrometer-kiln-calc.js";

describe("accuracy", () => {
  it("thermocouple s high most accurate", () => {
    expect(accuracy("thermocouple_s_high")).toBeGreaterThan(accuracy("infrared_spot_quick"));
  });
});

describe("tempRange", () => {
  it("thermocouple s high widest temp range", () => {
    expect(tempRange("thermocouple_s_high")).toBeGreaterThan(tempRange("infrared_spot_quick"));
  });
});

describe("responseSpeed", () => {
  it("infrared spot quick fastest response", () => {
    expect(responseSpeed("infrared_spot_quick")).toBeGreaterThan(responseSpeed("thermocouple_k_standard"));
  });
});

describe("durability", () => {
  it("optical pyrometer visual most durable", () => {
    expect(durability("optical_pyrometer_visual")).toBeGreaterThan(durability("thermocouple_s_high"));
  });
});

describe("pyroCost", () => {
  it("digital controller auto most expensive", () => {
    expect(pyroCost("digital_controller_auto")).toBeGreaterThan(pyroCost("thermocouple_k_standard"));
  });
});

describe("digital", () => {
  it("thermocouple k standard is digital", () => {
    expect(digital("thermocouple_k_standard")).toBe(true);
  });
  it("optical pyrometer visual not digital", () => {
    expect(digital("optical_pyrometer_visual")).toBe(false);
  });
});

describe("contactFree", () => {
  it("infrared spot quick is contact free", () => {
    expect(contactFree("infrared_spot_quick")).toBe(true);
  });
  it("thermocouple k standard not contact free", () => {
    expect(contactFree("thermocouple_k_standard")).toBe(false);
  });
});

describe("sensorType", () => {
  it("thermocouple s high uses platinum rhodium wire", () => {
    expect(sensorType("thermocouple_s_high")).toBe("platinum_rhodium_wire");
  });
});

describe("bestUse", () => {
  it("thermocouple k standard best for general kiln monitor", () => {
    expect(bestUse("thermocouple_k_standard")).toBe("general_kiln_monitor");
  });
});

describe("pyrometerKilns", () => {
  it("returns 5 types", () => {
    expect(pyrometerKilns()).toHaveLength(5);
  });
});
