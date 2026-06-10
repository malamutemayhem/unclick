import { describe, it, expect } from "vitest";
import {
  writingPrecision, pressureSensitivity, deviceCompat, comfort,
  stylusCost, needsBattery, tiltDetect, tipMaterial,
  bestUse, stylusPens,
} from "../stylus-pen-calc.js";

describe("writingPrecision", () => {
  it("apple pencil pro most precise writing", () => {
    expect(writingPrecision("apple_pencil_pro")).toBeGreaterThan(writingPrecision("rubber_tip_passive"));
  });
});

describe("pressureSensitivity", () => {
  it("apple pencil pro best pressure sensitivity", () => {
    expect(pressureSensitivity("apple_pencil_pro")).toBeGreaterThan(pressureSensitivity("fine_tip_active"));
  });
});

describe("deviceCompat", () => {
  it("rubber tip passive widest compatibility", () => {
    expect(deviceCompat("rubber_tip_passive")).toBeGreaterThan(deviceCompat("apple_pencil_pro"));
  });
});

describe("comfort", () => {
  it("apple pencil pro most comfortable", () => {
    expect(comfort("apple_pencil_pro")).toBeGreaterThan(comfort("mesh_fiber_universal"));
  });
});

describe("stylusCost", () => {
  it("apple pencil pro most expensive", () => {
    expect(stylusCost("apple_pencil_pro")).toBeGreaterThan(stylusCost("rubber_tip_passive"));
  });
});

describe("needsBattery", () => {
  it("fine tip active needs battery", () => {
    expect(needsBattery("fine_tip_active")).toBe(true);
  });
  it("rubber tip passive does not", () => {
    expect(needsBattery("rubber_tip_passive")).toBe(false);
  });
});

describe("tiltDetect", () => {
  it("apple pencil pro has tilt detect", () => {
    expect(tiltDetect("apple_pencil_pro")).toBe(true);
  });
  it("fine tip active does not", () => {
    expect(tiltDetect("fine_tip_active")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("disc tip precision uses clear disc floating point", () => {
    expect(tipMaterial("disc_tip_precision")).toBe("clear_disc_floating_point");
  });
});

describe("bestUse", () => {
  it("apple pencil pro best for digital art procreate", () => {
    expect(bestUse("apple_pencil_pro")).toBe("digital_art_procreate");
  });
});

describe("stylusPens", () => {
  it("returns 5 types", () => {
    expect(stylusPens()).toHaveLength(5);
  });
});
