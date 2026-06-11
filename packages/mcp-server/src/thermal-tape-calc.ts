export type ThermalTapeType =
  | "acrylic_adhesive_thin"
  | "silicone_adhesive_high"
  | "graphite_backed_foil"
  | "ceramic_filled_tape"
  | "double_sided_transfer";

const DATA: Record<ThermalTapeType, {
  conductivity: number; adhesion: number; thickness: number;
  tempResist: number; tapeCost: number; removable: boolean;
  electricInsulate: boolean; adhesiveType: string; bestUse: string;
}> = {
  acrylic_adhesive_thin: { conductivity: 4, adhesion: 8, thickness: 9, tempResist: 5, tapeCost: 2, removable: false, electricInsulate: true, adhesiveType: "acrylic_pressure_sensitive", bestUse: "led_strip_heat_bond" },
  silicone_adhesive_high: { conductivity: 7, adhesion: 7, thickness: 6, tempResist: 9, tapeCost: 5, removable: true, electricInsulate: true, adhesiveType: "silicone_high_temp", bestUse: "automotive_sensor_mount" },
  graphite_backed_foil: { conductivity: 10, adhesion: 6, thickness: 7, tempResist: 8, tapeCost: 7, removable: true, electricInsulate: false, adhesiveType: "graphite_acrylic_back", bestUse: "phone_heat_spreader" },
  ceramic_filled_tape: { conductivity: 8, adhesion: 8, thickness: 5, tempResist: 8, tapeCost: 6, removable: false, electricInsulate: true, adhesiveType: "ceramic_filled_acrylic", bestUse: "power_module_isolate_bond" },
  double_sided_transfer: { conductivity: 5, adhesion: 10, thickness: 10, tempResist: 5, tapeCost: 3, removable: false, electricInsulate: true, adhesiveType: "transfer_adhesive_film", bestUse: "heatsink_permanent_attach" },
};

const get = (t: ThermalTapeType) => DATA[t];

export const conductivity = (t: ThermalTapeType) => get(t).conductivity;
export const adhesion = (t: ThermalTapeType) => get(t).adhesion;
export const thickness = (t: ThermalTapeType) => get(t).thickness;
export const tempResist = (t: ThermalTapeType) => get(t).tempResist;
export const tapeCost = (t: ThermalTapeType) => get(t).tapeCost;
export const removable = (t: ThermalTapeType) => get(t).removable;
export const electricInsulate = (t: ThermalTapeType) => get(t).electricInsulate;
export const adhesiveType = (t: ThermalTapeType) => get(t).adhesiveType;
export const bestUse = (t: ThermalTapeType) => get(t).bestUse;
export const thermalTapes = (): ThermalTapeType[] => Object.keys(DATA) as ThermalTapeType[];
