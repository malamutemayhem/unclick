import { describe, it, expect } from "vitest";
import {
  torque, speed, precision, life,
  cdCost, lubricated, forConveyor, link,
  bestUse, chainDriveTypes,
} from "../chain-drive-calc.js";

describe("torque", () => {
  it("multi strand highest torque", () => {
    expect(torque("roller_multi_strand")).toBeGreaterThan(torque("roller_single_strand"));
  });
});

describe("speed", () => {
  it("silent inverted tooth fastest", () => {
    expect(speed("silent_inverted_tooth")).toBeGreaterThan(speed("leaf_chain_lift"));
  });
});

describe("precision", () => {
  it("silent inverted tooth most precise", () => {
    expect(precision("silent_inverted_tooth")).toBeGreaterThan(precision("engineering_class_conveyor"));
  });
});

describe("life", () => {
  it("engineering class longest life", () => {
    expect(life("engineering_class_conveyor")).toBeGreaterThan(life("roller_single_strand"));
  });
});

describe("cdCost", () => {
  it("silent inverted tooth most expensive", () => {
    expect(cdCost("silent_inverted_tooth")).toBeGreaterThan(cdCost("roller_single_strand"));
  });
});

describe("lubricated", () => {
  it("roller single strand lubricated", () => {
    expect(lubricated("roller_single_strand")).toBe(true);
  });
  it("leaf chain not lubricated", () => {
    expect(lubricated("leaf_chain_lift")).toBe(false);
  });
});

describe("forConveyor", () => {
  it("engineering class for conveyor", () => {
    expect(forConveyor("engineering_class_conveyor")).toBe(true);
  });
  it("roller single strand not for conveyor", () => {
    expect(forConveyor("roller_single_strand")).toBe(false);
  });
});

describe("link", () => {
  it("leaf chain uses pin link plate stack", () => {
    expect(link("leaf_chain_lift")).toBe("leaf_chain_pin_link_plate_stack");
  });
});

describe("bestUse", () => {
  it("silent inverted for high speed camshaft", () => {
    expect(bestUse("silent_inverted_tooth")).toBe("high_speed_camshaft_print_register");
  });
});

describe("chainDriveTypes", () => {
  it("returns 5 types", () => {
    expect(chainDriveTypes()).toHaveLength(5);
  });
});
