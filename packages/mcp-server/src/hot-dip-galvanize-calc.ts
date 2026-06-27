export type HotDipGalvanizeType =
  | "batch_kettle_structural"
  | "continuous_sheet_coil"
  | "spin_centrifuge_fastener"
  | "flux_dry_conventional"
  | "galvanneal_zinc_iron";

interface HotDipGalvanizeData {
  coatingWeight: number;
  corrosionResist: number;
  speed: number;
  uniformity: number;
  hdCost: number;
  continuous: boolean;
  forStructural: boolean;
  alloy: string;
  bestUse: string;
}

const DATA: Record<HotDipGalvanizeType, HotDipGalvanizeData> = {
  batch_kettle_structural: {
    coatingWeight: 10, corrosionResist: 10, speed: 4, uniformity: 7, hdCost: 5,
    continuous: false, forStructural: true,
    alloy: "pure_zinc_450c_kettle_bath",
    bestUse: "structural_steel_beam_column",
  },
  continuous_sheet_coil: {
    coatingWeight: 6, corrosionResist: 7, speed: 10, uniformity: 9, hdCost: 4,
    continuous: true, forStructural: false,
    alloy: "zinc_aluminum_sheet_line_bath",
    bestUse: "automotive_body_panel_appliance",
  },
  spin_centrifuge_fastener: {
    coatingWeight: 7, corrosionResist: 8, speed: 8, uniformity: 6, hdCost: 5,
    continuous: false, forStructural: false,
    alloy: "zinc_centrifuge_excess_removal",
    bestUse: "bolt_nut_washer_threaded_part",
  },
  flux_dry_conventional: {
    coatingWeight: 9, corrosionResist: 9, speed: 5, uniformity: 7, hdCost: 4,
    continuous: false, forStructural: true,
    alloy: "zinc_ammonium_chloride_flux",
    bestUse: "pipe_fitting_pole_general_fab",
  },
  galvanneal_zinc_iron: {
    coatingWeight: 6, corrosionResist: 7, speed: 9, uniformity: 9, hdCost: 6,
    continuous: true, forStructural: false,
    alloy: "zinc_iron_alloy_10pct_fe",
    bestUse: "weldable_paintable_auto_panel",
  },
};

function get(t: HotDipGalvanizeType): HotDipGalvanizeData {
  return DATA[t];
}

export const coatingWeight = (t: HotDipGalvanizeType) => get(t).coatingWeight;
export const corrosionResist = (t: HotDipGalvanizeType) => get(t).corrosionResist;
export const speed = (t: HotDipGalvanizeType) => get(t).speed;
export const uniformity = (t: HotDipGalvanizeType) => get(t).uniformity;
export const hdCost = (t: HotDipGalvanizeType) => get(t).hdCost;
export const continuous = (t: HotDipGalvanizeType) => get(t).continuous;
export const forStructural = (t: HotDipGalvanizeType) => get(t).forStructural;
export const alloy = (t: HotDipGalvanizeType) => get(t).alloy;
export const bestUse = (t: HotDipGalvanizeType) => get(t).bestUse;
export const hotDipGalvanizeTypes = (): HotDipGalvanizeType[] =>
  Object.keys(DATA) as HotDipGalvanizeType[];
