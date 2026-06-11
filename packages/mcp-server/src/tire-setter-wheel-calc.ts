export type TireSetterWheelType =
  | "platform_setter_standard"
  | "pit_fire_traditional"
  | "hydraulic_press_modern"
  | "portable_setter_field"
  | "electric_heat_ring";

const specs: Record<TireSetterWheelType, {
  fitTight: number; heatControl: number; speedSet: number;
  sizeRange: number; cost: number; powered: boolean; portable: boolean;
  heatMethod: string; use: string;
}> = {
  platform_setter_standard: {
    fitTight: 85, heatControl: 78, speedSet: 72,
    sizeRange: 80, cost: 200, powered: false, portable: false,
    heatMethod: "open_fire_ring", use: "general_tire_set",
  },
  pit_fire_traditional: {
    fitTight: 90, heatControl: 65, speedSet: 55,
    sizeRange: 85, cost: 150, powered: false, portable: false,
    heatMethod: "pit_charcoal_fire", use: "traditional_tire_shrink",
  },
  hydraulic_press_modern: {
    fitTight: 88, heatControl: 90, speedSet: 85,
    sizeRange: 75, cost: 800, powered: true, portable: false,
    heatMethod: "electric_induction", use: "precision_tire_press",
  },
  portable_setter_field: {
    fitTight: 72, heatControl: 68, speedSet: 80,
    sizeRange: 60, cost: 120, powered: false, portable: true,
    heatMethod: "propane_ring_burner", use: "field_repair_tire",
  },
  electric_heat_ring: {
    fitTight: 82, heatControl: 92, speedSet: 78,
    sizeRange: 70, cost: 450, powered: true, portable: false,
    heatMethod: "electric_coil_ring", use: "controlled_heat_tire",
  },
};

export function fitTight(t: TireSetterWheelType): number { return specs[t].fitTight; }
export function heatControl(t: TireSetterWheelType): number { return specs[t].heatControl; }
export function speedSet(t: TireSetterWheelType): number { return specs[t].speedSet; }
export function sizeRange(t: TireSetterWheelType): number { return specs[t].sizeRange; }
export function setterCost(t: TireSetterWheelType): number { return specs[t].cost; }
export function powered(t: TireSetterWheelType): boolean { return specs[t].powered; }
export function portable(t: TireSetterWheelType): boolean { return specs[t].portable; }
export function heatMethod(t: TireSetterWheelType): string { return specs[t].heatMethod; }
export function bestUse(t: TireSetterWheelType): string { return specs[t].use; }
export function tireSetterWheels(): TireSetterWheelType[] { return Object.keys(specs) as TireSetterWheelType[]; }
