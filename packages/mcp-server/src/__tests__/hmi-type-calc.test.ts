import { describe, it, expect } from "vitest";
import {
  visualization, interactivity, connectivity, ruggedness,
  hmCost, remote, forOt, rendering,
  bestUse, hmiTypes,
} from "../hmi-type-calc.js";

describe("visualization", () => {
  it("mobile ar overlay best visualization", () => {
    expect(visualization("mobile_ar_overlay")).toBeGreaterThan(visualization("text_panel_monochrome"));
  });
});

describe("interactivity", () => {
  it("mobile ar overlay most interactive", () => {
    expect(interactivity("mobile_ar_overlay")).toBeGreaterThan(interactivity("text_panel_monochrome"));
  });
});

describe("connectivity", () => {
  it("web hmi html5 best connectivity", () => {
    expect(connectivity("web_hmi_html5")).toBeGreaterThan(connectivity("text_panel_monochrome"));
  });
});

describe("ruggedness", () => {
  it("text panel most rugged", () => {
    expect(ruggedness("text_panel_monochrome")).toBeGreaterThan(ruggedness("web_hmi_html5"));
  });
});

describe("hmCost", () => {
  it("scada workstation most expensive", () => {
    expect(hmCost("scada_workstation")).toBeGreaterThan(hmCost("text_panel_monochrome"));
  });
});

describe("remote", () => {
  it("scada workstation is remote", () => {
    expect(remote("scada_workstation")).toBe(true);
  });
  it("text panel not remote", () => {
    expect(remote("text_panel_monochrome")).toBe(false);
  });
});

describe("forOt", () => {
  it("touch panel for ot", () => {
    expect(forOt("touch_panel_color")).toBe(true);
  });
  it("web hmi not for ot", () => {
    expect(forOt("web_hmi_html5")).toBe(false);
  });
});

describe("rendering", () => {
  it("web hmi uses browser svg canvas webgl", () => {
    expect(rendering("web_hmi_html5")).toBe("browser_svg_canvas_webgl");
  });
});

describe("bestUse", () => {
  it("scada workstation best for plant wide overview", () => {
    expect(bestUse("scada_workstation")).toBe("plant_wide_process_overview");
  });
});

describe("hmiTypes", () => {
  it("returns 5 types", () => {
    expect(hmiTypes()).toHaveLength(5);
  });
});
