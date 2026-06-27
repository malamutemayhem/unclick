import { describe, it, expect } from "vitest";
import {
  pinHold, bobbinSupport, portability, workArea,
  pillowCost, portable, forContinuous, fillMaterial,
  bestUse, pillowLaces,
} from "../pillow-lace-calc.js";

describe("pinHold", () => {
  it("flat cookie round best pin hold", () => {
    expect(pinHold("flat_cookie_round")).toBeGreaterThan(pinHold("travel_board_portable"));
  });
});

describe("bobbinSupport", () => {
  it("bolster roller long best bobbin support", () => {
    expect(bobbinSupport("bolster_roller_long")).toBeGreaterThan(bobbinSupport("travel_board_portable"));
  });
});

describe("portability", () => {
  it("travel board portable most portable", () => {
    expect(portability("travel_board_portable")).toBeGreaterThan(portability("bolster_roller_long"));
  });
});

describe("workArea", () => {
  it("bolster roller long biggest work area", () => {
    expect(workArea("bolster_roller_long")).toBeGreaterThan(workArea("travel_board_portable"));
  });
});

describe("pillowCost", () => {
  it("bolster roller long most expensive", () => {
    expect(pillowCost("bolster_roller_long")).toBeGreaterThan(pillowCost("travel_board_portable"));
  });
});

describe("portable", () => {
  it("travel board portable is portable", () => {
    expect(portable("travel_board_portable")).toBe(true);
  });
  it("flat cookie round not portable", () => {
    expect(portable("flat_cookie_round")).toBe(false);
  });
});

describe("forContinuous", () => {
  it("bolster roller long is for continuous", () => {
    expect(forContinuous("bolster_roller_long")).toBe(true);
  });
  it("flat cookie round not for continuous", () => {
    expect(forContinuous("flat_cookie_round")).toBe(false);
  });
});

describe("fillMaterial", () => {
  it("block pillow square uses sawdust packed", () => {
    expect(fillMaterial("block_pillow_square")).toBe("sawdust_packed");
  });
});

describe("bestUse", () => {
  it("bolster roller long best for continuous strip lace", () => {
    expect(bestUse("bolster_roller_long")).toBe("continuous_strip_lace");
  });
});

describe("pillowLaces", () => {
  it("returns 5 types", () => {
    expect(pillowLaces()).toHaveLength(5);
  });
});
