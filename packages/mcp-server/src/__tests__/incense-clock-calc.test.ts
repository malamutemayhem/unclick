import { describe, it, expect } from "vitest";
import {
  burnTimeHours, burnRateCmPerMinute, accuracyMinutes, scentIntensity,
  smokeLevel, draftSensitivity, alarmCapable, holderRequired,
  costPerHour, incenseTypes,
} from "../incense-clock-calc.js";

describe("burnTimeHours", () => {
  it("coil burns longest", () => {
    expect(burnTimeHours("coil")).toBeGreaterThan(burnTimeHours("cone"));
  });
});

describe("burnRateCmPerMinute", () => {
  it("cone burns fastest", () => {
    expect(burnRateCmPerMinute("cone")).toBeGreaterThan(
      burnRateCmPerMinute("coil")
    );
  });
});

describe("accuracyMinutes", () => {
  it("cone is most accurate", () => {
    expect(accuracyMinutes("cone")).toBeLessThan(
      accuracyMinutes("coil")
    );
  });
});

describe("scentIntensity", () => {
  it("cone is most fragrant", () => {
    expect(scentIntensity("cone")).toBeGreaterThan(
      scentIntensity("coil")
    );
  });
});

describe("smokeLevel", () => {
  it("cone is smokiest", () => {
    expect(smokeLevel("cone")).toBeGreaterThan(smokeLevel("trail"));
  });
});

describe("draftSensitivity", () => {
  it("trail is most draft sensitive", () => {
    expect(draftSensitivity("trail")).toBeGreaterThan(
      draftSensitivity("cone")
    );
  });
});

describe("alarmCapable", () => {
  it("trail can set alarms", () => {
    expect(alarmCapable("trail")).toBe(true);
  });
  it("stick cannot set alarms", () => {
    expect(alarmCapable("stick")).toBe(false);
  });
});

describe("holderRequired", () => {
  it("trail does not need holder", () => {
    expect(holderRequired("trail")).toBe(false);
  });
  it("stick needs holder", () => {
    expect(holderRequired("stick")).toBe(true);
  });
});

describe("costPerHour", () => {
  it("koh is most expensive", () => {
    expect(costPerHour("koh")).toBeGreaterThan(costPerHour("coil"));
  });
});

describe("incenseTypes", () => {
  it("returns 5 types", () => {
    expect(incenseTypes()).toHaveLength(5);
  });
});
