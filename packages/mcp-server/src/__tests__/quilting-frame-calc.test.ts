import { describe, it, expect } from "vitest";
import {
  quilterControl, quiltSizeCapacity, portability, fabricTension,
  frameCost, freestanding, worksWithMachine, frameConstruction,
  bestProject, quiltingFrames,
} from "../quilting-frame-calc.js";

describe("quilterControl", () => {
  it("hoop round handheld best quilter control", () => {
    expect(quilterControl("hoop_round_handheld")).toBeGreaterThan(quilterControl("machine_longarm_rail"));
  });
});

describe("quiltSizeCapacity", () => {
  it("machine longarm rail largest quilt capacity", () => {
    expect(quiltSizeCapacity("machine_longarm_rail")).toBeGreaterThan(quiltSizeCapacity("hoop_round_handheld"));
  });
});

describe("portability", () => {
  it("hoop round handheld most portable", () => {
    expect(portability("hoop_round_handheld")).toBeGreaterThan(portability("machine_longarm_rail"));
  });
});

describe("fabricTension", () => {
  it("machine longarm rail best fabric tension", () => {
    expect(fabricTension("machine_longarm_rail")).toBeGreaterThan(fabricTension("hoop_round_handheld"));
  });
});

describe("frameCost", () => {
  it("machine longarm rail most expensive", () => {
    expect(frameCost("machine_longarm_rail")).toBeGreaterThan(frameCost("hoop_round_handheld"));
  });
});

describe("freestanding", () => {
  it("floor standing tilt is freestanding", () => {
    expect(freestanding("floor_standing_tilt")).toBe(true);
  });
  it("hoop round handheld is not freestanding", () => {
    expect(freestanding("hoop_round_handheld")).toBe(false);
  });
});

describe("worksWithMachine", () => {
  it("machine longarm rail works with machine", () => {
    expect(worksWithMachine("machine_longarm_rail")).toBe(true);
  });
  it("scroll bar roller does not work with machine", () => {
    expect(worksWithMachine("scroll_bar_roller")).toBe(false);
  });
});

describe("frameConstruction", () => {
  it("machine longarm rail uses steel rail carriage", () => {
    expect(frameConstruction("machine_longarm_rail")).toBe("steel_rail_carriage");
  });
});

describe("bestProject", () => {
  it("hoop round handheld best for small block applique", () => {
    expect(bestProject("hoop_round_handheld")).toBe("small_block_applique");
  });
});

describe("quiltingFrames", () => {
  it("returns 5 types", () => {
    expect(quiltingFrames()).toHaveLength(5);
  });
});
