import { describe, it, expect } from "vitest";
import {
  itemCount, traumaReady, portability, weatherResist,
  kitCost, hasManual, oshaCompliant, caseType,
  bestScenario, firstAidKits,
} from "../first-aid-kit-calc.js";

describe("itemCount", () => {
  it("industrial workplace most items", () => {
    expect(itemCount("industrial_workplace")).toBeGreaterThan(itemCount("travel_compact"));
  });
});

describe("traumaReady", () => {
  it("industrial workplace most trauma ready", () => {
    expect(traumaReady("industrial_workplace")).toBeGreaterThan(traumaReady("basic_home_25pc"));
  });
});

describe("portability", () => {
  it("travel compact most portable", () => {
    expect(portability("travel_compact")).toBeGreaterThan(portability("industrial_workplace"));
  });
});

describe("weatherResist", () => {
  it("outdoor adventure best weather resistance", () => {
    expect(weatherResist("outdoor_adventure")).toBeGreaterThan(weatherResist("basic_home_25pc"));
  });
});

describe("kitCost", () => {
  it("industrial workplace most expensive", () => {
    expect(kitCost("industrial_workplace")).toBeGreaterThan(kitCost("basic_home_25pc"));
  });
});

describe("hasManual", () => {
  it("basic home 25pc has manual", () => {
    expect(hasManual("basic_home_25pc")).toBe(true);
  });
  it("travel compact does not", () => {
    expect(hasManual("travel_compact")).toBe(false);
  });
});

describe("oshaCompliant", () => {
  it("industrial workplace is osha compliant", () => {
    expect(oshaCompliant("industrial_workplace")).toBe(true);
  });
  it("basic home 25pc is not", () => {
    expect(oshaCompliant("basic_home_25pc")).toBe(false);
  });
});

describe("caseType", () => {
  it("outdoor adventure uses nylon molle waterproof", () => {
    expect(caseType("outdoor_adventure")).toBe("nylon_molle_waterproof");
  });
});

describe("bestScenario", () => {
  it("outdoor adventure best for hiking camping remote", () => {
    expect(bestScenario("outdoor_adventure")).toBe("hiking_camping_remote");
  });
});

describe("firstAidKits", () => {
  it("returns 5 types", () => {
    expect(firstAidKits()).toHaveLength(5);
  });
});
