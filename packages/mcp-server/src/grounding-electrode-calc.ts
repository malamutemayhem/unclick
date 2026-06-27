export type GroundingElectrodeType =
  | "ground_rod_copper_clad"
  | "ground_plate_copper_sheet"
  | "concrete_encased_ufer"
  | "ground_ring_bare_copper"
  | "chemical_ground_enhancement";

interface GroundingElectrodeData {
  resistance: number;
  durability: number;
  installEase: number;
  soilContact: number;
  geCost: number;
  enhanced: boolean;
  forBuilding: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<GroundingElectrodeType, GroundingElectrodeData> = {
  ground_rod_copper_clad: {
    resistance: 6, durability: 7, installEase: 9, soilContact: 5, geCost: 2,
    enhanced: false, forBuilding: true,
    material: "copper_clad_steel_rod_8ft",
    bestUse: "residential_service_entrance_ground",
  },
  ground_plate_copper_sheet: {
    resistance: 7, durability: 8, installEase: 5, soilContact: 8, geCost: 6,
    enhanced: false, forBuilding: true,
    material: "copper_sheet_plate_2sqft_min",
    bestUse: "rocky_soil_shallow_bedrock_ground",
  },
  concrete_encased_ufer: {
    resistance: 9, durability: 10, installEase: 7, soilContact: 9, geCost: 3,
    enhanced: false, forBuilding: true,
    material: "rebar_in_concrete_foundation",
    bestUse: "new_construction_foundation_ground",
  },
  ground_ring_bare_copper: {
    resistance: 8, durability: 8, installEase: 4, soilContact: 10, geCost: 7,
    enhanced: false, forBuilding: true,
    material: "bare_copper_conductor_ring_trench",
    bestUse: "commercial_building_perimeter_ground",
  },
  chemical_ground_enhancement: {
    resistance: 10, durability: 6, installEase: 6, soilContact: 7, geCost: 9,
    enhanced: true, forBuilding: false,
    material: "conductive_backfill_bentonite_mix",
    bestUse: "high_resistivity_soil_telecom_tower",
  },
};

function get(t: GroundingElectrodeType): GroundingElectrodeData {
  return DATA[t];
}

export const resistance = (t: GroundingElectrodeType) => get(t).resistance;
export const durability = (t: GroundingElectrodeType) => get(t).durability;
export const installEase = (t: GroundingElectrodeType) => get(t).installEase;
export const soilContact = (t: GroundingElectrodeType) => get(t).soilContact;
export const geCost = (t: GroundingElectrodeType) => get(t).geCost;
export const enhanced = (t: GroundingElectrodeType) => get(t).enhanced;
export const forBuilding = (t: GroundingElectrodeType) => get(t).forBuilding;
export const material = (t: GroundingElectrodeType) => get(t).material;
export const bestUse = (t: GroundingElectrodeType) => get(t).bestUse;
export const groundingElectrodeTypes = (): GroundingElectrodeType[] =>
  Object.keys(DATA) as GroundingElectrodeType[];
