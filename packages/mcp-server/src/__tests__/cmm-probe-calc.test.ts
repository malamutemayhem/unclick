import { describe, it, expect } from "vitest";
import {
  accuracy, measureSpeed, surfaceDetail, probeLife,
  cpCost, contactless, forFreeform, sensingMethod,
  bestUse, cmmProbeTypes,
} from "../cmm-probe-calc.js";

describe("accuracy", () => {
  it("scanning analog highest accuracy", () => {
    expect(accuracy("scanning_analog")).toBeGreaterThan(accuracy("non_contact_laser"));
  });
});

describe("measureSpeed", () => {
  it("non contact laser and vision camera fastest", () => {
    expect(measureSpeed("non_contact_laser")).toBeGreaterThan(measureSpeed("touch_trigger"));
    expect(measureSpeed("vision_camera")).toBeGreaterThan(measureSpeed("touch_trigger"));
  });
});

describe("surfaceDetail", () => {
  it("scanning analog best surface detail", () => {
    expect(surfaceDetail("scanning_analog")).toBeGreaterThan(surfaceDetail("touch_trigger"));
  });
});

describe("probeLife", () => {
  it("non contact laser and vision camera longest life", () => {
    expect(probeLife("non_contact_laser")).toBeGreaterThan(probeLife("scanning_analog"));
    expect(probeLife("vision_camera")).toBeGreaterThan(probeLife("scanning_analog"));
  });
});

describe("cpCost", () => {
  it("multi sensor most expensive", () => {
    expect(cpCost("multi_sensor")).toBeGreaterThan(cpCost("touch_trigger"));
  });
});

describe("contactless", () => {
  it("non contact laser is contactless", () => {
    expect(contactless("non_contact_laser")).toBe(true);
  });
  it("touch trigger not contactless", () => {
    expect(contactless("touch_trigger")).toBe(false);
  });
});

describe("forFreeform", () => {
  it("scanning analog for freeform surfaces", () => {
    expect(forFreeform("scanning_analog")).toBe(true);
  });
  it("touch trigger not for freeform", () => {
    expect(forFreeform("touch_trigger")).toBe(false);
  });
});

describe("sensingMethod", () => {
  it("multi sensor combines touch laser vision", () => {
    expect(sensingMethod("multi_sensor")).toBe("combine_touch_laser_vision_auto_change_best_sensor_per_feature");
  });
});

describe("bestUse", () => {
  it("vision camera for flat part pcb", () => {
    expect(bestUse("vision_camera")).toBe("flat_part_pcb_gasket_micro_feature_2d_edge_measurement");
  });
});

describe("cmmProbeTypes", () => {
  it("returns 5 types", () => {
    expect(cmmProbeTypes()).toHaveLength(5);
  });
});
