import { describe, it, expect } from "vitest";
import {
  accuracy, readability, durability, portability,
  gaugeCost, needsBattery, autoShutoff, displayType,
  bestVehicle, tireGauges,
} from "../tire-gauge-calc.js";

describe("accuracy", () => {
  it("digital backlit auto most accurate", () => {
    expect(accuracy("digital_backlit_auto")).toBeGreaterThan(accuracy("pencil_stick_pocket"));
  });
});

describe("readability", () => {
  it("digital backlit auto most readable", () => {
    expect(readability("digital_backlit_auto")).toBeGreaterThan(readability("pencil_stick_pocket"));
  });
});

describe("durability", () => {
  it("heavy duty truck most durable", () => {
    expect(durability("heavy_duty_truck")).toBeGreaterThan(durability("digital_backlit_auto"));
  });
});

describe("portability", () => {
  it("pencil stick pocket most portable", () => {
    expect(portability("pencil_stick_pocket")).toBeGreaterThan(portability("inflator_gauge_combo"));
  });
});

describe("gaugeCost", () => {
  it("inflator gauge combo most expensive", () => {
    expect(gaugeCost("inflator_gauge_combo")).toBeGreaterThan(gaugeCost("pencil_stick_pocket"));
  });
});

describe("needsBattery", () => {
  it("digital backlit auto needs battery", () => {
    expect(needsBattery("digital_backlit_auto")).toBe(true);
  });
  it("pencil stick pocket does not", () => {
    expect(needsBattery("pencil_stick_pocket")).toBe(false);
  });
});

describe("autoShutoff", () => {
  it("digital backlit auto has auto shutoff", () => {
    expect(autoShutoff("digital_backlit_auto")).toBe(true);
  });
  it("dial analog face does not", () => {
    expect(autoShutoff("dial_analog_face")).toBe(false);
  });
});

describe("displayType", () => {
  it("dial analog face uses needle dial face psi", () => {
    expect(displayType("dial_analog_face")).toBe("needle_dial_face_psi");
  });
});

describe("bestVehicle", () => {
  it("heavy duty truck best for commercial rv fleet", () => {
    expect(bestVehicle("heavy_duty_truck")).toBe("commercial_rv_fleet");
  });
});

describe("tireGauges", () => {
  it("returns 5 types", () => {
    expect(tireGauges()).toHaveLength(5);
  });
});
