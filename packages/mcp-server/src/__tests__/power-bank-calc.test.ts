import { describe, it, expect } from "vitest";
import {
  capacity, portability, chargingSpeed, durability,
  bankCost, passThrough, airlineApproved, cellType,
  bestUse, powerBanks,
} from "../power-bank-calc.js";

describe("capacity", () => {
  it("laptop 26800mah pd highest capacity", () => {
    expect(capacity("laptop_26800mah_pd")).toBeGreaterThan(capacity("slim_5000mah_pocket"));
  });
});

describe("portability", () => {
  it("slim 5000mah pocket most portable", () => {
    expect(portability("slim_5000mah_pocket")).toBeGreaterThan(portability("laptop_26800mah_pd"));
  });
});

describe("chargingSpeed", () => {
  it("laptop 26800mah pd fastest charging", () => {
    expect(chargingSpeed("laptop_26800mah_pd")).toBeGreaterThan(chargingSpeed("magnetic_5000mah_magsafe"));
  });
});

describe("durability", () => {
  it("rugged 20000mah solar most durable", () => {
    expect(durability("rugged_20000mah_solar")).toBeGreaterThan(durability("slim_5000mah_pocket"));
  });
});

describe("bankCost", () => {
  it("laptop 26800mah pd most expensive", () => {
    expect(bankCost("laptop_26800mah_pd")).toBeGreaterThan(bankCost("slim_5000mah_pocket"));
  });
});

describe("passThrough", () => {
  it("standard 10000mah dual has pass through", () => {
    expect(passThrough("standard_10000mah_dual")).toBe(true);
  });
  it("slim 5000mah pocket does not", () => {
    expect(passThrough("slim_5000mah_pocket")).toBe(false);
  });
});

describe("airlineApproved", () => {
  it("standard 10000mah dual is airline approved", () => {
    expect(airlineApproved("standard_10000mah_dual")).toBe(true);
  });
  it("laptop 26800mah pd is not", () => {
    expect(airlineApproved("laptop_26800mah_pd")).toBe(false);
  });
});

describe("cellType", () => {
  it("rugged 20000mah solar uses li poly solar panel", () => {
    expect(cellType("rugged_20000mah_solar")).toBe("li_poly_solar_panel");
  });
});

describe("bestUse", () => {
  it("standard 10000mah dual best for daily carry commute", () => {
    expect(bestUse("standard_10000mah_dual")).toBe("daily_carry_commute");
  });
});

describe("powerBanks", () => {
  it("returns 5 types", () => {
    expect(powerBanks()).toHaveLength(5);
  });
});
