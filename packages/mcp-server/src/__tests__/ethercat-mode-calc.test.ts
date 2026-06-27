import { describe, it, expect } from "vitest";
import {
  cycleTime, jitter, nodeCapacity, cabling,
  modeCost, dcSync, forServo, syncMethod,
  bestUse, ethercatModes,
} from "../ethercat-mode-calc.js";

describe("cycleTime", () => {
  it("distributed clock best cycle time", () => {
    expect(cycleTime("distributed_clock")).toBeGreaterThan(cycleTime("freerun_async"));
  });
});

describe("jitter", () => {
  it("sync0 event lowest jitter", () => {
    expect(jitter("sync0_event")).toBeGreaterThan(jitter("freerun_async"));
  });
});

describe("nodeCapacity", () => {
  it("distributed clock most nodes", () => {
    expect(nodeCapacity("distributed_clock")).toBeGreaterThan(nodeCapacity("sync0_event"));
  });
});

describe("cabling", () => {
  it("redundancy cable best cabling", () => {
    expect(cabling("redundancy_cable")).toBeGreaterThan(cabling("distributed_clock"));
  });
});

describe("modeCost", () => {
  it("redundancy cable most expensive", () => {
    expect(modeCost("redundancy_cable")).toBeGreaterThan(modeCost("freerun_async"));
  });
});

describe("dcSync", () => {
  it("sync dc clock has dc sync", () => {
    expect(dcSync("sync_dc_clock")).toBe(true);
  });
  it("freerun async no dc sync", () => {
    expect(dcSync("freerun_async")).toBe(false);
  });
});

describe("forServo", () => {
  it("sync dc clock is for servo", () => {
    expect(forServo("sync_dc_clock")).toBe(true);
  });
  it("freerun async not for servo", () => {
    expect(forServo("freerun_async")).toBe(false);
  });
});

describe("syncMethod", () => {
  it("freerun async uses no sync freerun", () => {
    expect(syncMethod("freerun_async")).toBe("no_sync_freerun");
  });
});

describe("bestUse", () => {
  it("distributed clock best for sub microsecond motion", () => {
    expect(bestUse("distributed_clock")).toBe("sub_microsecond_motion");
  });
});

describe("ethercatModes", () => {
  it("returns 5 types", () => {
    expect(ethercatModes()).toHaveLength(5);
  });
});
