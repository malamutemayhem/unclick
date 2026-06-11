import { describe, it, expect } from "vitest";
import {
  capacity, pressure, cleanEase, retention,
  srCost, continuous, forPump, screen,
  bestUse, strainerTypeTypes,
} from "../strainer-type-calc.js";

describe("capacity", () => {
  it("duplex basket highest capacity", () => {
    expect(capacity("duplex_basket_switchable")).toBeGreaterThan(capacity("y_strainer_inline_compact"));
  });
});

describe("pressure", () => {
  it("y strainer highest pressure", () => {
    expect(pressure("y_strainer_inline_compact")).toBeGreaterThan(pressure("cone_strainer_temporary"));
  });
});

describe("cleanEase", () => {
  it("duplex basket easiest clean", () => {
    expect(cleanEase("duplex_basket_switchable")).toBeGreaterThan(cleanEase("cone_strainer_temporary"));
  });
});

describe("retention", () => {
  it("basket strainer best retention", () => {
    expect(retention("basket_strainer_pot_type")).toBeGreaterThan(retention("cone_strainer_temporary"));
  });
});

describe("srCost", () => {
  it("duplex most expensive", () => {
    expect(srCost("duplex_basket_switchable")).toBeGreaterThan(srCost("cone_strainer_temporary"));
  });
});

describe("continuous", () => {
  it("duplex is continuous", () => {
    expect(continuous("duplex_basket_switchable")).toBe(true);
  });
  it("basket not continuous", () => {
    expect(continuous("basket_strainer_pot_type")).toBe(false);
  });
});

describe("forPump", () => {
  it("basket for pump", () => {
    expect(forPump("basket_strainer_pot_type")).toBe(true);
  });
  it("cone not for pump", () => {
    expect(forPump("cone_strainer_temporary")).toBe(false);
  });
});

describe("screen", () => {
  it("cone uses temporary mesh", () => {
    expect(screen("cone_strainer_temporary")).toBe("cone_mesh_temporary_startup");
  });
});

describe("bestUse", () => {
  it("duplex for continuous process", () => {
    expect(bestUse("duplex_basket_switchable")).toBe("continuous_process_no_shutdown_filter");
  });
});

describe("strainerTypeTypes", () => {
  it("returns 5 types", () => {
    expect(strainerTypeTypes()).toHaveLength(5);
  });
});
