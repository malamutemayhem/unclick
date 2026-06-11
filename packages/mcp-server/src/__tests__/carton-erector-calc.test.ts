import { describe, it, expect } from "vitest";
import {
  erectSpeed, sizeRange, sealQuality, changeoverTime,
  ceCost, automated, forRandom, erectConfig,
  bestUse, cartonErectorTypes,
} from "../carton-erector-calc.js";

describe("erectSpeed", () => {
  it("tray former fastest erect speed", () => {
    expect(erectSpeed("tray_former")).toBeGreaterThan(erectSpeed("semi_auto_manual"));
  });
});

describe("sizeRange", () => {
  it("random size widest size range", () => {
    expect(sizeRange("random_size")).toBeGreaterThan(sizeRange("tray_former"));
  });
});

describe("sealQuality", () => {
  it("full auto hotmelt best seal quality", () => {
    expect(sealQuality("full_auto_hotmelt")).toBeGreaterThan(sealQuality("semi_auto_manual"));
  });
});

describe("changeoverTime", () => {
  it("random size fastest changeover", () => {
    expect(changeoverTime("random_size")).toBeGreaterThan(changeoverTime("tray_former"));
  });
});

describe("ceCost", () => {
  it("random size most expensive", () => {
    expect(ceCost("random_size")).toBeGreaterThan(ceCost("semi_auto_manual"));
  });
});

describe("automated", () => {
  it("full auto hotmelt is automated", () => {
    expect(automated("full_auto_hotmelt")).toBe(true);
  });
  it("semi auto manual not automated", () => {
    expect(automated("semi_auto_manual")).toBe(false);
  });
});

describe("forRandom", () => {
  it("random size for random cartons", () => {
    expect(forRandom("random_size")).toBe(true);
  });
  it("full auto hotmelt not for random", () => {
    expect(forRandom("full_auto_hotmelt")).toBe(false);
  });
});

describe("erectConfig", () => {
  it("tray former uses die cut blank", () => {
    expect(erectConfig("tray_former")).toBe("die_cut_blank_form_tray_glue_corner_wrap_around_shrink_sleeve");
  });
});

describe("bestUse", () => {
  it("random size for ecommerce fulfillment", () => {
    expect(bestUse("random_size")).toBe("ecommerce_fulfillment_random_size_right_size_carton_on_demand");
  });
});

describe("cartonErectorTypes", () => {
  it("returns 5 types", () => {
    expect(cartonErectorTypes()).toHaveLength(5);
  });
});
