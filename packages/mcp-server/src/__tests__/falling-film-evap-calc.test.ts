import { describe, it, expect } from "vitest";
import {
  heatTransfer, residence, foulingResist, capacity,
  ffCost, shortResidence, forViscous, surface,
  bestUse, fallingFilmEvapTypes,
} from "../falling-film-evap-calc.js";

describe("heatTransfer", () => {
  it("plate type best heat transfer", () => {
    expect(heatTransfer("plate_type_compact")).toBeGreaterThan(heatTransfer("horizontal_tube_spray"));
  });
});

describe("residence", () => {
  it("wiped film shortest residence time", () => {
    expect(residence("wiped_film_viscous")).toBeGreaterThan(residence("horizontal_tube_spray"));
  });
});

describe("foulingResist", () => {
  it("agitated thin film best fouling resistance", () => {
    expect(foulingResist("agitated_thin_film")).toBeGreaterThan(foulingResist("horizontal_tube_spray"));
  });
});

describe("capacity", () => {
  it("tubular vertical highest capacity", () => {
    expect(capacity("tubular_vertical_standard")).toBeGreaterThan(capacity("wiped_film_viscous"));
  });
});

describe("ffCost", () => {
  it("agitated thin film most expensive", () => {
    expect(ffCost("agitated_thin_film")).toBeGreaterThan(ffCost("tubular_vertical_standard"));
  });
});

describe("shortResidence", () => {
  it("tubular vertical has short residence", () => {
    expect(shortResidence("tubular_vertical_standard")).toBe(true);
  });
  it("horizontal tube does not", () => {
    expect(shortResidence("horizontal_tube_spray")).toBe(false);
  });
});

describe("forViscous", () => {
  it("wiped film for viscous", () => {
    expect(forViscous("wiped_film_viscous")).toBe(true);
  });
  it("tubular vertical not for viscous", () => {
    expect(forViscous("tubular_vertical_standard")).toBe(false);
  });
});

describe("surface", () => {
  it("plate type uses corrugated plate", () => {
    expect(surface("plate_type_compact")).toBe("corrugated_plate_pack_thin_film_channel");
  });
});

describe("bestUse", () => {
  it("tubular for juice milk sugar", () => {
    expect(bestUse("tubular_vertical_standard")).toBe("juice_milk_sugar_syrup_multi_effect");
  });
});

describe("fallingFilmEvapTypes", () => {
  it("returns 5 types", () => {
    expect(fallingFilmEvapTypes()).toHaveLength(5);
  });
});
