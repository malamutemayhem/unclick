import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, maintenance, noise,
  asCost, automatic, forChilled, method,
  bestUse, airSeparatorTypes,
} from "../air-separator-calc.js";

describe("efficiency", () => {
  it("microbubble most efficient", () => {
    expect(efficiency("microbubble_vacuum")).toBeGreaterThan(efficiency("float_vent_automatic"));
  });
});

describe("capacity", () => {
  it("centrifugal highest capacity", () => {
    expect(capacity("centrifugal_inline")).toBeGreaterThan(capacity("float_vent_automatic"));
  });
});

describe("maintenance", () => {
  it("centrifugal lowest maintenance", () => {
    expect(maintenance("centrifugal_inline")).toBeGreaterThan(maintenance("float_vent_automatic"));
  });
});

describe("noise", () => {
  it("float vent quietest", () => {
    expect(noise("float_vent_automatic")).toBeGreaterThan(noise("centrifugal_inline"));
  });
});

describe("asCost", () => {
  it("microbubble most expensive", () => {
    expect(asCost("microbubble_vacuum")).toBeGreaterThan(asCost("float_vent_automatic"));
  });
});

describe("automatic", () => {
  it("tangential is automatic", () => {
    expect(automatic("tangential_vortex")).toBe(true);
  });
  it("centrifugal not automatic", () => {
    expect(automatic("centrifugal_inline")).toBe(false);
  });
});

describe("forChilled", () => {
  it("coalescing for chilled", () => {
    expect(forChilled("coalescing_mesh_pad")).toBe(true);
  });
  it("float vent not chilled", () => {
    expect(forChilled("float_vent_automatic")).toBe(false);
  });
});

describe("method", () => {
  it("microbubble uses vacuum degas", () => {
    expect(method("microbubble_vacuum")).toBe("vacuum_degas_microbubble");
  });
});

describe("bestUse", () => {
  it("float vent for radiator", () => {
    expect(bestUse("float_vent_automatic")).toBe("radiator_high_point_vent");
  });
});

describe("airSeparatorTypes", () => {
  it("returns 5 types", () => {
    expect(airSeparatorTypes()).toHaveLength(5);
  });
});
