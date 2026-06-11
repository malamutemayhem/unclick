export type CapacitanceProbeType =
  | "bare_rod_conductive"
  | "insulated_rod_nonconduct"
  | "coaxial_probe_precise"
  | "cable_probe_deep_tank"
  | "plate_probe_adhesive";

interface CapacitanceProbeData {
  accuracy: number;
  range: number;
  buildupImmune: number;
  tempRange: number;
  cpCost: number;
  continuous: boolean;
  forNonConduct: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<CapacitanceProbeType, CapacitanceProbeData> = {
  bare_rod_conductive: {
    accuracy: 6, range: 5, buildupImmune: 4, tempRange: 7, cpCost: 3,
    continuous: true, forNonConduct: false,
    electrode: "bare_stainless_rod_vessel_wall_ground",
    bestUse: "conductive_liquid_water_acid_simple",
  },
  insulated_rod_nonconduct: {
    accuracy: 7, range: 5, buildupImmune: 5, tempRange: 8, cpCost: 4,
    continuous: true, forNonConduct: true,
    electrode: "ptfe_coated_rod_insulated_dielectric",
    bestUse: "hydrocarbon_oil_solvent_nonconductive",
  },
  coaxial_probe_precise: {
    accuracy: 10, range: 4, buildupImmune: 7, tempRange: 6, cpCost: 6,
    continuous: true, forNonConduct: true,
    electrode: "coaxial_tube_shielded_precise_measure",
    bestUse: "precision_interface_detect_oil_water",
  },
  cable_probe_deep_tank: {
    accuracy: 6, range: 10, buildupImmune: 3, tempRange: 6, cpCost: 5,
    continuous: true, forNonConduct: false,
    electrode: "flexible_cable_weighted_end_deep_mount",
    bestUse: "tall_silo_deep_tank_long_range_level",
  },
  plate_probe_adhesive: {
    accuracy: 5, range: 3, buildupImmune: 8, tempRange: 7, cpCost: 4,
    continuous: false, forNonConduct: true,
    electrode: "flat_plate_flush_mount_no_intrusion",
    bestUse: "sticky_viscous_slurry_flush_mount_point",
  },
};

function get(t: CapacitanceProbeType): CapacitanceProbeData {
  return DATA[t];
}

export const accuracy = (t: CapacitanceProbeType) => get(t).accuracy;
export const range = (t: CapacitanceProbeType) => get(t).range;
export const buildupImmune = (t: CapacitanceProbeType) => get(t).buildupImmune;
export const tempRange = (t: CapacitanceProbeType) => get(t).tempRange;
export const cpCost = (t: CapacitanceProbeType) => get(t).cpCost;
export const continuous = (t: CapacitanceProbeType) => get(t).continuous;
export const forNonConduct = (t: CapacitanceProbeType) => get(t).forNonConduct;
export const electrode = (t: CapacitanceProbeType) => get(t).electrode;
export const bestUse = (t: CapacitanceProbeType) => get(t).bestUse;
export const capacitanceProbeTypes = (): CapacitanceProbeType[] =>
  Object.keys(DATA) as CapacitanceProbeType[];
