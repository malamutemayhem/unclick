import { describe, it, expect } from "vitest";
import {
  vibrationIsolate, micCompatibility, durability, adjustability,
  mountCost, replaceParts, handheldUse, suspensionType,
  bestMic, shockMounts,
} from "../shock-mount-calc.js";

describe("vibrationIsolate", () => {
  it("internal capsule float best vibration isolate", () => {
    expect(vibrationIsolate("internal_capsule_float")).toBeGreaterThan(vibrationIsolate("pistol_grip_handle"));
  });
});

describe("micCompatibility", () => {
  it("elastic suspension spider most mic compatibility", () => {
    expect(micCompatibility("elastic_suspension_spider")).toBeGreaterThan(micCompatibility("internal_capsule_float"));
  });
});

describe("durability", () => {
  it("pistol grip handle most durable", () => {
    expect(durability("pistol_grip_handle")).toBeGreaterThan(durability("rubber_band_cradle"));
  });
});

describe("adjustability", () => {
  it("elastic suspension spider most adjustable", () => {
    expect(adjustability("elastic_suspension_spider")).toBeGreaterThan(adjustability("internal_capsule_float"));
  });
});

describe("mountCost", () => {
  it("internal capsule float most expensive", () => {
    expect(mountCost("internal_capsule_float")).toBeGreaterThan(mountCost("rubber_band_cradle"));
  });
});

describe("replaceParts", () => {
  it("elastic suspension spider has replace parts", () => {
    expect(replaceParts("elastic_suspension_spider")).toBe(true);
  });
  it("pistol grip handle has no replace parts", () => {
    expect(replaceParts("pistol_grip_handle")).toBe(false);
  });
});

describe("handheldUse", () => {
  it("pistol grip handle supports handheld use", () => {
    expect(handheldUse("pistol_grip_handle")).toBe(true);
  });
  it("elastic suspension spider does not support handheld", () => {
    expect(handheldUse("elastic_suspension_spider")).toBe(false);
  });
});

describe("suspensionType", () => {
  it("elastic suspension spider uses elastic cord web", () => {
    expect(suspensionType("elastic_suspension_spider")).toBe("elastic_cord_web");
  });
});

describe("bestMic", () => {
  it("pistol grip handle best for shotgun boom field", () => {
    expect(bestMic("pistol_grip_handle")).toBe("shotgun_boom_field");
  });
});

describe("shockMounts", () => {
  it("returns 5 types", () => {
    expect(shockMounts()).toHaveLength(5);
  });
});
