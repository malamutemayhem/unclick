import { describe, it, expect } from "vitest";
import {
  sheetUniformity, throughput, coolingRate, thicknessControl,
  rsCost, inline, forCompound, sheeterConfig,
  bestUse, rubberSheeterTypes,
} from "../rubber-sheeter-calc.js";

describe("sheetUniformity", () => {
  it("four roll sheeter best sheet uniformity", () => {
    expect(sheetUniformity("four_roll_sheeter")).toBeGreaterThan(sheetUniformity("two_roll_sheeter"));
  });
});

describe("throughput", () => {
  it("festoon cooler highest throughput", () => {
    expect(throughput("festoon_cooler")).toBeGreaterThan(throughput("two_roll_sheeter"));
  });
});

describe("coolingRate", () => {
  it("festoon cooler best cooling rate", () => {
    expect(coolingRate("festoon_cooler")).toBeGreaterThan(coolingRate("two_roll_sheeter"));
  });
});

describe("thicknessControl", () => {
  it("four roll sheeter best thickness control", () => {
    expect(thicknessControl("four_roll_sheeter")).toBeGreaterThan(thicknessControl("festoon_cooler"));
  });
});

describe("rsCost", () => {
  it("four roll sheeter most expensive", () => {
    expect(rsCost("four_roll_sheeter")).toBeGreaterThan(rsCost("two_roll_sheeter"));
  });
});

describe("inline", () => {
  it("batch off cooler is inline", () => {
    expect(inline("batch_off_cooler")).toBe(true);
  });
  it("two roll sheeter not inline", () => {
    expect(inline("two_roll_sheeter")).toBe(false);
  });
});

describe("forCompound", () => {
  it("batch off cooler for compound", () => {
    expect(forCompound("batch_off_cooler")).toBe(true);
  });
  it("wig wag stacker not for compound", () => {
    expect(forCompound("wig_wag_stacker")).toBe(false);
  });
});

describe("sheeterConfig", () => {
  it("festoon cooler uses loop hang air cool anti tack", () => {
    expect(sheeterConfig("festoon_cooler")).toBe("festoon_cooler_rubber_sheeter_loop_hang_air_cool_anti_tack");
  });
});

describe("bestUse", () => {
  it("wig wag stacker for automated pallet layer stack", () => {
    expect(bestUse("wig_wag_stacker")).toBe("rubber_warehouse_wig_wag_stacker_automated_pallet_layer_stack");
  });
});

describe("rubberSheeterTypes", () => {
  it("returns 5 types", () => {
    expect(rubberSheeterTypes()).toHaveLength(5);
  });
});
