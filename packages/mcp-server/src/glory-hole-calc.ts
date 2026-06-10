// Glory hole calculator - glassblowing reheating furnace tools

export type GloryHoleType =
  | "gas_fired_standard"
  | "electric_element_box"
  | "portable_torch_mount"
  | "dual_port_shared"
  | "variable_temp_digital";

const GLORY_DATA: Record<
  GloryHoleType,
  {
    heatSpeed: number;
    tempControl: number;
    fuelEfficiency: number;
    openingSize: number;
    cost: number;
    electric: boolean;
    portable: boolean;
    fuelType: string;
    bestUse: string;
  }
> = {
  gas_fired_standard: {
    heatSpeed: 8,
    tempControl: 6,
    fuelEfficiency: 6,
    openingSize: 7,
    cost: 6,
    electric: false,
    portable: false,
    fuelType: "natural_gas_propane",
    bestUse: "standard_studio_reheat",
  },
  electric_element_box: {
    heatSpeed: 6,
    tempControl: 9,
    fuelEfficiency: 8,
    openingSize: 6,
    cost: 8,
    electric: true,
    portable: false,
    fuelType: "electric_element_coil",
    bestUse: "precise_temp_control",
  },
  portable_torch_mount: {
    heatSpeed: 7,
    tempControl: 5,
    fuelEfficiency: 4,
    openingSize: 4,
    cost: 3,
    electric: false,
    portable: true,
    fuelType: "mapp_propane_torch",
    bestUse: "demo_field_reheat",
  },
  dual_port_shared: {
    heatSpeed: 8,
    tempControl: 7,
    fuelEfficiency: 7,
    openingSize: 9,
    cost: 9,
    electric: false,
    portable: false,
    fuelType: "natural_gas_forced",
    bestUse: "shared_studio_access",
  },
  variable_temp_digital: {
    heatSpeed: 9,
    tempControl: 10,
    fuelEfficiency: 8,
    openingSize: 7,
    cost: 10,
    electric: true,
    portable: false,
    fuelType: "electric_digital_pid",
    bestUse: "color_work_precision",
  },
};

export function heatSpeed(type: GloryHoleType): number {
  return GLORY_DATA[type].heatSpeed;
}
export function tempControl(type: GloryHoleType): number {
  return GLORY_DATA[type].tempControl;
}
export function fuelEfficiency(type: GloryHoleType): number {
  return GLORY_DATA[type].fuelEfficiency;
}
export function openingSize(type: GloryHoleType): number {
  return GLORY_DATA[type].openingSize;
}
export function gloryCost(type: GloryHoleType): number {
  return GLORY_DATA[type].cost;
}
export function electric(type: GloryHoleType): boolean {
  return GLORY_DATA[type].electric;
}
export function portable(type: GloryHoleType): boolean {
  return GLORY_DATA[type].portable;
}
export function fuelType(type: GloryHoleType): string {
  return GLORY_DATA[type].fuelType;
}
export function bestUse(type: GloryHoleType): string {
  return GLORY_DATA[type].bestUse;
}
export function gloryHoles(): GloryHoleType[] {
  return Object.keys(GLORY_DATA) as GloryHoleType[];
}
