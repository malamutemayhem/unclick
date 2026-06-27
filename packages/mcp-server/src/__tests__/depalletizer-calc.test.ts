import { describe, it, expect } from "vitest";
import {
  speed, throughput, gentleness, flexibility,
  ddCost, mixedSku, forFragile, depalConfig,
  bestUse, depalletizerTypes,
} from "../depalletizer-calc.js";

describe("speed", () => {
  it("sweep depal highest speed", () => {
    expect(speed("sweep_depal")).toBeGreaterThan(speed("robot_depal"));
  });
});

describe("throughput", () => {
  it("sweep depal highest throughput", () => {
    expect(throughput("sweep_depal")).toBeGreaterThan(throughput("robot_depal"));
  });
});

describe("gentleness", () => {
  it("robot depal best gentleness", () => {
    expect(gentleness("robot_depal")).toBeGreaterThan(gentleness("sweep_depal"));
  });
});

describe("flexibility", () => {
  it("robot depal best flexibility", () => {
    expect(flexibility("robot_depal")).toBeGreaterThan(flexibility("sweep_depal"));
  });
});

describe("ddCost", () => {
  it("robot depal most expensive", () => {
    expect(ddCost("robot_depal")).toBeGreaterThan(ddCost("clamp_depal"));
  });
});

describe("mixedSku", () => {
  it("robot depal supports mixed sku", () => {
    expect(mixedSku("robot_depal")).toBe(true);
  });
  it("sweep depal no mixed sku", () => {
    expect(mixedSku("sweep_depal")).toBe(false);
  });
});

describe("forFragile", () => {
  it("robot depal for fragile", () => {
    expect(forFragile("robot_depal")).toBe(true);
  });
  it("sweep depal not for fragile", () => {
    expect(forFragile("sweep_depal")).toBe(false);
  });
});

describe("depalConfig", () => {
  it("vacuum depal uses suction cup lift layer gentle handle sheet", () => {
    expect(depalConfig("vacuum_depal")).toBe("vacuum_depalletizer_suction_cup_lift_layer_gentle_handle_sheet");
  });
});

describe("bestUse", () => {
  it("sweep depal for can line high speed full layer push conveyor", () => {
    expect(bestUse("sweep_depal")).toBe("can_line_sweep_depalletizer_high_speed_full_layer_push_conveyor");
  });
});

describe("depalletizerTypes", () => {
  it("returns 5 types", () => {
    expect(depalletizerTypes()).toHaveLength(5);
  });
});
