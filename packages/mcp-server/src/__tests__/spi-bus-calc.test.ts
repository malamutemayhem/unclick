import { describe, it, expect } from "vitest";
import {
  throughput, pinCount, complexity, distance,
  busCost, fullDuplex, forFlash, dataLines,
  bestUse, spiBuses,
} from "../spi-bus-calc.js";

describe("throughput", () => {
  it("octal spi highest throughput", () => {
    expect(throughput("octal_spi_high")).toBeGreaterThan(throughput("standard_single"));
  });
});

describe("pinCount", () => {
  it("multi slave daisy most pins", () => {
    expect(pinCount("multi_slave_daisy")).toBeGreaterThan(pinCount("octal_spi_high"));
  });
});

describe("complexity", () => {
  it("octal spi most complex", () => {
    expect(complexity("octal_spi_high")).toBeGreaterThan(complexity("standard_single"));
  });
});

describe("distance", () => {
  it("multi slave daisy longest distance", () => {
    expect(distance("multi_slave_daisy")).toBeGreaterThan(distance("octal_spi_high"));
  });
});

describe("busCost", () => {
  it("octal spi most expensive", () => {
    expect(busCost("octal_spi_high")).toBeGreaterThan(busCost("standard_single"));
  });
});

describe("fullDuplex", () => {
  it("standard single is full duplex", () => {
    expect(fullDuplex("standard_single")).toBe(true);
  });
  it("quad spi flash not full duplex", () => {
    expect(fullDuplex("quad_spi_flash")).toBe(false);
  });
});

describe("forFlash", () => {
  it("quad spi flash is for flash", () => {
    expect(forFlash("quad_spi_flash")).toBe(true);
  });
  it("standard single not for flash", () => {
    expect(forFlash("standard_single")).toBe(false);
  });
});

describe("dataLines", () => {
  it("standard single uses mosi miso", () => {
    expect(dataLines("standard_single")).toBe("mosi_miso_single");
  });
});

describe("bestUse", () => {
  it("quad spi flash best for xip", () => {
    expect(bestUse("quad_spi_flash")).toBe("xip_execute_in_place");
  });
});

describe("spiBuses", () => {
  it("returns 5 types", () => {
    expect(spiBuses()).toHaveLength(5);
  });
});
