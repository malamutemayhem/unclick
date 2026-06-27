import { describe, it, expect } from "vitest";
import {
  resolution, accuracy, speed, durability,
  encoderCost, absolute, forHarsh, sensing,
  bestUse, encoderTypes,
} from "../encoder-type-calc.js";

describe("resolution", () => {
  it("capacitive fine highest resolution", () => {
    expect(resolution("capacitive_fine")).toBeGreaterThan(resolution("magnetic_hall"));
  });
});

describe("accuracy", () => {
  it("capacitive fine best accuracy", () => {
    expect(accuracy("capacitive_fine")).toBeGreaterThan(accuracy("magnetic_hall"));
  });
});

describe("speed", () => {
  it("incremental optical fastest speed", () => {
    expect(speed("incremental_optical")).toBeGreaterThan(speed("capacitive_fine"));
  });
});

describe("durability", () => {
  it("resolver analog most durable", () => {
    expect(durability("resolver_analog")).toBeGreaterThan(durability("incremental_optical"));
  });
});

describe("encoderCost", () => {
  it("capacitive fine most expensive", () => {
    expect(encoderCost("capacitive_fine")).toBeGreaterThan(encoderCost("magnetic_hall"));
  });
});

describe("absolute", () => {
  it("absolute gray code is absolute", () => {
    expect(absolute("absolute_gray_code")).toBe(true);
  });
  it("incremental optical not absolute", () => {
    expect(absolute("incremental_optical")).toBe(false);
  });
});

describe("forHarsh", () => {
  it("resolver analog is for harsh", () => {
    expect(forHarsh("resolver_analog")).toBe(true);
  });
  it("incremental optical not for harsh", () => {
    expect(forHarsh("incremental_optical")).toBe(false);
  });
});

describe("sensing", () => {
  it("capacitive fine uses pcb electrode cap", () => {
    expect(sensing("capacitive_fine")).toBe("pcb_electrode_cap");
  });
});

describe("bestUse", () => {
  it("magnetic hall best for bldc commutation", () => {
    expect(bestUse("magnetic_hall")).toBe("bldc_commutation");
  });
});

describe("encoderTypes", () => {
  it("returns 5 types", () => {
    expect(encoderTypes()).toHaveLength(5);
  });
});
