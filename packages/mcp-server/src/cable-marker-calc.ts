export type CableMarkerType =
  | "clip_on_letter_snap"
  | "tie_on_tag_plate"
  | "wrap_around_print"
  | "engraved_metal_tag"
  | "color_band_ring";

const DATA: Record<CableMarkerType, {
  durability: number; readability: number; installSpeed: number;
  reusability: number; markerCost: number; printable: boolean;
  forOutdoor: boolean; attachMethod: string; bestUse: string;
}> = {
  clip_on_letter_snap: { durability: 6, readability: 8, installSpeed: 9, reusability: 8, markerCost: 3, printable: false, forOutdoor: false, attachMethod: "snap_clip_on_cable", bestUse: "patch_panel_port_id" },
  tie_on_tag_plate: { durability: 9, readability: 9, installSpeed: 5, reusability: 7, markerCost: 5, printable: true, forOutdoor: true, attachMethod: "cable_tie_through_tag", bestUse: "plant_cable_route_tag" },
  wrap_around_print: { durability: 7, readability: 8, installSpeed: 8, reusability: 3, markerCost: 4, printable: true, forOutdoor: false, attachMethod: "adhesive_wrap_label", bestUse: "datacenter_cable_label" },
  engraved_metal_tag: { durability: 10, readability: 7, installSpeed: 3, reusability: 5, markerCost: 8, printable: false, forOutdoor: true, attachMethod: "wire_loop_tie", bestUse: "permanent_utility_mark" },
  color_band_ring: { durability: 5, readability: 6, installSpeed: 10, reusability: 9, markerCost: 1, printable: false, forOutdoor: false, attachMethod: "stretch_slide_band", bestUse: "quick_color_code_sort" },
};

const get = (t: CableMarkerType) => DATA[t];

export const durability = (t: CableMarkerType) => get(t).durability;
export const readability = (t: CableMarkerType) => get(t).readability;
export const installSpeed = (t: CableMarkerType) => get(t).installSpeed;
export const reusability = (t: CableMarkerType) => get(t).reusability;
export const markerCost = (t: CableMarkerType) => get(t).markerCost;
export const printable = (t: CableMarkerType) => get(t).printable;
export const forOutdoor = (t: CableMarkerType) => get(t).forOutdoor;
export const attachMethod = (t: CableMarkerType) => get(t).attachMethod;
export const bestUse = (t: CableMarkerType) => get(t).bestUse;
export const cableMarkers = (): CableMarkerType[] => Object.keys(DATA) as CableMarkerType[];
