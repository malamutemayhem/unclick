export type HotAisleType =
  | "curtain_strip_basic"
  | "rigid_panel_roof"
  | "sliding_door_end_cap"
  | "chimney_vertical_exhaust"
  | "integrated_rack_top_duct";

interface HotAisleData {
  containment: number;
  efficiency: number;
  accessibility: number;
  fireCode: number;
  haCost: number;
  sealed: boolean;
  forRetrofit: boolean;
  exhaust: string;
  bestUse: string;
}

const DATA: Record<HotAisleType, HotAisleData> = {
  curtain_strip_basic: {
    containment: 5, efficiency: 6, accessibility: 9, fireCode: 7, haCost: 2,
    sealed: false, forRetrofit: true,
    exhaust: "vinyl_strip_curtain_gravity",
    bestUse: "budget_retrofit_existing_rows",
  },
  rigid_panel_roof: {
    containment: 8, efficiency: 8, accessibility: 7, fireCode: 8, haCost: 6,
    sealed: true, forRetrofit: true,
    exhaust: "acrylic_panel_roof_drop_ceiling",
    bestUse: "standard_hot_aisle_containment",
  },
  sliding_door_end_cap: {
    containment: 9, efficiency: 9, accessibility: 8, fireCode: 9, haCost: 7,
    sealed: true, forRetrofit: false,
    exhaust: "sliding_door_auto_close_seal",
    bestUse: "new_build_aisle_containment",
  },
  chimney_vertical_exhaust: {
    containment: 10, efficiency: 10, accessibility: 6, fireCode: 8, haCost: 9,
    sealed: true, forRetrofit: false,
    exhaust: "vertical_chimney_plenum_return",
    bestUse: "high_density_direct_exhaust",
  },
  integrated_rack_top_duct: {
    containment: 7, efficiency: 7, accessibility: 7, fireCode: 9, haCost: 5,
    sealed: false, forRetrofit: true,
    exhaust: "rack_top_duct_plenum_connect",
    bestUse: "mixed_density_flexible_layout",
  },
};

function get(t: HotAisleType): HotAisleData {
  return DATA[t];
}

export const containment = (t: HotAisleType) => get(t).containment;
export const efficiency = (t: HotAisleType) => get(t).efficiency;
export const accessibility = (t: HotAisleType) => get(t).accessibility;
export const fireCode = (t: HotAisleType) => get(t).fireCode;
export const haCost = (t: HotAisleType) => get(t).haCost;
export const sealed = (t: HotAisleType) => get(t).sealed;
export const forRetrofit = (t: HotAisleType) => get(t).forRetrofit;
export const exhaust = (t: HotAisleType) => get(t).exhaust;
export const bestUse = (t: HotAisleType) => get(t).bestUse;
export const hotAisleTypes = (): HotAisleType[] =>
  Object.keys(DATA) as HotAisleType[];
