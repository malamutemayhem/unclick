export type ValanceType = "box_pleat_tailored" | "rod_pocket_gathered" | "swag_jabots_formal" | "cornice_board_upholstered" | "balloon_pouf_casual";

export function formalStyle(t: ValanceType): number {
  const m: Record<ValanceType, number> = {
    box_pleat_tailored: 8, rod_pocket_gathered: 5, swag_jabots_formal: 10, cornice_board_upholstered: 9, balloon_pouf_casual: 6,
  };
  return m[t];
}

export function installEase(t: ValanceType): number {
  const m: Record<ValanceType, number> = {
    box_pleat_tailored: 7, rod_pocket_gathered: 10, swag_jabots_formal: 4, cornice_board_upholstered: 3, balloon_pouf_casual: 8,
  };
  return m[t];
}

export function coverageDepth(t: ValanceType): number {
  const m: Record<ValanceType, number> = {
    box_pleat_tailored: 6, rod_pocket_gathered: 5, swag_jabots_formal: 9, cornice_board_upholstered: 10, balloon_pouf_casual: 7,
  };
  return m[t];
}

export function versatility(t: ValanceType): number {
  const m: Record<ValanceType, number> = {
    box_pleat_tailored: 8, rod_pocket_gathered: 9, swag_jabots_formal: 4, cornice_board_upholstered: 6, balloon_pouf_casual: 7,
  };
  return m[t];
}

export function valanceCost(t: ValanceType): number {
  const m: Record<ValanceType, number> = {
    box_pleat_tailored: 4, rod_pocket_gathered: 2, swag_jabots_formal: 7, cornice_board_upholstered: 8, balloon_pouf_casual: 3,
  };
  return m[t];
}

export function hidesHardware(t: ValanceType): boolean {
  const m: Record<ValanceType, boolean> = {
    box_pleat_tailored: true, rod_pocket_gathered: false, swag_jabots_formal: true, cornice_board_upholstered: true, balloon_pouf_casual: false,
  };
  return m[t];
}

export function standsAlone(t: ValanceType): boolean {
  const m: Record<ValanceType, boolean> = {
    box_pleat_tailored: true, rod_pocket_gathered: true, swag_jabots_formal: false, cornice_board_upholstered: true, balloon_pouf_casual: true,
  };
  return m[t];
}

export function constructionType(t: ValanceType): string {
  const m: Record<ValanceType, string> = {
    box_pleat_tailored: "inverted_box_pleat_stiff",
    rod_pocket_gathered: "rod_pocket_ruffle_gather",
    swag_jabots_formal: "draped_swag_cascade_tail",
    cornice_board_upholstered: "wood_frame_foam_fabric",
    balloon_pouf_casual: "gathered_pouf_ring_cord",
  };
  return m[t];
}

export function bestRoom(t: ValanceType): string {
  const m: Record<ValanceType, string> = {
    box_pleat_tailored: "traditional_office_study",
    rod_pocket_gathered: "kitchen_cottage_casual",
    swag_jabots_formal: "formal_dining_ballroom",
    cornice_board_upholstered: "master_bedroom_layered",
    balloon_pouf_casual: "bathroom_breakfast_nook",
  };
  return m[t];
}

export function valances(): ValanceType[] {
  return ["box_pleat_tailored", "rod_pocket_gathered", "swag_jabots_formal", "cornice_board_upholstered", "balloon_pouf_casual"];
}
