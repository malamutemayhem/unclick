import { describe, it, expect } from "vitest";
import {
  surfaceFinish, throughput, mediaControl, dustControl,
  sbCost, dustFree, forDelicate, blasterConfig,
  bestUse, sandBlasterTypes,
} from "../sand-blaster-calc.js";

describe("surfaceFinish", () => {
  it("micro blast best surface finish", () => {
    expect(surfaceFinish("micro_blast")).toBeGreaterThan(surfaceFinish("suction_blast"));
  });
});

describe("throughput", () => {
  it("wheel blast highest throughput", () => {
    expect(throughput("wheel_blast")).toBeGreaterThan(throughput("micro_blast"));
  });
});

describe("mediaControl", () => {
  it("micro blast best media control", () => {
    expect(mediaControl("micro_blast")).toBeGreaterThan(mediaControl("wheel_blast"));
  });
});

describe("dustControl", () => {
  it("wet blast best dust control", () => {
    expect(dustControl("wet_blast")).toBeGreaterThan(dustControl("suction_blast"));
  });
});

describe("sbCost", () => {
  it("micro blast most expensive", () => {
    expect(sbCost("micro_blast")).toBeGreaterThan(sbCost("suction_blast"));
  });
});

describe("dustFree", () => {
  it("wet blast is dust free", () => {
    expect(dustFree("wet_blast")).toBe(true);
  });
  it("suction blast not dust free", () => {
    expect(dustFree("suction_blast")).toBe(false);
  });
});

describe("forDelicate", () => {
  it("wet blast for delicate", () => {
    expect(forDelicate("wet_blast")).toBe(true);
  });
  it("pressure blast not for delicate", () => {
    expect(forDelicate("pressure_blast")).toBe(false);
  });
});

describe("blasterConfig", () => {
  it("wheel blast uses centrifugal throw steel shot auto convey", () => {
    expect(blasterConfig("wheel_blast")).toBe("wheel_blast_machine_centrifugal_throw_steel_shot_auto_convey");
  });
});

describe("bestUse", () => {
  it("micro blast for dental lab pencil nozzle fine alumina prep", () => {
    expect(bestUse("micro_blast")).toBe("dental_lab_micro_sand_blaster_pencil_nozzle_fine_alumina_prep");
  });
});

describe("sandBlasterTypes", () => {
  it("returns 5 types", () => {
    expect(sandBlasterTypes()).toHaveLength(5);
  });
});
