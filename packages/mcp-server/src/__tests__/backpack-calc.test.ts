import { describe, it, expect } from "vitest";
import {
  capacity, comfort, weatherResist, organization,
  packCost, hasFrame, laptopSleeve, closureType,
  bestUse, backpacks,
} from "../backpack-calc.js";

describe("capacity", () => {
  it("hiking frame 50l largest capacity", () => {
    expect(capacity("hiking_frame_50l")).toBeGreaterThan(capacity("daypack_light_20l"));
  });
});

describe("comfort", () => {
  it("hiking frame 50l most comfortable", () => {
    expect(comfort("hiking_frame_50l")).toBeGreaterThan(comfort("ultralight_packable_fold"));
  });
});

describe("weatherResist", () => {
  it("roll top waterproof best weather resist", () => {
    expect(weatherResist("roll_top_waterproof")).toBeGreaterThan(weatherResist("daypack_light_20l"));
  });
});

describe("organization", () => {
  it("laptop commuter padded best organization", () => {
    expect(organization("laptop_commuter_padded")).toBeGreaterThan(organization("roll_top_waterproof"));
  });
});

describe("packCost", () => {
  it("hiking frame 50l most expensive", () => {
    expect(packCost("hiking_frame_50l")).toBeGreaterThan(packCost("daypack_light_20l"));
  });
});

describe("hasFrame", () => {
  it("hiking frame 50l has frame", () => {
    expect(hasFrame("hiking_frame_50l")).toBe(true);
  });
  it("daypack light 20l has no frame", () => {
    expect(hasFrame("daypack_light_20l")).toBe(false);
  });
});

describe("laptopSleeve", () => {
  it("laptop commuter padded has laptop sleeve", () => {
    expect(laptopSleeve("laptop_commuter_padded")).toBe(true);
  });
  it("hiking frame 50l has no laptop sleeve", () => {
    expect(laptopSleeve("hiking_frame_50l")).toBe(false);
  });
});

describe("closureType", () => {
  it("roll top waterproof uses roll clip seal", () => {
    expect(closureType("roll_top_waterproof")).toBe("roll_clip_seal");
  });
});

describe("bestUse", () => {
  it("hiking frame 50l best for multi day backcountry", () => {
    expect(bestUse("hiking_frame_50l")).toBe("multi_day_backcountry");
  });
});

describe("backpacks", () => {
  it("returns 5 types", () => {
    expect(backpacks()).toHaveLength(5);
  });
});
