import { describe, it, expect } from "vitest";
import {
  dataRichness, compatibility, layerSupport, automation,
  adoptionLevel, embedded, forSmartFab, fileStructure,
  bestUse, gerberFormats,
} from "../gerber-format-calc.js";

describe("dataRichness", () => {
  it("odb plusplus richest data", () => {
    expect(dataRichness("odb_plusplus")).toBeGreaterThan(dataRichness("rs274x_extended"));
  });
});

describe("compatibility", () => {
  it("rs274x extended most compatible", () => {
    expect(compatibility("rs274x_extended")).toBeGreaterThan(compatibility("ipc2581_xml"));
  });
});

describe("layerSupport", () => {
  it("odb plusplus best layer support", () => {
    expect(layerSupport("odb_plusplus")).toBeGreaterThan(layerSupport("rs274x_extended"));
  });
});

describe("automation", () => {
  it("ipc2581 xml best automation", () => {
    expect(automation("ipc2581_xml")).toBeGreaterThan(automation("rs274x_extended"));
  });
});

describe("adoptionLevel", () => {
  it("rs274x extended highest adoption", () => {
    expect(adoptionLevel("rs274x_extended")).toBeGreaterThan(adoptionLevel("ipc2581_xml"));
  });
});

describe("embedded", () => {
  it("gerber x2 attr has embedded data", () => {
    expect(embedded("gerber_x2_attr")).toBe(true);
  });
  it("rs274x extended no embedded data", () => {
    expect(embedded("rs274x_extended")).toBe(false);
  });
});

describe("forSmartFab", () => {
  it("odb plusplus is for smart fab", () => {
    expect(forSmartFab("odb_plusplus")).toBe(true);
  });
  it("rs274x extended not for smart fab", () => {
    expect(forSmartFab("rs274x_extended")).toBe(false);
  });
});

describe("fileStructure", () => {
  it("ipc2581 xml uses xml structured package", () => {
    expect(fileStructure("ipc2581_xml")).toBe("xml_structured_package");
  });
});

describe("bestUse", () => {
  it("rs274x extended best for universal fab exchange", () => {
    expect(bestUse("rs274x_extended")).toBe("universal_fab_exchange");
  });
});

describe("gerberFormats", () => {
  it("returns 5 types", () => {
    expect(gerberFormats()).toHaveLength(5);
  });
});
