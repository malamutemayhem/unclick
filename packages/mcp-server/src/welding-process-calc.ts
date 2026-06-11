export type WeldingProcess =
  | "mig_gmaw_wire_feed"
  | "tig_gtaw_tungsten"
  | "stick_smaw_electrode"
  | "laser_beam_keyhole"
  | "friction_stir_solid";

const DATA: Record<WeldingProcess, {
  speed: number; quality: number; penetration: number;
  skill: number; wpCost: number; automated: boolean;
  forAluminum: boolean; shielding: string; bestUse: string;
}> = {
  mig_gmaw_wire_feed: {
    speed: 9, quality: 6, penetration: 7,
    skill: 4, wpCost: 2, automated: true,
    forAluminum: true, shielding: "inert_gas_argon_co2_mix",
    bestUse: "automotive_body_panel_production",
  },
  tig_gtaw_tungsten: {
    speed: 3, quality: 10, penetration: 5,
    skill: 9, wpCost: 3, automated: false,
    forAluminum: true, shielding: "pure_argon_inert_gas",
    bestUse: "aerospace_pipe_critical_joint",
  },
  stick_smaw_electrode: {
    speed: 4, quality: 5, penetration: 8,
    skill: 6, wpCost: 1, automated: false,
    forAluminum: false, shielding: "flux_coating_decompose_gas",
    bestUse: "field_repair_structural_steel",
  },
  laser_beam_keyhole: {
    speed: 10, quality: 9, penetration: 10,
    skill: 3, wpCost: 5, automated: true,
    forAluminum: true, shielding: "helium_cross_jet_plume",
    bestUse: "battery_cell_hermetic_seal",
  },
  friction_stir_solid: {
    speed: 6, quality: 8, penetration: 6,
    skill: 2, wpCost: 4, automated: true,
    forAluminum: true, shielding: "none_solid_state_process",
    bestUse: "aluminum_ship_hull_long_seam",
  },
};

const get = (t: WeldingProcess) => DATA[t];

export const speed = (t: WeldingProcess) => get(t).speed;
export const quality = (t: WeldingProcess) => get(t).quality;
export const penetration = (t: WeldingProcess) => get(t).penetration;
export const skill = (t: WeldingProcess) => get(t).skill;
export const wpCost = (t: WeldingProcess) => get(t).wpCost;
export const automated = (t: WeldingProcess) => get(t).automated;
export const forAluminum = (t: WeldingProcess) => get(t).forAluminum;
export const shielding = (t: WeldingProcess) => get(t).shielding;
export const bestUse = (t: WeldingProcess) => get(t).bestUse;
export const weldingProcesses = (): WeldingProcess[] => Object.keys(DATA) as WeldingProcess[];
