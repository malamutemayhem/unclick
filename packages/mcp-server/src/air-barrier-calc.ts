export type AirBarrierType =
  | "fluid_applied_membrane_spray"
  | "self_adhered_sheet_peel"
  | "mechanically_fastened_wrap"
  | "rigid_board_insulation_seal"
  | "spray_foam_closed_cell";

interface AirBarrierData {
  airTight: number;
  durability: number;
  moisture: number;
  installEase: number;
  abCost: number;
  seamless: boolean;
  forExterior: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<AirBarrierType, AirBarrierData> = {
  fluid_applied_membrane_spray: {
    airTight: 10, durability: 8, moisture: 9, installEase: 6, abCost: 8,
    seamless: true, forExterior: true,
    material: "rubberized_asphalt_spray_liquid",
    bestUse: "commercial_wall_complex_geometry",
  },
  self_adhered_sheet_peel: {
    airTight: 9, durability: 9, moisture: 10, installEase: 5, abCost: 7,
    seamless: false, forExterior: true,
    material: "modified_bitumen_peel_stick_sheet",
    bestUse: "below_grade_wall_foundation_wrap",
  },
  mechanically_fastened_wrap: {
    airTight: 6, durability: 6, moisture: 7, installEase: 9, abCost: 3,
    seamless: false, forExterior: true,
    material: "polyethylene_spunbond_olefin_wrap",
    bestUse: "residential_wood_frame_house_wrap",
  },
  rigid_board_insulation_seal: {
    airTight: 7, durability: 8, moisture: 6, installEase: 7, abCost: 5,
    seamless: false, forExterior: true,
    material: "xps_eps_rigid_board_taped_joint",
    bestUse: "continuous_insulation_sheathing_wall",
  },
  spray_foam_closed_cell: {
    airTight: 10, durability: 9, moisture: 8, installEase: 4, abCost: 9,
    seamless: true, forExterior: false,
    material: "polyurethane_closed_cell_foam",
    bestUse: "cavity_fill_rim_joist_attic_seal",
  },
};

function get(t: AirBarrierType): AirBarrierData {
  return DATA[t];
}

export const airTight = (t: AirBarrierType) => get(t).airTight;
export const durability = (t: AirBarrierType) => get(t).durability;
export const moisture = (t: AirBarrierType) => get(t).moisture;
export const installEase = (t: AirBarrierType) => get(t).installEase;
export const abCost = (t: AirBarrierType) => get(t).abCost;
export const seamless = (t: AirBarrierType) => get(t).seamless;
export const forExterior = (t: AirBarrierType) => get(t).forExterior;
export const material = (t: AirBarrierType) => get(t).material;
export const bestUse = (t: AirBarrierType) => get(t).bestUse;
export const airBarrierTypes = (): AirBarrierType[] =>
  Object.keys(DATA) as AirBarrierType[];
