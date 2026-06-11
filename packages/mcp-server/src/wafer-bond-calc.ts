export type WaferBond =
  | "fusion_direct"
  | "adhesive_bcb"
  | "eutectic_metal"
  | "anodic_glass_si"
  | "hybrid_cu_oxide";

const DATA: Record<WaferBond, {
  bondStrength: number; alignment: number; thermal: number;
  hermeticity: number; bondCost: number; roomTemp: boolean;
  for3d: boolean; interface_: string; bestUse: string;
}> = {
  fusion_direct: {
    bondStrength: 9, alignment: 8, thermal: 10,
    hermeticity: 10, bondCost: 7, roomTemp: false,
    for3d: true, interface_: "oxide_oxide_anneal",
    bestUse: "soi_wafer_fabrication",
  },
  adhesive_bcb: {
    bondStrength: 5, alignment: 7, thermal: 4,
    hermeticity: 4, bondCost: 3, roomTemp: true,
    for3d: false, interface_: "polymer_glue_layer",
    bestUse: "temp_carrier_thinning",
  },
  eutectic_metal: {
    bondStrength: 8, alignment: 6, thermal: 8,
    hermeticity: 9, bondCost: 5, roomTemp: false,
    for3d: false, interface_: "auge_or_alge_alloy",
    bestUse: "mems_cap_seal",
  },
  anodic_glass_si: {
    bondStrength: 7, alignment: 5, thermal: 7,
    hermeticity: 10, bondCost: 4, roomTemp: false,
    for3d: false, interface_: "electrostatic_pyrex",
    bestUse: "pressure_sensor_cavity",
  },
  hybrid_cu_oxide: {
    bondStrength: 10, alignment: 10, thermal: 9,
    hermeticity: 10, bondCost: 9, roomTemp: false,
    for3d: true, interface_: "cu_pad_plus_oxide",
    bestUse: "3d_stacked_dram_logic",
  },
};

const get = (t: WaferBond) => DATA[t];

export const bondStrength = (t: WaferBond) => get(t).bondStrength;
export const alignment = (t: WaferBond) => get(t).alignment;
export const thermal = (t: WaferBond) => get(t).thermal;
export const hermeticity = (t: WaferBond) => get(t).hermeticity;
export const bondCost = (t: WaferBond) => get(t).bondCost;
export const roomTemp = (t: WaferBond) => get(t).roomTemp;
export const for3d = (t: WaferBond) => get(t).for3d;
export const interface_ = (t: WaferBond) => get(t).interface_;
export const bestUse = (t: WaferBond) => get(t).bestUse;
export const waferBonds = (): WaferBond[] => Object.keys(DATA) as WaferBond[];
