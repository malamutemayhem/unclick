import { describe, it, expect } from "vitest";
import {
  updateSpeed, security, recovery, footprint,
  blCost, fieldUpdate, forIot, transport,
  bestUse, bootloaders,
} from "../bootloader-calc.js";

describe("updateSpeed", () => {
  it("usb dfu fastest update", () => {
    expect(updateSpeed("usb_dfu_standard")).toBeGreaterThan(updateSpeed("rom_mask_fixed"));
  });
});

describe("security", () => {
  it("secure boot chain most secure", () => {
    expect(security("secure_boot_chain")).toBeGreaterThan(security("uart_serial_isp"));
  });
});

describe("recovery", () => {
  it("ota dual bank best recovery", () => {
    expect(recovery("ota_dual_bank")).toBeGreaterThan(recovery("rom_mask_fixed"));
  });
});

describe("footprint", () => {
  it("rom mask smallest footprint", () => {
    expect(footprint("rom_mask_fixed")).toBeGreaterThan(footprint("secure_boot_chain"));
  });
});

describe("blCost", () => {
  it("secure boot chain most expensive", () => {
    expect(blCost("secure_boot_chain")).toBeGreaterThan(blCost("rom_mask_fixed"));
  });
});

describe("fieldUpdate", () => {
  it("ota dual bank supports field update", () => {
    expect(fieldUpdate("ota_dual_bank")).toBe(true);
  });
  it("rom mask no field update", () => {
    expect(fieldUpdate("rom_mask_fixed")).toBe(false);
  });
});

describe("forIot", () => {
  it("ota dual bank for iot", () => {
    expect(forIot("ota_dual_bank")).toBe(true);
  });
  it("usb dfu not for iot", () => {
    expect(forIot("usb_dfu_standard")).toBe(false);
  });
});

describe("transport", () => {
  it("secure boot uses signed image chain verify", () => {
    expect(transport("secure_boot_chain")).toBe("signed_image_chain_verify");
  });
});

describe("bestUse", () => {
  it("ota dual bank best for iot fleet update", () => {
    expect(bestUse("ota_dual_bank")).toBe("iot_fleet_remote_update");
  });
});

describe("bootloaders", () => {
  it("returns 5 types", () => {
    expect(bootloaders()).toHaveLength(5);
  });
});
