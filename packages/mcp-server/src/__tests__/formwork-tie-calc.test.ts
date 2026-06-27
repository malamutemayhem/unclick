import { describe, it, expect } from "vitest";
import {
  capacity, reusability, finish_, speed,
  ftCost, removable, forWall, mechanism,
  bestUse, formworkTieTypes,
} from "../formwork-tie-calc.js";

describe("capacity", () => {
  it("through tie highest capacity", () => {
    expect(capacity("through_tie_dywidag_bar")).toBeGreaterThan(capacity("snap_tie_break_back"));
  });
});

describe("reusability", () => {
  it("she bolt most reusable", () => {
    expect(reusability("she_bolt_removable")).toBeGreaterThan(reusability("snap_tie_break_back"));
  });
});

describe("finish_", () => {
  it("she bolt best finish", () => {
    expect(finish_("she_bolt_removable")).toBeGreaterThan(finish_("through_tie_dywidag_bar"));
  });
});

describe("speed", () => {
  it("snap tie fastest", () => {
    expect(speed("snap_tie_break_back")).toBeGreaterThan(speed("through_tie_dywidag_bar"));
  });
});

describe("ftCost", () => {
  it("through tie most expensive", () => {
    expect(ftCost("through_tie_dywidag_bar")).toBeGreaterThan(ftCost("snap_tie_break_back"));
  });
});

describe("removable", () => {
  it("she bolt is removable", () => {
    expect(removable("she_bolt_removable")).toBe(true);
  });
  it("snap tie not removable", () => {
    expect(removable("snap_tie_break_back")).toBe(false);
  });
});

describe("forWall", () => {
  it("all for wall", () => {
    expect(forWall("coil_tie_rod_loop")).toBe(true);
  });
});

describe("mechanism", () => {
  it("snap tie uses flat wire break point", () => {
    expect(mechanism("snap_tie_break_back")).toBe("flat_wire_snap_break_point");
  });
});

describe("bestUse", () => {
  it("she bolt for architectural concrete", () => {
    expect(bestUse("she_bolt_removable")).toBe("architectural_concrete_exposed_wall");
  });
});

describe("formworkTieTypes", () => {
  it("returns 5 types", () => {
    expect(formworkTieTypes()).toHaveLength(5);
  });
});
