import { describe, it, expect } from "vitest";
import {
  torque, misalignment, speed, stiffness,
  cpCost, maintenanceFree, forPump, element,
  bestUse, couplingTypes,
} from "../coupling-type-calc.js";

describe("torque", () => {
  it("rigid flange highest torque", () => {
    expect(torque("rigid_flange_keyed")).toBeGreaterThan(torque("oldham_slider_parallel"));
  });
});

describe("misalignment", () => {
  it("oldham best misalignment handling", () => {
    expect(misalignment("oldham_slider_parallel")).toBeGreaterThan(misalignment("rigid_flange_keyed"));
  });
});

describe("speed", () => {
  it("disc pack highest speed", () => {
    expect(speed("disc_pack_metallic")).toBeGreaterThan(speed("oldham_slider_parallel"));
  });
});

describe("stiffness", () => {
  it("rigid flange stiffest", () => {
    expect(stiffness("rigid_flange_keyed")).toBeGreaterThan(stiffness("flexible_jaw_spider"));
  });
});

describe("cpCost", () => {
  it("gear tooth most expensive", () => {
    expect(cpCost("gear_tooth_lubricated")).toBeGreaterThan(cpCost("flexible_jaw_spider"));
  });
});

describe("maintenanceFree", () => {
  it("disc pack is maintenance free", () => {
    expect(maintenanceFree("disc_pack_metallic")).toBe(true);
  });
  it("gear tooth not maintenance free", () => {
    expect(maintenanceFree("gear_tooth_lubricated")).toBe(false);
  });
});

describe("forPump", () => {
  it("flexible jaw for pump", () => {
    expect(forPump("flexible_jaw_spider")).toBe(true);
  });
  it("rigid flange not for pump", () => {
    expect(forPump("rigid_flange_keyed")).toBe(false);
  });
});

describe("element", () => {
  it("oldham uses sliding disc cross slot", () => {
    expect(element("oldham_slider_parallel")).toBe("sliding_disc_cross_slot");
  });
});

describe("bestUse", () => {
  it("disc pack best for turbomachinery", () => {
    expect(bestUse("disc_pack_metallic")).toBe("turbomachinery_high_speed_drive");
  });
});

describe("couplingTypes", () => {
  it("returns 5 types", () => {
    expect(couplingTypes()).toHaveLength(5);
  });
});
