import { describe, it, expect } from "vitest";
import {
  outputGramsPerHour, fiberAlignment, vmRemoval,
  blendingCapability, outputForm, portability,
  fiberWastePercent, skillLevel, costEstimate, cardingMethods,
} from "../carding-calc.js";

describe("outputGramsPerHour", () => {
  it("drum carder is fastest", () => {
    expect(outputGramsPerHour("drum_carder")).toBeGreaterThan(
      outputGramsPerHour("combs")
    );
  });
});

describe("fiberAlignment", () => {
  it("combs align fibers best", () => {
    expect(fiberAlignment("combs")).toBeGreaterThan(
      fiberAlignment("drum_carder")
    );
  });
});

describe("vmRemoval", () => {
  it("combs remove most VM", () => {
    expect(vmRemoval("combs")).toBeGreaterThan(
      vmRemoval("blending_board")
    );
  });
});

describe("blendingCapability", () => {
  it("blending board blends best", () => {
    expect(blendingCapability("blending_board")).toBeGreaterThan(
      blendingCapability("combs")
    );
  });
});

describe("outputForm", () => {
  it("combs produce top", () => {
    expect(outputForm("combs")).toBe("top");
  });
});

describe("portability", () => {
  it("flick card is most portable", () => {
    expect(portability("flick_card")).toBeGreaterThan(
      portability("drum_carder")
    );
  });
});

describe("fiberWastePercent", () => {
  it("combs waste most fiber", () => {
    expect(fiberWastePercent("combs")).toBeGreaterThan(
      fiberWastePercent("blending_board")
    );
  });
});

describe("skillLevel", () => {
  it("combs need most skill", () => {
    expect(skillLevel("combs")).toBeGreaterThan(
      skillLevel("flick_card")
    );
  });
});

describe("costEstimate", () => {
  it("drum carder is most expensive", () => {
    expect(costEstimate("drum_carder")).toBeGreaterThan(
      costEstimate("flick_card")
    );
  });
});

describe("cardingMethods", () => {
  it("returns 5 methods", () => {
    expect(cardingMethods()).toHaveLength(5);
  });
});
