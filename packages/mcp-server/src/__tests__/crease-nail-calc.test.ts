import { describe, it, expect } from "vitest";
import {
  holdStrength, hoofSafe, driveEase, clinchForm,
  nailCost, lightweight, forDraft, headProfile,
  bestUse, creaseNails,
} from "../crease-nail-calc.js";

describe("holdStrength", () => {
  it("draft head heavy strongest hold", () => {
    expect(holdStrength("draft_head_heavy")).toBeGreaterThan(holdStrength("aluminum_light_sport"));
  });
});

describe("hoofSafe", () => {
  it("aluminum light sport safest for hoof", () => {
    expect(hoofSafe("aluminum_light_sport")).toBeGreaterThan(hoofSafe("draft_head_heavy"));
  });
});

describe("driveEase", () => {
  it("aluminum light sport easiest drive", () => {
    expect(driveEase("aluminum_light_sport")).toBeGreaterThan(driveEase("draft_head_heavy"));
  });
});

describe("clinchForm", () => {
  it("draft head heavy best clinch form", () => {
    expect(clinchForm("draft_head_heavy")).toBeGreaterThan(clinchForm("aluminum_light_sport"));
  });
});

describe("nailCost", () => {
  it("aluminum light sport most expensive", () => {
    expect(nailCost("aluminum_light_sport")).toBeGreaterThan(nailCost("regular_head_standard"));
  });
});

describe("lightweight", () => {
  it("race head thin is lightweight", () => {
    expect(lightweight("race_head_thin")).toBe(true);
  });
  it("regular head standard not lightweight", () => {
    expect(lightweight("regular_head_standard")).toBe(false);
  });
});

describe("forDraft", () => {
  it("draft head heavy is for draft", () => {
    expect(forDraft("draft_head_heavy")).toBe(true);
  });
  it("city head slim not for draft", () => {
    expect(forDraft("city_head_slim")).toBe(false);
  });
});

describe("headProfile", () => {
  it("race head thin uses thin race flush", () => {
    expect(headProfile("race_head_thin")).toBe("thin_race_flush");
  });
});

describe("bestUse", () => {
  it("regular head standard best for general purpose shoe", () => {
    expect(bestUse("regular_head_standard")).toBe("general_purpose_shoe");
  });
});

describe("creaseNails", () => {
  it("returns 5 types", () => {
    expect(creaseNails()).toHaveLength(5);
  });
});
