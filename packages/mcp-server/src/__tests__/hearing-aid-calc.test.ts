import { describe, it, expect } from "vitest";
import {
  amplificationPower, discreteness, batteryLife, feedbackControl,
  purchasePrice, requiresSurgery, bluetoothCapable, transducerType,
  bestCandidate, hearingAids,
} from "../hearing-aid-calc.js";

describe("amplificationPower", () => {
  it("behind the ear strongest amplification", () => {
    expect(amplificationPower("behind_the_ear")).toBeGreaterThan(amplificationPower("completely_in_canal"));
  });
});

describe("discreteness", () => {
  it("completely in canal most discrete", () => {
    expect(discreteness("completely_in_canal")).toBeGreaterThan(discreteness("behind_the_ear"));
  });
});

describe("batteryLife", () => {
  it("behind the ear longest battery", () => {
    expect(batteryLife("behind_the_ear")).toBeGreaterThan(batteryLife("completely_in_canal"));
  });
});

describe("feedbackControl", () => {
  it("behind the ear best feedback control", () => {
    expect(feedbackControl("behind_the_ear")).toBeGreaterThan(feedbackControl("completely_in_canal"));
  });
});

describe("purchasePrice", () => {
  it("bone anchored most expensive", () => {
    expect(purchasePrice("bone_anchored")).toBeGreaterThan(purchasePrice("behind_the_ear"));
  });
});

describe("requiresSurgery", () => {
  it("bone anchored requires surgery", () => {
    expect(requiresSurgery("bone_anchored")).toBe(true);
  });
  it("behind the ear does not", () => {
    expect(requiresSurgery("behind_the_ear")).toBe(false);
  });
});

describe("bluetoothCapable", () => {
  it("behind the ear has bluetooth", () => {
    expect(bluetoothCapable("behind_the_ear")).toBe(true);
  });
  it("completely in canal does not", () => {
    expect(bluetoothCapable("completely_in_canal")).toBe(false);
  });
});

describe("transducerType", () => {
  it("bone anchored uses osseointegrated vibrator", () => {
    expect(transducerType("bone_anchored")).toBe("osseointegrated_vibrator");
  });
});

describe("bestCandidate", () => {
  it("behind the ear for severe profound", () => {
    expect(bestCandidate("behind_the_ear")).toBe("severe_profound_loss");
  });
});

describe("hearingAids", () => {
  it("returns 5 aids", () => {
    expect(hearingAids()).toHaveLength(5);
  });
});
