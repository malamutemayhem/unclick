import { describe, it, expect } from "vitest";
import {
  capacity, portability, tasteNeutral, durability,
  flaskCost, leakProof, engravable, flaskMaterial,
  bestOccasion, hipFlasks,
} from "../hip-flask-calc.js";

describe("capacity", () => {
  it("pewter engraved heavy highest capacity", () => {
    expect(capacity("pewter_engraved_heavy")).toBeGreaterThan(capacity("titanium_ultralight"));
  });
});

describe("portability", () => {
  it("titanium ultralight most portable", () => {
    expect(portability("titanium_ultralight")).toBeGreaterThan(portability("pewter_engraved_heavy"));
  });
});

describe("tasteNeutral", () => {
  it("glass liner pure most taste neutral", () => {
    expect(tasteNeutral("glass_liner_pure")).toBeGreaterThan(tasteNeutral("pewter_engraved_heavy"));
  });
});

describe("durability", () => {
  it("titanium ultralight most durable", () => {
    expect(durability("titanium_ultralight")).toBeGreaterThan(durability("glass_liner_pure"));
  });
});

describe("flaskCost", () => {
  it("titanium ultralight most expensive", () => {
    expect(flaskCost("titanium_ultralight")).toBeGreaterThan(flaskCost("stainless_classic_curved"));
  });
});

describe("leakProof", () => {
  it("stainless classic curved is leak proof", () => {
    expect(leakProof("stainless_classic_curved")).toBe(true);
  });
  it("glass liner pure is not", () => {
    expect(leakProof("glass_liner_pure")).toBe(false);
  });
});

describe("engravable", () => {
  it("pewter engraved heavy is engravable", () => {
    expect(engravable("pewter_engraved_heavy")).toBe(true);
  });
  it("leather wrapped vintage is not", () => {
    expect(engravable("leather_wrapped_vintage")).toBe(false);
  });
});

describe("flaskMaterial", () => {
  it("titanium ultralight uses grade 2 pure titanium", () => {
    expect(flaskMaterial("titanium_ultralight")).toBe("grade_2_pure_titanium");
  });
});

describe("bestOccasion", () => {
  it("pewter engraved heavy best for gift groomsman ceremony", () => {
    expect(bestOccasion("pewter_engraved_heavy")).toBe("gift_groomsman_ceremony");
  });
});

describe("hipFlasks", () => {
  it("returns 5 types", () => {
    expect(hipFlasks()).toHaveLength(5);
  });
});
