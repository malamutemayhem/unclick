import { describe, it, expect } from "vitest";
import {
  scanSpeed, throughput, fieldSize, positionAccuracy,
  gsCost_, closedLoop, forMarking, scannerConfig,
  bestUse, galvoScannerTypes,
} from "../galvo-scanner-calc.js";

describe("scanSpeed", () => {
  it("polygon scanner best scan speed", () => {
    expect(scanSpeed("polygon_scanner")).toBeGreaterThan(scanSpeed("single_axis_galvo"));
  });
});

describe("throughput", () => {
  it("polygon scanner highest throughput", () => {
    expect(throughput("polygon_scanner")).toBeGreaterThan(throughput("resonant_scanner"));
  });
});

describe("fieldSize", () => {
  it("three axis best field size", () => {
    expect(fieldSize("three_axis_galvo")).toBeGreaterThan(fieldSize("single_axis_galvo"));
  });
});

describe("positionAccuracy", () => {
  it("dual axis best position accuracy", () => {
    expect(positionAccuracy("dual_axis_galvo")).toBeGreaterThan(positionAccuracy("polygon_scanner"));
  });
});

describe("gsCost_", () => {
  it("three axis most expensive", () => {
    expect(gsCost_("three_axis_galvo")).toBeGreaterThan(gsCost_("single_axis_galvo"));
  });
});

describe("closedLoop", () => {
  it("dual axis is closed loop", () => {
    expect(closedLoop("dual_axis_galvo")).toBe(true);
  });
  it("polygon scanner not closed loop", () => {
    expect(closedLoop("polygon_scanner")).toBe(false);
  });
});

describe("forMarking", () => {
  it("dual axis for marking", () => {
    expect(forMarking("dual_axis_galvo")).toBe(true);
  });
  it("polygon scanner not for marking", () => {
    expect(forMarking("polygon_scanner")).toBe(false);
  });
});

describe("scannerConfig", () => {
  it("resonant uses tuning fork mirror sinusoidal ultra fast imaging", () => {
    expect(scannerConfig("resonant_scanner")).toBe("resonant_scanner_tuning_fork_mirror_sinusoidal_ultra_fast_imaging");
  });
});

describe("bestUse", () => {
  it("three axis for 3d surface focus shift curved part mark", () => {
    expect(bestUse("three_axis_galvo")).toBe("3d_surface_three_axis_galvo_scanner_focus_shift_curved_part_mark");
  });
});

describe("galvoScannerTypes", () => {
  it("returns 5 types", () => {
    expect(galvoScannerTypes()).toHaveLength(5);
  });
});
