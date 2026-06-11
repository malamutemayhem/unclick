import { describe, it, expect } from "vitest";
import {
  holdSecure, centerTrue, adjustRange, markFree,
  chuckCost, custom, vacuum, mountMethod,
  bestUse, chuckWheels,
} from "../chuck-wheel-calc.js";

describe("holdSecure", () => {
  it("vacuum chuck grip most secure hold", () => {
    expect(holdSecure("vacuum_chuck_grip")).toBeGreaterThan(holdSecure("foam_chuck_soft"));
  });
});

describe("centerTrue", () => {
  it("bisque chuck custom truest center", () => {
    expect(centerTrue("bisque_chuck_custom")).toBeGreaterThan(centerTrue("coil_chuck_standard"));
  });
});

describe("adjustRange", () => {
  it("foam chuck soft widest adjust range", () => {
    expect(adjustRange("foam_chuck_soft")).toBeGreaterThan(adjustRange("bisque_chuck_custom"));
  });
});

describe("markFree", () => {
  it("foam chuck soft most mark free", () => {
    expect(markFree("foam_chuck_soft")).toBeGreaterThan(markFree("coil_chuck_standard"));
  });
});

describe("chuckCost", () => {
  it("vacuum chuck grip most expensive", () => {
    expect(chuckCost("vacuum_chuck_grip")).toBeGreaterThan(chuckCost("coil_chuck_standard"));
  });
});

describe("custom", () => {
  it("bisque chuck custom is custom", () => {
    expect(custom("bisque_chuck_custom")).toBe(true);
  });
  it("coil chuck standard not custom", () => {
    expect(custom("coil_chuck_standard")).toBe(false);
  });
});

describe("vacuum", () => {
  it("vacuum chuck grip has vacuum", () => {
    expect(vacuum("vacuum_chuck_grip")).toBe(true);
  });
  it("coil chuck standard no vacuum", () => {
    expect(vacuum("coil_chuck_standard")).toBe(false);
  });
});

describe("mountMethod", () => {
  it("tap chuck center uses tap center clay", () => {
    expect(mountMethod("tap_chuck_center")).toBe("tap_center_clay");
  });
});

describe("bestUse", () => {
  it("coil chuck standard best for general trim chuck", () => {
    expect(bestUse("coil_chuck_standard")).toBe("general_trim_chuck");
  });
});

describe("chuckWheels", () => {
  it("returns 5 types", () => {
    expect(chuckWheels()).toHaveLength(5);
  });
});
