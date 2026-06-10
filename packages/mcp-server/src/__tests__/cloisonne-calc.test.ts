import { describe, it, expect } from "vitest";
import {
  wireDetail, adhesion, bendEase, fireResist,
  wireCost, preciousMetal, flatProfile, wireAlloy,
  bestUse, cloisonneWires,
} from "../cloisonne-calc.js";

describe("wireDetail", () => {
  it("fine silver wire most wire detail", () => {
    expect(wireDetail("fine_silver_wire")).toBeGreaterThan(wireDetail("brass_round_wire"));
  });
});

describe("adhesion", () => {
  it("copper flat strip best adhesion", () => {
    expect(adhesion("copper_flat_strip")).toBeGreaterThan(adhesion("silver_plated_base"));
  });
});

describe("bendEase", () => {
  it("fine silver wire easiest bend", () => {
    expect(bendEase("fine_silver_wire")).toBeGreaterThan(bendEase("brass_round_wire"));
  });
});

describe("fireResist", () => {
  it("fine silver wire best fire resist", () => {
    expect(fireResist("fine_silver_wire")).toBeGreaterThan(fireResist("brass_round_wire"));
  });
});

describe("wireCost", () => {
  it("gold cloisonne wire most expensive", () => {
    expect(wireCost("gold_cloisonne_wire")).toBeGreaterThan(wireCost("copper_flat_strip"));
  });
});

describe("preciousMetal", () => {
  it("fine silver wire is precious metal", () => {
    expect(preciousMetal("fine_silver_wire")).toBe(true);
  });
  it("copper flat strip not precious metal", () => {
    expect(preciousMetal("copper_flat_strip")).toBe(false);
  });
});

describe("flatProfile", () => {
  it("fine silver wire has flat profile", () => {
    expect(flatProfile("fine_silver_wire")).toBe(true);
  });
  it("brass round wire not flat profile", () => {
    expect(flatProfile("brass_round_wire")).toBe(false);
  });
});

describe("wireAlloy", () => {
  it("fine silver wire uses 999 fine silver", () => {
    expect(wireAlloy("fine_silver_wire")).toBe("999_fine_silver");
  });
});

describe("bestUse", () => {
  it("gold cloisonne wire best for luxury fine detail", () => {
    expect(bestUse("gold_cloisonne_wire")).toBe("luxury_fine_detail");
  });
});

describe("cloisonneWires", () => {
  it("returns 5 types", () => {
    expect(cloisonneWires()).toHaveLength(5);
  });
});
