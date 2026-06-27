import { describe, it, expect } from "vitest";
import {
  ada, security, durability, ease,
  dhCost, adaCompliant, forCommercial, finish_,
  bestUse, doorHardwareTypes,
} from "../door-hardware-calc.js";

describe("ada", () => {
  it("lever handle best ada score", () => {
    expect(ada("lever_handle_commercial")).toBeGreaterThan(ada("knob_cylindrical_residential"));
  });
});

describe("security", () => {
  it("electronic access most secure", () => {
    expect(security("electronic_access_keypad")).toBeGreaterThan(security("pull_handle_plate_push"));
  });
});

describe("durability", () => {
  it("panic bar most durable", () => {
    expect(durability("panic_bar_exit_device")).toBeGreaterThan(durability("electronic_access_keypad"));
  });
});

describe("ease", () => {
  it("panic bar easiest", () => {
    expect(ease("panic_bar_exit_device")).toBeGreaterThan(ease("knob_cylindrical_residential"));
  });
});

describe("dhCost", () => {
  it("electronic access most expensive", () => {
    expect(dhCost("electronic_access_keypad")).toBeGreaterThan(dhCost("knob_cylindrical_residential"));
  });
});

describe("adaCompliant", () => {
  it("lever handle is ada compliant", () => {
    expect(adaCompliant("lever_handle_commercial")).toBe(true);
  });
  it("knob not ada compliant", () => {
    expect(adaCompliant("knob_cylindrical_residential")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("panic bar for commercial", () => {
    expect(forCommercial("panic_bar_exit_device")).toBe(true);
  });
  it("knob not for commercial", () => {
    expect(forCommercial("knob_cylindrical_residential")).toBe(false);
  });
});

describe("finish_", () => {
  it("lever uses satin chrome", () => {
    expect(finish_("lever_handle_commercial")).toBe("satin_chrome_626_brushed");
  });
});

describe("bestUse", () => {
  it("panic bar for fire exit", () => {
    expect(bestUse("panic_bar_exit_device")).toBe("fire_exit_assembly_hall_egress");
  });
});

describe("doorHardwareTypes", () => {
  it("returns 5 types", () => {
    expect(doorHardwareTypes()).toHaveLength(5);
  });
});
