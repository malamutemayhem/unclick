import { describe, it, expect } from "vitest";
import {
  flexibility, attackBrightness, gripRetention, durability,
  pickCost, suitableForStrumming, suitableForLeadGuitar, material,
  bestPlayStyle, guitarPicks,
} from "../guitar-pick-calc.js";

describe("flexibility", () => {
  it("thin nylon most flexible", () => {
    expect(flexibility("thin_nylon")).toBeGreaterThan(flexibility("extra_heavy_ultem"));
  });
});

describe("attackBrightness", () => {
  it("extra heavy ultem brightest attack", () => {
    expect(attackBrightness("extra_heavy_ultem")).toBeGreaterThan(attackBrightness("felt_ukulele"));
  });
});

describe("gripRetention", () => {
  it("extra heavy ultem best grip", () => {
    expect(gripRetention("extra_heavy_ultem")).toBeGreaterThan(gripRetention("thin_nylon"));
  });
});

describe("durability", () => {
  it("extra heavy ultem most durable", () => {
    expect(durability("extra_heavy_ultem")).toBeGreaterThan(durability("felt_ukulele"));
  });
});

describe("pickCost", () => {
  it("extra heavy ultem most expensive", () => {
    expect(pickCost("extra_heavy_ultem")).toBeGreaterThan(pickCost("thin_nylon"));
  });
});

describe("suitableForStrumming", () => {
  it("thin nylon good for strumming", () => {
    expect(suitableForStrumming("thin_nylon")).toBe(true);
  });
  it("heavy delrin not for strumming", () => {
    expect(suitableForStrumming("heavy_delrin")).toBe(false);
  });
});

describe("suitableForLeadGuitar", () => {
  it("heavy delrin for lead", () => {
    expect(suitableForLeadGuitar("heavy_delrin")).toBe(true);
  });
  it("thin nylon not for lead", () => {
    expect(suitableForLeadGuitar("thin_nylon")).toBe(false);
  });
});

describe("material", () => {
  it("medium celluloid uses traditional celluloid 73", () => {
    expect(material("medium_celluloid")).toBe("traditional_celluloid_73");
  });
});

describe("bestPlayStyle", () => {
  it("felt ukulele for warm mellow tone", () => {
    expect(bestPlayStyle("felt_ukulele")).toBe("ukulele_warm_mellow_tone");
  });
});

describe("guitarPicks", () => {
  it("returns 5 types", () => {
    expect(guitarPicks()).toHaveLength(5);
  });
});
