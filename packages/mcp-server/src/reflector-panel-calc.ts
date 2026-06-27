export type ReflectorPanelType = "five_in_one_disc" | "v_flat_studio_board" | "tri_grip_handle" | "sunbounce_frame_fabric" | "foam_core_diy";

export function bounceEfficiency(t: ReflectorPanelType): number {
  const m: Record<ReflectorPanelType, number> = {
    five_in_one_disc: 7, v_flat_studio_board: 8, tri_grip_handle: 7, sunbounce_frame_fabric: 10, foam_core_diy: 5,
  };
  return m[t];
}

export function surfaceArea(t: ReflectorPanelType): number {
  const m: Record<ReflectorPanelType, number> = {
    five_in_one_disc: 6, v_flat_studio_board: 10, tri_grip_handle: 5, sunbounce_frame_fabric: 8, foam_core_diy: 7,
  };
  return m[t];
}

export function portability(t: ReflectorPanelType): number {
  const m: Record<ReflectorPanelType, number> = {
    five_in_one_disc: 9, v_flat_studio_board: 2, tri_grip_handle: 8, sunbounce_frame_fabric: 6, foam_core_diy: 3,
  };
  return m[t];
}

export function onePersonUse(t: ReflectorPanelType): number {
  const m: Record<ReflectorPanelType, number> = {
    five_in_one_disc: 4, v_flat_studio_board: 7, tri_grip_handle: 10, sunbounce_frame_fabric: 5, foam_core_diy: 6,
  };
  return m[t];
}

export function reflectorCost(t: ReflectorPanelType): number {
  const m: Record<ReflectorPanelType, number> = {
    five_in_one_disc: 3, v_flat_studio_board: 5, tri_grip_handle: 6, sunbounce_frame_fabric: 9, foam_core_diy: 1,
  };
  return m[t];
}

export function collapsible(t: ReflectorPanelType): boolean {
  const m: Record<ReflectorPanelType, boolean> = {
    five_in_one_disc: true, v_flat_studio_board: false, tri_grip_handle: true, sunbounce_frame_fabric: true, foam_core_diy: false,
  };
  return m[t];
}

export function multiSurface(t: ReflectorPanelType): boolean {
  const m: Record<ReflectorPanelType, boolean> = {
    five_in_one_disc: true, v_flat_studio_board: false, tri_grip_handle: false, sunbounce_frame_fabric: true, foam_core_diy: false,
  };
  return m[t];
}

export function coverMaterial(t: ReflectorPanelType): string {
  const m: Record<ReflectorPanelType, string> = {
    five_in_one_disc: "gold_silver_white_black_translucent",
    v_flat_studio_board: "rigid_fome_core_white_black",
    tri_grip_handle: "silver_fabric_handle_grip",
    sunbounce_frame_fabric: "stretch_fabric_aluminum_frame",
    foam_core_diy: "white_foam_board_matte",
  };
  return m[t];
}

export function bestShoot(t: ReflectorPanelType): string {
  const m: Record<ReflectorPanelType, string> = {
    five_in_one_disc: "outdoor_portrait_travel",
    v_flat_studio_board: "studio_headshot_negative_fill",
    tri_grip_handle: "solo_shooter_fill_light",
    sunbounce_frame_fabric: "fashion_editorial_large",
    foam_core_diy: "beginner_tabletop_product",
  };
  return m[t];
}

export function reflectorPanels(): ReflectorPanelType[] {
  return ["five_in_one_disc", "v_flat_studio_board", "tri_grip_handle", "sunbounce_frame_fabric", "foam_core_diy"];
}
