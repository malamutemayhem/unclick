import { describe, it, expect } from "vitest";
import {
  clampForce, pageCapacity, compactSize, handleFold,
  clipCost, colorCoded, stackFriendly, clipFinish,
  bestUse, binderClips,
} from "../binder-clip-calc.js";

describe("clampForce", () => {
  it("large 51mm heavy strongest clamp", () => {
    expect(clampForce("large_51mm_heavy")).toBeGreaterThan(clampForce("mini_15mm_tiny"));
  });
});

describe("pageCapacity", () => {
  it("large 51mm heavy most pages", () => {
    expect(pageCapacity("large_51mm_heavy")).toBeGreaterThan(pageCapacity("mini_15mm_tiny"));
  });
});

describe("compactSize", () => {
  it("mini 15mm tiny most compact", () => {
    expect(compactSize("mini_15mm_tiny")).toBeGreaterThan(compactSize("large_51mm_heavy"));
  });
});

describe("handleFold", () => {
  it("large 51mm heavy best handle fold", () => {
    expect(handleFold("large_51mm_heavy")).toBeGreaterThan(handleFold("mini_15mm_tiny"));
  });
});

describe("clipCost", () => {
  it("large 51mm heavy most expensive", () => {
    expect(clipCost("large_51mm_heavy")).toBeGreaterThan(clipCost("mini_15mm_tiny"));
  });
});

describe("colorCoded", () => {
  it("fold back color set is color coded", () => {
    expect(colorCoded("fold_back_color_set")).toBe(true);
  });
  it("mini 15mm tiny is not", () => {
    expect(colorCoded("mini_15mm_tiny")).toBe(false);
  });
});

describe("stackFriendly", () => {
  it("mini 15mm tiny is stack friendly", () => {
    expect(stackFriendly("mini_15mm_tiny")).toBe(true);
  });
  it("large 51mm heavy is not", () => {
    expect(stackFriendly("large_51mm_heavy")).toBe(false);
  });
});

describe("clipFinish", () => {
  it("fold back color set uses powder coated assorted", () => {
    expect(clipFinish("fold_back_color_set")).toBe("powder_coated_assorted");
  });
});

describe("bestUse", () => {
  it("medium 32mm common best for report packet meeting", () => {
    expect(bestUse("medium_32mm_common")).toBe("report_packet_meeting");
  });
});

describe("binderClips", () => {
  it("returns 5 types", () => {
    expect(binderClips()).toHaveLength(5);
  });
});
