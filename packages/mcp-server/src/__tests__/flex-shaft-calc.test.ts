import { describe, it, expect } from "vitest";
import {
  powerOutput, precision, speedRange, portability,
  shaftCost, footPedal, handheldUnit, driveSystem,
  bestTask, flexShafts,
} from "../flex-shaft-calc.js";

describe("powerOutput", () => {
  it("bench motor fixed most power", () => {
    expect(powerOutput("bench_motor_fixed")).toBeGreaterThan(powerOutput("micro_motor_compact"));
  });
});

describe("precision", () => {
  it("micro motor compact most precise", () => {
    expect(precision("micro_motor_compact")).toBeGreaterThan(precision("rotary_dremel_handheld"));
  });
});

describe("speedRange", () => {
  it("pendant motor hang widest speed range", () => {
    expect(speedRange("pendant_motor_hang")).toBeGreaterThan(speedRange("polishing_lathe_dual"));
  });
});

describe("portability", () => {
  it("micro motor compact most portable", () => {
    expect(portability("micro_motor_compact")).toBeGreaterThan(portability("bench_motor_fixed"));
  });
});

describe("shaftCost", () => {
  it("bench motor fixed more expensive than rotary dremel", () => {
    expect(shaftCost("bench_motor_fixed")).toBeGreaterThan(shaftCost("rotary_dremel_handheld"));
  });
});

describe("footPedal", () => {
  it("pendant motor hang has foot pedal", () => {
    expect(footPedal("pendant_motor_hang")).toBe(true);
  });
  it("rotary dremel handheld has no foot pedal", () => {
    expect(footPedal("rotary_dremel_handheld")).toBe(false);
  });
});

describe("handheldUnit", () => {
  it("micro motor compact is handheld unit", () => {
    expect(handheldUnit("micro_motor_compact")).toBe(true);
  });
  it("pendant motor hang is not handheld unit", () => {
    expect(handheldUnit("pendant_motor_hang")).toBe(false);
  });
});

describe("driveSystem", () => {
  it("micro motor compact uses brushless dc motor", () => {
    expect(driveSystem("micro_motor_compact")).toBe("brushless_dc_motor");
  });
});

describe("bestTask", () => {
  it("micro motor compact best for fine detail engraving", () => {
    expect(bestTask("micro_motor_compact")).toBe("fine_detail_engraving");
  });
});

describe("flexShafts", () => {
  it("returns 5 types", () => {
    expect(flexShafts()).toHaveLength(5);
  });
});
