import { describe, it, expect } from "vitest";
import {
  resolution, adhesion, etchTolerance, throughput,
  resistCost, photoProcess, forFineLine, applyMethod,
  bestUse, etchResists,
} from "../etch-resist-calc.js";

describe("resolution", () => {
  it("laser direct image best resolution", () => {
    expect(resolution("laser_direct_image")).toBeGreaterThan(resolution("screen_print_ink"));
  });
});

describe("adhesion", () => {
  it("electro deposit ed best adhesion", () => {
    expect(adhesion("electro_deposit_ed")).toBeGreaterThan(adhesion("screen_print_ink"));
  });
});

describe("etchTolerance", () => {
  it("liquid photo resist best etch tolerance", () => {
    expect(etchTolerance("liquid_photo_resist")).toBeGreaterThan(etchTolerance("screen_print_ink"));
  });
});

describe("throughput", () => {
  it("screen print ink fastest throughput", () => {
    expect(throughput("screen_print_ink")).toBeGreaterThan(throughput("liquid_photo_resist"));
  });
});

describe("resistCost", () => {
  it("laser direct image most expensive", () => {
    expect(resistCost("laser_direct_image")).toBeGreaterThan(resistCost("screen_print_ink"));
  });
});

describe("photoProcess", () => {
  it("dry film photo uses photo process", () => {
    expect(photoProcess("dry_film_photo")).toBe(true);
  });
  it("screen print ink not photo process", () => {
    expect(photoProcess("screen_print_ink")).toBe(false);
  });
});

describe("forFineLine", () => {
  it("laser direct image is for fine line", () => {
    expect(forFineLine("laser_direct_image")).toBe(true);
  });
  it("screen print ink not for fine line", () => {
    expect(forFineLine("screen_print_ink")).toBe(false);
  });
});

describe("applyMethod", () => {
  it("laser direct image uses laser write direct", () => {
    expect(applyMethod("laser_direct_image")).toBe("laser_write_direct");
  });
});

describe("bestUse", () => {
  it("dry film photo best for standard inner outer layer", () => {
    expect(bestUse("dry_film_photo")).toBe("standard_inner_outer_layer");
  });
});

describe("etchResists", () => {
  it("returns 5 types", () => {
    expect(etchResists()).toHaveLength(5);
  });
});
