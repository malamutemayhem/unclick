import { describe, it, expect } from "vitest";
import {
  isolationVoltage, transferSpeed, ctrRatio, durability,
  optoCost, forAc, highSpeed, outputType,
  bestUse, optocouplers,
} from "../optocoupler-calc.js";

describe("isolationVoltage", () => {
  it("phototriac highest isolation voltage", () => {
    expect(isolationVoltage("phototriac_ac_switch")).toBeGreaterThan(isolationVoltage("high_speed_logic"));
  });
});

describe("transferSpeed", () => {
  it("high speed logic fastest transfer", () => {
    expect(transferSpeed("high_speed_logic")).toBeGreaterThan(transferSpeed("phototriac_ac_switch"));
  });
});

describe("ctrRatio", () => {
  it("darlington highest ctr ratio", () => {
    expect(ctrRatio("darlington_high_gain")).toBeGreaterThan(ctrRatio("high_speed_logic"));
  });
});

describe("durability", () => {
  it("phototransistor most durable", () => {
    expect(durability("phototransistor_4pin")).toBeGreaterThan(durability("phototriac_ac_switch"));
  });
});

describe("optoCost", () => {
  it("linear analog iso most expensive", () => {
    expect(optoCost("linear_analog_iso")).toBeGreaterThan(optoCost("phototransistor_4pin"));
  });
});

describe("forAc", () => {
  it("phototriac is for ac", () => {
    expect(forAc("phototriac_ac_switch")).toBe(true);
  });
  it("phototransistor not for ac", () => {
    expect(forAc("phototransistor_4pin")).toBe(false);
  });
});

describe("highSpeed", () => {
  it("high speed logic is high speed", () => {
    expect(highSpeed("high_speed_logic")).toBe(true);
  });
  it("darlington not high speed", () => {
    expect(highSpeed("darlington_high_gain")).toBe(false);
  });
});

describe("outputType", () => {
  it("phototriac uses triac driver output", () => {
    expect(outputType("phototriac_ac_switch")).toBe("triac_driver_output");
  });
});

describe("bestUse", () => {
  it("phototransistor best for basic signal isolate", () => {
    expect(bestUse("phototransistor_4pin")).toBe("basic_signal_isolate");
  });
});

describe("optocouplers", () => {
  it("returns 5 types", () => {
    expect(optocouplers()).toHaveLength(5);
  });
});
