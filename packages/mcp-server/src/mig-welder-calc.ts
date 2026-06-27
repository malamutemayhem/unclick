export type MigWelderType =
  | "short_circuit_thin"
  | "spray_transfer_thick"
  | "pulsed_mig_versatile"
  | "flux_cored_outdoor"
  | "tandem_mig_high_speed";

interface MigWelderData {
  deposition: number;
  penetration: number;
  spattering: number;
  speed: number;
  mwCost: number;
  gasShielded: boolean;
  forThick: boolean;
  wire: string;
  bestUse: string;
}

const DATA: Record<MigWelderType, MigWelderData> = {
  short_circuit_thin: {
    deposition: 5, penetration: 4, spattering: 6, speed: 7, mwCost: 3,
    gasShielded: true, forThick: false,
    wire: "solid_wire_er70s_6_co2_argon_shield",
    bestUse: "sheet_metal_auto_body_thin_gauge_tack",
  },
  spray_transfer_thick: {
    deposition: 9, penetration: 9, spattering: 8, speed: 8, mwCost: 5,
    gasShielded: true, forThick: true,
    wire: "solid_wire_high_current_argon_rich_gas",
    bestUse: "structural_steel_heavy_plate_flat_horiz",
  },
  pulsed_mig_versatile: {
    deposition: 7, penetration: 7, spattering: 9, speed: 7, mwCost: 7,
    gasShielded: true, forThick: false,
    wire: "solid_wire_pulsed_arc_all_position",
    bestUse: "aluminum_stainless_all_position_cosmetic",
  },
  flux_cored_outdoor: {
    deposition: 8, penetration: 8, spattering: 5, speed: 9, mwCost: 4,
    gasShielded: false, forThick: true,
    wire: "flux_cored_self_shielded_e71t_gs",
    bestUse: "outdoor_construction_field_weld_windy",
  },
  tandem_mig_high_speed: {
    deposition: 10, penetration: 8, spattering: 7, speed: 10, mwCost: 9,
    gasShielded: true, forThick: true,
    wire: "twin_wire_tandem_arc_high_deposition",
    bestUse: "robotic_production_line_high_volume_pipe",
  },
};

function get(t: MigWelderType): MigWelderData {
  return DATA[t];
}

export const deposition = (t: MigWelderType) => get(t).deposition;
export const penetration = (t: MigWelderType) => get(t).penetration;
export const spattering = (t: MigWelderType) => get(t).spattering;
export const speed = (t: MigWelderType) => get(t).speed;
export const mwCost = (t: MigWelderType) => get(t).mwCost;
export const gasShielded = (t: MigWelderType) => get(t).gasShielded;
export const forThick = (t: MigWelderType) => get(t).forThick;
export const wire = (t: MigWelderType) => get(t).wire;
export const bestUse = (t: MigWelderType) => get(t).bestUse;
export const migWelderTypes = (): MigWelderType[] =>
  Object.keys(DATA) as MigWelderType[];
