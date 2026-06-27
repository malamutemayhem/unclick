import { describe, it, expect } from "vitest";
import {
  formationQuality, drainageRate, machineSpeed, sheetWidth,
  ffCost, twinWire, forTissue, formerConfig,
  bestUse, fourdrinierTypes,
} from "../fourdrinier-calc.js";

describe("formationQuality", () => {
  it("twin wire best formation quality", () => {
    expect(formationQuality("twin_wire")).toBeGreaterThan(formationQuality("suction_breast_roll"));
  });
});

describe("drainageRate", () => {
  it("twin wire fastest drainage rate", () => {
    expect(drainageRate("twin_wire")).toBeGreaterThan(drainageRate("suction_breast_roll"));
  });
});

describe("machineSpeed", () => {
  it("twin wire fastest machine speed", () => {
    expect(machineSpeed("twin_wire")).toBeGreaterThan(machineSpeed("suction_breast_roll"));
  });
});

describe("sheetWidth", () => {
  it("single wire wide sheet width", () => {
    expect(sheetWidth("single_wire")).toBeGreaterThan(sheetWidth("crescent_former"));
  });
});

describe("ffCost", () => {
  it("twin wire most expensive", () => {
    expect(ffCost("twin_wire")).toBeGreaterThan(ffCost("suction_breast_roll"));
  });
});

describe("twinWire", () => {
  it("twin wire is twin wire", () => {
    expect(twinWire("twin_wire")).toBe(true);
  });
  it("single wire not twin wire", () => {
    expect(twinWire("single_wire")).toBe(false);
  });
});

describe("forTissue", () => {
  it("crescent former for tissue", () => {
    expect(forTissue("crescent_former")).toBe(true);
  });
  it("single wire not for tissue", () => {
    expect(forTissue("single_wire")).toBe(false);
  });
});

describe("formerConfig", () => {
  it("suction breast roll uses open draw board machine", () => {
    expect(formerConfig("suction_breast_roll")).toBe("suction_breast_roll_fourdrinier_open_draw_board_machine_basic");
  });
});

describe("bestUse", () => {
  it("crescent former for tissue towel", () => {
    expect(bestUse("crescent_former")).toBe("tissue_towel_crescent_former_high_speed_wrap_suction_roll_form");
  });
});

describe("fourdrinierTypes", () => {
  it("returns 5 types", () => {
    expect(fourdrinierTypes()).toHaveLength(5);
  });
});
