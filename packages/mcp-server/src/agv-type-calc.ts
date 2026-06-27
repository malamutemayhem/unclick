export type AgvType =
  | "guided_wire_magnetic"
  | "laser_guided_reflector"
  | "vision_guided_natural"
  | "autonomous_mobile_amr"
  | "tugger_train_tow";

const DATA: Record<AgvType, {
  flexibility: number; payload: number; navigation: number;
  safety: number; agCost: number; infrastructureFree: boolean;
  forEcommerce: boolean; guidance: string; bestUse: string;
}> = {
  guided_wire_magnetic: {
    flexibility: 2, payload: 8, navigation: 5,
    safety: 8, agCost: 2, infrastructureFree: false,
    forEcommerce: false, guidance: "embedded_wire_magnetic_sensor",
    bestUse: "fixed_route_heavy_pallet_move",
  },
  laser_guided_reflector: {
    flexibility: 6, payload: 9, navigation: 8,
    safety: 9, agCost: 4, infrastructureFree: false,
    forEcommerce: false, guidance: "laser_triangulation_reflector",
    bestUse: "automotive_factory_jit_delivery",
  },
  vision_guided_natural: {
    flexibility: 8, payload: 6, navigation: 9,
    safety: 8, agCost: 3, infrastructureFree: true,
    forEcommerce: true, guidance: "camera_slam_natural_feature",
    bestUse: "flexible_warehouse_dynamic_path",
  },
  autonomous_mobile_amr: {
    flexibility: 10, payload: 5, navigation: 10,
    safety: 9, agCost: 3, infrastructureFree: true,
    forEcommerce: true, guidance: "lidar_slam_ai_path_plan",
    bestUse: "ecommerce_goods_to_person_pick",
  },
  tugger_train_tow: {
    flexibility: 4, payload: 10, navigation: 6,
    safety: 7, agCost: 2, infrastructureFree: false,
    forEcommerce: false, guidance: "magnetic_tape_or_laser_tow",
    bestUse: "assembly_line_parts_milk_run",
  },
};

const get = (t: AgvType) => DATA[t];

export const flexibility = (t: AgvType) => get(t).flexibility;
export const payload = (t: AgvType) => get(t).payload;
export const navigation = (t: AgvType) => get(t).navigation;
export const safety = (t: AgvType) => get(t).safety;
export const agCost = (t: AgvType) => get(t).agCost;
export const infrastructureFree = (t: AgvType) => get(t).infrastructureFree;
export const forEcommerce = (t: AgvType) => get(t).forEcommerce;
export const guidance = (t: AgvType) => get(t).guidance;
export const bestUse = (t: AgvType) => get(t).bestUse;
export const agvTypes = (): AgvType[] => Object.keys(DATA) as AgvType[];
