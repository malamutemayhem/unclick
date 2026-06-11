export type DinEnclosureType =
  | "modular_rail_mount"
  | "open_pcb_holder"
  | "sealed_terminal_box"
  | "double_wide_power"
  | "slim_signal_module";

const DATA: Record<DinEnclosureType, {
  moduleWidth: number; pcbFit: number; ventilation: number;
  accessEase: number; encCost: number; sealed: boolean;
  stackable: boolean; railType: string; bestUse: string;
}> = {
  modular_rail_mount: { moduleWidth: 6, pcbFit: 7, ventilation: 6, accessEase: 7, encCost: 3, sealed: false, stackable: true, railType: "ts35_standard_din", bestUse: "plc_io_module_house" },
  open_pcb_holder: { moduleWidth: 5, pcbFit: 9, ventilation: 10, accessEase: 9, encCost: 2, sealed: false, stackable: true, railType: "ts35_snap_open", bestUse: "custom_pcb_rail_mount" },
  sealed_terminal_box: { moduleWidth: 7, pcbFit: 5, ventilation: 2, accessEase: 5, encCost: 5, sealed: true, stackable: false, railType: "ts35_gasket_seal", bestUse: "field_signal_junction" },
  double_wide_power: { moduleWidth: 10, pcbFit: 8, ventilation: 7, accessEase: 6, encCost: 6, sealed: false, stackable: false, railType: "ts35_heavy_duty", bestUse: "power_supply_housing" },
  slim_signal_module: { moduleWidth: 3, pcbFit: 6, ventilation: 5, accessEase: 7, encCost: 4, sealed: false, stackable: true, railType: "ts35_narrow_pitch", bestUse: "analog_signal_isolator" },
};

const get = (t: DinEnclosureType) => DATA[t];

export const moduleWidth = (t: DinEnclosureType) => get(t).moduleWidth;
export const pcbFit = (t: DinEnclosureType) => get(t).pcbFit;
export const ventilation = (t: DinEnclosureType) => get(t).ventilation;
export const accessEase = (t: DinEnclosureType) => get(t).accessEase;
export const encCost = (t: DinEnclosureType) => get(t).encCost;
export const sealed = (t: DinEnclosureType) => get(t).sealed;
export const stackable = (t: DinEnclosureType) => get(t).stackable;
export const railType = (t: DinEnclosureType) => get(t).railType;
export const bestUse = (t: DinEnclosureType) => get(t).bestUse;
export const dinEnclosures = (): DinEnclosureType[] => Object.keys(DATA) as DinEnclosureType[];
