import { describe, it, expect } from "vitest";
import {
  particleFineness, throughput, mediaRetention, tempControl,
  mmCost, continuous, forNano, millConfig,
  bestUse, mediaMillTypes,
} from "../media-mill-calc.js";

describe("particleFineness", () => {
  it("nano mill best particle fineness", () => {
    expect(particleFineness("nano_mill")).toBeGreaterThan(particleFineness("sand_mill"));
  });
});

describe("throughput", () => {
  it("sand mill highest throughput", () => {
    expect(throughput("sand_mill")).toBeGreaterThan(throughput("nano_mill"));
  });
});

describe("mediaRetention", () => {
  it("basket mill best media retention", () => {
    expect(mediaRetention("basket_mill")).toBeGreaterThan(mediaRetention("sand_mill"));
  });
});

describe("tempControl", () => {
  it("nano mill best temp control", () => {
    expect(tempControl("nano_mill")).toBeGreaterThan(tempControl("sand_mill"));
  });
});

describe("mmCost", () => {
  it("nano mill most expensive", () => {
    expect(mmCost("nano_mill")).toBeGreaterThan(mmCost("sand_mill"));
  });
});

describe("continuous", () => {
  it("bead mill is continuous", () => {
    expect(continuous("bead_mill")).toBe(true);
  });
  it("basket mill not continuous", () => {
    expect(continuous("basket_mill")).toBe(false);
  });
});

describe("forNano", () => {
  it("nano mill for nano", () => {
    expect(forNano("nano_mill")).toBe(true);
  });
  it("sand mill not for nano", () => {
    expect(forNano("sand_mill")).toBe(false);
  });
});

describe("millConfig", () => {
  it("basket mill uses immerse basket in tank batch grind easy", () => {
    expect(millConfig("basket_mill")).toBe("basket_mill_media_mill_immerse_basket_in_tank_batch_grind_easy");
  });
});

describe("bestUse", () => {
  it("bead mill for pharma nano zirconia sub micron disperse", () => {
    expect(bestUse("bead_mill")).toBe("pharma_nano_bead_mill_media_mill_zirconia_sub_micron_disperse");
  });
});

describe("mediaMillTypes", () => {
  it("returns 5 types", () => {
    expect(mediaMillTypes()).toHaveLength(5);
  });
});
