import { describe, it, expect } from "vitest";
import {
  capacity, fillEase, stackability, aestheticAppeal,
  jarCost, canningApproved, freezerSafe, glassMaterial,
  bestUse, masonJars,
} from "../mason-jar-calc.js";

describe("capacity", () => {
  it("half gallon storage most capacity", () => {
    expect(capacity("half_gallon_storage")).toBeGreaterThan(capacity("quilted_jelly_small"));
  });
});

describe("fillEase", () => {
  it("wide mouth quart easiest to fill", () => {
    expect(fillEase("wide_mouth_quart")).toBeGreaterThan(fillEase("quilted_jelly_small"));
  });
});

describe("stackability", () => {
  it("quilted jelly small most stackable", () => {
    expect(stackability("quilted_jelly_small")).toBeGreaterThan(stackability("half_gallon_storage"));
  });
});

describe("aestheticAppeal", () => {
  it("elite spiral decor highest aesthetic appeal", () => {
    expect(aestheticAppeal("elite_spiral_decor")).toBeGreaterThan(aestheticAppeal("half_gallon_storage"));
  });
});

describe("jarCost", () => {
  it("elite spiral decor most expensive", () => {
    expect(jarCost("elite_spiral_decor")).toBeGreaterThan(jarCost("regular_mouth_pint"));
  });
});

describe("canningApproved", () => {
  it("regular mouth pint is canning approved", () => {
    expect(canningApproved("regular_mouth_pint")).toBe(true);
  });
  it("half gallon storage is not", () => {
    expect(canningApproved("half_gallon_storage")).toBe(false);
  });
});

describe("freezerSafe", () => {
  it("wide mouth quart is freezer safe", () => {
    expect(freezerSafe("wide_mouth_quart")).toBe(true);
  });
  it("elite spiral decor is not", () => {
    expect(freezerSafe("elite_spiral_decor")).toBe(false);
  });
});

describe("glassMaterial", () => {
  it("quilted jelly small uses embossed diamond pattern", () => {
    expect(glassMaterial("quilted_jelly_small")).toBe("embossed_diamond_pattern");
  });
});

describe("bestUse", () => {
  it("half gallon storage best for bulk dry goods flour", () => {
    expect(bestUse("half_gallon_storage")).toBe("bulk_dry_goods_flour");
  });
});

describe("masonJars", () => {
  it("returns 5 types", () => {
    expect(masonJars()).toHaveLength(5);
  });
});
