import { describe, it, expect } from "vitest";
import {
  flowControl, leakage, pressureDrop, durability,
  ddCost, fireRated, forModulating, blade,
  bestUse, ductDamperTypes,
} from "../duct-damper-calc.js";

describe("flowControl", () => {
  it("opposed blade best flow control", () => {
    expect(flowControl("opposed_blade_control")).toBeGreaterThan(flowControl("backdraft_gravity"));
  });
});

describe("leakage", () => {
  it("fire smoke rated best leakage rating", () => {
    expect(leakage("fire_smoke_rated")).toBeGreaterThan(leakage("backdraft_gravity"));
  });
});

describe("pressureDrop", () => {
  it("backdraft gravity lowest pressure drop rating", () => {
    expect(pressureDrop("backdraft_gravity")).toBeGreaterThan(pressureDrop("opposed_blade_control"));
  });
});

describe("durability", () => {
  it("fire smoke rated most durable", () => {
    expect(durability("fire_smoke_rated")).toBeGreaterThan(durability("backdraft_gravity"));
  });
});

describe("ddCost", () => {
  it("fire smoke rated most expensive", () => {
    expect(ddCost("fire_smoke_rated")).toBeGreaterThan(ddCost("backdraft_gravity"));
  });
});

describe("fireRated", () => {
  it("fire smoke rated is fire rated", () => {
    expect(fireRated("fire_smoke_rated")).toBe(true);
  });
  it("butterfly not fire rated", () => {
    expect(fireRated("butterfly_round_hvac")).toBe(false);
  });
});

describe("forModulating", () => {
  it("opposed blade for modulating", () => {
    expect(forModulating("opposed_blade_control")).toBe(true);
  });
  it("parallel blade not for modulating", () => {
    expect(forModulating("parallel_blade_rect")).toBe(false);
  });
});

describe("blade", () => {
  it("fire smoke uses ul rated curtain blade", () => {
    expect(blade("fire_smoke_rated")).toBe("ul_rated_curtain_blade_fusible_link_spring");
  });
});

describe("bestUse", () => {
  it("backdraft for exhaust fan outlet", () => {
    expect(bestUse("backdraft_gravity")).toBe("exhaust_fan_outlet_prevent_reverse_airflow");
  });
});

describe("ductDamperTypes", () => {
  it("returns 5 types", () => {
    expect(ductDamperTypes()).toHaveLength(5);
  });
});
