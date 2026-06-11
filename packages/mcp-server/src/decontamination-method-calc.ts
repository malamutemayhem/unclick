export type DecontaminationMethodType =
  | "chemical_acid_wash"
  | "mechanical_abrasive_blast"
  | "electrochemical_decon"
  | "ultrasonic_cavitation"
  | "strippable_coating_peel";

const DATA: Record<DecontaminationMethodType, {
  effectiveness: number; wasteVolume: number; speed: number;
  surfaceSafe: number; dcCost: number; remote: boolean;
  forLargeArea: boolean; process: string; bestUse: string;
}> = {
  chemical_acid_wash: {
    effectiveness: 8, wasteVolume: 6, speed: 7,
    surfaceSafe: 4, dcCost: 2, remote: true,
    forLargeArea: true, process: "citric_oxalic_acid_dissolve",
    bestUse: "reactor_primary_loop_system_decon",
  },
  mechanical_abrasive_blast: {
    effectiveness: 9, wasteVolume: 4, speed: 6,
    surfaceSafe: 3, dcCost: 3, remote: true,
    forLargeArea: false, process: "co2_grit_blast_surface_removal",
    bestUse: "hot_cell_concrete_surface_layer",
  },
  electrochemical_decon: {
    effectiveness: 9, wasteVolume: 8, speed: 5,
    surfaceSafe: 7, dcCost: 4, remote: false,
    forLargeArea: false, process: "anodic_dissolution_electrolyte",
    bestUse: "stainless_component_electro_polish",
  },
  ultrasonic_cavitation: {
    effectiveness: 7, wasteVolume: 7, speed: 8,
    surfaceSafe: 9, dcCost: 3, remote: false,
    forLargeArea: false, process: "cavitation_bubble_implosion",
    bestUse: "small_tool_instrument_bath_clean",
  },
  strippable_coating_peel: {
    effectiveness: 6, wasteVolume: 9, speed: 9,
    surfaceSafe: 10, dcCost: 2, remote: false,
    forLargeArea: true, process: "polymer_coat_peel_capture",
    bestUse: "floor_wall_loose_contamination",
  },
};

const get = (t: DecontaminationMethodType) => DATA[t];

export const effectiveness = (t: DecontaminationMethodType) => get(t).effectiveness;
export const wasteVolume = (t: DecontaminationMethodType) => get(t).wasteVolume;
export const speed = (t: DecontaminationMethodType) => get(t).speed;
export const surfaceSafe = (t: DecontaminationMethodType) => get(t).surfaceSafe;
export const dcCost = (t: DecontaminationMethodType) => get(t).dcCost;
export const remote = (t: DecontaminationMethodType) => get(t).remote;
export const forLargeArea = (t: DecontaminationMethodType) => get(t).forLargeArea;
export const process = (t: DecontaminationMethodType) => get(t).process;
export const bestUse = (t: DecontaminationMethodType) => get(t).bestUse;
export const decontaminationMethodTypes = (): DecontaminationMethodType[] => Object.keys(DATA) as DecontaminationMethodType[];
