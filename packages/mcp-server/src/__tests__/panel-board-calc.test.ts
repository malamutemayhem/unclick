import { describe, it, expect } from "vitest";
import {
  capacity, circuits, safety, expandability,
  pbCost, mainBreaker, forCommercial, busRating,
  bestUse, panelBoardTypes,
} from "../panel-board-calc.js";

describe("capacity", () => {
  it("mcc highest capacity", () => {
    expect(capacity("motor_control_center_mcc")).toBeGreaterThan(capacity("sub_panel_branch_circuit"));
  });
});

describe("circuits", () => {
  it("distribution panel most circuits", () => {
    expect(circuits("distribution_panel_commercial")).toBeGreaterThan(circuits("sub_panel_branch_circuit"));
  });
});

describe("safety", () => {
  it("mcc safest", () => {
    expect(safety("motor_control_center_mcc")).toBeGreaterThan(safety("main_lug_residential_load"));
  });
});

describe("expandability", () => {
  it("mcc most expandable", () => {
    expect(expandability("motor_control_center_mcc")).toBeGreaterThan(expandability("sub_panel_branch_circuit"));
  });
});

describe("pbCost", () => {
  it("mcc most expensive", () => {
    expect(pbCost("motor_control_center_mcc")).toBeGreaterThan(pbCost("sub_panel_branch_circuit"));
  });
});

describe("mainBreaker", () => {
  it("main breaker residential has main breaker", () => {
    expect(mainBreaker("main_breaker_residential")).toBe(true);
  });
  it("main lug no main breaker", () => {
    expect(mainBreaker("main_lug_residential_load")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("distribution panel for commercial", () => {
    expect(forCommercial("distribution_panel_commercial")).toBe(true);
  });
  it("sub panel not for commercial", () => {
    expect(forCommercial("sub_panel_branch_circuit")).toBe(false);
  });
});

describe("busRating", () => {
  it("mcc uses vertical bus draw out", () => {
    expect(busRating("motor_control_center_mcc")).toBe("600a_2000a_vertical_bus_draw_out");
  });
});

describe("bestUse", () => {
  it("distribution panel for commercial floor", () => {
    expect(bestUse("distribution_panel_commercial")).toBe("commercial_floor_distribution_board");
  });
});

describe("panelBoardTypes", () => {
  it("returns 5 types", () => {
    expect(panelBoardTypes()).toHaveLength(5);
  });
});
