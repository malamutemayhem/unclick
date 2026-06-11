import { describe, it, expect } from "vitest";
import {
  cracking, slamResist, pressure, flow,
  cvCost, springAssist, forPump, disc,
  bestUse, checkValveTypes,
} from "../check-valve-calc.js";

describe("cracking", () => {
  it("dual plate best cracking", () => {
    expect(cracking("dual_plate_wafer_butterfly")).toBeGreaterThan(cracking("ball_check_spherical_seat"));
  });
});

describe("slamResist", () => {
  it("dual plate best slam resist", () => {
    expect(slamResist("dual_plate_wafer_butterfly")).toBeGreaterThan(slamResist("swing_check_flapper_disc"));
  });
});

describe("pressure", () => {
  it("lift check highest pressure", () => {
    expect(pressure("lift_check_piston_spring")).toBeGreaterThan(pressure("ball_check_spherical_seat"));
  });
});

describe("flow", () => {
  it("swing check best flow", () => {
    expect(flow("swing_check_flapper_disc")).toBeGreaterThan(flow("ball_check_spherical_seat"));
  });
});

describe("cvCost", () => {
  it("tilting disc most expensive", () => {
    expect(cvCost("tilting_disc_pivot_center")).toBeGreaterThan(cvCost("ball_check_spherical_seat"));
  });
});

describe("springAssist", () => {
  it("dual plate has spring assist", () => {
    expect(springAssist("dual_plate_wafer_butterfly")).toBe(true);
  });
  it("swing check no spring assist", () => {
    expect(springAssist("swing_check_flapper_disc")).toBe(false);
  });
});

describe("forPump", () => {
  it("swing check for pump", () => {
    expect(forPump("swing_check_flapper_disc")).toBe(true);
  });
  it("ball check not for pump", () => {
    expect(forPump("ball_check_spherical_seat")).toBe(false);
  });
});

describe("disc", () => {
  it("ball check uses rubber ball", () => {
    expect(disc("ball_check_spherical_seat")).toBe("rubber_ball_spherical_seat");
  });
});

describe("bestUse", () => {
  it("dual plate for compact space", () => {
    expect(bestUse("dual_plate_wafer_butterfly")).toBe("compact_space_between_flanges");
  });
});

describe("checkValveTypes", () => {
  it("returns 5 types", () => {
    expect(checkValveTypes()).toHaveLength(5);
  });
});
