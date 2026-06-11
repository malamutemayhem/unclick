export type TerminalBlockType =
  | "screw_clamp_standard"
  | "spring_cage_push_in"
  | "barrier_strip_high_v"
  | "pluggable_header_pcb"
  | "din_rail_mount_feed";

const DATA: Record<TerminalBlockType, {
  contactForce: number; wireRange: number; vibrationResist: number;
  insertSpeed: number; blockCost: number; toolFree: boolean;
  forPanel: boolean; clampMethod: string; bestUse: string;
}> = {
  screw_clamp_standard: { contactForce: 8, wireRange: 7, vibrationResist: 6, insertSpeed: 4, blockCost: 2, toolFree: false, forPanel: false, clampMethod: "captive_screw_plate", bestUse: "general_panel_wiring" },
  spring_cage_push_in: { contactForce: 7, wireRange: 6, vibrationResist: 9, insertSpeed: 9, blockCost: 4, toolFree: true, forPanel: false, clampMethod: "stainless_spring_cage", bestUse: "vibration_zone_connect" },
  barrier_strip_high_v: { contactForce: 9, wireRange: 9, vibrationResist: 7, insertSpeed: 3, blockCost: 5, toolFree: false, forPanel: true, clampMethod: "barrier_screw_stud", bestUse: "high_voltage_mains_term" },
  pluggable_header_pcb: { contactForce: 6, wireRange: 4, vibrationResist: 5, insertSpeed: 8, blockCost: 3, toolFree: false, forPanel: false, clampMethod: "plug_header_friction", bestUse: "pcb_field_wire_connect" },
  din_rail_mount_feed: { contactForce: 8, wireRange: 8, vibrationResist: 8, insertSpeed: 6, blockCost: 6, toolFree: false, forPanel: true, clampMethod: "screw_with_din_snap", bestUse: "industrial_plc_wiring" },
};

const get = (t: TerminalBlockType) => DATA[t];

export const contactForce = (t: TerminalBlockType) => get(t).contactForce;
export const wireRange = (t: TerminalBlockType) => get(t).wireRange;
export const vibrationResist = (t: TerminalBlockType) => get(t).vibrationResist;
export const insertSpeed = (t: TerminalBlockType) => get(t).insertSpeed;
export const blockCost = (t: TerminalBlockType) => get(t).blockCost;
export const toolFree = (t: TerminalBlockType) => get(t).toolFree;
export const forPanel = (t: TerminalBlockType) => get(t).forPanel;
export const clampMethod = (t: TerminalBlockType) => get(t).clampMethod;
export const bestUse = (t: TerminalBlockType) => get(t).bestUse;
export const terminalBlocks = (): TerminalBlockType[] => Object.keys(DATA) as TerminalBlockType[];
