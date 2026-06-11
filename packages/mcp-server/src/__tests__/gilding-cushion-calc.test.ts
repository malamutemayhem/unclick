import { describe, it, expect } from "vitest";
import {
  leafHold, cutSurface, windShield, workArea,
  cushionCost, hasShield, portable, padCover,
  bestUse, gildingCushions,
} from "../gilding-cushion-calc.js";

describe("leafHold", () => {
  it("suede soft grip best leaf hold", () => {
    expect(leafHold("suede_soft_grip")).toBeGreaterThan(leafHold("mini_travel_compact"));
  });
});

describe("cutSurface", () => {
  it("leather pad standard good cut surface", () => {
    expect(cutSurface("leather_pad_standard")).toBeGreaterThan(cutSurface("mini_travel_compact"));
  });
});

describe("windShield", () => {
  it("draft shield wall best wind shield", () => {
    expect(windShield("draft_shield_wall")).toBeGreaterThan(windShield("mini_travel_compact"));
  });
});

describe("workArea", () => {
  it("rotating turntable spin largest work area", () => {
    expect(workArea("rotating_turntable_spin")).toBeGreaterThan(workArea("mini_travel_compact"));
  });
});

describe("cushionCost", () => {
  it("rotating turntable spin most expensive", () => {
    expect(cushionCost("rotating_turntable_spin")).toBeGreaterThan(cushionCost("mini_travel_compact"));
  });
});

describe("hasShield", () => {
  it("draft shield wall has shield", () => {
    expect(hasShield("draft_shield_wall")).toBe(true);
  });
  it("leather pad standard no shield", () => {
    expect(hasShield("leather_pad_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("mini travel compact is portable", () => {
    expect(portable("mini_travel_compact")).toBe(true);
  });
  it("leather pad standard not portable", () => {
    expect(portable("leather_pad_standard")).toBe(false);
  });
});

describe("padCover", () => {
  it("suede soft grip uses suede nap surface", () => {
    expect(padCover("suede_soft_grip")).toBe("suede_nap_surface");
  });
});

describe("bestUse", () => {
  it("draft shield wall best for draft free gild", () => {
    expect(bestUse("draft_shield_wall")).toBe("draft_free_gild");
  });
});

describe("gildingCushions", () => {
  it("returns 5 types", () => {
    expect(gildingCushions()).toHaveLength(5);
  });
});
