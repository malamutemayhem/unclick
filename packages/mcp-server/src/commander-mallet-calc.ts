// Commander mallet calculator - timber framing heavy striking mallets

export type CommanderMalletType =
  | "round_head_beech"
  | "square_head_oak"
  | "dead_blow_shot"
  | "lignum_vitae_dense"
  | "poly_head_soft";

const MALLET_DATA: Record<
  CommanderMalletType,
  {
    strikeForce: number;
    controlSwing: number;
    faceLife: number;
    weightBalance: number;
    cost: number;
    deadBlow: boolean;
    forAssembly: boolean;
    headMaterial: string;
    bestUse: string;
  }
> = {
  round_head_beech: {
    strikeForce: 7,
    controlSwing: 8,
    faceLife: 6,
    weightBalance: 8,
    cost: 4,
    deadBlow: false,
    forAssembly: true,
    headMaterial: "european_beech",
    bestUse: "general_timber_drive",
  },
  square_head_oak: {
    strikeForce: 8,
    controlSwing: 7,
    faceLife: 7,
    weightBalance: 7,
    cost: 5,
    deadBlow: false,
    forAssembly: true,
    headMaterial: "white_oak_block",
    bestUse: "chisel_drive_strike",
  },
  dead_blow_shot: {
    strikeForce: 9,
    controlSwing: 9,
    faceLife: 8,
    weightBalance: 10,
    cost: 7,
    deadBlow: true,
    forAssembly: true,
    headMaterial: "poly_shell_shot",
    bestUse: "joint_seat_no_bounce",
  },
  lignum_vitae_dense: {
    strikeForce: 10,
    controlSwing: 7,
    faceLife: 10,
    weightBalance: 6,
    cost: 9,
    deadBlow: false,
    forAssembly: false,
    headMaterial: "lignum_vitae_wood",
    bestUse: "heavy_mortise_drive",
  },
  poly_head_soft: {
    strikeForce: 5,
    controlSwing: 9,
    faceLife: 7,
    weightBalance: 8,
    cost: 3,
    deadBlow: false,
    forAssembly: true,
    headMaterial: "polyethylene_cap",
    bestUse: "soft_tap_adjust",
  },
};

export function strikeForce(type: CommanderMalletType): number {
  return MALLET_DATA[type].strikeForce;
}
export function controlSwing(type: CommanderMalletType): number {
  return MALLET_DATA[type].controlSwing;
}
export function faceLife(type: CommanderMalletType): number {
  return MALLET_DATA[type].faceLife;
}
export function weightBalance(type: CommanderMalletType): number {
  return MALLET_DATA[type].weightBalance;
}
export function malletCost(type: CommanderMalletType): number {
  return MALLET_DATA[type].cost;
}
export function deadBlow(type: CommanderMalletType): boolean {
  return MALLET_DATA[type].deadBlow;
}
export function forAssembly(type: CommanderMalletType): boolean {
  return MALLET_DATA[type].forAssembly;
}
export function headMaterial(type: CommanderMalletType): string {
  return MALLET_DATA[type].headMaterial;
}
export function bestUse(type: CommanderMalletType): string {
  return MALLET_DATA[type].bestUse;
}
export function commanderMallets(): CommanderMalletType[] {
  return Object.keys(MALLET_DATA) as CommanderMalletType[];
}
