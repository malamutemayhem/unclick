import { describe, it, expect } from "vitest";
import {
  comfort, quickAccess, security, weightDistribution,
  strapCost, quickDisconnect, multiCamera, strapMaterial,
  bestShooter, cameraStraps,
} from "../camera-strap-calc.js";

describe("comfort", () => {
  it("neck padded wide most comfortable", () => {
    expect(comfort("neck_padded_wide")).toBeGreaterThan(comfort("wrist_loop_compact"));
  });
});

describe("quickAccess", () => {
  it("wrist loop compact quickest access", () => {
    expect(quickAccess("wrist_loop_compact")).toBeGreaterThan(quickAccess("dual_harness_two_cam"));
  });
});

describe("security", () => {
  it("dual harness two cam most secure", () => {
    expect(security("dual_harness_two_cam")).toBeGreaterThan(security("wrist_loop_compact"));
  });
});

describe("weightDistribution", () => {
  it("dual harness two cam best weight distribution", () => {
    expect(weightDistribution("dual_harness_two_cam")).toBeGreaterThan(weightDistribution("wrist_loop_compact"));
  });
});

describe("strapCost", () => {
  it("dual harness two cam most expensive", () => {
    expect(strapCost("dual_harness_two_cam")).toBeGreaterThan(strapCost("wrist_loop_compact"));
  });
});

describe("quickDisconnect", () => {
  it("peak design quick has quick disconnect", () => {
    expect(quickDisconnect("peak_design_quick")).toBe(true);
  });
  it("neck padded wide does not", () => {
    expect(quickDisconnect("neck_padded_wide")).toBe(false);
  });
});

describe("multiCamera", () => {
  it("dual harness two cam supports multi camera", () => {
    expect(multiCamera("dual_harness_two_cam")).toBe(true);
  });
  it("sling cross body does not", () => {
    expect(multiCamera("sling_cross_body")).toBe(false);
  });
});

describe("strapMaterial", () => {
  it("wrist loop compact uses paracord braided loop", () => {
    expect(strapMaterial("wrist_loop_compact")).toBe("paracord_braided_loop");
  });
});

describe("bestShooter", () => {
  it("dual harness two cam best for wedding event two body", () => {
    expect(bestShooter("dual_harness_two_cam")).toBe("wedding_event_two_body");
  });
});

describe("cameraStraps", () => {
  it("returns 5 types", () => {
    expect(cameraStraps()).toHaveLength(5);
  });
});
