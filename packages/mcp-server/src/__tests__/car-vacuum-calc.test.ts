import { describe, it, expect } from "vitest";
import {
  suctionPower, portability, runtime, attachmentRange,
  vacuumCost, cordless, handlesLiquid, filterType,
  bestUse, carVacuums,
} from "../car-vacuum-calc.js";

describe("suctionPower", () => {
  it("shop vac detailing strongest suction", () => {
    expect(suctionPower("shop_vac_detailing")).toBeGreaterThan(suctionPower("mini_usb_rechargeable"));
  });
});

describe("portability", () => {
  it("mini usb rechargeable most portable", () => {
    expect(portability("mini_usb_rechargeable")).toBeGreaterThan(portability("shop_vac_detailing"));
  });
});

describe("runtime", () => {
  it("corded high power plug longest runtime", () => {
    expect(runtime("corded_high_power_plug")).toBeGreaterThan(runtime("mini_usb_rechargeable"));
  });
});

describe("attachmentRange", () => {
  it("shop vac detailing widest attachment range", () => {
    expect(attachmentRange("shop_vac_detailing")).toBeGreaterThan(attachmentRange("mini_usb_rechargeable"));
  });
});

describe("vacuumCost", () => {
  it("shop vac detailing most expensive", () => {
    expect(vacuumCost("shop_vac_detailing")).toBeGreaterThan(vacuumCost("mini_usb_rechargeable"));
  });
});

describe("cordless", () => {
  it("handheld cordless 12v is cordless", () => {
    expect(cordless("handheld_cordless_12v")).toBe(true);
  });
  it("corded high power plug is not cordless", () => {
    expect(cordless("corded_high_power_plug")).toBe(false);
  });
});

describe("handlesLiquid", () => {
  it("wet dry dual mode handles liquid", () => {
    expect(handlesLiquid("wet_dry_dual_mode")).toBe(true);
  });
  it("handheld cordless 12v does not handle liquid", () => {
    expect(handlesLiquid("handheld_cordless_12v")).toBe(false);
  });
});

describe("filterType", () => {
  it("handheld cordless 12v uses hepa cartridge washable", () => {
    expect(filterType("handheld_cordless_12v")).toBe("hepa_cartridge_washable");
  });
});

describe("bestUse", () => {
  it("shop vac detailing best for full detail garage", () => {
    expect(bestUse("shop_vac_detailing")).toBe("full_detail_garage");
  });
});

describe("carVacuums", () => {
  it("returns 5 types", () => {
    expect(carVacuums()).toHaveLength(5);
  });
});
