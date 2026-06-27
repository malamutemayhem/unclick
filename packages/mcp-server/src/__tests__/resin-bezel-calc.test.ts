import { describe, it, expect } from "vitest";
import {
  resinCapacity, designFreedom, easeOfUse, leakResist,
  bezelCost, hasBack, forPendant, bezelMetal,
  bestUse, resinBezels,
} from "../resin-bezel-calc.js";

describe("resinCapacity", () => {
  it("oval cameo deep most capacity", () => {
    expect(resinCapacity("oval_cameo_deep")).toBeGreaterThan(resinCapacity("freeform_wire_wrap"));
  });
});

describe("designFreedom", () => {
  it("freeform wire wrap most design freedom", () => {
    expect(designFreedom("freeform_wire_wrap")).toBeGreaterThan(designFreedom("round_pendant_open"));
  });
});

describe("easeOfUse", () => {
  it("square tray flat easiest to use", () => {
    expect(easeOfUse("square_tray_flat")).toBeGreaterThan(easeOfUse("freeform_wire_wrap"));
  });
});

describe("leakResist", () => {
  it("oval cameo deep best leak resistance", () => {
    expect(leakResist("oval_cameo_deep")).toBeGreaterThan(leakResist("freeform_wire_wrap"));
  });
});

describe("bezelCost", () => {
  it("freeform wire wrap most expensive", () => {
    expect(bezelCost("freeform_wire_wrap")).toBeGreaterThan(bezelCost("round_pendant_open"));
  });
});

describe("hasBack", () => {
  it("square tray flat has back", () => {
    expect(hasBack("square_tray_flat")).toBe(true);
  });
  it("round pendant open has no back", () => {
    expect(hasBack("round_pendant_open")).toBe(false);
  });
});

describe("forPendant", () => {
  it("round pendant open is for pendant", () => {
    expect(forPendant("round_pendant_open")).toBe(true);
  });
  it("freeform wire wrap is for pendant", () => {
    expect(forPendant("freeform_wire_wrap")).toBe(true);
  });
});

describe("bezelMetal", () => {
  it("oval cameo deep uses copper antique finish", () => {
    expect(bezelMetal("oval_cameo_deep")).toBe("copper_antique_finish");
  });
});

describe("bestUse", () => {
  it("square tray flat best for flat art preserve", () => {
    expect(bestUse("square_tray_flat")).toBe("flat_art_preserve");
  });
});

describe("resinBezels", () => {
  it("returns 5 types", () => {
    expect(resinBezels()).toHaveLength(5);
  });
});
