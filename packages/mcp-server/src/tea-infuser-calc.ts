export type TeaInfuserType = "mesh_ball_chain" | "basket_mug_sit" | "teapot_built_in" | "travel_bottle_filter" | "cloth_bag_reusable";

export function leafExpansion(t: TeaInfuserType): number {
  const m: Record<TeaInfuserType, number> = {
    mesh_ball_chain: 4, basket_mug_sit: 8, teapot_built_in: 10, travel_bottle_filter: 6, cloth_bag_reusable: 7,
  };
  return m[t];
}

export function fineFilter(t: TeaInfuserType): number {
  const m: Record<TeaInfuserType, number> = {
    mesh_ball_chain: 6, basket_mug_sit: 9, teapot_built_in: 8, travel_bottle_filter: 7, cloth_bag_reusable: 10,
  };
  return m[t];
}

export function easyClean(t: TeaInfuserType): number {
  const m: Record<TeaInfuserType, number> = {
    mesh_ball_chain: 7, basket_mug_sit: 9, teapot_built_in: 5, travel_bottle_filter: 6, cloth_bag_reusable: 4,
  };
  return m[t];
}

export function portability(t: TeaInfuserType): number {
  const m: Record<TeaInfuserType, number> = {
    mesh_ball_chain: 8, basket_mug_sit: 5, teapot_built_in: 2, travel_bottle_filter: 10, cloth_bag_reusable: 9,
  };
  return m[t];
}

export function infuserCost(t: TeaInfuserType): number {
  const m: Record<TeaInfuserType, number> = {
    mesh_ball_chain: 1, basket_mug_sit: 3, teapot_built_in: 6, travel_bottle_filter: 5, cloth_bag_reusable: 2,
  };
  return m[t];
}

export function reusable(t: TeaInfuserType): boolean {
  const m: Record<TeaInfuserType, boolean> = {
    mesh_ball_chain: true, basket_mug_sit: true, teapot_built_in: true, travel_bottle_filter: true, cloth_bag_reusable: true,
  };
  return m[t];
}

export function multiCup(t: TeaInfuserType): boolean {
  const m: Record<TeaInfuserType, boolean> = {
    mesh_ball_chain: false, basket_mug_sit: false, teapot_built_in: true, travel_bottle_filter: false, cloth_bag_reusable: false,
  };
  return m[t];
}

export function filterMaterial(t: TeaInfuserType): string {
  const m: Record<TeaInfuserType, string> = {
    mesh_ball_chain: "stainless_mesh_ball",
    basket_mug_sit: "fine_mesh_basket_rim",
    teapot_built_in: "ceramic_perforated_pot",
    travel_bottle_filter: "glass_bottle_steel_screen",
    cloth_bag_reusable: "organic_cotton_drawstring",
  };
  return m[t];
}

export function bestTea(t: TeaInfuserType): string {
  const m: Record<TeaInfuserType, string> = {
    mesh_ball_chain: "quick_single_cup_bag",
    basket_mug_sit: "loose_leaf_desk_brew",
    teapot_built_in: "gongfu_multiple_steep",
    travel_bottle_filter: "commute_gym_cold_brew",
    cloth_bag_reusable: "herbal_blend_fine_leaf",
  };
  return m[t];
}

export function teaInfusers(): TeaInfuserType[] {
  return ["mesh_ball_chain", "basket_mug_sit", "teapot_built_in", "travel_bottle_filter", "cloth_bag_reusable"];
}
