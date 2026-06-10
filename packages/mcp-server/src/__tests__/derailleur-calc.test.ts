import { describe, it, expect } from "vitest";
import {
  shiftPrecision, shiftEffort, chainRetention, maintenanceLevel,
  componentCost, wireless, requiresBattery, actuation,
  bestBike, derailleurs,
} from "../derailleur-calc.js";

describe("shiftPrecision", () => {
  it("electronic di2 most precise", () => {
    expect(shiftPrecision("electronic_di2")).toBeGreaterThan(shiftPrecision("mechanical_rim"));
  });
});

describe("shiftEffort", () => {
  it("electronic axs least effort", () => {
    expect(shiftEffort("electronic_axs")).toBeGreaterThan(shiftEffort("mechanical_rim"));
  });
});

describe("chainRetention", () => {
  it("single speed best retention", () => {
    expect(chainRetention("single_speed")).toBeGreaterThan(chainRetention("mechanical_rim"));
  });
});

describe("maintenanceLevel", () => {
  it("mechanical rim most maintenance", () => {
    expect(maintenanceLevel("mechanical_rim")).toBeGreaterThan(maintenanceLevel("electronic_axs"));
  });
});

describe("componentCost", () => {
  it("electronic axs most expensive", () => {
    expect(componentCost("electronic_axs")).toBeGreaterThan(componentCost("single_speed"));
  });
});

describe("wireless", () => {
  it("electronic axs is wireless", () => {
    expect(wireless("electronic_axs")).toBe(true);
  });
  it("electronic di2 is not", () => {
    expect(wireless("electronic_di2")).toBe(false);
  });
});

describe("requiresBattery", () => {
  it("electronic di2 requires battery", () => {
    expect(requiresBattery("electronic_di2")).toBe(true);
  });
  it("mechanical clutch does not", () => {
    expect(requiresBattery("mechanical_clutch")).toBe(false);
  });
});

describe("actuation", () => {
  it("electronic axs uses wireless servo bluetooth", () => {
    expect(actuation("electronic_axs")).toBe("wireless_servo_bluetooth");
  });
});

describe("bestBike", () => {
  it("single speed for track urban fixie", () => {
    expect(bestBike("single_speed")).toBe("track_urban_fixie");
  });
});

describe("derailleurs", () => {
  it("returns 5 types", () => {
    expect(derailleurs()).toHaveLength(5);
  });
});
