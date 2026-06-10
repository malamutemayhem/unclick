import { describe, it, expect } from "vitest";
import {
  neckRelief, pageCapacity, deskFootprint, stability,
  holderCost, adjustableAngle, attachToMonitor, holdStyle,
  bestTask, documentHolders,
} from "../document-holder-calc.js";

describe("neckRelief", () => {
  it("inline between keyboard monitor best neck relief", () => {
    expect(neckRelief("inline_between_keyboard_monitor")).toBeGreaterThan(neckRelief("slant_board_angled"));
  });
});

describe("pageCapacity", () => {
  it("slant board angled most page capacity", () => {
    expect(pageCapacity("slant_board_angled")).toBeGreaterThan(pageCapacity("monitor_clip_side_attach"));
  });
});

describe("deskFootprint", () => {
  it("monitor clip side attach smallest desk footprint", () => {
    expect(deskFootprint("monitor_clip_side_attach")).toBeGreaterThan(deskFootprint("slant_board_angled"));
  });
});

describe("stability", () => {
  it("slant board angled most stable", () => {
    expect(stability("slant_board_angled")).toBeGreaterThan(stability("monitor_clip_side_attach"));
  });
});

describe("holderCost", () => {
  it("arm mount adjustable most expensive", () => {
    expect(holderCost("arm_mount_adjustable")).toBeGreaterThan(holderCost("freestanding_easel_desk"));
  });
});

describe("adjustableAngle", () => {
  it("inline between keyboard monitor has adjustable angle", () => {
    expect(adjustableAngle("inline_between_keyboard_monitor")).toBe(true);
  });
  it("monitor clip side attach has no adjustable angle", () => {
    expect(adjustableAngle("monitor_clip_side_attach")).toBe(false);
  });
});

describe("attachToMonitor", () => {
  it("monitor clip side attach attaches to monitor", () => {
    expect(attachToMonitor("monitor_clip_side_attach")).toBe(true);
  });
  it("freestanding easel desk does not attach to monitor", () => {
    expect(attachToMonitor("freestanding_easel_desk")).toBe(false);
  });
});

describe("holdStyle", () => {
  it("slant board angled uses tilted surface lip", () => {
    expect(holdStyle("slant_board_angled")).toBe("tilted_surface_lip");
  });
});

describe("bestTask", () => {
  it("inline between keyboard monitor best for data entry typing", () => {
    expect(bestTask("inline_between_keyboard_monitor")).toBe("data_entry_typing");
  });
});

describe("documentHolders", () => {
  it("returns 5 types", () => {
    expect(documentHolders()).toHaveLength(5);
  });
});
