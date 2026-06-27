import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, noise, aesthetic,
  fcCost, independent, forHotel, coil,
  bestUse, fanCoilTypes,
} from "../fan-coil-calc.js";

describe("capacity", () => {
  it("four pipe highest capacity", () => {
    expect(capacity("four_pipe_simultaneous")).toBeGreaterThan(capacity("two_pipe_heat_cool"));
  });
});

describe("efficiency", () => {
  it("four pipe most efficient", () => {
    expect(efficiency("four_pipe_simultaneous")).toBeGreaterThan(efficiency("two_pipe_heat_cool"));
  });
});

describe("noise", () => {
  it("ceiling concealed quietest", () => {
    expect(noise("ceiling_concealed_duct")).toBeGreaterThan(noise("vertical_stack_unit"));
  });
});

describe("aesthetic", () => {
  it("ceiling concealed best aesthetic", () => {
    expect(aesthetic("ceiling_concealed_duct")).toBeGreaterThan(aesthetic("vertical_stack_unit"));
  });
});

describe("fcCost", () => {
  it("four pipe most expensive", () => {
    expect(fcCost("four_pipe_simultaneous")).toBeGreaterThan(fcCost("two_pipe_heat_cool"));
  });
});

describe("independent", () => {
  it("four pipe is independent", () => {
    expect(independent("four_pipe_simultaneous")).toBe(true);
  });
  it("two pipe not independent", () => {
    expect(independent("two_pipe_heat_cool")).toBe(false);
  });
});

describe("forHotel", () => {
  it("four pipe for hotel", () => {
    expect(forHotel("four_pipe_simultaneous")).toBe(true);
  });
  it("vertical stack not hotel", () => {
    expect(forHotel("vertical_stack_unit")).toBe(false);
  });
});

describe("coil", () => {
  it("cassette uses four way blow", () => {
    expect(coil("cassette_ceiling_mount")).toBe("four_way_blow_ceiling_cassette");
  });
});

describe("bestUse", () => {
  it("vertical for high rise", () => {
    expect(bestUse("vertical_stack_unit")).toBe("high_rise_residential_stack");
  });
});

describe("fanCoilTypes", () => {
  it("returns 5 types", () => {
    expect(fanCoilTypes()).toHaveLength(5);
  });
});
