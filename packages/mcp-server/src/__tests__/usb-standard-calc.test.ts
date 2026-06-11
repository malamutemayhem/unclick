import { describe, it, expect } from "vitest";
import {
  throughput, powerDelivery, cableLength, compatibility,
  usbCost, typeCOnly, forVideo, encoding,
  bestUse, usbStandards,
} from "../usb-standard-calc.js";

describe("throughput", () => {
  it("usb4 tunnel highest throughput", () => {
    expect(throughput("usb4_tunnel")).toBeGreaterThan(throughput("usb3_gen1_super"));
  });
});

describe("powerDelivery", () => {
  it("usb pd power best power delivery", () => {
    expect(powerDelivery("usb_pd_power")).toBeGreaterThan(powerDelivery("usb2_high_speed"));
  });
});

describe("cableLength", () => {
  it("usb2 high speed longest cable", () => {
    expect(cableLength("usb2_high_speed")).toBeGreaterThan(cableLength("usb4_tunnel"));
  });
});

describe("compatibility", () => {
  it("usb2 high speed most compatible", () => {
    expect(compatibility("usb2_high_speed")).toBeGreaterThan(compatibility("usb4_tunnel"));
  });
});

describe("usbCost", () => {
  it("usb4 tunnel most expensive", () => {
    expect(usbCost("usb4_tunnel")).toBeGreaterThan(usbCost("usb2_high_speed"));
  });
});

describe("typeCOnly", () => {
  it("usb4 tunnel is type c only", () => {
    expect(typeCOnly("usb4_tunnel")).toBe(true);
  });
  it("usb2 high speed not type c only", () => {
    expect(typeCOnly("usb2_high_speed")).toBe(false);
  });
});

describe("forVideo", () => {
  it("usb4 tunnel for video", () => {
    expect(forVideo("usb4_tunnel")).toBe(true);
  });
  it("usb3 gen1 super not for video", () => {
    expect(forVideo("usb3_gen1_super")).toBe(false);
  });
});

describe("encoding", () => {
  it("usb pd power uses bmc cc line protocol", () => {
    expect(encoding("usb_pd_power")).toBe("bmc_cc_line_protocol");
  });
});

describe("bestUse", () => {
  it("usb4 tunnel best for thunderbolt dock egpu", () => {
    expect(bestUse("usb4_tunnel")).toBe("thunderbolt_dock_egpu");
  });
});

describe("usbStandards", () => {
  it("returns 5 types", () => {
    expect(usbStandards()).toHaveLength(5);
  });
});
