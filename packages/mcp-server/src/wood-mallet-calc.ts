export type WoodMalletType = "carvers_mallet_round" | "joiners_mallet_square" | "dead_blow_shot" | "rubber_mallet_soft" | "brass_hammer_detail";

export function strikeForce(t: WoodMalletType): number {
  const m: Record<WoodMalletType, number> = {
    carvers_mallet_round: 6, joiners_mallet_square: 8, dead_blow_shot: 9, rubber_mallet_soft: 5, brass_hammer_detail: 7,
  };
  return m[t];
}

export function controlFeel(t: WoodMalletType): number {
  const m: Record<WoodMalletType, number> = {
    carvers_mallet_round: 10, joiners_mallet_square: 7, dead_blow_shot: 6, rubber_mallet_soft: 8, brass_hammer_detail: 9,
  };
  return m[t];
}

export function bounceAbsorb(t: WoodMalletType): number {
  const m: Record<WoodMalletType, number> = {
    carvers_mallet_round: 5, joiners_mallet_square: 4, dead_blow_shot: 10, rubber_mallet_soft: 8, brass_hammer_detail: 3,
  };
  return m[t];
}

export function surfaceSafe(t: WoodMalletType): number {
  const m: Record<WoodMalletType, number> = {
    carvers_mallet_round: 8, joiners_mallet_square: 6, dead_blow_shot: 7, rubber_mallet_soft: 10, brass_hammer_detail: 4,
  };
  return m[t];
}

export function malletCost(t: WoodMalletType): number {
  const m: Record<WoodMalletType, number> = {
    carvers_mallet_round: 2, joiners_mallet_square: 2, dead_blow_shot: 3, rubber_mallet_soft: 1, brass_hammer_detail: 4,
  };
  return m[t];
}

export function woodHead(t: WoodMalletType): boolean {
  const m: Record<WoodMalletType, boolean> = {
    carvers_mallet_round: true, joiners_mallet_square: true, dead_blow_shot: false, rubber_mallet_soft: false, brass_hammer_detail: false,
  };
  return m[t];
}

export function nonMarring(t: WoodMalletType): boolean {
  const m: Record<WoodMalletType, boolean> = {
    carvers_mallet_round: true, joiners_mallet_square: true, dead_blow_shot: false, rubber_mallet_soft: true, brass_hammer_detail: false,
  };
  return m[t];
}

export function headMaterial(t: WoodMalletType): string {
  const m: Record<WoodMalletType, string> = {
    carvers_mallet_round: "lignum_vitae_dense",
    joiners_mallet_square: "beech_hardwood_flat",
    dead_blow_shot: "polyurethane_shot_fill",
    rubber_mallet_soft: "black_rubber_head",
    brass_hammer_detail: "solid_brass_cylinder",
  };
  return m[t];
}

export function bestTask(t: WoodMalletType): string {
  const m: Record<WoodMalletType, string> = {
    carvers_mallet_round: "chisel_gouge_drive",
    joiners_mallet_square: "joint_assembly_tap",
    dead_blow_shot: "heavy_seat_no_bounce",
    rubber_mallet_soft: "gentle_tap_assemble",
    brass_hammer_detail: "precise_pin_set",
  };
  return m[t];
}

export function woodMallets(): WoodMalletType[] {
  return ["carvers_mallet_round", "joiners_mallet_square", "dead_blow_shot", "rubber_mallet_soft", "brass_hammer_detail"];
}
