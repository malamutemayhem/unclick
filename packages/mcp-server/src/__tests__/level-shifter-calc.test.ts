import { describe, it, expect } from "vitest";
import {
  speedMax, channelCount, accuracy, sizeCompact,
  shifterCost, bidirectional, autoDirection, shiftMethod,
  bestUse, levelShifters,
} from "../level-shifter-calc.js";

describe("speedMax", () => {
  it("auto direction txb fastest", () => {
    expect(speedMax("auto_direction_txb")).toBeGreaterThan(speedMax("diode_clamp_simple"));
  });
});

describe("channelCount", () => {
  it("buffer ic most channels", () => {
    expect(channelCount("buffer_ic_unidirect")).toBeGreaterThan(channelCount("diode_clamp_simple"));
  });
});

describe("accuracy", () => {
  it("auto direction txb most accurate", () => {
    expect(accuracy("auto_direction_txb")).toBeGreaterThan(accuracy("diode_clamp_simple"));
  });
});

describe("sizeCompact", () => {
  it("diode clamp most compact", () => {
    expect(sizeCompact("diode_clamp_simple")).toBeGreaterThan(sizeCompact("mosfet_bidirectional"));
  });
});

describe("shifterCost", () => {
  it("auto direction txb most expensive", () => {
    expect(shifterCost("auto_direction_txb")).toBeGreaterThan(shifterCost("voltage_divider_passive"));
  });
});

describe("bidirectional", () => {
  it("mosfet bidirectional is bidirectional", () => {
    expect(bidirectional("mosfet_bidirectional")).toBe(true);
  });
  it("buffer ic not bidirectional", () => {
    expect(bidirectional("buffer_ic_unidirect")).toBe(false);
  });
});

describe("autoDirection", () => {
  it("auto direction txb has auto direction", () => {
    expect(autoDirection("auto_direction_txb")).toBe(true);
  });
  it("mosfet bidirectional no auto direction", () => {
    expect(autoDirection("mosfet_bidirectional")).toBe(false);
  });
});

describe("shiftMethod", () => {
  it("mosfet uses n mosfet pull up", () => {
    expect(shiftMethod("mosfet_bidirectional")).toBe("n_mosfet_pull_up");
  });
});

describe("bestUse", () => {
  it("auto direction txb best for multi bus hub shift", () => {
    expect(bestUse("auto_direction_txb")).toBe("multi_bus_hub_shift");
  });
});

describe("levelShifters", () => {
  it("returns 5 types", () => {
    expect(levelShifters()).toHaveLength(5);
  });
});
