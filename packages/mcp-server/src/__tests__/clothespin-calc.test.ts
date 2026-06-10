import { describe, it, expect } from "vitest";
import {
  gripStrength, durability, fabricGentle, weatherResist,
  pinCost, rustProof, leavesMarks, pinMaterial,
  bestUse, clothespins,
} from "../clothespin-calc.js";

describe("gripStrength", () => {
  it("stainless steel wire strongest grip", () => {
    expect(gripStrength("stainless_steel_wire")).toBeGreaterThan(gripStrength("dolly_peg_slot"));
  });
});

describe("durability", () => {
  it("stainless steel wire most durable", () => {
    expect(durability("stainless_steel_wire")).toBeGreaterThan(durability("clip_plastic"));
  });
});

describe("fabricGentle", () => {
  it("soft grip silicone most gentle", () => {
    expect(fabricGentle("soft_grip_silicone")).toBeGreaterThan(fabricGentle("stainless_steel_wire"));
  });
});

describe("weatherResist", () => {
  it("stainless steel wire best weather resistance", () => {
    expect(weatherResist("stainless_steel_wire")).toBeGreaterThan(weatherResist("spring_wood"));
  });
});

describe("pinCost", () => {
  it("stainless steel wire most expensive", () => {
    expect(pinCost("stainless_steel_wire")).toBeGreaterThan(pinCost("spring_wood"));
  });
});

describe("rustProof", () => {
  it("stainless steel wire is rust proof", () => {
    expect(rustProof("stainless_steel_wire")).toBe(true);
  });
  it("spring wood is not", () => {
    expect(rustProof("spring_wood")).toBe(false);
  });
});

describe("leavesMarks", () => {
  it("spring wood leaves marks", () => {
    expect(leavesMarks("spring_wood")).toBe(true);
  });
  it("soft grip silicone does not", () => {
    expect(leavesMarks("soft_grip_silicone")).toBe(false);
  });
});

describe("pinMaterial", () => {
  it("stainless steel wire uses marine grade 304 wire", () => {
    expect(pinMaterial("stainless_steel_wire")).toBe("marine_grade_304_wire");
  });
});

describe("bestUse", () => {
  it("soft grip silicone best for delicate fabric gentle", () => {
    expect(bestUse("soft_grip_silicone")).toBe("delicate_fabric_gentle");
  });
});

describe("clothespins", () => {
  it("returns 5 types", () => {
    expect(clothespins()).toHaveLength(5);
  });
});
