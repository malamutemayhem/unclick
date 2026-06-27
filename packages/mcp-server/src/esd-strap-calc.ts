export type EsdStrapType =
  | "wrist_strap_coil"
  | "heel_strap_ground"
  | "ankle_strap_conductive"
  | "wireless_monitor_strap"
  | "disposable_single_use";

const DATA: Record<EsdStrapType, {
  groundReliability: number; comfort: number; mobility: number;
  durability: number; strapCost: number; continuous: boolean;
  wireless: boolean; groundMethod: string; bestUse: string;
}> = {
  wrist_strap_coil: { groundReliability: 10, comfort: 7, mobility: 5, durability: 8, strapCost: 3, continuous: true, wireless: false, groundMethod: "coil_cord_banana_plug", bestUse: "bench_esd_workstation" },
  heel_strap_ground: { groundReliability: 6, comfort: 6, mobility: 9, durability: 5, strapCost: 2, continuous: false, wireless: false, groundMethod: "conductive_heel_tab", bestUse: "esd_floor_walking" },
  ankle_strap_conductive: { groundReliability: 7, comfort: 5, mobility: 8, durability: 6, strapCost: 3, continuous: false, wireless: false, groundMethod: "ankle_ground_tab", bestUse: "production_floor_ground" },
  wireless_monitor_strap: { groundReliability: 4, comfort: 9, mobility: 10, durability: 7, strapCost: 8, continuous: false, wireless: true, groundMethod: "ionizer_air_discharge", bestUse: "mobile_field_service" },
  disposable_single_use: { groundReliability: 8, comfort: 4, mobility: 5, durability: 1, strapCost: 1, continuous: true, wireless: false, groundMethod: "adhesive_tab_wire", bestUse: "visitor_cleanroom_entry" },
};

const get = (t: EsdStrapType) => DATA[t];

export const groundReliability = (t: EsdStrapType) => get(t).groundReliability;
export const comfort = (t: EsdStrapType) => get(t).comfort;
export const mobility = (t: EsdStrapType) => get(t).mobility;
export const durability = (t: EsdStrapType) => get(t).durability;
export const strapCost = (t: EsdStrapType) => get(t).strapCost;
export const continuous = (t: EsdStrapType) => get(t).continuous;
export const wireless = (t: EsdStrapType) => get(t).wireless;
export const groundMethod = (t: EsdStrapType) => get(t).groundMethod;
export const bestUse = (t: EsdStrapType) => get(t).bestUse;
export const esdStraps = (): EsdStrapType[] => Object.keys(DATA) as EsdStrapType[];
