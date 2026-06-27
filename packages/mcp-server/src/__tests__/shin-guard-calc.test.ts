import { describe, it, expect } from "vitest";
import {
  protection, comfort, mobility, stayInPlace,
  guardCost, ankleProtect, machineWash, shellMaterial,
  bestPlayer, shinGuards,
} from "../shin-guard-calc.js";

describe("protection", () => {
  it("ankle guard attached best protection", () => {
    expect(protection("ankle_guard_attached")).toBeGreaterThan(protection("compression_sleeve_pad"));
  });
});

describe("comfort", () => {
  it("compression sleeve pad most comfortable", () => {
    expect(comfort("compression_sleeve_pad")).toBeGreaterThan(comfort("ankle_guard_attached"));
  });
});

describe("mobility", () => {
  it("compression sleeve pad best mobility", () => {
    expect(mobility("compression_sleeve_pad")).toBeGreaterThan(mobility("ankle_guard_attached"));
  });
});

describe("stayInPlace", () => {
  it("custom molded pro stays best in place", () => {
    expect(stayInPlace("custom_molded_pro")).toBeGreaterThan(stayInPlace("slip_in_shell"));
  });
});

describe("guardCost", () => {
  it("custom molded pro most expensive", () => {
    expect(guardCost("custom_molded_pro")).toBeGreaterThan(guardCost("slip_in_shell"));
  });
});

describe("ankleProtect", () => {
  it("ankle guard attached protects ankle", () => {
    expect(ankleProtect("ankle_guard_attached")).toBe(true);
  });
  it("slip in shell does not", () => {
    expect(ankleProtect("slip_in_shell")).toBe(false);
  });
});

describe("machineWash", () => {
  it("compression sleeve pad is machine washable", () => {
    expect(machineWash("compression_sleeve_pad")).toBe(true);
  });
  it("slip in shell is not", () => {
    expect(machineWash("slip_in_shell")).toBe(false);
  });
});

describe("shellMaterial", () => {
  it("custom molded pro uses carbon fiber custom form", () => {
    expect(shellMaterial("custom_molded_pro")).toBe("carbon_fiber_custom_form");
  });
});

describe("bestPlayer", () => {
  it("compression sleeve pad best for speed forward agility", () => {
    expect(bestPlayer("compression_sleeve_pad")).toBe("speed_forward_agility");
  });
});

describe("shinGuards", () => {
  it("returns 5 types", () => {
    expect(shinGuards()).toHaveLength(5);
  });
});
