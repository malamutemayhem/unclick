import { describe, it, expect } from "vitest";
import {
  windPowerCapture, pointingAbility, handlingDifficulty,
  lightWindPerformance, heavyWindSafety, downwindOnly,
  headsail, typicalAreaSqm, bestCondition, sailTypes,
} from "../sail-type-calc.js";

describe("windPowerCapture", () => {
  it("spinnaker captures most wind", () => {
    expect(windPowerCapture("spinnaker")).toBeGreaterThan(
      windPowerCapture("staysail")
    );
  });
});

describe("pointingAbility", () => {
  it("jib points highest", () => {
    expect(pointingAbility("jib")).toBeGreaterThan(
      pointingAbility("spinnaker")
    );
  });
});

describe("handlingDifficulty", () => {
  it("spinnaker is hardest to handle", () => {
    expect(handlingDifficulty("spinnaker")).toBeGreaterThan(
      handlingDifficulty("jib")
    );
  });
});

describe("lightWindPerformance", () => {
  it("spinnaker performs best in light wind", () => {
    expect(lightWindPerformance("spinnaker")).toBeGreaterThan(
      lightWindPerformance("staysail")
    );
  });
});

describe("heavyWindSafety", () => {
  it("staysail safest in heavy wind", () => {
    expect(heavyWindSafety("staysail")).toBeGreaterThan(
      heavyWindSafety("spinnaker")
    );
  });
});

describe("downwindOnly", () => {
  it("spinnaker is downwind only", () => {
    expect(downwindOnly("spinnaker")).toBe(true);
  });
  it("jib is not", () => {
    expect(downwindOnly("jib")).toBe(false);
  });
});

describe("headsail", () => {
  it("genoa is a headsail", () => {
    expect(headsail("genoa")).toBe(true);
  });
  it("mainsail is not", () => {
    expect(headsail("mainsail")).toBe(false);
  });
});

describe("typicalAreaSqm", () => {
  it("spinnaker has largest area", () => {
    expect(typicalAreaSqm("spinnaker")).toBeGreaterThan(
      typicalAreaSqm("jib")
    );
  });
});

describe("bestCondition", () => {
  it("staysail for storms", () => {
    expect(bestCondition("staysail")).toBe("storm");
  });
});

describe("sailTypes", () => {
  it("returns 5 types", () => {
    expect(sailTypes()).toHaveLength(5);
  });
});
