import { describe, it, expect } from "vitest";
import {
  payload, speed, navigation, flexibility,
  arCost, outdoor, forWarehouse, nav,
  bestUse, amrRobotTypes,
} from "../amr-robot-calc.js";

describe("payload", () => {
  it("forklift autonomous highest payload", () => {
    expect(payload("forklift_autonomous")).toBeGreaterThan(payload("omnidirectional_mecanum"));
  });
});

describe("speed", () => {
  it("goods to person fastest", () => {
    expect(speed("goods_to_person_shelf")).toBeGreaterThan(speed("forklift_autonomous"));
  });
});

describe("navigation", () => {
  it("goods to person best navigation", () => {
    expect(navigation("goods_to_person_shelf")).toBeGreaterThan(navigation("tugger_tow_cart"));
  });
});

describe("flexibility", () => {
  it("omnidirectional most flexible", () => {
    expect(flexibility("omnidirectional_mecanum")).toBeGreaterThan(flexibility("forklift_autonomous"));
  });
});

describe("arCost", () => {
  it("forklift autonomous most expensive", () => {
    expect(arCost("forklift_autonomous")).toBeGreaterThan(arCost("tugger_tow_cart"));
  });
});

describe("outdoor", () => {
  it("forklift autonomous can go outdoor", () => {
    expect(outdoor("forklift_autonomous")).toBe(true);
  });
  it("diff drive not outdoor", () => {
    expect(outdoor("diff_drive_warehouse")).toBe(false);
  });
});

describe("forWarehouse", () => {
  it("diff drive for warehouse", () => {
    expect(forWarehouse("diff_drive_warehouse")).toBe(true);
  });
  it("omnidirectional not for warehouse", () => {
    expect(forWarehouse("omnidirectional_mecanum")).toBe(false);
  });
});

describe("nav", () => {
  it("tugger uses magnetic tape QR hybrid", () => {
    expect(nav("tugger_tow_cart")).toBe("magnetic_tape_qr_code_hybrid");
  });
});

describe("bestUse", () => {
  it("goods to person for ecommerce fulfillment", () => {
    expect(bestUse("goods_to_person_shelf")).toBe("ecommerce_fulfillment_pick_tower");
  });
});

describe("amrRobotTypes", () => {
  it("returns 5 types", () => {
    expect(amrRobotTypes()).toHaveLength(5);
  });
});
