import { describe, it, expect } from "vitest";
import {
  explosivity, columnHeight, lavaOutput, ashFallout,
  hazardRadius, continuous, involvesWater, veiRange,
  famousExample, eruptionStyles,
} from "../eruption-style-calc.js";

describe("explosivity", () => {
  it("plinian most explosive", () => {
    expect(explosivity("plinian")).toBeGreaterThan(explosivity("hawaiian"));
  });
});

describe("columnHeight", () => {
  it("plinian tallest column", () => {
    expect(columnHeight("plinian")).toBeGreaterThan(columnHeight("hawaiian"));
  });
});

describe("lavaOutput", () => {
  it("hawaiian most lava", () => {
    expect(lavaOutput("hawaiian")).toBeGreaterThan(lavaOutput("plinian"));
  });
});

describe("ashFallout", () => {
  it("plinian most ash", () => {
    expect(ashFallout("plinian")).toBeGreaterThan(ashFallout("hawaiian"));
  });
});

describe("hazardRadius", () => {
  it("plinian largest hazard", () => {
    expect(hazardRadius("plinian")).toBeGreaterThan(hazardRadius("hawaiian"));
  });
});

describe("continuous", () => {
  it("hawaiian is continuous", () => {
    expect(continuous("hawaiian")).toBe(true);
  });
  it("plinian is not", () => {
    expect(continuous("plinian")).toBe(false);
  });
});

describe("involvesWater", () => {
  it("phreatomagmatic involves water", () => {
    expect(involvesWater("phreatomagmatic")).toBe(true);
  });
  it("hawaiian does not", () => {
    expect(involvesWater("hawaiian")).toBe(false);
  });
});

describe("veiRange", () => {
  it("plinian is vei 4 8", () => {
    expect(veiRange("plinian")).toBe("vei_4_8");
  });
});

describe("famousExample", () => {
  it("plinian is vesuvius 79ad", () => {
    expect(famousExample("plinian")).toBe("vesuvius_79ad");
  });
});

describe("eruptionStyles", () => {
  it("returns 5 styles", () => {
    expect(eruptionStyles()).toHaveLength(5);
  });
});
