export type RespiratorType =
  | "disposable_n95_filtering"
  | "half_face_cartridge_reuse"
  | "full_face_dual_cartridge"
  | "papr_powered_blower"
  | "scba_self_contained_air";

interface RespiratorData {
  protection: number;
  comfort: number;
  duration: number;
  communication: number;
  rpCost: number;
  powered: boolean;
  forIdlh: boolean;
  filter: string;
  bestUse: string;
}

const DATA: Record<RespiratorType, RespiratorData> = {
  disposable_n95_filtering: {
    protection: 3, comfort: 7, duration: 3, communication: 8, rpCost: 1,
    powered: false, forIdlh: false,
    filter: "electrostatic_fiber_particulate",
    bestUse: "dust_mist_healthcare_particle_basic",
  },
  half_face_cartridge_reuse: {
    protection: 6, comfort: 5, duration: 6, communication: 6, rpCost: 4,
    powered: false, forIdlh: false,
    filter: "replaceable_cartridge_organic_p100",
    bestUse: "paint_spray_solvent_organic_vapor",
  },
  full_face_dual_cartridge: {
    protection: 8, comfort: 4, duration: 6, communication: 4, rpCost: 6,
    powered: false, forIdlh: false,
    filter: "dual_cartridge_combo_eye_face_seal",
    bestUse: "chemical_handling_eye_face_vapor",
  },
  papr_powered_blower: {
    protection: 8, comfort: 9, duration: 8, communication: 7, rpCost: 8,
    powered: true, forIdlh: false,
    filter: "hepa_cartridge_positive_pressure",
    bestUse: "extended_wear_pharma_weld_fume",
  },
  scba_self_contained_air: {
    protection: 10, comfort: 3, duration: 4, communication: 3, rpCost: 10,
    powered: true, forIdlh: true,
    filter: "cylinder_compressed_air_regulator",
    bestUse: "fire_idlh_confined_space_hazmat",
  },
};

function get(t: RespiratorType): RespiratorData {
  return DATA[t];
}

export const protection = (t: RespiratorType) => get(t).protection;
export const comfort = (t: RespiratorType) => get(t).comfort;
export const duration = (t: RespiratorType) => get(t).duration;
export const communication = (t: RespiratorType) => get(t).communication;
export const rpCost = (t: RespiratorType) => get(t).rpCost;
export const powered = (t: RespiratorType) => get(t).powered;
export const forIdlh = (t: RespiratorType) => get(t).forIdlh;
export const filter = (t: RespiratorType) => get(t).filter;
export const bestUse = (t: RespiratorType) => get(t).bestUse;
export const respiratorTypes = (): RespiratorType[] =>
  Object.keys(DATA) as RespiratorType[];
