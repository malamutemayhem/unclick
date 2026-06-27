import { describe, it, expect } from "vitest";
import {
  payload, reach, speed, safety,
  cbCost, forceLimited, forAssembly, safeguard,
  bestUse, cobotTypes,
} from "../cobot-calc.js";

describe("payload", () => {
  it("six-axis highest payload", () => {
    expect(payload("six_axis_collaborative")).toBeGreaterThan(payload("desktop_micro_cobot"));
  });
});

describe("reach", () => {
  it("mobile cobot longest reach", () => {
    expect(reach("mobile_cobot_amr_base")).toBeGreaterThan(reach("desktop_micro_cobot"));
  });
});

describe("speed", () => {
  it("SCARA cobot fastest", () => {
    expect(speed("four_axis_scara_cobot")).toBeGreaterThan(speed("mobile_cobot_amr_base"));
  });
});

describe("safety", () => {
  it("dual arm safest", () => {
    expect(safety("dual_arm_bimanual")).toBeGreaterThanOrEqual(safety("six_axis_collaborative"));
  });
});

describe("cbCost", () => {
  it("mobile cobot most expensive", () => {
    expect(cbCost("mobile_cobot_amr_base")).toBeGreaterThan(cbCost("desktop_micro_cobot"));
  });
});

describe("forceLimited", () => {
  it("all cobots are force limited", () => {
    expect(forceLimited("six_axis_collaborative")).toBe(true);
  });
  it("desktop also force limited", () => {
    expect(forceLimited("desktop_micro_cobot")).toBe(true);
  });
});

describe("forAssembly", () => {
  it("six-axis for assembly", () => {
    expect(forAssembly("six_axis_collaborative")).toBe(true);
  });
  it("mobile cobot not for assembly", () => {
    expect(forAssembly("mobile_cobot_amr_base")).toBe(false);
  });
});

describe("safeguard", () => {
  it("desktop uses inherently safe low mass", () => {
    expect(safeguard("desktop_micro_cobot")).toBe("inherently_safe_low_mass_low_force");
  });
});

describe("bestUse", () => {
  it("SCARA cobot for screw drive insert", () => {
    expect(bestUse("four_axis_scara_cobot")).toBe("screw_drive_insert_place_fast");
  });
});

describe("cobotTypes", () => {
  it("returns 5 types", () => {
    expect(cobotTypes()).toHaveLength(5);
  });
});
