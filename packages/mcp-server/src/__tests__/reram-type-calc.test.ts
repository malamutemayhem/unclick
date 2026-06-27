import { describe, it, expect } from "vitest";
import {
  endurance, speed, retention, multiLevel,
  reramCost, analogCapable, forAiAccel, mechanism,
  bestUse, reramTypes,
} from "../reram-type-calc.js";

describe("endurance", () => {
  it("ferroelectric hzo highest endurance", () => {
    expect(endurance("ferroelectric_hzo")).toBeGreaterThan(endurance("conductive_bridge"));
  });
});

describe("speed", () => {
  it("ferroelectric hzo fastest speed", () => {
    expect(speed("ferroelectric_hzo")).toBeGreaterThan(speed("phase_change_gst"));
  });
});

describe("retention", () => {
  it("phase change gst best retention", () => {
    expect(retention("phase_change_gst")).toBeGreaterThan(retention("conductive_bridge"));
  });
});

describe("multiLevel", () => {
  it("phase change gst best multi level", () => {
    expect(multiLevel("phase_change_gst")).toBeGreaterThan(multiLevel("ferroelectric_hzo"));
  });
});

describe("reramCost", () => {
  it("carbon nanotube most expensive", () => {
    expect(reramCost("carbon_nanotube")).toBeGreaterThan(reramCost("oxide_hfo2"));
  });
});

describe("analogCapable", () => {
  it("oxide hfo2 is analog capable", () => {
    expect(analogCapable("oxide_hfo2")).toBe(true);
  });
  it("ferroelectric hzo not analog capable", () => {
    expect(analogCapable("ferroelectric_hzo")).toBe(false);
  });
});

describe("forAiAccel", () => {
  it("oxide hfo2 is for ai accel", () => {
    expect(forAiAccel("oxide_hfo2")).toBe(true);
  });
  it("phase change gst not for ai accel", () => {
    expect(forAiAccel("phase_change_gst")).toBe(false);
  });
});

describe("mechanism", () => {
  it("conductive bridge uses metal ion bridge", () => {
    expect(mechanism("conductive_bridge")).toBe("metal_ion_bridge");
  });
});

describe("bestUse", () => {
  it("ferroelectric hzo best for embedded nvm mcu", () => {
    expect(bestUse("ferroelectric_hzo")).toBe("embedded_nvm_mcu");
  });
});

describe("reramTypes", () => {
  it("returns 5 types", () => {
    expect(reramTypes()).toHaveLength(5);
  });
});
