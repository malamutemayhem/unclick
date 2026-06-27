export type DockSealType =
  | "compression_foam_pad"
  | "inflatable_air_bag"
  | "curtain_drape_shelter"
  | "rigid_frame_shelter"
  | "combo_seal_shelter";

interface DockSealData {
  seal: number;
  durability: number;
  flexibility: number;
  insulation: number;
  dsCost: number;
  adjustable: boolean;
  forRefrigerated: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<DockSealType, DockSealData> = {
  compression_foam_pad: {
    seal: 7, durability: 6, flexibility: 5, insulation: 7, dsCost: 3,
    adjustable: false, forRefrigerated: false,
    material: "polyurethane_foam_vinyl_cover",
    bestUse: "standard_flush_dock_general",
  },
  inflatable_air_bag: {
    seal: 10, durability: 7, flexibility: 10, insulation: 10, dsCost: 8,
    adjustable: true, forRefrigerated: true,
    material: "reinforced_fabric_air_bladder",
    bestUse: "cold_storage_mixed_fleet_dock",
  },
  curtain_drape_shelter: {
    seal: 6, durability: 5, flexibility: 8, insulation: 6, dsCost: 4,
    adjustable: true, forRefrigerated: false,
    material: "vinyl_coated_polyester_drape",
    bestUse: "varied_truck_size_open_dock",
  },
  rigid_frame_shelter: {
    seal: 8, durability: 9, flexibility: 6, insulation: 8, dsCost: 7,
    adjustable: false, forRefrigerated: true,
    material: "galvanized_steel_frame_panel",
    bestUse: "high_traffic_distribution_ctr",
  },
  combo_seal_shelter: {
    seal: 9, durability: 8, flexibility: 7, insulation: 9, dsCost: 9,
    adjustable: true, forRefrigerated: true,
    material: "foam_pad_plus_curtain_hybrid",
    bestUse: "pharmaceutical_clean_dock",
  },
};

function get(t: DockSealType): DockSealData {
  return DATA[t];
}

export const seal = (t: DockSealType) => get(t).seal;
export const durability = (t: DockSealType) => get(t).durability;
export const flexibility = (t: DockSealType) => get(t).flexibility;
export const insulation = (t: DockSealType) => get(t).insulation;
export const dsCost = (t: DockSealType) => get(t).dsCost;
export const adjustable = (t: DockSealType) => get(t).adjustable;
export const forRefrigerated = (t: DockSealType) => get(t).forRefrigerated;
export const material = (t: DockSealType) => get(t).material;
export const bestUse = (t: DockSealType) => get(t).bestUse;
export const dockSealTypes = (): DockSealType[] =>
  Object.keys(DATA) as DockSealType[];
