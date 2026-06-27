import { describe, it, expect } from "vitest";
import {
  loadCapacity, aestheticClean, installEase, adjustability,
  bracketCost, hiddenHardware, repositionable, mountStyle,
  bestProject, shelfBrackets,
} from "../shelf-bracket-calc.js";

describe("loadCapacity", () => {
  it("adjustable track most load capacity", () => {
    expect(loadCapacity("adjustable_track")).toBeGreaterThan(loadCapacity("floating_hidden"));
  });
});

describe("aestheticClean", () => {
  it("floating hidden cleanest aesthetic", () => {
    expect(aestheticClean("floating_hidden")).toBeGreaterThan(aestheticClean("l_bracket_steel"));
  });
});

describe("installEase", () => {
  it("l bracket steel easiest install", () => {
    expect(installEase("l_bracket_steel")).toBeGreaterThan(installEase("floating_hidden"));
  });
});

describe("adjustability", () => {
  it("adjustable track most adjustable", () => {
    expect(adjustability("adjustable_track")).toBeGreaterThan(adjustability("l_bracket_steel"));
  });
});

describe("bracketCost", () => {
  it("adjustable track most expensive", () => {
    expect(bracketCost("adjustable_track")).toBeGreaterThan(bracketCost("l_bracket_steel"));
  });
});

describe("hiddenHardware", () => {
  it("floating hidden has hidden hardware", () => {
    expect(hiddenHardware("floating_hidden")).toBe(true);
  });
  it("l bracket steel does not", () => {
    expect(hiddenHardware("l_bracket_steel")).toBe(false);
  });
});

describe("repositionable", () => {
  it("adjustable track is repositionable", () => {
    expect(repositionable("adjustable_track")).toBe(true);
  });
  it("floating hidden is not", () => {
    expect(repositionable("floating_hidden")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("pipe industrial uses flange pipe fitting", () => {
    expect(mountStyle("pipe_industrial")).toBe("flange_pipe_fitting");
  });
});

describe("bestProject", () => {
  it("floating hidden for modern living room display", () => {
    expect(bestProject("floating_hidden")).toBe("modern_living_room_display");
  });
});

describe("shelfBrackets", () => {
  it("returns 5 types", () => {
    expect(shelfBrackets()).toHaveLength(5);
  });
});
