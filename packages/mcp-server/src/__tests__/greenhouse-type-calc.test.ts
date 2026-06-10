import { describe, it, expect } from "vitest";
import {
  temperatureControlRating, lightTransmission, buildCost,
  durabilityYears, growingAreaM2, portable,
  heatable, bestCrop, seasonExtensionMonths, greenhouseTypes,
} from "../greenhouse-type-calc.js";

describe("temperatureControlRating", () => {
  it("glass has best temperature control", () => {
    expect(temperatureControlRating("glass")).toBeGreaterThan(
      temperatureControlRating("cold_frame")
    );
  });
});

describe("lightTransmission", () => {
  it("glass has best light transmission", () => {
    expect(lightTransmission("glass")).toBeGreaterThan(
      lightTransmission("lean_to")
    );
  });
});

describe("buildCost", () => {
  it("glass costs most to build", () => {
    expect(buildCost("glass")).toBeGreaterThan(
      buildCost("cold_frame")
    );
  });
});

describe("durabilityYears", () => {
  it("glass lasts longest", () => {
    expect(durabilityYears("glass")).toBeGreaterThan(
      durabilityYears("hoop_house")
    );
  });
});

describe("growingAreaM2", () => {
  it("glass has largest growing area", () => {
    expect(growingAreaM2("glass")).toBeGreaterThan(
      growingAreaM2("cold_frame")
    );
  });
});

describe("portable", () => {
  it("cold frame is portable", () => {
    expect(portable("cold_frame")).toBe(true);
  });
  it("glass is not", () => {
    expect(portable("glass")).toBe(false);
  });
});

describe("heatable", () => {
  it("glass is heatable", () => {
    expect(heatable("glass")).toBe(true);
  });
  it("cold frame is not", () => {
    expect(heatable("cold_frame")).toBe(false);
  });
});

describe("bestCrop", () => {
  it("glass best for orchids", () => {
    expect(bestCrop("glass")).toBe("orchids");
  });
});

describe("seasonExtensionMonths", () => {
  it("glass extends season most", () => {
    expect(seasonExtensionMonths("glass")).toBeGreaterThan(
      seasonExtensionMonths("cold_frame")
    );
  });
});

describe("greenhouseTypes", () => {
  it("returns 5 types", () => {
    expect(greenhouseTypes()).toHaveLength(5);
  });
});
