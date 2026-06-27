export type GraphitePadType = "flat_press_slab" | "dome_cup_shape" | "groove_channel_form" | "paddle_handle_shape" | "rod_point_detail";

export function shapeRange(t: GraphitePadType): number {
  const m: Record<GraphitePadType, number> = {
    flat_press_slab: 6, dome_cup_shape: 8, groove_channel_form: 7, paddle_handle_shape: 9, rod_point_detail: 5,
  };
  return m[t];
}

export function heatResist(t: GraphitePadType): number {
  const m: Record<GraphitePadType, number> = {
    flat_press_slab: 10, dome_cup_shape: 9, groove_channel_form: 9, paddle_handle_shape: 8, rod_point_detail: 10,
  };
  return m[t];
}

export function releaseEase(t: GraphitePadType): number {
  const m: Record<GraphitePadType, number> = {
    flat_press_slab: 10, dome_cup_shape: 8, groove_channel_form: 7, paddle_handle_shape: 9, rod_point_detail: 8,
  };
  return m[t];
}

export function durability(t: GraphitePadType): number {
  const m: Record<GraphitePadType, number> = {
    flat_press_slab: 9, dome_cup_shape: 7, groove_channel_form: 8, paddle_handle_shape: 8, rod_point_detail: 6,
  };
  return m[t];
}

export function padCost(t: GraphitePadType): number {
  const m: Record<GraphitePadType, number> = {
    flat_press_slab: 3, dome_cup_shape: 4, groove_channel_form: 4, paddle_handle_shape: 3, rod_point_detail: 2,
  };
  return m[t];
}

export function forMolding(t: GraphitePadType): boolean {
  const m: Record<GraphitePadType, boolean> = {
    flat_press_slab: false, dome_cup_shape: true, groove_channel_form: true, paddle_handle_shape: true, rod_point_detail: false,
  };
  return m[t];
}

export function handheld(t: GraphitePadType): boolean {
  const m: Record<GraphitePadType, boolean> = {
    flat_press_slab: false, dome_cup_shape: false, groove_channel_form: false, paddle_handle_shape: true, rod_point_detail: true,
  };
  return m[t];
}

export function padShape(t: GraphitePadType): string {
  const m: Record<GraphitePadType, string> = {
    flat_press_slab: "flat_square_block",
    dome_cup_shape: "concave_dome_cup",
    groove_channel_form: "v_groove_channel",
    paddle_handle_shape: "flat_with_handle",
    rod_point_detail: "pointed_rod_tip",
  };
  return m[t];
}

export function bestUse(t: GraphitePadType): string {
  const m: Record<GraphitePadType, string> = {
    flat_press_slab: "flatten_press_bead",
    dome_cup_shape: "cab_dome_shape",
    groove_channel_form: "tube_bead_form",
    paddle_handle_shape: "shape_manipulate",
    rod_point_detail: "hole_detail_poke",
  };
  return m[t];
}

export function graphitePads(): GraphitePadType[] {
  return ["flat_press_slab", "dome_cup_shape", "groove_channel_form", "paddle_handle_shape", "rod_point_detail"];
}
