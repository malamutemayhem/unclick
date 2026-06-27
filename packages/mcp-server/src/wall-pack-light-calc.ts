export type WallPackLightType =
  | "full_cutoff_standard"
  | "semi_cutoff_decorative"
  | "adjustable_head_flood"
  | "solar_powered_wireless"
  | "emergency_battery_backup";

interface WallPackLightData {
  lumens: number;
  efficiency: number;
  darkSky: number;
  aesthetic: number;
  wpCost: number;
  photocell: boolean;
  forSecurity: boolean;
  optic: string;
  bestUse: string;
}

const DATA: Record<WallPackLightType, WallPackLightData> = {
  full_cutoff_standard: {
    lumens: 7, efficiency: 8, darkSky: 10, aesthetic: 5, wpCost: 4,
    photocell: true, forSecurity: true,
    optic: "full_cutoff_flat_lens_forward",
    bestUse: "building_perimeter_dark_sky",
  },
  semi_cutoff_decorative: {
    lumens: 6, efficiency: 7, darkSky: 7, aesthetic: 9, wpCost: 6,
    photocell: true, forSecurity: false,
    optic: "semi_cutoff_refractor_decorative",
    bestUse: "historic_district_building_face",
  },
  adjustable_head_flood: {
    lumens: 9, efficiency: 7, darkSky: 5, aesthetic: 4, wpCost: 5,
    photocell: true, forSecurity: true,
    optic: "adjustable_flood_asymmetric",
    bestUse: "loading_dock_service_area",
  },
  solar_powered_wireless: {
    lumens: 4, efficiency: 10, darkSky: 8, aesthetic: 6, wpCost: 7,
    photocell: false, forSecurity: false,
    optic: "integrated_solar_panel_led",
    bestUse: "remote_pathway_no_wiring",
  },
  emergency_battery_backup: {
    lumens: 5, efficiency: 6, darkSky: 8, aesthetic: 5, wpCost: 8,
    photocell: true, forSecurity: true,
    optic: "dual_head_battery_egress_led",
    bestUse: "code_required_egress_exterior",
  },
};

function get(t: WallPackLightType): WallPackLightData {
  return DATA[t];
}

export const lumens = (t: WallPackLightType) => get(t).lumens;
export const efficiency = (t: WallPackLightType) => get(t).efficiency;
export const darkSky = (t: WallPackLightType) => get(t).darkSky;
export const aesthetic = (t: WallPackLightType) => get(t).aesthetic;
export const wpCost = (t: WallPackLightType) => get(t).wpCost;
export const photocell = (t: WallPackLightType) => get(t).photocell;
export const forSecurity = (t: WallPackLightType) => get(t).forSecurity;
export const optic = (t: WallPackLightType) => get(t).optic;
export const bestUse = (t: WallPackLightType) => get(t).bestUse;
export const wallPackLightTypes = (): WallPackLightType[] =>
  Object.keys(DATA) as WallPackLightType[];
