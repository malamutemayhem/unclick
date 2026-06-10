import { describe, it, expect } from "vitest";
import {
  danceability, loadBearing, surfaceTraction, portability,
  installCost, underLighting, rollUpStorage, surfaceMaterial,
  bestVenue, stageFloors,
} from "../stage-floor-calc.js";

describe("danceability", () => {
  it("hardwood sprung best danceability", () => {
    expect(danceability("hardwood_sprung")).toBeGreaterThan(danceability("acrylic_glass"));
  });
});

describe("loadBearing", () => {
  it("modular deck best load bearing", () => {
    expect(loadBearing("modular_deck")).toBeGreaterThan(loadBearing("marley_vinyl"));
  });
});

describe("surfaceTraction", () => {
  it("marley vinyl best surface traction", () => {
    expect(surfaceTraction("marley_vinyl")).toBeGreaterThan(surfaceTraction("acrylic_glass"));
  });
});

describe("portability", () => {
  it("modular deck most portable", () => {
    expect(portability("modular_deck")).toBeGreaterThan(portability("hardwood_sprung"));
  });
});

describe("installCost", () => {
  it("hardwood sprung most expensive install", () => {
    expect(installCost("hardwood_sprung")).toBeGreaterThan(installCost("painted_mdf"));
  });
});

describe("underLighting", () => {
  it("acrylic glass supports under lighting", () => {
    expect(underLighting("acrylic_glass")).toBe(true);
  });
  it("hardwood sprung does not", () => {
    expect(underLighting("hardwood_sprung")).toBe(false);
  });
});

describe("rollUpStorage", () => {
  it("marley vinyl supports roll up storage", () => {
    expect(rollUpStorage("marley_vinyl")).toBe(true);
  });
  it("modular deck does not", () => {
    expect(rollUpStorage("modular_deck")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("acrylic glass uses tempered acrylic panel led", () => {
    expect(surfaceMaterial("acrylic_glass")).toBe("tempered_acrylic_panel_led");
  });
});

describe("bestVenue", () => {
  it("modular deck for outdoor event concert", () => {
    expect(bestVenue("modular_deck")).toBe("outdoor_event_concert");
  });
});

describe("stageFloors", () => {
  it("returns 5 floor types", () => {
    expect(stageFloors()).toHaveLength(5);
  });
});
