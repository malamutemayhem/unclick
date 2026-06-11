export type PipeCouplingType =
  | "threaded_npt_standard"
  | "grooved_victaulic"
  | "compression_tube"
  | "push_fit_quick"
  | "welded_butt_joint";

interface PipeCouplingData {
  pressureRating: number;
  installSpeed: number;
  reliability: number;
  disassembly: number;
  pcCost: number;
  mechanical: boolean;
  forFieldJoint: boolean;
  joint: string;
  bestUse: string;
}

const DATA: Record<PipeCouplingType, PipeCouplingData> = {
  threaded_npt_standard: {
    pressureRating: 6, installSpeed: 8, reliability: 7, disassembly: 9, pcCost: 3,
    mechanical: true, forFieldJoint: true,
    joint: "tapered_thread_npt_sealant_tape_or_compound",
    bestUse: "small_bore_utility_piping_air_water_general",
  },
  grooved_victaulic: {
    pressureRating: 7, installSpeed: 10, reliability: 8, disassembly: 10, pcCost: 6,
    mechanical: true, forFieldJoint: true,
    joint: "grooved_pipe_end_elastomer_gasket_clamp_housing",
    bestUse: "fire_protection_hvac_quick_install_modular",
  },
  compression_tube: {
    pressureRating: 8, installSpeed: 7, reliability: 9, disassembly: 8, pcCost: 5,
    mechanical: true, forFieldJoint: true,
    joint: "ferrule_nut_compression_metal_to_metal_seal",
    bestUse: "instrument_tubing_hydraulic_high_press_small",
  },
  push_fit_quick: {
    pressureRating: 4, installSpeed: 10, reliability: 6, disassembly: 10, pcCost: 4,
    mechanical: true, forFieldJoint: true,
    joint: "o_ring_collet_push_in_no_tool_connection",
    bestUse: "pneumatic_line_irrigation_plumbing_quick",
  },
  welded_butt_joint: {
    pressureRating: 10, installSpeed: 3, reliability: 10, disassembly: 1, pcCost: 7,
    mechanical: false, forFieldJoint: false,
    joint: "full_penetration_butt_weld_permanent_joint",
    bestUse: "process_piping_high_integrity_permanent_weld",
  },
};

function get(t: PipeCouplingType): PipeCouplingData {
  return DATA[t];
}

export const pressureRating = (t: PipeCouplingType) => get(t).pressureRating;
export const installSpeed = (t: PipeCouplingType) => get(t).installSpeed;
export const reliability = (t: PipeCouplingType) => get(t).reliability;
export const disassembly = (t: PipeCouplingType) => get(t).disassembly;
export const pcCost = (t: PipeCouplingType) => get(t).pcCost;
export const mechanical = (t: PipeCouplingType) => get(t).mechanical;
export const forFieldJoint = (t: PipeCouplingType) => get(t).forFieldJoint;
export const joint = (t: PipeCouplingType) => get(t).joint;
export const bestUse = (t: PipeCouplingType) => get(t).bestUse;
export const pipeCouplingTypes = (): PipeCouplingType[] =>
  Object.keys(DATA) as PipeCouplingType[];
