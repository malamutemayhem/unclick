export type CableTieType =
  | "nylon_standard_lock"
  | "reusable_velcro_wrap"
  | "stainless_steel_band"
  | "push_mount_anchor"
  | "marker_tag_label";

const DATA: Record<CableTieType, {
  tensileStrength: number; tempResist: number; reusability: number;
  installSpeed: number; tieCost: number; reusable: boolean;
  forOutdoor: boolean; material: string; bestUse: string;
}> = {
  nylon_standard_lock: { tensileStrength: 6, tempResist: 5, reusability: 1, installSpeed: 9, tieCost: 1, reusable: false, forOutdoor: false, material: "nylon_66_natural", bestUse: "general_wire_bundle" },
  reusable_velcro_wrap: { tensileStrength: 3, tempResist: 4, reusability: 10, installSpeed: 8, tieCost: 3, reusable: true, forOutdoor: false, material: "polyester_hook_loop", bestUse: "server_rack_cable" },
  stainless_steel_band: { tensileStrength: 10, tempResist: 10, reusability: 1, installSpeed: 4, tieCost: 6, reusable: false, forOutdoor: true, material: "ss304_ball_lock", bestUse: "exhaust_pipe_clamp" },
  push_mount_anchor: { tensileStrength: 5, tempResist: 5, reusability: 2, installSpeed: 7, tieCost: 2, reusable: false, forOutdoor: false, material: "nylon_with_anchor_base", bestUse: "panel_route_anchor" },
  marker_tag_label: { tensileStrength: 5, tempResist: 5, reusability: 1, installSpeed: 6, tieCost: 2, reusable: false, forOutdoor: false, material: "nylon_with_write_area", bestUse: "labeled_wire_identify" },
};

const get = (t: CableTieType) => DATA[t];

export const tensileStrength = (t: CableTieType) => get(t).tensileStrength;
export const tempResist = (t: CableTieType) => get(t).tempResist;
export const reusability = (t: CableTieType) => get(t).reusability;
export const installSpeed = (t: CableTieType) => get(t).installSpeed;
export const tieCost = (t: CableTieType) => get(t).tieCost;
export const reusable = (t: CableTieType) => get(t).reusable;
export const forOutdoor = (t: CableTieType) => get(t).forOutdoor;
export const material = (t: CableTieType) => get(t).material;
export const bestUse = (t: CableTieType) => get(t).bestUse;
export const cableTies = (): CableTieType[] => Object.keys(DATA) as CableTieType[];
