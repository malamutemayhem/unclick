import { describe, it, expect } from "vitest";
import {
  rackUnits, loadCapacity, airflow, security,
  rackCost, enclosed, portable, mountStyle,
  bestUse, serverRacks,
} from "../server-rack-calc.js";

describe("rackUnits", () => {
  it("enclosed 4post 42u most rack units", () => {
    expect(rackUnits("enclosed_4post_42u")).toBeGreaterThan(rackUnits("wall_mount_12u"));
  });
});

describe("loadCapacity", () => {
  it("enclosed 4post 42u highest load capacity", () => {
    expect(loadCapacity("enclosed_4post_42u")).toBeGreaterThan(loadCapacity("wall_mount_12u"));
  });
});

describe("airflow", () => {
  it("open frame 2post best airflow", () => {
    expect(airflow("open_frame_2post")).toBeGreaterThan(airflow("wall_mount_12u"));
  });
});

describe("security", () => {
  it("colocation cage most secure", () => {
    expect(security("colocation_cage_42u")).toBeGreaterThan(security("open_frame_2post"));
  });
});

describe("rackCost", () => {
  it("colocation cage most expensive", () => {
    expect(rackCost("colocation_cage_42u")).toBeGreaterThan(rackCost("open_frame_2post"));
  });
});

describe("enclosed", () => {
  it("enclosed 4post is enclosed", () => {
    expect(enclosed("enclosed_4post_42u")).toBe(true);
  });
  it("open frame not enclosed", () => {
    expect(enclosed("open_frame_2post")).toBe(false);
  });
});

describe("portable", () => {
  it("portable rolling is portable", () => {
    expect(portable("portable_rolling_18u")).toBe(true);
  });
  it("enclosed 4post not portable", () => {
    expect(portable("enclosed_4post_42u")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("wall mount uses wall bracket swing", () => {
    expect(mountStyle("wall_mount_12u")).toBe("wall_bracket_swing");
  });
});

describe("bestUse", () => {
  it("open frame best for telecom patch frame", () => {
    expect(bestUse("open_frame_2post")).toBe("telecom_patch_frame");
  });
});

describe("serverRacks", () => {
  it("returns 5 types", () => {
    expect(serverRacks()).toHaveLength(5);
  });
});
