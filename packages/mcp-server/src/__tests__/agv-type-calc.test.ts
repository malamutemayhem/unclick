import { describe, it, expect } from "vitest";
import {
  flexibility, payload, navigation, safety,
  agCost, infrastructureFree, forEcommerce, guidance,
  bestUse, agvTypes,
} from "../agv-type-calc.js";

describe("flexibility", () => {
  it("autonomous mobile most flexible", () => {
    expect(flexibility("autonomous_mobile_amr")).toBeGreaterThan(flexibility("guided_wire_magnetic"));
  });
});

describe("payload", () => {
  it("tugger train highest payload", () => {
    expect(payload("tugger_train_tow")).toBeGreaterThan(payload("autonomous_mobile_amr"));
  });
});

describe("navigation", () => {
  it("autonomous mobile best navigation", () => {
    expect(navigation("autonomous_mobile_amr")).toBeGreaterThan(navigation("guided_wire_magnetic"));
  });
});

describe("safety", () => {
  it("laser guided best safety", () => {
    expect(safety("laser_guided_reflector")).toBeGreaterThan(safety("tugger_train_tow"));
  });
});

describe("agCost", () => {
  it("laser guided most expensive", () => {
    expect(agCost("laser_guided_reflector")).toBeGreaterThan(agCost("guided_wire_magnetic"));
  });
});

describe("infrastructureFree", () => {
  it("autonomous mobile is infrastructure free", () => {
    expect(infrastructureFree("autonomous_mobile_amr")).toBe(true);
  });
  it("guided wire not infrastructure free", () => {
    expect(infrastructureFree("guided_wire_magnetic")).toBe(false);
  });
});

describe("forEcommerce", () => {
  it("autonomous mobile for ecommerce", () => {
    expect(forEcommerce("autonomous_mobile_amr")).toBe(true);
  });
  it("guided wire not for ecommerce", () => {
    expect(forEcommerce("guided_wire_magnetic")).toBe(false);
  });
});

describe("guidance", () => {
  it("autonomous mobile uses lidar slam ai path plan", () => {
    expect(guidance("autonomous_mobile_amr")).toBe("lidar_slam_ai_path_plan");
  });
});

describe("bestUse", () => {
  it("autonomous mobile best for ecommerce goods to person", () => {
    expect(bestUse("autonomous_mobile_amr")).toBe("ecommerce_goods_to_person_pick");
  });
});

describe("agvTypes", () => {
  it("returns 5 types", () => {
    expect(agvTypes()).toHaveLength(5);
  });
});
