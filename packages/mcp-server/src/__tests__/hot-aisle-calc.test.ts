import { describe, it, expect } from "vitest";
import {
  containment, efficiency, accessibility, fireCode,
  haCost, sealed, forRetrofit, exhaust,
  bestUse, hotAisleTypes,
} from "../hot-aisle-calc.js";

describe("containment", () => {
  it("chimney best containment", () => {
    expect(containment("chimney_vertical_exhaust")).toBeGreaterThan(containment("curtain_strip_basic"));
  });
});

describe("efficiency", () => {
  it("chimney most efficient", () => {
    expect(efficiency("chimney_vertical_exhaust")).toBeGreaterThan(efficiency("curtain_strip_basic"));
  });
});

describe("accessibility", () => {
  it("curtain most accessible", () => {
    expect(accessibility("curtain_strip_basic")).toBeGreaterThan(accessibility("chimney_vertical_exhaust"));
  });
});

describe("fireCode", () => {
  it("sliding door best fire code", () => {
    expect(fireCode("sliding_door_end_cap")).toBeGreaterThan(fireCode("curtain_strip_basic"));
  });
});

describe("haCost", () => {
  it("chimney most expensive", () => {
    expect(haCost("chimney_vertical_exhaust")).toBeGreaterThan(haCost("curtain_strip_basic"));
  });
});

describe("sealed", () => {
  it("rigid panel is sealed", () => {
    expect(sealed("rigid_panel_roof")).toBe(true);
  });
  it("curtain not sealed", () => {
    expect(sealed("curtain_strip_basic")).toBe(false);
  });
});

describe("forRetrofit", () => {
  it("curtain for retrofit", () => {
    expect(forRetrofit("curtain_strip_basic")).toBe(true);
  });
  it("sliding door not retrofit", () => {
    expect(forRetrofit("sliding_door_end_cap")).toBe(false);
  });
});

describe("exhaust", () => {
  it("chimney uses vertical plenum return", () => {
    expect(exhaust("chimney_vertical_exhaust")).toBe("vertical_chimney_plenum_return");
  });
});

describe("bestUse", () => {
  it("curtain for budget retrofit", () => {
    expect(bestUse("curtain_strip_basic")).toBe("budget_retrofit_existing_rows");
  });
});

describe("hotAisleTypes", () => {
  it("returns 5 types", () => {
    expect(hotAisleTypes()).toHaveLength(5);
  });
});
