import { describe, it, expect } from "vitest";
import {
  markVisibility, linePrecision, easeOfRemoval, durability,
  chalkCost, selfErasing, sharpenable, markMedium,
  bestFabric, tailorChalks,
} from "../tailor-chalk-calc.js";

describe("markVisibility", () => {
  it("wax pencil sharp most visible mark", () => {
    expect(markVisibility("wax_pencil_sharp")).toBeGreaterThan(markVisibility("pounce_powder_pad"));
  });
});

describe("linePrecision", () => {
  it("wax pencil sharp most precise line", () => {
    expect(linePrecision("wax_pencil_sharp")).toBeGreaterThan(linePrecision("clay_triangle_classic"));
  });
});

describe("easeOfRemoval", () => {
  it("disappearing ink pen easiest removal", () => {
    expect(easeOfRemoval("disappearing_ink_pen")).toBeGreaterThan(easeOfRemoval("wax_pencil_sharp"));
  });
});

describe("durability", () => {
  it("wax pencil sharp most durable", () => {
    expect(durability("wax_pencil_sharp")).toBeGreaterThan(durability("pounce_powder_pad"));
  });
});

describe("chalkCost", () => {
  it("chalk wheel roller more expensive than clay triangle", () => {
    expect(chalkCost("chalk_wheel_roller")).toBeGreaterThan(chalkCost("clay_triangle_classic"));
  });
});

describe("selfErasing", () => {
  it("disappearing ink pen is self erasing", () => {
    expect(selfErasing("disappearing_ink_pen")).toBe(true);
  });
  it("wax pencil sharp is not self erasing", () => {
    expect(selfErasing("wax_pencil_sharp")).toBe(false);
  });
});

describe("sharpenable", () => {
  it("clay triangle classic is sharpenable", () => {
    expect(sharpenable("clay_triangle_classic")).toBe(true);
  });
  it("chalk wheel roller is not sharpenable", () => {
    expect(sharpenable("chalk_wheel_roller")).toBe(false);
  });
});

describe("markMedium", () => {
  it("wax pencil sharp uses pigment wax core", () => {
    expect(markMedium("wax_pencil_sharp")).toBe("pigment_wax_core");
  });
});

describe("bestFabric", () => {
  it("disappearing ink pen best for silk delicate sheer", () => {
    expect(bestFabric("disappearing_ink_pen")).toBe("silk_delicate_sheer");
  });
});

describe("tailorChalks", () => {
  it("returns 5 types", () => {
    expect(tailorChalks()).toHaveLength(5);
  });
});
