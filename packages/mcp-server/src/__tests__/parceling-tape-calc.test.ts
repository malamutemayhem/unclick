import { describe, it, expect } from "vitest";
import {
  sealQuality, waterBlock, stretchConform, durability,
  tapeCost, tarred, selfFusing, baseMaterial,
  bestUse, parcelingTapes,
} from "../parceling-tape-calc.js";

describe("sealQuality", () => {
  it("self amalgam rubber best seal quality", () => {
    expect(sealQuality("self_amalgam_rubber")).toBeGreaterThan(sealQuality("pvc_stretch_wrap"));
  });
});

describe("waterBlock", () => {
  it("self amalgam rubber best water block", () => {
    expect(waterBlock("self_amalgam_rubber")).toBeGreaterThan(waterBlock("pvc_stretch_wrap"));
  });
});

describe("stretchConform", () => {
  it("pvc stretch wrap best stretch conform", () => {
    expect(stretchConform("pvc_stretch_wrap")).toBeGreaterThan(stretchConform("linen_canvas_heavy"));
  });
});

describe("durability", () => {
  it("polyester uv resist most durable", () => {
    expect(durability("polyester_uv_resist")).toBeGreaterThan(durability("pvc_stretch_wrap"));
  });
});

describe("tapeCost", () => {
  it("self amalgam rubber most expensive", () => {
    expect(tapeCost("self_amalgam_rubber")).toBeGreaterThan(tapeCost("pvc_stretch_wrap"));
  });
});

describe("tarred", () => {
  it("tarred cotton standard is tarred", () => {
    expect(tarred("tarred_cotton_standard")).toBe(true);
  });
  it("pvc stretch wrap not tarred", () => {
    expect(tarred("pvc_stretch_wrap")).toBe(false);
  });
});

describe("selfFusing", () => {
  it("self amalgam rubber is self fusing", () => {
    expect(selfFusing("self_amalgam_rubber")).toBe(true);
  });
  it("tarred cotton standard not self fusing", () => {
    expect(selfFusing("tarred_cotton_standard")).toBe(false);
  });
});

describe("baseMaterial", () => {
  it("polyester uv resist uses polyester uv stable", () => {
    expect(baseMaterial("polyester_uv_resist")).toBe("polyester_uv_stable");
  });
});

describe("bestUse", () => {
  it("tarred cotton standard best for wire rope parcel", () => {
    expect(bestUse("tarred_cotton_standard")).toBe("wire_rope_parcel");
  });
});

describe("parcelingTapes", () => {
  it("returns 5 types", () => {
    expect(parcelingTapes()).toHaveLength(5);
  });
});
