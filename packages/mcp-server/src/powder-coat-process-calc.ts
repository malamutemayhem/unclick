export type PowderCoatProcessType =
  | "electrostatic_spray_thermo"
  | "fluidized_bed_dip"
  | "electrostatic_fluidized_bed"
  | "flame_spray_thermoplastic"
  | "tribocharge_friction_gun";

interface PowderCoatProcessData {
  thickness: number;
  uniformity: number;
  durability: number;
  speed: number;
  pcCost: number;
  noSolvent: boolean;
  forOutdoor: boolean;
  resin: string;
  bestUse: string;
}

const DATA: Record<PowderCoatProcessType, PowderCoatProcessData> = {
  electrostatic_spray_thermo: {
    thickness: 7, uniformity: 9, durability: 9, speed: 8, pcCost: 5,
    noSolvent: true, forOutdoor: true,
    resin: "polyester_tgic_superdurable",
    bestUse: "appliance_furniture_automotive_trim",
  },
  fluidized_bed_dip: {
    thickness: 10, uniformity: 7, durability: 10, speed: 6, pcCost: 4,
    noSolvent: true, forOutdoor: true,
    resin: "nylon_polyethylene_thick_coat",
    bestUse: "dishwasher_rack_fence_post",
  },
  electrostatic_fluidized_bed: {
    thickness: 9, uniformity: 8, durability: 9, speed: 7, pcCost: 6,
    noSolvent: true, forOutdoor: true,
    resin: "epoxy_polyester_hybrid_charged",
    bestUse: "electrical_busbar_motor_stator",
  },
  flame_spray_thermoplastic: {
    thickness: 10, uniformity: 6, durability: 8, speed: 5, pcCost: 7,
    noSolvent: true, forOutdoor: false,
    resin: "nylon_11_pvdf_flame_fused",
    bestUse: "pipe_lining_chemical_tank_repair",
  },
  tribocharge_friction_gun: {
    thickness: 6, uniformity: 10, durability: 8, speed: 7, pcCost: 5,
    noSolvent: true, forOutdoor: true,
    resin: "epoxy_polyester_tribo_grade",
    bestUse: "faraday_cage_recess_complex_part",
  },
};

function get(t: PowderCoatProcessType): PowderCoatProcessData {
  return DATA[t];
}

export const thickness = (t: PowderCoatProcessType) => get(t).thickness;
export const uniformity = (t: PowderCoatProcessType) => get(t).uniformity;
export const durability = (t: PowderCoatProcessType) => get(t).durability;
export const speed = (t: PowderCoatProcessType) => get(t).speed;
export const pcCost = (t: PowderCoatProcessType) => get(t).pcCost;
export const noSolvent = (t: PowderCoatProcessType) => get(t).noSolvent;
export const forOutdoor = (t: PowderCoatProcessType) => get(t).forOutdoor;
export const resin = (t: PowderCoatProcessType) => get(t).resin;
export const bestUse = (t: PowderCoatProcessType) => get(t).bestUse;
export const powderCoatProcessTypes = (): PowderCoatProcessType[] =>
  Object.keys(DATA) as PowderCoatProcessType[];
