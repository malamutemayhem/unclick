export type ElectroplatingType =
  | "rack_plating_barrel"
  | "barrel_plating_bulk"
  | "brush_plating_selective"
  | "continuous_strip_reel"
  | "pulse_plating_nanocrystal";

interface ElectroplatingData {
  uniformity: number;
  speed: number;
  thickness: number;
  adhesion: number;
  epCost: number;
  selective: boolean;
  forHighVolume: boolean;
  electrolyte: string;
  bestUse: string;
}

const DATA: Record<ElectroplatingType, ElectroplatingData> = {
  rack_plating_barrel: {
    uniformity: 9, speed: 6, thickness: 9, adhesion: 9, epCost: 7,
    selective: false, forHighVolume: false,
    electrolyte: "acid_copper_nickel_chrome_bath",
    bestUse: "precision_component_decorative_chrome",
  },
  barrel_plating_bulk: {
    uniformity: 6, speed: 9, thickness: 6, adhesion: 7, epCost: 4,
    selective: false, forHighVolume: true,
    electrolyte: "zinc_alkaline_cyanide_free",
    bestUse: "fastener_small_part_bulk_zinc",
  },
  brush_plating_selective: {
    uniformity: 7, speed: 4, thickness: 8, adhesion: 8, epCost: 9,
    selective: true, forHighVolume: false,
    electrolyte: "portable_anode_wrap_solution",
    bestUse: "field_repair_worn_shaft_bearing",
  },
  continuous_strip_reel: {
    uniformity: 8, speed: 10, thickness: 5, adhesion: 8, epCost: 5,
    selective: false, forHighVolume: true,
    electrolyte: "tin_gold_spot_plating_reel",
    bestUse: "connector_terminal_strip_plating",
  },
  pulse_plating_nanocrystal: {
    uniformity: 10, speed: 5, thickness: 10, adhesion: 10, epCost: 10,
    selective: false, forHighVolume: false,
    electrolyte: "pulse_reverse_nanocrystal_bath",
    bestUse: "aerospace_wear_coat_nanostructure",
  },
};

function get(t: ElectroplatingType): ElectroplatingData {
  return DATA[t];
}

export const uniformity = (t: ElectroplatingType) => get(t).uniformity;
export const speed = (t: ElectroplatingType) => get(t).speed;
export const thickness = (t: ElectroplatingType) => get(t).thickness;
export const adhesion = (t: ElectroplatingType) => get(t).adhesion;
export const epCost = (t: ElectroplatingType) => get(t).epCost;
export const selective = (t: ElectroplatingType) => get(t).selective;
export const forHighVolume = (t: ElectroplatingType) => get(t).forHighVolume;
export const electrolyte = (t: ElectroplatingType) => get(t).electrolyte;
export const bestUse = (t: ElectroplatingType) => get(t).bestUse;
export const electroplatingTypes = (): ElectroplatingType[] =>
  Object.keys(DATA) as ElectroplatingType[];
