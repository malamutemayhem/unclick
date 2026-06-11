export type BananaPlugType =
  | "standard_4mm_spring"
  | "stackable_4mm_socket"
  | "shrouded_safety_4mm"
  | "miniature_2mm_probe"
  | "right_angle_pcb_pin";

const DATA: Record<BananaPlugType, {
  contactResist: number; currentRating: number; safetyRating: number;
  durability: number; plugCost: number; stackable: boolean;
  shrouded: boolean; contactType: string; bestUse: string;
}> = {
  standard_4mm_spring: { contactResist: 7, currentRating: 7, safetyRating: 4, durability: 7, plugCost: 2, stackable: false, shrouded: false, contactType: "leaf_spring_expand", bestUse: "bench_test_lead" },
  stackable_4mm_socket: { contactResist: 7, currentRating: 7, safetyRating: 5, durability: 8, plugCost: 3, stackable: true, shrouded: false, contactType: "cross_hole_socket", bestUse: "daisy_chain_measure" },
  shrouded_safety_4mm: { contactResist: 6, currentRating: 8, safetyRating: 10, durability: 9, plugCost: 5, stackable: false, shrouded: true, contactType: "retractable_sleeve_pin", bestUse: "high_voltage_test_safe" },
  miniature_2mm_probe: { contactResist: 8, currentRating: 3, safetyRating: 3, durability: 5, plugCost: 2, stackable: false, shrouded: false, contactType: "solid_pin_friction", bestUse: "pcb_point_probe" },
  right_angle_pcb_pin: { contactResist: 6, currentRating: 6, safetyRating: 5, durability: 7, plugCost: 3, stackable: false, shrouded: false, contactType: "right_angle_solder_tab", bestUse: "panel_mount_binding" },
};

const get = (t: BananaPlugType) => DATA[t];

export const contactResist = (t: BananaPlugType) => get(t).contactResist;
export const currentRating = (t: BananaPlugType) => get(t).currentRating;
export const safetyRating = (t: BananaPlugType) => get(t).safetyRating;
export const durability = (t: BananaPlugType) => get(t).durability;
export const plugCost = (t: BananaPlugType) => get(t).plugCost;
export const stackable = (t: BananaPlugType) => get(t).stackable;
export const shrouded = (t: BananaPlugType) => get(t).shrouded;
export const contactType = (t: BananaPlugType) => get(t).contactType;
export const bestUse = (t: BananaPlugType) => get(t).bestUse;
export const bananaPlugs = (): BananaPlugType[] => Object.keys(DATA) as BananaPlugType[];
