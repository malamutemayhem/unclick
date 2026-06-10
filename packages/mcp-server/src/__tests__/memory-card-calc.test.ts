import { describe, it, expect } from "vitest";
import {
  readSpeed, writeSpeed, reliability, compatibility,
  cardCost, waterproof, videoCapable, formFactor,
  bestCamera, memoryCards,
} from "../memory-card-calc.js";

describe("readSpeed", () => {
  it("cf express pro fastest read", () => {
    expect(readSpeed("cf_express_pro")).toBeGreaterThan(readSpeed("sd_uhs_i_standard"));
  });
});

describe("writeSpeed", () => {
  it("cf express pro fastest write", () => {
    expect(writeSpeed("cf_express_pro")).toBeGreaterThan(writeSpeed("sd_uhs_i_standard"));
  });
});

describe("reliability", () => {
  it("cf express pro most reliable", () => {
    expect(reliability("cf_express_pro")).toBeGreaterThan(reliability("micro_sd_adapter"));
  });
});

describe("compatibility", () => {
  it("micro sd adapter most compatible", () => {
    expect(compatibility("micro_sd_adapter")).toBeGreaterThan(compatibility("xqd_broadcast"));
  });
});

describe("cardCost", () => {
  it("cf express pro most expensive", () => {
    expect(cardCost("cf_express_pro")).toBeGreaterThan(cardCost("sd_uhs_i_standard"));
  });
});

describe("waterproof", () => {
  it("cf express pro is waterproof", () => {
    expect(waterproof("cf_express_pro")).toBe(true);
  });
  it("micro sd adapter is not", () => {
    expect(waterproof("micro_sd_adapter")).toBe(false);
  });
});

describe("videoCapable", () => {
  it("cf express pro is video capable", () => {
    expect(videoCapable("cf_express_pro")).toBe(true);
  });
  it("sd uhs i standard is not", () => {
    expect(videoCapable("sd_uhs_i_standard")).toBe(false);
  });
});

describe("formFactor", () => {
  it("xqd broadcast uses xqd sony nikon pro", () => {
    expect(formFactor("xqd_broadcast")).toBe("xqd_sony_nikon_pro");
  });
});

describe("bestCamera", () => {
  it("cf express pro best for flagship dslr 8k video", () => {
    expect(bestCamera("cf_express_pro")).toBe("flagship_dslr_8k_video");
  });
});

describe("memoryCards", () => {
  it("returns 5 types", () => {
    expect(memoryCards()).toHaveLength(5);
  });
});
