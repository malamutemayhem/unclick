// Rivet setter calculator - leatherworking rivet/fastener setting tools

export type RivetSetterType =
  | "hand_setter_anvil"
  | "press_die_bench"
  | "rotary_punch_hole"
  | "snap_setter_post"
  | "grommet_die_pair";

const SETTER_DATA: Record<
  RivetSetterType,
  {
    setForce: number;
    alignment: number;
    fastenerRange: number;
    portability: number;
    cost: number;
    benchMount: boolean;
    needsHammer: boolean;
    dieType: string;
    bestUse: string;
  }
> = {
  hand_setter_anvil: {
    setForce: 7,
    alignment: 6,
    fastenerRange: 6,
    portability: 9,
    cost: 3,
    benchMount: false,
    needsHammer: true,
    dieType: "concave_cap_anvil",
    bestUse: "field_rivet_set",
  },
  press_die_bench: {
    setForce: 10,
    alignment: 10,
    fastenerRange: 8,
    portability: 2,
    cost: 8,
    benchMount: true,
    needsHammer: false,
    dieType: "lever_press_die",
    bestUse: "production_rivet_line",
  },
  rotary_punch_hole: {
    setForce: 5,
    alignment: 7,
    fastenerRange: 4,
    portability: 8,
    cost: 4,
    benchMount: false,
    needsHammer: false,
    dieType: "rotating_punch_wheel",
    bestUse: "hole_prep_punch",
  },
  snap_setter_post: {
    setForce: 8,
    alignment: 8,
    fastenerRange: 5,
    portability: 7,
    cost: 5,
    benchMount: false,
    needsHammer: true,
    dieType: "post_socket_pair",
    bestUse: "snap_button_set",
  },
  grommet_die_pair: {
    setForce: 8,
    alignment: 7,
    fastenerRange: 5,
    portability: 7,
    cost: 5,
    benchMount: false,
    needsHammer: true,
    dieType: "flare_roll_die",
    bestUse: "grommet_eyelet_set",
  },
};

export function setForce(type: RivetSetterType): number {
  return SETTER_DATA[type].setForce;
}
export function alignment(type: RivetSetterType): number {
  return SETTER_DATA[type].alignment;
}
export function fastenerRange(type: RivetSetterType): number {
  return SETTER_DATA[type].fastenerRange;
}
export function portability(type: RivetSetterType): number {
  return SETTER_DATA[type].portability;
}
export function setterCost(type: RivetSetterType): number {
  return SETTER_DATA[type].cost;
}
export function benchMount(type: RivetSetterType): boolean {
  return SETTER_DATA[type].benchMount;
}
export function needsHammer(type: RivetSetterType): boolean {
  return SETTER_DATA[type].needsHammer;
}
export function dieType(type: RivetSetterType): string {
  return SETTER_DATA[type].dieType;
}
export function bestUse(type: RivetSetterType): string {
  return SETTER_DATA[type].bestUse;
}
export function rivetSetters(): RivetSetterType[] {
  return Object.keys(SETTER_DATA) as RivetSetterType[];
}
