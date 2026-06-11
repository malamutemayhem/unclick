import { describe, it, expect } from "vitest";
import {
  readability, toolSupport, hierSupport, simReady,
  adoptionLevel, humanEditable, forVerify, syntax,
  bestUse, netlistFormats,
} from "../netlist-format-calc.js";

describe("readability", () => {
  it("kicad netlist most readable", () => {
    expect(readability("kicad_netlist")).toBeGreaterThan(readability("orcad_pstchip"));
  });
});

describe("toolSupport", () => {
  it("ipc d 356 best tool support", () => {
    expect(toolSupport("ipc_d_356")).toBeGreaterThan(toolSupport("kicad_netlist"));
  });
});

describe("hierSupport", () => {
  it("verilog structural best hierarchy support", () => {
    expect(hierSupport("verilog_structural")).toBeGreaterThan(hierSupport("ipc_d_356"));
  });
});

describe("simReady", () => {
  it("verilog structural most sim ready", () => {
    expect(simReady("verilog_structural")).toBeGreaterThan(simReady("ipc_d_356"));
  });
});

describe("adoptionLevel", () => {
  it("ipc d 356 highest adoption", () => {
    expect(adoptionLevel("ipc_d_356")).toBeGreaterThan(adoptionLevel("edif_netlist"));
  });
});

describe("humanEditable", () => {
  it("kicad netlist is human editable", () => {
    expect(humanEditable("kicad_netlist")).toBe(true);
  });
  it("orcad pstchip not human editable", () => {
    expect(humanEditable("orcad_pstchip")).toBe(false);
  });
});

describe("forVerify", () => {
  it("ipc d 356 is for verify", () => {
    expect(forVerify("ipc_d_356")).toBe(true);
  });
  it("kicad netlist not for verify", () => {
    expect(forVerify("kicad_netlist")).toBe(false);
  });
});

describe("syntax", () => {
  it("verilog structural uses module wire instance", () => {
    expect(syntax("verilog_structural")).toBe("module_wire_instance");
  });
});

describe("bestUse", () => {
  it("ipc d 356 best for bare board test netlist", () => {
    expect(bestUse("ipc_d_356")).toBe("bare_board_test_netlist");
  });
});

describe("netlistFormats", () => {
  it("returns 5 types", () => {
    expect(netlistFormats()).toHaveLength(5);
  });
});
