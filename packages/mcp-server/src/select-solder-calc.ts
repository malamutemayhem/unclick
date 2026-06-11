export type SelectSolderType =
  | "miniwave_nozzle_point"
  | "dip_solder_bath"
  | "laser_solder_beam"
  | "robot_iron_cartesian"
  | "drag_solder_pallet";

const DATA: Record<SelectSolderType, {
  precision: number; throughput: number; flexibility: number;
  heatControl: number; systemCost: number; automated: boolean;
  contactless: boolean; heatSource: string; bestUse: string;
}> = {
  miniwave_nozzle_point: { precision: 8, throughput: 7, flexibility: 9, heatControl: 7, systemCost: 7, automated: true, contactless: false, heatSource: "molten_solder_nozzle", bestUse: "selective_through_hole" },
  dip_solder_bath: { precision: 3, throughput: 9, flexibility: 3, heatControl: 4, systemCost: 3, automated: false, contactless: false, heatSource: "static_solder_pot", bestUse: "full_board_dip_solder" },
  laser_solder_beam: { precision: 10, throughput: 5, flexibility: 8, heatControl: 10, systemCost: 10, automated: true, contactless: true, heatSource: "focused_laser_beam", bestUse: "heat_sensitive_precision" },
  robot_iron_cartesian: { precision: 9, throughput: 6, flexibility: 10, heatControl: 9, systemCost: 8, automated: true, contactless: false, heatSource: "heated_tip_cartridge", bestUse: "varied_joint_auto_solder" },
  drag_solder_pallet: { precision: 5, throughput: 8, flexibility: 4, heatControl: 5, systemCost: 5, automated: true, contactless: false, heatSource: "wave_drag_contact", bestUse: "palletized_through_hole" },
};

const get = (t: SelectSolderType) => DATA[t];

export const precision = (t: SelectSolderType) => get(t).precision;
export const throughput = (t: SelectSolderType) => get(t).throughput;
export const flexibility = (t: SelectSolderType) => get(t).flexibility;
export const heatControl = (t: SelectSolderType) => get(t).heatControl;
export const systemCost = (t: SelectSolderType) => get(t).systemCost;
export const automated = (t: SelectSolderType) => get(t).automated;
export const contactless = (t: SelectSolderType) => get(t).contactless;
export const heatSource = (t: SelectSolderType) => get(t).heatSource;
export const bestUse = (t: SelectSolderType) => get(t).bestUse;
export const selectSolders = (): SelectSolderType[] => Object.keys(DATA) as SelectSolderType[];
