import { describe, it, expect } from "vitest";
import {
  colorBright, surfaceSmooth, durability, applyEase,
  glazeCost, metallic, precious, fireTemp,
  bestUse, overglazes,
} from "../overglaze-calc.js";

describe("colorBright", () => {
  it("enamel opaque cover brightest color", () => {
    expect(colorBright("enamel_opaque_cover")).toBeGreaterThan(colorBright("gold_leaf_precious"));
  });
});

describe("surfaceSmooth", () => {
  it("gold leaf precious smoothest surface", () => {
    expect(surfaceSmooth("gold_leaf_precious")).toBeGreaterThan(surfaceSmooth("enamel_opaque_cover"));
  });
});

describe("durability", () => {
  it("enamel opaque cover most durable", () => {
    expect(durability("enamel_opaque_cover")).toBeGreaterThan(durability("gold_leaf_precious"));
  });
});

describe("applyEase", () => {
  it("decal transfer print easiest apply", () => {
    expect(applyEase("decal_transfer_print")).toBeGreaterThan(applyEase("gold_leaf_precious"));
  });
});

describe("glazeCost", () => {
  it("gold leaf precious most expensive", () => {
    expect(glazeCost("gold_leaf_precious")).toBeGreaterThan(glazeCost("decal_transfer_print"));
  });
});

describe("metallic", () => {
  it("luster metallic shine is metallic", () => {
    expect(metallic("luster_metallic_shine")).toBe(true);
  });
  it("china paint standard not metallic", () => {
    expect(metallic("china_paint_standard")).toBe(false);
  });
});

describe("precious", () => {
  it("gold leaf precious is precious", () => {
    expect(precious("gold_leaf_precious")).toBe(true);
  });
  it("luster metallic shine not precious", () => {
    expect(precious("luster_metallic_shine")).toBe(false);
  });
});

describe("fireTemp", () => {
  it("enamel opaque cover uses cone 017 low mid", () => {
    expect(fireTemp("enamel_opaque_cover")).toBe("cone_017_low_mid");
  });
});

describe("bestUse", () => {
  it("china paint standard best for general china decor", () => {
    expect(bestUse("china_paint_standard")).toBe("general_china_decor");
  });
});

describe("overglazes", () => {
  it("returns 5 types", () => {
    expect(overglazes()).toHaveLength(5);
  });
});
