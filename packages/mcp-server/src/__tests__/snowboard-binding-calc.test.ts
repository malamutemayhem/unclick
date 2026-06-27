import { describe, it, expect } from "vitest";
import {
  responseFlex, entrySpeed, customFit, boardCompatibility,
  bindingCost, toolFreeAdjust, hikeModeSwitch, strapSystem,
  bestRider, snowboardBindings,
} from "../snowboard-binding-calc.js";

describe("responseFlex", () => {
  it("burton est best response flex", () => {
    expect(responseFlex("burton_est")).toBeGreaterThan(responseFlex("rear_entry_speed"));
  });
});

describe("entrySpeed", () => {
  it("step on click fastest entry", () => {
    expect(entrySpeed("step_on_click")).toBeGreaterThan(entrySpeed("strap_in_standard"));
  });
});

describe("customFit", () => {
  it("burton est best custom fit", () => {
    expect(customFit("burton_est")).toBeGreaterThan(customFit("step_on_click"));
  });
});

describe("boardCompatibility", () => {
  it("strap in standard most board compatible", () => {
    expect(boardCompatibility("strap_in_standard")).toBeGreaterThan(boardCompatibility("burton_est"));
  });
});

describe("bindingCost", () => {
  it("splitboard tour most expensive", () => {
    expect(bindingCost("splitboard_tour")).toBeGreaterThan(bindingCost("strap_in_standard"));
  });
});

describe("toolFreeAdjust", () => {
  it("strap in standard is tool free adjust", () => {
    expect(toolFreeAdjust("strap_in_standard")).toBe(true);
  });
  it("splitboard tour is not", () => {
    expect(toolFreeAdjust("splitboard_tour")).toBe(false);
  });
});

describe("hikeModeSwitch", () => {
  it("splitboard tour has hike mode switch", () => {
    expect(hikeModeSwitch("splitboard_tour")).toBe(true);
  });
  it("strap in standard does not", () => {
    expect(hikeModeSwitch("strap_in_standard")).toBe(false);
  });
});

describe("strapSystem", () => {
  it("step on click uses cleat lock no strap", () => {
    expect(strapSystem("step_on_click")).toBe("cleat_lock_no_strap");
  });
});

describe("bestRider", () => {
  it("splitboard tour for backcountry skin climb", () => {
    expect(bestRider("splitboard_tour")).toBe("backcountry_skin_climb");
  });
});

describe("snowboardBindings", () => {
  it("returns 5 types", () => {
    expect(snowboardBindings()).toHaveLength(5);
  });
});
