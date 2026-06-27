import { describe, it, expect } from "vitest";
import {
  writeSpeed, readSpeed, maxCapacity, durability,
  cardCost, videoCapable, shockResistant, busInterface,
  bestDevice, sdCards,
} from "../sd-card-calc.js";

describe("writeSpeed", () => {
  it("cfast pro fastest write", () => {
    expect(writeSpeed("cfast_pro")).toBeGreaterThan(writeSpeed("sdhc_standard"));
  });
});

describe("readSpeed", () => {
  it("cfast pro fastest read", () => {
    expect(readSpeed("cfast_pro")).toBeGreaterThan(readSpeed("sdhc_standard"));
  });
});

describe("maxCapacity", () => {
  it("sdxc uhs ii highest capacity", () => {
    expect(maxCapacity("sdxc_uhs_ii")).toBeGreaterThan(maxCapacity("sdhc_standard"));
  });
});

describe("durability", () => {
  it("cfast pro most durable", () => {
    expect(durability("cfast_pro")).toBeGreaterThan(durability("microsd_adapter"));
  });
});

describe("cardCost", () => {
  it("cfast pro most expensive", () => {
    expect(cardCost("cfast_pro")).toBeGreaterThan(cardCost("sdhc_standard"));
  });
});

describe("videoCapable", () => {
  it("sdxc uhs i is video capable", () => {
    expect(videoCapable("sdxc_uhs_i")).toBe(true);
  });
  it("sdhc standard is not", () => {
    expect(videoCapable("sdhc_standard")).toBe(false);
  });
});

describe("shockResistant", () => {
  it("cfast pro is shock resistant", () => {
    expect(shockResistant("cfast_pro")).toBe(true);
  });
  it("sdhc standard is not", () => {
    expect(shockResistant("sdhc_standard")).toBe(false);
  });
});

describe("busInterface", () => {
  it("sdxc uhs ii uses uhs ii 312mb sec", () => {
    expect(busInterface("sdxc_uhs_ii")).toBe("uhs_ii_312mb_sec");
  });
});

describe("bestDevice", () => {
  it("microsd adapter for drone action cam phone", () => {
    expect(bestDevice("microsd_adapter")).toBe("drone_action_cam_phone");
  });
});

describe("sdCards", () => {
  it("returns 5 types", () => {
    expect(sdCards()).toHaveLength(5);
  });
});
