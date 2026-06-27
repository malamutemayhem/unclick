export type RoofingMembraneType =
  | "tpo_thermoplastic_polyolefin"
  | "epdm_rubber_synthetic_sheet"
  | "pvc_polyvinyl_chloride_sheet"
  | "modified_bitumen_sbs_torch"
  | "built_up_bur_hot_asphalt";

interface RoofingMembraneData {
  durability: number;
  uvResist: number;
  puncture: number;
  flexibility: number;
  rmCost: number;
  heatWeldable: boolean;
  forFlat: boolean;
  seam: string;
  bestUse: string;
}

const DATA: Record<RoofingMembraneType, RoofingMembraneData> = {
  tpo_thermoplastic_polyolefin: {
    durability: 7, uvResist: 9, puncture: 6, flexibility: 7, rmCost: 5,
    heatWeldable: true, forFlat: true,
    seam: "hot_air_weld_thermoplastic_bond",
    bestUse: "commercial_flat_roof_energy_cool",
  },
  epdm_rubber_synthetic_sheet: {
    durability: 9, uvResist: 8, puncture: 5, flexibility: 10, rmCost: 4,
    heatWeldable: false, forFlat: true,
    seam: "adhesive_tape_seam_rubber_bond",
    bestUse: "large_flat_roof_warehouse_simple",
  },
  pvc_polyvinyl_chloride_sheet: {
    durability: 8, uvResist: 8, puncture: 7, flexibility: 6, rmCost: 7,
    heatWeldable: true, forFlat: true,
    seam: "hot_air_weld_solvent_bond_pvc",
    bestUse: "restaurant_grease_chemical_resistant",
  },
  modified_bitumen_sbs_torch: {
    durability: 8, uvResist: 6, puncture: 9, flexibility: 8, rmCost: 6,
    heatWeldable: false, forFlat: true,
    seam: "torch_applied_bitumen_lap_seal",
    bestUse: "low_slope_heavy_foot_traffic_area",
  },
  built_up_bur_hot_asphalt: {
    durability: 9, uvResist: 5, puncture: 10, flexibility: 4, rmCost: 8,
    heatWeldable: false, forFlat: true,
    seam: "hot_mopped_asphalt_felt_layer",
    bestUse: "industrial_roof_multiple_layer_proven",
  },
};

function get(t: RoofingMembraneType): RoofingMembraneData {
  return DATA[t];
}

export const durability = (t: RoofingMembraneType) => get(t).durability;
export const uvResist = (t: RoofingMembraneType) => get(t).uvResist;
export const puncture = (t: RoofingMembraneType) => get(t).puncture;
export const flexibility = (t: RoofingMembraneType) => get(t).flexibility;
export const rmCost = (t: RoofingMembraneType) => get(t).rmCost;
export const heatWeldable = (t: RoofingMembraneType) => get(t).heatWeldable;
export const forFlat = (t: RoofingMembraneType) => get(t).forFlat;
export const seam = (t: RoofingMembraneType) => get(t).seam;
export const bestUse = (t: RoofingMembraneType) => get(t).bestUse;
export const roofingMembraneTypes = (): RoofingMembraneType[] =>
  Object.keys(DATA) as RoofingMembraneType[];
