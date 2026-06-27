import { describe, it, expect } from "vitest";
import {
  holdPower, driveEase, headConcealment, stripResist,
  screwCost, needsPilotHole, rustResistant, threadPattern,
  bestSubstrate, drywallScrews,
} from "../drywall-screw-calc.js";

describe("holdPower", () => {
  it("cement board notched strongest hold", () => {
    expect(holdPower("cement_board_notched")).toBeGreaterThan(holdPower("trim_head_small"));
  });
});

describe("driveEase", () => {
  it("coarse thread wood easiest to drive", () => {
    expect(driveEase("coarse_thread_wood")).toBeGreaterThan(driveEase("cement_board_notched"));
  });
});

describe("headConcealment", () => {
  it("trim head small best concealment", () => {
    expect(headConcealment("trim_head_small")).toBeGreaterThan(headConcealment("cement_board_notched"));
  });
});

describe("stripResist", () => {
  it("cement board notched best strip resistance", () => {
    expect(stripResist("cement_board_notched")).toBeGreaterThan(stripResist("trim_head_small"));
  });
});

describe("screwCost", () => {
  it("cement board notched most expensive", () => {
    expect(screwCost("cement_board_notched")).toBeGreaterThan(screwCost("fine_thread_steel"));
  });
});

describe("needsPilotHole", () => {
  it("cement board notched needs pilot hole", () => {
    expect(needsPilotHole("cement_board_notched")).toBe(true);
  });
  it("fine thread steel does not", () => {
    expect(needsPilotHole("fine_thread_steel")).toBe(false);
  });
});

describe("rustResistant", () => {
  it("self drilling metal is rust resistant", () => {
    expect(rustResistant("self_drilling_metal")).toBe(true);
  });
  it("fine thread steel is not", () => {
    expect(rustResistant("fine_thread_steel")).toBe(false);
  });
});

describe("threadPattern", () => {
  it("self drilling metal uses drill point flute tip", () => {
    expect(threadPattern("self_drilling_metal")).toBe("drill_point_flute_tip");
  });
});

describe("bestSubstrate", () => {
  it("coarse thread wood best for wood stud framing", () => {
    expect(bestSubstrate("coarse_thread_wood")).toBe("wood_stud_framing");
  });
});

describe("drywallScrews", () => {
  it("returns 5 types", () => {
    expect(drywallScrews()).toHaveLength(5);
  });
});
