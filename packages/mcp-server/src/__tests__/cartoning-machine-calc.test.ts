import { describe, it, expect } from "vitest";
import {
  speed, flexibility, footprint, automation,
  cmCost_, continuous, forPharma, loading,
  bestUse, cartoningMachineTypes,
} from "../cartoning-machine-calc.js";

describe("speed", () => {
  it("wrap around fastest", () => {
    expect(speed("wrap_around")).toBeGreaterThan(speed("vertical_top_load"));
  });
});

describe("flexibility", () => {
  it("vertical top load most flexible", () => {
    expect(flexibility("vertical_top_load")).toBeGreaterThan(flexibility("wrap_around"));
  });
});

describe("footprint", () => {
  it("vertical top load smallest footprint", () => {
    expect(footprint("vertical_top_load")).toBeGreaterThan(footprint("wrap_around"));
  });
});

describe("automation", () => {
  it("blister cartoner most automated", () => {
    expect(automation("blister_cartoner")).toBeGreaterThan(automation("tray_former"));
  });
});

describe("cmCost_", () => {
  it("blister cartoner most expensive", () => {
    expect(cmCost_("blister_cartoner")).toBeGreaterThan(cmCost_("tray_former"));
  });
});

describe("continuous", () => {
  it("horizontal end load is continuous", () => {
    expect(continuous("horizontal_end_load")).toBe(true);
  });
  it("vertical top load not continuous", () => {
    expect(continuous("vertical_top_load")).toBe(false);
  });
});

describe("forPharma", () => {
  it("horizontal end load for pharma", () => {
    expect(forPharma("horizontal_end_load")).toBe(true);
  });
  it("wrap around not for pharma", () => {
    expect(forPharma("wrap_around")).toBe(false);
  });
});

describe("loading", () => {
  it("tray former uses corrugated blank fold", () => {
    expect(loading("tray_former")).toBe("corrugated_blank_fold_glue_erect_tray_no_lid");
  });
});

describe("bestUse", () => {
  it("blister cartoner for pharma tablet capsule", () => {
    expect(bestUse("blister_cartoner")).toBe("pharma_tablet_capsule_blister_to_carton_serialized");
  });
});

describe("cartoningMachineTypes", () => {
  it("returns 5 types", () => {
    expect(cartoningMachineTypes()).toHaveLength(5);
  });
});
