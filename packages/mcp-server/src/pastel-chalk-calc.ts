export type PastelChalkType = "soft_pastel_round" | "hard_pastel_square" | "oil_pastel_creamy" | "pastel_pencil_thin" | "pan_pastel_sponge";

export function pigmentLoad(t: PastelChalkType): number {
  const m: Record<PastelChalkType, number> = {
    soft_pastel_round: 10, hard_pastel_square: 6, oil_pastel_creamy: 8, pastel_pencil_thin: 5, pan_pastel_sponge: 7,
  };
  return m[t];
}

export function blendAbility(t: PastelChalkType): number {
  const m: Record<PastelChalkType, number> = {
    soft_pastel_round: 9, hard_pastel_square: 5, oil_pastel_creamy: 8, pastel_pencil_thin: 4, pan_pastel_sponge: 10,
  };
  return m[t];
}

export function detailControl(t: PastelChalkType): number {
  const m: Record<PastelChalkType, number> = {
    soft_pastel_round: 4, hard_pastel_square: 8, oil_pastel_creamy: 3, pastel_pencil_thin: 10, pan_pastel_sponge: 5,
  };
  return m[t];
}

export function dustLevel(t: PastelChalkType): number {
  const m: Record<PastelChalkType, number> = {
    soft_pastel_round: 10, hard_pastel_square: 7, oil_pastel_creamy: 1, pastel_pencil_thin: 5, pan_pastel_sponge: 2,
  };
  return m[t];
}

export function pastelCost(t: PastelChalkType): number {
  const m: Record<PastelChalkType, number> = {
    soft_pastel_round: 8, hard_pastel_square: 5, oil_pastel_creamy: 4, pastel_pencil_thin: 7, pan_pastel_sponge: 9,
  };
  return m[t];
}

export function waterSoluble(t: PastelChalkType): boolean {
  const m: Record<PastelChalkType, boolean> = {
    soft_pastel_round: false, hard_pastel_square: false, oil_pastel_creamy: false, pastel_pencil_thin: false, pan_pastel_sponge: false,
  };
  return m[t];
}

export function layerable(t: PastelChalkType): boolean {
  const m: Record<PastelChalkType, boolean> = {
    soft_pastel_round: true, hard_pastel_square: true, oil_pastel_creamy: true, pastel_pencil_thin: true, pan_pastel_sponge: true,
  };
  return m[t];
}

export function binderType(t: PastelChalkType): string {
  const m: Record<PastelChalkType, string> = {
    soft_pastel_round: "gum_tragacanth_minimal",
    hard_pastel_square: "kaolin_clay_pressed",
    oil_pastel_creamy: "wax_oil_binder_blend",
    pastel_pencil_thin: "wood_cased_clay_core",
    pan_pastel_sponge: "ultra_soft_cake_pad",
  };
  return m[t];
}

export function bestSurface(t: PastelChalkType): string {
  const m: Record<PastelChalkType, string> = {
    soft_pastel_round: "sanded_pastel_paper",
    hard_pastel_square: "fine_tooth_ingres",
    oil_pastel_creamy: "canvas_board_heavy",
    pastel_pencil_thin: "smooth_bristol_detail",
    pan_pastel_sponge: "velour_suede_fabric",
  };
  return m[t];
}

export function pastelChalks(): PastelChalkType[] {
  return ["soft_pastel_round", "hard_pastel_square", "oil_pastel_creamy", "pastel_pencil_thin", "pan_pastel_sponge"];
}
