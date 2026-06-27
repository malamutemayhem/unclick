import { describe, it, expect } from "vitest";
import {
  finish_, accuracy, speed, adjustRange,
  rmCost, adjustable, forCnc, flute,
  bestUse, reamerTypes,
} from "../reamer-type-calc.js";

describe("finish_", () => {
  it("carbide tipped best finish", () => {
    expect(finish_("carbide_tipped_precision")).toBeGreaterThan(finish_("hand_reamer_straight_flute"));
  });
});

describe("accuracy", () => {
  it("carbide tipped most accurate", () => {
    expect(accuracy("carbide_tipped_precision")).toBeGreaterThan(accuracy("hand_reamer_straight_flute"));
  });
});

describe("speed", () => {
  it("carbide tipped fastest", () => {
    expect(speed("carbide_tipped_precision")).toBeGreaterThan(speed("hand_reamer_straight_flute"));
  });
});

describe("adjustRange", () => {
  it("adjustable widest range", () => {
    expect(adjustRange("adjustable_expansion_blade")).toBeGreaterThan(adjustRange("machine_chucking_spiral"));
  });
});

describe("rmCost", () => {
  it("carbide most expensive", () => {
    expect(rmCost("carbide_tipped_precision")).toBeGreaterThan(rmCost("hand_reamer_straight_flute"));
  });
});

describe("adjustable", () => {
  it("expansion blade is adjustable", () => {
    expect(adjustable("adjustable_expansion_blade")).toBe(true);
  });
  it("machine chucking not adjustable", () => {
    expect(adjustable("machine_chucking_spiral")).toBe(false);
  });
});

describe("forCnc", () => {
  it("machine chucking for cnc", () => {
    expect(forCnc("machine_chucking_spiral")).toBe(true);
  });
  it("hand reamer not for cnc", () => {
    expect(forCnc("hand_reamer_straight_flute")).toBe(false);
  });
});

describe("flute", () => {
  it("carbide uses ground margin", () => {
    expect(flute("carbide_tipped_precision")).toBe("carbide_tip_ground_margin");
  });
});

describe("bestUse", () => {
  it("hand reamer for maintenance repair", () => {
    expect(bestUse("hand_reamer_straight_flute")).toBe("maintenance_repair_manual_sizing");
  });
});

describe("reamerTypes", () => {
  it("returns 5 types", () => {
    expect(reamerTypes()).toHaveLength(5);
  });
});
