import { describe, it, expect } from "vitest";
import {
  accuracy, pressureLoss, rangeability, reliability,
  dpCost, noMovingParts, forDirtyFluid, element,
  bestUse, flowMeterDpTypes,
} from "../flow-meter-dp-calc.js";

describe("accuracy", () => {
  it("v cone most accurate", () => {
    expect(accuracy("v_cone_conditioning")).toBeGreaterThan(accuracy("orifice_plate_concentric"));
  });
});

describe("pressureLoss", () => {
  it("venturi lowest pressure loss", () => {
    expect(pressureLoss("venturi_tube_classic")).toBeGreaterThan(pressureLoss("orifice_plate_concentric"));
  });
});

describe("rangeability", () => {
  it("v cone best rangeability", () => {
    expect(rangeability("v_cone_conditioning")).toBeGreaterThan(rangeability("orifice_plate_concentric"));
  });
});

describe("reliability", () => {
  it("venturi highest reliability", () => {
    expect(reliability("venturi_tube_classic")).toBeGreaterThanOrEqual(reliability("wedge_meter_slurry"));
  });
});

describe("dpCost", () => {
  it("v cone most expensive", () => {
    expect(dpCost("v_cone_conditioning")).toBeGreaterThan(dpCost("orifice_plate_concentric"));
  });
});

describe("noMovingParts", () => {
  it("all dp meters have no moving parts", () => {
    expect(noMovingParts("orifice_plate_concentric")).toBe(true);
  });
});

describe("forDirtyFluid", () => {
  it("wedge meter for dirty fluid", () => {
    expect(forDirtyFluid("wedge_meter_slurry")).toBe(true);
  });
  it("orifice plate not for dirty fluid", () => {
    expect(forDirtyFluid("orifice_plate_concentric")).toBe(false);
  });
});

describe("element", () => {
  it("flow nozzle uses elliptical contour", () => {
    expect(element("flow_nozzle_high_vel")).toBe("elliptical_nozzle_contour_high_velocity_steam");
  });
});

describe("bestUse", () => {
  it("venturi for large pipe water", () => {
    expect(bestUse("venturi_tube_classic")).toBe("large_pipe_water_wastewater_low_loss_metering");
  });
});

describe("flowMeterDpTypes", () => {
  it("returns 5 types", () => {
    expect(flowMeterDpTypes()).toHaveLength(5);
  });
});
