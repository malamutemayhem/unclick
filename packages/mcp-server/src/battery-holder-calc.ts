export type BatteryHolderType =
  | "aa_spring_clip"
  | "coin_cell_cr2032"
  | "eighteen650_sled"
  | "nine_volt_snap"
  | "aaa_dual_series";

const DATA: Record<BatteryHolderType, {
  contactReliability: number; gripStrength: number; insertEase: number;
  durability: number; holderCost: number; springContact: boolean;
  forSeries: boolean; mountStyle: string; bestUse: string;
}> = {
  aa_spring_clip: { contactReliability: 7, gripStrength: 7, insertEase: 9, durability: 7, holderCost: 2, springContact: true, forSeries: false, mountStyle: "pcb_through_hole", bestUse: "general_prototype" },
  coin_cell_cr2032: { contactReliability: 8, gripStrength: 6, insertEase: 7, durability: 8, holderCost: 3, springContact: true, forSeries: false, mountStyle: "smd_reflow", bestUse: "rtc_backup_power" },
  eighteen650_sled: { contactReliability: 9, gripStrength: 9, insertEase: 6, durability: 9, holderCost: 5, springContact: true, forSeries: true, mountStyle: "chassis_screw", bestUse: "high_capacity_pack" },
  nine_volt_snap: { contactReliability: 6, gripStrength: 5, insertEase: 10, durability: 5, holderCost: 1, springContact: false, forSeries: false, mountStyle: "wire_lead_snap", bestUse: "quick_test_rig" },
  aaa_dual_series: { contactReliability: 7, gripStrength: 7, insertEase: 8, durability: 7, holderCost: 3, springContact: true, forSeries: true, mountStyle: "panel_mount_clip", bestUse: "compact_3v_supply" },
};

const get = (t: BatteryHolderType) => DATA[t];

export const contactReliability = (t: BatteryHolderType) => get(t).contactReliability;
export const gripStrength = (t: BatteryHolderType) => get(t).gripStrength;
export const insertEase = (t: BatteryHolderType) => get(t).insertEase;
export const durability = (t: BatteryHolderType) => get(t).durability;
export const holderCost = (t: BatteryHolderType) => get(t).holderCost;
export const springContact = (t: BatteryHolderType) => get(t).springContact;
export const forSeries = (t: BatteryHolderType) => get(t).forSeries;
export const mountStyle = (t: BatteryHolderType) => get(t).mountStyle;
export const bestUse = (t: BatteryHolderType) => get(t).bestUse;
export const batteryHolders = (): BatteryHolderType[] => Object.keys(DATA) as BatteryHolderType[];
