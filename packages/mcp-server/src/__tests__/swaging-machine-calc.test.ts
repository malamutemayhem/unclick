import { describe, it, expect } from "vitest";
import {
  dimensionalAccuracy, throughput, reductionRatio, surfaceFinish,
  smCost, cold, forTubing, swagerConfig,
  bestUse, swagingMachineTypes,
} from "../swaging-machine-calc.js";

describe("dimensionalAccuracy", () => {
  it("radial forge best dimensional accuracy", () => {
    expect(dimensionalAccuracy("radial_forge")).toBeGreaterThan(dimensionalAccuracy("point_swage"));
  });
});

describe("throughput", () => {
  it("point swage highest throughput", () => {
    expect(throughput("point_swage")).toBeGreaterThan(throughput("radial_forge"));
  });
});

describe("reductionRatio", () => {
  it("radial forge best reduction ratio", () => {
    expect(reductionRatio("radial_forge")).toBeGreaterThan(reductionRatio("point_swage"));
  });
});

describe("surfaceFinish", () => {
  it("tube swage best surface finish", () => {
    expect(surfaceFinish("tube_swage")).toBeGreaterThan(surfaceFinish("point_swage"));
  });
});

describe("smCost", () => {
  it("radial forge most expensive", () => {
    expect(smCost("radial_forge")).toBeGreaterThan(smCost("point_swage"));
  });
});

describe("cold", () => {
  it("rotary swage is cold", () => {
    expect(cold("rotary_swage")).toBe(true);
  });
  it("radial forge not cold", () => {
    expect(cold("radial_forge")).toBe(false);
  });
});

describe("forTubing", () => {
  it("tube swage for tubing", () => {
    expect(forTubing("tube_swage")).toBe(true);
  });
  it("stationary die not for tubing", () => {
    expect(forTubing("stationary_die")).toBe(false);
  });
});

describe("swagerConfig", () => {
  it("radial forge uses four die hot reduce alloy preform", () => {
    expect(swagerConfig("radial_forge")).toBe("radial_forge_swage_machine_four_die_hot_reduce_alloy_preform");
  });
});

describe("bestUse", () => {
  it("tube swage for medical tube mandrel wall control taper neck", () => {
    expect(bestUse("tube_swage")).toBe("medical_tube_swage_machine_mandrel_wall_control_taper_neck");
  });
});

describe("swagingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(swagingMachineTypes()).toHaveLength(5);
  });
});
