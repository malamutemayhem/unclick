import { describe, it, expect } from "vitest";
import {
  comfort, durability, gripOnShoulder, aestheticStyle,
  strapCost, adjustable, machineWash, strapMaterial,
  bestGuitar, guitarStraps,
} from "../guitar-strap-calc.js";

describe("comfort", () => {
  it("neoprene comfort most comfortable", () => {
    expect(comfort("neoprene_comfort")).toBeGreaterThan(comfort("nylon_basic"));
  });
});

describe("durability", () => {
  it("leather padded most durable", () => {
    expect(durability("leather_padded")).toBeGreaterThan(durability("cotton_woven"));
  });
});

describe("gripOnShoulder", () => {
  it("neoprene comfort best grip on shoulder", () => {
    expect(gripOnShoulder("neoprene_comfort")).toBeGreaterThan(gripOnShoulder("nylon_basic"));
  });
});

describe("aestheticStyle", () => {
  it("vintage embroidered most aesthetic", () => {
    expect(aestheticStyle("vintage_embroidered")).toBeGreaterThan(aestheticStyle("nylon_basic"));
  });
});

describe("strapCost", () => {
  it("vintage embroidered most expensive", () => {
    expect(strapCost("vintage_embroidered")).toBeGreaterThan(strapCost("nylon_basic"));
  });
});

describe("adjustable", () => {
  it("nylon basic is adjustable", () => {
    expect(adjustable("nylon_basic")).toBe(true);
  });
  it("leather padded is also adjustable", () => {
    expect(adjustable("leather_padded")).toBe(true);
  });
});

describe("machineWash", () => {
  it("cotton woven is machine wash", () => {
    expect(machineWash("cotton_woven")).toBe(true);
  });
  it("leather padded is not", () => {
    expect(machineWash("leather_padded")).toBe(false);
  });
});

describe("strapMaterial", () => {
  it("leather padded uses full grain cowhide padded", () => {
    expect(strapMaterial("leather_padded")).toBe("full_grain_cowhide_padded");
  });
});

describe("bestGuitar", () => {
  it("neoprene comfort best for bass heavy instrument", () => {
    expect(bestGuitar("neoprene_comfort")).toBe("bass_heavy_instrument");
  });
});

describe("guitarStraps", () => {
  it("returns 5 types", () => {
    expect(guitarStraps()).toHaveLength(5);
  });
});
