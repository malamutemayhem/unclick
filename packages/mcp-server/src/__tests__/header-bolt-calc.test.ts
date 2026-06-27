import { describe, it, expect } from "vitest";
import {
  formClean, speedHead, strengthJoint, sizeRange,
  boltCost, flush, slotted, headShape,
  bestUse, headerBolts,
} from "../header-bolt-calc.js";

describe("formClean", () => {
  it("countersunk flush cleanest form", () => {
    expect(formClean("countersunk_flush")).toBeGreaterThan(formClean("t_head_slot"));
  });
});

describe("speedHead", () => {
  it("t head slot fastest head", () => {
    expect(speedHead("t_head_slot")).toBeGreaterThan(speedHead("countersunk_flush"));
  });
});

describe("strengthJoint", () => {
  it("hex head wrench strongest joint", () => {
    expect(strengthJoint("hex_head_wrench")).toBeGreaterThan(strengthJoint("countersunk_flush"));
  });
});

describe("sizeRange", () => {
  it("round head standard widest size range", () => {
    expect(sizeRange("round_head_standard")).toBeGreaterThan(sizeRange("t_head_slot"));
  });
});

describe("boltCost", () => {
  it("t head slot most expensive", () => {
    expect(boltCost("t_head_slot")).toBeGreaterThan(boltCost("round_head_standard"));
  });
});

describe("flush", () => {
  it("countersunk flush is flush", () => {
    expect(flush("countersunk_flush")).toBe(true);
  });
  it("round head standard not flush", () => {
    expect(flush("round_head_standard")).toBe(false);
  });
});

describe("slotted", () => {
  it("t head slot is slotted", () => {
    expect(slotted("t_head_slot")).toBe(true);
  });
  it("round head standard not slotted", () => {
    expect(slotted("round_head_standard")).toBe(false);
  });
});

describe("headShape", () => {
  it("hex head wrench uses six sided hex", () => {
    expect(headShape("hex_head_wrench")).toBe("six_sided_hex");
  });
});

describe("bestUse", () => {
  it("round head standard best for general bolt head", () => {
    expect(bestUse("round_head_standard")).toBe("general_bolt_head");
  });
});

describe("headerBolts", () => {
  it("returns 5 types", () => {
    expect(headerBolts()).toHaveLength(5);
  });
});
