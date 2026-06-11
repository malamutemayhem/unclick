export type NetlistFormatType =
  | "kicad_netlist"
  | "orcad_pstchip"
  | "ipc_d_356"
  | "edif_netlist"
  | "verilog_structural";

const DATA: Record<NetlistFormatType, {
  readability: number; toolSupport: number; hierSupport: number;
  simReady: number; adoptionLevel: number; humanEditable: boolean;
  forVerify: boolean; syntax: string; bestUse: string;
}> = {
  kicad_netlist: { readability: 8, toolSupport: 6, hierSupport: 7, simReady: 5, adoptionLevel: 7, humanEditable: true, forVerify: false, syntax: "s_expression_tree", bestUse: "kicad_pcb_layout_input" },
  orcad_pstchip: { readability: 4, toolSupport: 8, hierSupport: 8, simReady: 7, adoptionLevel: 8, humanEditable: false, forVerify: false, syntax: "binary_indexed_format", bestUse: "cadence_allegro_flow" },
  ipc_d_356: { readability: 6, toolSupport: 9, hierSupport: 4, simReady: 3, adoptionLevel: 9, humanEditable: true, forVerify: true, syntax: "fixed_field_text", bestUse: "bare_board_test_netlist" },
  edif_netlist: { readability: 5, toolSupport: 7, hierSupport: 9, simReady: 6, adoptionLevel: 5, humanEditable: false, forVerify: false, syntax: "lisp_like_hierarchy", bestUse: "cross_tool_netlist_exchange" },
  verilog_structural: { readability: 7, toolSupport: 7, hierSupport: 10, simReady: 10, adoptionLevel: 6, humanEditable: true, forVerify: true, syntax: "module_wire_instance", bestUse: "fpga_asic_gate_netlist" },
};

const get = (t: NetlistFormatType) => DATA[t];

export const readability = (t: NetlistFormatType) => get(t).readability;
export const toolSupport = (t: NetlistFormatType) => get(t).toolSupport;
export const hierSupport = (t: NetlistFormatType) => get(t).hierSupport;
export const simReady = (t: NetlistFormatType) => get(t).simReady;
export const adoptionLevel = (t: NetlistFormatType) => get(t).adoptionLevel;
export const humanEditable = (t: NetlistFormatType) => get(t).humanEditable;
export const forVerify = (t: NetlistFormatType) => get(t).forVerify;
export const syntax = (t: NetlistFormatType) => get(t).syntax;
export const bestUse = (t: NetlistFormatType) => get(t).bestUse;
export const netlistFormats = (): NetlistFormatType[] => Object.keys(DATA) as NetlistFormatType[];
