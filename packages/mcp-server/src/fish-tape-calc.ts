export type FishTapeType =
  | "steel_flat_standard"
  | "fiberglass_non_conduct"
  | "nylon_flex_pull"
  | "steel_round_conduit"
  | "glow_rod_luminous";

const DATA: Record<FishTapeType, {
  pushStrength: number; flexibility: number; reachLength: number;
  durability: number; tapeCost: number; nonConductive: boolean;
  forConduit: boolean; material: string; bestUse: string;
}> = {
  steel_flat_standard: { pushStrength: 8, flexibility: 5, reachLength: 8, durability: 9, tapeCost: 4, nonConductive: false, forConduit: true, material: "spring_steel_flat", bestUse: "conduit_wire_pull" },
  fiberglass_non_conduct: { pushStrength: 6, flexibility: 7, reachLength: 7, durability: 6, tapeCost: 6, nonConductive: true, forConduit: true, material: "fiberglass_rod", bestUse: "live_circuit_pull" },
  nylon_flex_pull: { pushStrength: 4, flexibility: 10, reachLength: 6, durability: 5, tapeCost: 3, nonConductive: true, forConduit: false, material: "braided_nylon", bestUse: "wall_cavity_fish" },
  steel_round_conduit: { pushStrength: 9, flexibility: 3, reachLength: 9, durability: 10, tapeCost: 5, nonConductive: false, forConduit: true, material: "spring_steel_round", bestUse: "long_conduit_heavy_pull" },
  glow_rod_luminous: { pushStrength: 5, flexibility: 8, reachLength: 5, durability: 4, tapeCost: 7, nonConductive: true, forConduit: false, material: "luminescent_fiberglass", bestUse: "dark_ceiling_space_fish" },
};

const get = (t: FishTapeType) => DATA[t];

export const pushStrength = (t: FishTapeType) => get(t).pushStrength;
export const flexibility = (t: FishTapeType) => get(t).flexibility;
export const reachLength = (t: FishTapeType) => get(t).reachLength;
export const durability = (t: FishTapeType) => get(t).durability;
export const tapeCost = (t: FishTapeType) => get(t).tapeCost;
export const nonConductive = (t: FishTapeType) => get(t).nonConductive;
export const forConduit = (t: FishTapeType) => get(t).forConduit;
export const material = (t: FishTapeType) => get(t).material;
export const bestUse = (t: FishTapeType) => get(t).bestUse;
export const fishTapes = (): FishTapeType[] => Object.keys(DATA) as FishTapeType[];
