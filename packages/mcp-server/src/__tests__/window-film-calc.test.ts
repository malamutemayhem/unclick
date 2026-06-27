import { describe, it, expect } from "vitest";
import {
  privacyLevel, heatReduction, lightTransmit, installEase,
  filmCost, removable, uvProtection, filmType,
  bestWindow, windowFilms,
} from "../window-film-calc.js";

describe("privacyLevel", () => {
  it("privacy frosted most private", () => {
    expect(privacyLevel("privacy_frosted")).toBeGreaterThan(privacyLevel("uv_block_clear"));
  });
});

describe("heatReduction", () => {
  it("solar heat reject best heat reduction", () => {
    expect(heatReduction("solar_heat_reject")).toBeGreaterThan(heatReduction("privacy_frosted"));
  });
});

describe("lightTransmit", () => {
  it("uv block clear most light transmit", () => {
    expect(lightTransmit("uv_block_clear")).toBeGreaterThan(lightTransmit("decorative_stained"));
  });
});

describe("installEase", () => {
  it("privacy frosted easiest install", () => {
    expect(installEase("privacy_frosted")).toBeGreaterThan(installEase("security_shatter_hold"));
  });
});

describe("filmCost", () => {
  it("security shatter hold most expensive", () => {
    expect(filmCost("security_shatter_hold")).toBeGreaterThan(filmCost("privacy_frosted"));
  });
});

describe("removable", () => {
  it("privacy frosted is removable", () => {
    expect(removable("privacy_frosted")).toBe(true);
  });
  it("security shatter hold is not", () => {
    expect(removable("security_shatter_hold")).toBe(false);
  });
});

describe("uvProtection", () => {
  it("uv block clear has uv protection", () => {
    expect(uvProtection("uv_block_clear")).toBe(true);
  });
  it("privacy frosted does not", () => {
    expect(uvProtection("privacy_frosted")).toBe(false);
  });
});

describe("filmType", () => {
  it("solar heat reject uses metalized ceramic tint", () => {
    expect(filmType("solar_heat_reject")).toBe("metalized_ceramic_tint");
  });
});

describe("bestWindow", () => {
  it("privacy frosted best for bathroom street facing", () => {
    expect(bestWindow("privacy_frosted")).toBe("bathroom_street_facing");
  });
});

describe("windowFilms", () => {
  it("returns 5 types", () => {
    expect(windowFilms()).toHaveLength(5);
  });
});
