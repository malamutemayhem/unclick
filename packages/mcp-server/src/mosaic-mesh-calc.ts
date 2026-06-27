// mosaic-mesh-calc - mosaic backing mesh types

export type MosaicMesh =
  | "fiberglass_mesh_standard"
  | "paper_face_peel"
  | "adhesive_mesh_sticky"
  | "fabric_mesh_flex"
  | "contact_sheet_clear";

const DATA: Record<MosaicMesh, {
  holdStrength: number; flexibility: number; removeEase: number; durability: number;
  cost: number; transparent: boolean; selfAdhesive: boolean; meshBase: string; bestUse: string;
}> = {
  fiberglass_mesh_standard: { holdStrength: 8, flexibility: 7, removeEase: 6, durability: 9, cost: 4, transparent: false, selfAdhesive: false, meshBase: "woven_fiberglass_grid", bestUse: "general_indirect_method" },
  paper_face_peel:          { holdStrength: 6, flexibility: 5, removeEase: 9, durability: 3, cost: 2, transparent: false, selfAdhesive: false, meshBase: "water_soluble_kraft", bestUse: "face_mount_transfer" },
  adhesive_mesh_sticky:     { holdStrength: 9, flexibility: 6, removeEase: 5, durability: 7, cost: 6, transparent: false, selfAdhesive: true, meshBase: "pressure_sensitive_mesh", bestUse: "quick_mount_panel" },
  fabric_mesh_flex:         { holdStrength: 7, flexibility: 10, removeEase: 7, durability: 6, cost: 5, transparent: false, selfAdhesive: false, meshBase: "stretch_polyester_net", bestUse: "curved_surface_mosaic" },
  contact_sheet_clear:      { holdStrength: 7, flexibility: 8, removeEase: 10, durability: 4, cost: 3, transparent: true, selfAdhesive: true, meshBase: "clear_contact_film", bestUse: "transparent_layout_sheet" },
};

const get = (m: MosaicMesh) => DATA[m];
export const holdStrength = (m: MosaicMesh) => get(m).holdStrength;
export const flexibility = (m: MosaicMesh) => get(m).flexibility;
export const removeEase = (m: MosaicMesh) => get(m).removeEase;
export const durability = (m: MosaicMesh) => get(m).durability;
export const meshCost = (m: MosaicMesh) => get(m).cost;
export const transparent = (m: MosaicMesh) => get(m).transparent;
export const selfAdhesive = (m: MosaicMesh) => get(m).selfAdhesive;
export const meshBase = (m: MosaicMesh) => get(m).meshBase;
export const bestUse = (m: MosaicMesh) => get(m).bestUse;
export const mosaicMeshs = (): MosaicMesh[] => Object.keys(DATA) as MosaicMesh[];
