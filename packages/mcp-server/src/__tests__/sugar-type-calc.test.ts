import { describe, it, expect } from "vitest";
import {
  sweetnessLevel, molassesContent, moistureLevel,
  crystalSize, processingLevel, dissolvesFast,
  addsMoisture, bestUse, flavorProfile, sugarTypes,
} from "../sugar-type-calc.js";

describe("sweetnessLevel", () => {
  it("granulated sweetest", () => {
    expect(sweetnessLevel("granulated")).toBeGreaterThanOrEqual(
      sweetnessLevel("turbinado")
    );
  });
});

describe("molassesContent", () => {
  it("muscovado most molasses", () => {
    expect(molassesContent("muscovado")).toBeGreaterThan(
      molassesContent("brown")
    );
  });
});

describe("moistureLevel", () => {
  it("muscovado most moisture", () => {
    expect(moistureLevel("muscovado")).toBeGreaterThan(
      moistureLevel("granulated")
    );
  });
});

describe("crystalSize", () => {
  it("turbinado largest crystals", () => {
    expect(crystalSize("turbinado")).toBeGreaterThan(
      crystalSize("powdered")
    );
  });
});

describe("processingLevel", () => {
  it("powdered most processed", () => {
    expect(processingLevel("powdered")).toBeGreaterThan(
      processingLevel("muscovado")
    );
  });
});

describe("dissolvesFast", () => {
  it("powdered dissolves fast", () => {
    expect(dissolvesFast("powdered")).toBe(true);
  });
  it("turbinado does not", () => {
    expect(dissolvesFast("turbinado")).toBe(false);
  });
});

describe("addsMoisture", () => {
  it("brown adds moisture", () => {
    expect(addsMoisture("brown")).toBe(true);
  });
  it("granulated does not", () => {
    expect(addsMoisture("granulated")).toBe(false);
  });
});

describe("bestUse", () => {
  it("powdered for icing", () => {
    expect(bestUse("powdered")).toBe("icing_dusting");
  });
});

describe("flavorProfile", () => {
  it("muscovado deep molasses", () => {
    expect(flavorProfile("muscovado")).toBe("deep_molasses");
  });
});

describe("sugarTypes", () => {
  it("returns 5 types", () => {
    expect(sugarTypes()).toHaveLength(5);
  });
});
