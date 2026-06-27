import { describe, it, expect } from "vitest";
import {
  speed, security, flexibility, reliability,
  bootCost, fieldUpdate, forProduction, mechanism,
  bestUse, bootModes,
} from "../boot-mode-calc.js";

describe("speed", () => {
  it("internal flash xip fastest boot", () => {
    expect(speed("internal_flash_xip")).toBeGreaterThan(speed("serial_boot_uart"));
  });
});

describe("security", () => {
  it("secure boot chain most secure", () => {
    expect(security("secure_boot_chain")).toBeGreaterThan(security("serial_boot_uart"));
  });
});

describe("flexibility", () => {
  it("spi flash external most flexible", () => {
    expect(flexibility("spi_flash_external")).toBeGreaterThan(flexibility("internal_flash_xip"));
  });
});

describe("reliability", () => {
  it("internal flash xip most reliable", () => {
    expect(reliability("internal_flash_xip")).toBeGreaterThan(reliability("serial_boot_uart"));
  });
});

describe("bootCost", () => {
  it("secure boot chain most expensive", () => {
    expect(bootCost("secure_boot_chain")).toBeGreaterThan(bootCost("internal_flash_xip"));
  });
});

describe("fieldUpdate", () => {
  it("usb dfu boot supports field update", () => {
    expect(fieldUpdate("usb_dfu_boot")).toBe(true);
  });
  it("internal flash xip no field update", () => {
    expect(fieldUpdate("internal_flash_xip")).toBe(false);
  });
});

describe("forProduction", () => {
  it("secure boot chain for production", () => {
    expect(forProduction("secure_boot_chain")).toBe(true);
  });
  it("serial boot uart not for production", () => {
    expect(forProduction("serial_boot_uart")).toBe(false);
  });
});

describe("mechanism", () => {
  it("secure boot chain uses rsa verify hash chain", () => {
    expect(mechanism("secure_boot_chain")).toBe("rsa_verify_hash_chain");
  });
});

describe("bestUse", () => {
  it("internal flash xip best for fast deterministic boot", () => {
    expect(bestUse("internal_flash_xip")).toBe("fast_deterministic_boot");
  });
});

describe("bootModes", () => {
  it("returns 5 types", () => {
    expect(bootModes()).toHaveLength(5);
  });
});
