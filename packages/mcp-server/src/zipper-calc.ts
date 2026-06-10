export type ZipperType = "coil_nylon_lightweight" | "molded_plastic_vislon" | "metal_tooth_brass" | "invisible_concealed" | "waterproof_sealed_tape";

export function strength(t: ZipperType): number {
  const m: Record<ZipperType, number> = {
    coil_nylon_lightweight: 6, molded_plastic_vislon: 7, metal_tooth_brass: 10, invisible_concealed: 4, waterproof_sealed_tape: 8,
  };
  return m[t];
}

export function flexibility(t: ZipperType): number {
  const m: Record<ZipperType, number> = {
    coil_nylon_lightweight: 10, molded_plastic_vislon: 6, metal_tooth_brass: 4, invisible_concealed: 9, waterproof_sealed_tape: 5,
  };
  return m[t];
}

export function smoothAction(t: ZipperType): number {
  const m: Record<ZipperType, number> = {
    coil_nylon_lightweight: 9, molded_plastic_vislon: 7, metal_tooth_brass: 6, invisible_concealed: 8, waterproof_sealed_tape: 5,
  };
  return m[t];
}

export function sewEase(t: ZipperType): number {
  const m: Record<ZipperType, number> = {
    coil_nylon_lightweight: 8, molded_plastic_vislon: 7, metal_tooth_brass: 5, invisible_concealed: 4, waterproof_sealed_tape: 3,
  };
  return m[t];
}

export function zipperCost(t: ZipperType): number {
  const m: Record<ZipperType, number> = {
    coil_nylon_lightweight: 3, molded_plastic_vislon: 4, metal_tooth_brass: 7, invisible_concealed: 5, waterproof_sealed_tape: 9,
  };
  return m[t];
}

export function selfRepairing(t: ZipperType): boolean {
  const m: Record<ZipperType, boolean> = {
    coil_nylon_lightweight: true, molded_plastic_vislon: false, metal_tooth_brass: false, invisible_concealed: true, waterproof_sealed_tape: false,
  };
  return m[t];
}

export function separating(t: ZipperType): boolean {
  const m: Record<ZipperType, boolean> = {
    coil_nylon_lightweight: true, molded_plastic_vislon: true, metal_tooth_brass: true, invisible_concealed: false, waterproof_sealed_tape: true,
  };
  return m[t];
}

export function toothMaterial(t: ZipperType): string {
  const m: Record<ZipperType, string> = {
    coil_nylon_lightweight: "continuous_nylon_coil",
    molded_plastic_vislon: "injection_molded_polyacetal",
    metal_tooth_brass: "stamped_brass_nickel",
    invisible_concealed: "fine_nylon_coil_hidden",
    waterproof_sealed_tape: "polyurethane_coated_coil",
  };
  return m[t];
}

export function bestGarment(t: ZipperType): string {
  const m: Record<ZipperType, string> = {
    coil_nylon_lightweight: "dress_skirt_lining",
    molded_plastic_vislon: "jacket_sportswear_bag",
    metal_tooth_brass: "jeans_leather_heavy_duty",
    invisible_concealed: "formal_dress_pillow",
    waterproof_sealed_tape: "drybag_wetsuit_outdoor",
  };
  return m[t];
}

export function zippers(): ZipperType[] {
  return ["coil_nylon_lightweight", "molded_plastic_vislon", "metal_tooth_brass", "invisible_concealed", "waterproof_sealed_tape"];
}
