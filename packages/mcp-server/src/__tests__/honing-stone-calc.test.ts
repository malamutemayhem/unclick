import { describe, it, expect } from "vitest";
import {
  finish_, mrr, life, hardness,
  hsCost, superabrasive, forHardened, abrasive,
  bestUse, honingStoneTypes,
} from "../honing-stone-calc.js";

describe("finish_", () => {
  it("diamond best finish", () => {
    expect(finish_("diamond_superabrasive")).toBeGreaterThan(finish_("aluminum_oxide_conventional"));
  });
});

describe("mrr", () => {
  it("cbn highest mrr", () => {
    expect(mrr("cbn_cubic_boron_nitride")).toBeGreaterThan(mrr("silicon_carbide_green"));
  });
});

describe("life", () => {
  it("diamond longest life", () => {
    expect(life("diamond_superabrasive")).toBeGreaterThan(life("aluminum_oxide_conventional"));
  });
});

describe("hardness", () => {
  it("diamond hardest", () => {
    expect(hardness("diamond_superabrasive")).toBeGreaterThan(hardness("aluminum_oxide_conventional"));
  });
});

describe("hsCost", () => {
  it("diamond most expensive", () => {
    expect(hsCost("diamond_superabrasive")).toBeGreaterThan(hsCost("aluminum_oxide_conventional"));
  });
});

describe("superabrasive", () => {
  it("cbn is superabrasive", () => {
    expect(superabrasive("cbn_cubic_boron_nitride")).toBe(true);
  });
  it("aluminum oxide not superabrasive", () => {
    expect(superabrasive("aluminum_oxide_conventional")).toBe(false);
  });
});

describe("forHardened", () => {
  it("cbn for hardened", () => {
    expect(forHardened("cbn_cubic_boron_nitride")).toBe(true);
  });
  it("aluminum oxide not for hardened", () => {
    expect(forHardened("aluminum_oxide_conventional")).toBe(false);
  });
});

describe("abrasive", () => {
  it("diamond uses synthetic diamond", () => {
    expect(abrasive("diamond_superabrasive")).toBe("synthetic_diamond_metal_bond");
  });
});

describe("bestUse", () => {
  it("aluminum oxide for cast iron cylinder", () => {
    expect(bestUse("aluminum_oxide_conventional")).toBe("cast_iron_cylinder_general_bore");
  });
});

describe("honingStoneTypes", () => {
  it("returns 5 types", () => {
    expect(honingStoneTypes()).toHaveLength(5);
  });
});
