export type ToiletryBagType = "hanging_hook_fold" | "dopp_kit_classic" | "clear_tsa_pouch" | "roll_up_compact" | "waterproof_dry_bag";

export function capacity(t: ToiletryBagType): number {
  const m: Record<ToiletryBagType, number> = {
    hanging_hook_fold: 9, dopp_kit_classic: 7, clear_tsa_pouch: 4, roll_up_compact: 6, waterproof_dry_bag: 5,
  };
  return m[t];
}

export function organization(t: ToiletryBagType): number {
  const m: Record<ToiletryBagType, number> = {
    hanging_hook_fold: 10, dopp_kit_classic: 6, clear_tsa_pouch: 3, roll_up_compact: 8, waterproof_dry_bag: 2,
  };
  return m[t];
}

export function compactness(t: ToiletryBagType): number {
  const m: Record<ToiletryBagType, number> = {
    hanging_hook_fold: 4, dopp_kit_classic: 6, clear_tsa_pouch: 9, roll_up_compact: 10, waterproof_dry_bag: 7,
  };
  return m[t];
}

export function spillProtect(t: ToiletryBagType): number {
  const m: Record<ToiletryBagType, number> = {
    hanging_hook_fold: 6, dopp_kit_classic: 5, clear_tsa_pouch: 4, roll_up_compact: 7, waterproof_dry_bag: 10,
  };
  return m[t];
}

export function bagCost(t: ToiletryBagType): number {
  const m: Record<ToiletryBagType, number> = {
    hanging_hook_fold: 5, dopp_kit_classic: 4, clear_tsa_pouch: 1, roll_up_compact: 3, waterproof_dry_bag: 4,
  };
  return m[t];
}

export function tsaReady(t: ToiletryBagType): boolean {
  const m: Record<ToiletryBagType, boolean> = {
    hanging_hook_fold: false, dopp_kit_classic: false, clear_tsa_pouch: true, roll_up_compact: false, waterproof_dry_bag: false,
  };
  return m[t];
}

export function hangsUp(t: ToiletryBagType): boolean {
  const m: Record<ToiletryBagType, boolean> = {
    hanging_hook_fold: true, dopp_kit_classic: false, clear_tsa_pouch: false, roll_up_compact: true, waterproof_dry_bag: false,
  };
  return m[t];
}

export function mainFabric(t: ToiletryBagType): string {
  const m: Record<ToiletryBagType, string> = {
    hanging_hook_fold: "nylon_multi_pocket_fold",
    dopp_kit_classic: "leather_canvas_zip_top",
    clear_tsa_pouch: "pvc_clear_zip_lock",
    roll_up_compact: "polyester_roll_tie",
    waterproof_dry_bag: "tpu_welded_seal",
  };
  return m[t];
}

export function bestTrip(t: ToiletryBagType): string {
  const m: Record<ToiletryBagType, string> = {
    hanging_hook_fold: "hotel_bathroom_hook",
    dopp_kit_classic: "weekend_carry_on",
    clear_tsa_pouch: "airport_security_check",
    roll_up_compact: "backpack_minimalist",
    waterproof_dry_bag: "beach_camping_wet",
  };
  return m[t];
}

export function toiletryBags(): ToiletryBagType[] {
  return ["hanging_hook_fold", "dopp_kit_classic", "clear_tsa_pouch", "roll_up_compact", "waterproof_dry_bag"];
}
