import { describe, it, expect } from "vitest";
import {
  thermalProtection, flexibility, depthRange, buoyancyControl,
  purchasePrice, requiresUndergarment, allowsSurfaceSwimming, sealMethod,
  bestCondition, divingSuits,
} from "../diving-suit-calc.js";

describe("thermalProtection", () => {
  it("drysuit best thermal protection", () => {
    expect(thermalProtection("drysuit")).toBeGreaterThan(thermalProtection("dive_skin"));
  });
});

describe("flexibility", () => {
  it("dive skin most flexible", () => {
    expect(flexibility("dive_skin")).toBeGreaterThan(flexibility("atmospheric"));
  });
});

describe("depthRange", () => {
  it("atmospheric deepest range", () => {
    expect(depthRange("atmospheric")).toBeGreaterThan(depthRange("wetsuit"));
  });
});

describe("buoyancyControl", () => {
  it("atmospheric best buoyancy control", () => {
    expect(buoyancyControl("atmospheric")).toBeGreaterThan(buoyancyControl("dive_skin"));
  });
});

describe("purchasePrice", () => {
  it("atmospheric most expensive", () => {
    expect(purchasePrice("atmospheric")).toBeGreaterThan(purchasePrice("dive_skin"));
  });
});

describe("requiresUndergarment", () => {
  it("drysuit requires undergarment", () => {
    expect(requiresUndergarment("drysuit")).toBe(true);
  });
  it("wetsuit does not", () => {
    expect(requiresUndergarment("wetsuit")).toBe(false);
  });
});

describe("allowsSurfaceSwimming", () => {
  it("wetsuit allows surface swimming", () => {
    expect(allowsSurfaceSwimming("wetsuit")).toBe(true);
  });
  it("atmospheric does not", () => {
    expect(allowsSurfaceSwimming("atmospheric")).toBe(false);
  });
});

describe("sealMethod", () => {
  it("drysuit uses watertight zipper gasket", () => {
    expect(sealMethod("drysuit")).toBe("watertight_zipper_gasket");
  });
});

describe("bestCondition", () => {
  it("dive skin for tropical jellyfish protection", () => {
    expect(bestCondition("dive_skin")).toBe("tropical_jellyfish_protection");
  });
});

describe("divingSuits", () => {
  it("returns 5 suits", () => {
    expect(divingSuits()).toHaveLength(5);
  });
});
