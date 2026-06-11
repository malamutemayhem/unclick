import { describe, it, expect } from "vitest";
import {
  bootSpeed, security, updateSupport, footprint,
  bootCost, encrypted, forField, method,
  bestUse, bootloaderTypes,
} from "../bootloader-type-calc.js";

describe("bootSpeed", () => {
  it("rom mask boot fastest boot", () => {
    expect(bootSpeed("rom_mask_boot")).toBeGreaterThan(bootSpeed("serial_uart_boot"));
  });
});

describe("security", () => {
  it("secure chain boot best security", () => {
    expect(security("secure_chain_boot")).toBeGreaterThan(security("rom_mask_boot"));
  });
});

describe("updateSupport", () => {
  it("ota dual bank best update support", () => {
    expect(updateSupport("ota_dual_bank")).toBeGreaterThan(updateSupport("rom_mask_boot"));
  });
});

describe("footprint", () => {
  it("rom mask boot smallest footprint", () => {
    expect(footprint("rom_mask_boot")).toBeGreaterThan(footprint("ota_dual_bank"));
  });
});

describe("bootCost", () => {
  it("secure chain boot most expensive", () => {
    expect(bootCost("secure_chain_boot")).toBeGreaterThan(bootCost("rom_mask_boot"));
  });
});

describe("encrypted", () => {
  it("secure chain boot is encrypted", () => {
    expect(encrypted("secure_chain_boot")).toBe(true);
  });
  it("rom mask boot not encrypted", () => {
    expect(encrypted("rom_mask_boot")).toBe(false);
  });
});

describe("forField", () => {
  it("ota dual bank is for field", () => {
    expect(forField("ota_dual_bank")).toBe(true);
  });
  it("rom mask boot not for field", () => {
    expect(forField("rom_mask_boot")).toBe(false);
  });
});

describe("method", () => {
  it("ota dual bank uses ab partition swap", () => {
    expect(method("ota_dual_bank")).toBe("ab_partition_swap");
  });
});

describe("bestUse", () => {
  it("secure chain boot best for payment terminal hsm", () => {
    expect(bestUse("secure_chain_boot")).toBe("payment_terminal_hsm");
  });
});

describe("bootloaderTypes", () => {
  it("returns 5 types", () => {
    expect(bootloaderTypes()).toHaveLength(5);
  });
});
