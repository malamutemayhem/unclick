import { describe, it, expect } from "vitest";
import {
  durability, visibility, privacyLevel, attachSecure,
  tagCost, trackable, waterproof, attachMethod,
  bestTrip, luggageTags,
} from "../luggage-tag-calc.js";

describe("durability", () => {
  it("metal engraved most durable", () => {
    expect(durability("metal_engraved")).toBeGreaterThan(durability("paper_loop_disposable"));
  });
});

describe("visibility", () => {
  it("silicone bright most visible", () => {
    expect(visibility("silicone_bright")).toBeGreaterThan(visibility("digital_bluetooth"));
  });
});

describe("privacyLevel", () => {
  it("digital bluetooth most private", () => {
    expect(privacyLevel("digital_bluetooth")).toBeGreaterThan(privacyLevel("silicone_bright"));
  });
});

describe("attachSecure", () => {
  it("metal engraved most secure attach", () => {
    expect(attachSecure("metal_engraved")).toBeGreaterThan(attachSecure("paper_loop_disposable"));
  });
});

describe("tagCost", () => {
  it("digital bluetooth most expensive", () => {
    expect(tagCost("digital_bluetooth")).toBeGreaterThan(tagCost("silicone_bright"));
  });
});

describe("trackable", () => {
  it("digital bluetooth is trackable", () => {
    expect(trackable("digital_bluetooth")).toBe(true);
  });
  it("leather buckle is not", () => {
    expect(trackable("leather_buckle")).toBe(false);
  });
});

describe("waterproof", () => {
  it("silicone bright is waterproof", () => {
    expect(waterproof("silicone_bright")).toBe(true);
  });
  it("leather buckle is not", () => {
    expect(waterproof("leather_buckle")).toBe(false);
  });
});

describe("attachMethod", () => {
  it("metal engraved uses steel cable lock", () => {
    expect(attachMethod("metal_engraved")).toBe("steel_cable_lock");
  });
});

describe("bestTrip", () => {
  it("digital bluetooth best for international track locate", () => {
    expect(bestTrip("digital_bluetooth")).toBe("international_track_locate");
  });
});

describe("luggageTags", () => {
  it("returns 5 types", () => {
    expect(luggageTags()).toHaveLength(5);
  });
});
