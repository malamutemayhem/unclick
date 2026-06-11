import { describe, it, expect } from "vitest";
import {
  throughput, loadCapacity, accumulation, noiseLevel,
  crCost_, powered, forHeavyLoad, drive,
  bestUse, conveyorRollerTypes,
} from "../conveyor-roller-calc.js";

describe("throughput", () => {
  it("motorized roller mdr highest throughput", () => {
    expect(throughput("motorized_roller_mdr")).toBeGreaterThan(throughput("gravity_roller_line"));
  });
});

describe("loadCapacity", () => {
  it("chain driven pallet highest load capacity", () => {
    expect(loadCapacity("chain_driven_pallet")).toBeGreaterThan(loadCapacity("gravity_roller_line"));
  });
});

describe("accumulation", () => {
  it("motorized roller mdr best accumulation", () => {
    expect(accumulation("motorized_roller_mdr")).toBeGreaterThan(accumulation("chain_driven_pallet"));
  });
});

describe("noiseLevel", () => {
  it("chain driven pallet noisiest", () => {
    expect(noiseLevel("chain_driven_pallet")).toBeGreaterThan(noiseLevel("motorized_roller_mdr"));
  });
});

describe("crCost_", () => {
  it("chain driven pallet most expensive", () => {
    expect(crCost_("chain_driven_pallet")).toBeGreaterThan(crCost_("gravity_roller_line"));
  });
});

describe("powered", () => {
  it("belt driven roller is powered", () => {
    expect(powered("belt_driven_roller")).toBe(true);
  });
  it("gravity roller line not powered", () => {
    expect(powered("gravity_roller_line")).toBe(false);
  });
});

describe("forHeavyLoad", () => {
  it("chain driven pallet for heavy load", () => {
    expect(forHeavyLoad("chain_driven_pallet")).toBe(true);
  });
  it("gravity roller line not for heavy load", () => {
    expect(forHeavyLoad("gravity_roller_line")).toBe(false);
  });
});

describe("drive", () => {
  it("motorized roller uses brushless dc", () => {
    expect(drive("motorized_roller_mdr")).toBe("brushless_dc_motor_inside_roller_24v_zone_card");
  });
});

describe("bestUse", () => {
  it("gravity roller for shipping dock", () => {
    expect(bestUse("gravity_roller_line")).toBe("shipping_dock_packing_line_carton_flow_rack");
  });
});

describe("conveyorRollerTypes", () => {
  it("returns 5 types", () => {
    expect(conveyorRollerTypes()).toHaveLength(5);
  });
});
