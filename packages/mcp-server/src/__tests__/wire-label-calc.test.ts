import { describe, it, expect } from "vitest";
import {
  durability, readability, installSpeed, tempResist,
  labelCost, printable, reusable, attachMethod,
  bestUse, wireLabels,
} from "../wire-label-calc.js";

describe("durability", () => {
  it("heat shrink print most durable", () => {
    expect(durability("heat_shrink_print")).toBeGreaterThan(durability("adhesive_dot_number"));
  });
});

describe("readability", () => {
  it("flag style marker best readability", () => {
    expect(readability("flag_style_marker")).toBeGreaterThan(readability("adhesive_dot_number"));
  });
});

describe("installSpeed", () => {
  it("adhesive dot number fastest install", () => {
    expect(installSpeed("adhesive_dot_number")).toBeGreaterThan(installSpeed("heat_shrink_print"));
  });
});

describe("tempResist", () => {
  it("heat shrink print best temp resist", () => {
    expect(tempResist("heat_shrink_print")).toBeGreaterThan(tempResist("adhesive_dot_number"));
  });
});

describe("labelCost", () => {
  it("heat shrink print most expensive", () => {
    expect(labelCost("heat_shrink_print")).toBeGreaterThan(labelCost("adhesive_dot_number"));
  });
});

describe("printable", () => {
  it("self laminating wrap is printable", () => {
    expect(printable("self_laminating_wrap")).toBe(true);
  });
  it("adhesive dot number not printable", () => {
    expect(printable("adhesive_dot_number")).toBe(false);
  });
});

describe("reusable", () => {
  it("sleeve slide on is reusable", () => {
    expect(reusable("sleeve_slide_on")).toBe(true);
  });
  it("heat shrink print not reusable", () => {
    expect(reusable("heat_shrink_print")).toBe(false);
  });
});

describe("attachMethod", () => {
  it("flag style marker uses flag wrap stick", () => {
    expect(attachMethod("flag_style_marker")).toBe("flag_wrap_stick");
  });
});

describe("bestUse", () => {
  it("heat shrink print best for permanent harsh env", () => {
    expect(bestUse("heat_shrink_print")).toBe("permanent_harsh_env");
  });
});

describe("wireLabels", () => {
  it("returns 5 types", () => {
    expect(wireLabels()).toHaveLength(5);
  });
});
