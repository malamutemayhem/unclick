import { describe, it, expect } from "vitest";
import {
  readSpeed, writeSpeed, endurance, density,
  flashCost, xipCapable, forBoot, interface_,
  bestUse, flashTypes,
} from "../flash-type-calc.js";

describe("readSpeed", () => {
  it("nor parallel cfi fastest read", () => {
    expect(readSpeed("nor_parallel_cfi")).toBeGreaterThan(readSpeed("nor_spi_serial"));
  });
});

describe("writeSpeed", () => {
  it("nand slc raw fastest write", () => {
    expect(writeSpeed("nand_slc_raw")).toBeGreaterThan(writeSpeed("nor_spi_serial"));
  });
});

describe("endurance", () => {
  it("nor spi serial best endurance", () => {
    expect(endurance("nor_spi_serial")).toBeGreaterThan(endurance("nand_mlc_managed"));
  });
});

describe("density", () => {
  it("emmc embedded highest density", () => {
    expect(density("emmc_embedded")).toBeGreaterThan(density("nor_spi_serial"));
  });
});

describe("flashCost", () => {
  it("nor parallel cfi most expensive", () => {
    expect(flashCost("nor_parallel_cfi")).toBeGreaterThan(flashCost("nand_mlc_managed"));
  });
});

describe("xipCapable", () => {
  it("nor spi serial is xip capable", () => {
    expect(xipCapable("nor_spi_serial")).toBe(true);
  });
  it("nand slc raw not xip capable", () => {
    expect(xipCapable("nand_slc_raw")).toBe(false);
  });
});

describe("forBoot", () => {
  it("emmc embedded for boot", () => {
    expect(forBoot("emmc_embedded")).toBe(true);
  });
  it("nand slc raw not for boot", () => {
    expect(forBoot("nand_slc_raw")).toBe(false);
  });
});

describe("interface_", () => {
  it("emmc embedded uses mmc bus bga package", () => {
    expect(interface_("emmc_embedded")).toBe("mmc_bus_bga_package");
  });
});

describe("bestUse", () => {
  it("nor spi serial best for firmware code storage", () => {
    expect(bestUse("nor_spi_serial")).toBe("firmware_code_storage");
  });
});

describe("flashTypes", () => {
  it("returns 5 types", () => {
    expect(flashTypes()).toHaveLength(5);
  });
});
