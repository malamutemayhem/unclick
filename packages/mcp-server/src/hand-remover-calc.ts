// Hand remover calculator - clockmaking hand removal tools

export type HandRemoverType =
  | "presto_lever_lift"
  | "canon_pinion_pull"
  | "friction_fit_pry"
  | "suction_cup_dial"
  | "universal_jaw_grip";

const REMOVER_DATA: Record<
  HandRemoverType,
  {
    liftForce: number;
    dialSafe: number;
    handRange: number;
    easeOfUse: number;
    cost: number;
    leverAction: boolean;
    forCanon: boolean;
    jawType: string;
    bestUse: string;
  }
> = {
  presto_lever_lift: {
    liftForce: 8,
    dialSafe: 9,
    handRange: 8,
    easeOfUse: 9,
    cost: 6,
    leverAction: true,
    forCanon: false,
    jawType: "flat_lever_blade",
    bestUse: "standard_hand_pull",
  },
  canon_pinion_pull: {
    liftForce: 9,
    dialSafe: 6,
    handRange: 3,
    easeOfUse: 6,
    cost: 5,
    leverAction: false,
    forCanon: true,
    jawType: "round_grip_collet",
    bestUse: "canon_pinion_extract",
  },
  friction_fit_pry: {
    liftForce: 5,
    dialSafe: 4,
    handRange: 6,
    easeOfUse: 7,
    cost: 2,
    leverAction: true,
    forCanon: false,
    jawType: "thin_blade_edge",
    bestUse: "quick_hand_pry",
  },
  suction_cup_dial: {
    liftForce: 3,
    dialSafe: 10,
    handRange: 2,
    easeOfUse: 8,
    cost: 3,
    leverAction: false,
    forCanon: false,
    jawType: "rubber_suction_pad",
    bestUse: "dial_lift_safe",
  },
  universal_jaw_grip: {
    liftForce: 7,
    dialSafe: 7,
    handRange: 9,
    easeOfUse: 7,
    cost: 8,
    leverAction: true,
    forCanon: true,
    jawType: "adjustable_v_jaw",
    bestUse: "mixed_size_service",
  },
};

export function liftForce(type: HandRemoverType): number {
  return REMOVER_DATA[type].liftForce;
}
export function dialSafe(type: HandRemoverType): number {
  return REMOVER_DATA[type].dialSafe;
}
export function handRange(type: HandRemoverType): number {
  return REMOVER_DATA[type].handRange;
}
export function easeOfUse(type: HandRemoverType): number {
  return REMOVER_DATA[type].easeOfUse;
}
export function removerCost(type: HandRemoverType): number {
  return REMOVER_DATA[type].cost;
}
export function leverAction(type: HandRemoverType): boolean {
  return REMOVER_DATA[type].leverAction;
}
export function forCanon(type: HandRemoverType): boolean {
  return REMOVER_DATA[type].forCanon;
}
export function jawType(type: HandRemoverType): string {
  return REMOVER_DATA[type].jawType;
}
export function bestUse(type: HandRemoverType): string {
  return REMOVER_DATA[type].bestUse;
}
export function handRemovers(): HandRemoverType[] {
  return Object.keys(REMOVER_DATA) as HandRemoverType[];
}
