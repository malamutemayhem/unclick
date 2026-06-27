export type SkylightTypeType =
  | "fixed_flat_glass_unit"
  | "venting_pivot_hinge_open"
  | "tubular_sun_tunnel_pipe"
  | "ridge_continuous_ventilated"
  | "dome_acrylic_bubble_mount";

interface SkylightTypeData {
  light: number;
  ventilation: number;
  insulation: number;
  waterproof: number;
  skCost: number;
  operable: boolean;
  forFlat: boolean;
  glazing: string;
  bestUse: string;
}

const DATA: Record<SkylightTypeType, SkylightTypeData> = {
  fixed_flat_glass_unit: {
    light: 9, ventilation: 1, insulation: 8, waterproof: 9, skCost: 6,
    operable: false, forFlat: false,
    glazing: "tempered_low_e_igu_argon_fill",
    bestUse: "living_room_cathedral_ceiling_light",
  },
  venting_pivot_hinge_open: {
    light: 8, ventilation: 9, insulation: 7, waterproof: 7, skCost: 8,
    operable: true, forFlat: false,
    glazing: "tempered_low_e_motor_hinge_open",
    bestUse: "bathroom_kitchen_moisture_vent",
  },
  tubular_sun_tunnel_pipe: {
    light: 5, ventilation: 1, insulation: 6, waterproof: 10, skCost: 3,
    operable: false, forFlat: true,
    glazing: "polycarbonate_dome_reflective_tube",
    bestUse: "hallway_closet_interior_room_light",
  },
  ridge_continuous_ventilated: {
    light: 7, ventilation: 8, insulation: 5, waterproof: 6, skCost: 9,
    operable: true, forFlat: false,
    glazing: "polycarbonate_multi_wall_continuous",
    bestUse: "industrial_warehouse_daylight_vent",
  },
  dome_acrylic_bubble_mount: {
    light: 8, ventilation: 3, insulation: 5, waterproof: 8, skCost: 4,
    operable: false, forFlat: true,
    glazing: "acrylic_double_dome_uv_filter",
    bestUse: "flat_roof_commercial_daylight_dome",
  },
};

function get(t: SkylightTypeType): SkylightTypeData {
  return DATA[t];
}

export const light = (t: SkylightTypeType) => get(t).light;
export const ventilation = (t: SkylightTypeType) => get(t).ventilation;
export const insulation = (t: SkylightTypeType) => get(t).insulation;
export const waterproof = (t: SkylightTypeType) => get(t).waterproof;
export const skCost = (t: SkylightTypeType) => get(t).skCost;
export const operable = (t: SkylightTypeType) => get(t).operable;
export const forFlat = (t: SkylightTypeType) => get(t).forFlat;
export const glazing = (t: SkylightTypeType) => get(t).glazing;
export const bestUse = (t: SkylightTypeType) => get(t).bestUse;
export const skylightTypeTypes = (): SkylightTypeType[] =>
  Object.keys(DATA) as SkylightTypeType[];
