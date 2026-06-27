export type LightningRodType =
  | "franklin_rod_copper_tip"
  | "early_streamer_ese_active"
  | "mesh_conductor_faraday_cage"
  | "catenary_wire_overhead"
  | "charge_transfer_dissipator";

interface LightningRodData {
  protection: number;
  coverage: number;
  aesthetic: number;
  maintenance: number;
  lrCost: number;
  active: boolean;
  forBuilding: boolean;
  conductor: string;
  bestUse: string;
}

const DATA: Record<LightningRodType, LightningRodData> = {
  franklin_rod_copper_tip: {
    protection: 7, coverage: 5, aesthetic: 6, maintenance: 8, lrCost: 4,
    active: false, forBuilding: true,
    conductor: "copper_rod_pointed_tip_air_terminal",
    bestUse: "residential_commercial_roof_peak",
  },
  early_streamer_ese_active: {
    protection: 9, coverage: 9, aesthetic: 5, maintenance: 6, lrCost: 8,
    active: true, forBuilding: true,
    conductor: "active_streamer_emission_head",
    bestUse: "large_area_single_point_protection",
  },
  mesh_conductor_faraday_cage: {
    protection: 10, coverage: 10, aesthetic: 3, maintenance: 7, lrCost: 9,
    active: false, forBuilding: true,
    conductor: "copper_aluminum_mesh_grid_roof",
    bestUse: "sensitive_facility_data_center_ammo",
  },
  catenary_wire_overhead: {
    protection: 8, coverage: 8, aesthetic: 2, maintenance: 5, lrCost: 6,
    active: false, forBuilding: false,
    conductor: "overhead_ground_wire_shield",
    bestUse: "power_line_substation_overhead",
  },
  charge_transfer_dissipator: {
    protection: 6, coverage: 7, aesthetic: 7, maintenance: 9, lrCost: 7,
    active: true, forBuilding: true,
    conductor: "multi_point_ionizer_array",
    bestUse: "open_area_tank_farm_prevention",
  },
};

function get(t: LightningRodType): LightningRodData {
  return DATA[t];
}

export const protection = (t: LightningRodType) => get(t).protection;
export const coverage = (t: LightningRodType) => get(t).coverage;
export const aesthetic = (t: LightningRodType) => get(t).aesthetic;
export const maintenance = (t: LightningRodType) => get(t).maintenance;
export const lrCost = (t: LightningRodType) => get(t).lrCost;
export const active = (t: LightningRodType) => get(t).active;
export const forBuilding = (t: LightningRodType) => get(t).forBuilding;
export const conductor = (t: LightningRodType) => get(t).conductor;
export const bestUse = (t: LightningRodType) => get(t).bestUse;
export const lightningRodTypes = (): LightningRodType[] =>
  Object.keys(DATA) as LightningRodType[];
