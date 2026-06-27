// Sand shade calculator - marquetry sand shading tools

export type SandShadeType =
  | "hot_sand_tray"
  | "electric_pan_temp"
  | "iron_skillet_heavy"
  | "copper_tray_even"
  | "sand_bag_portable";

const SHADE_DATA: Record<
  SandShadeType,
  {
    heatEven: number;
    tempControl: number;
    shadeGradient: number;
    sandCapacity: number;
    cost: number;
    tempRegulated: boolean;
    portable: boolean;
    heatSource: string;
    bestUse: string;
  }
> = {
  hot_sand_tray: {
    heatEven: 7,
    tempControl: 6,
    shadeGradient: 7,
    sandCapacity: 8,
    cost: 3,
    tempRegulated: false,
    portable: false,
    heatSource: "stove_burner_heat",
    bestUse: "basic_shade_work",
  },
  electric_pan_temp: {
    heatEven: 9,
    tempControl: 10,
    shadeGradient: 9,
    sandCapacity: 7,
    cost: 6,
    tempRegulated: true,
    portable: false,
    heatSource: "electric_element",
    bestUse: "precision_shade_control",
  },
  iron_skillet_heavy: {
    heatEven: 8,
    tempControl: 5,
    shadeGradient: 7,
    sandCapacity: 9,
    cost: 3,
    tempRegulated: false,
    portable: false,
    heatSource: "cast_iron_retain",
    bestUse: "large_piece_shade",
  },
  copper_tray_even: {
    heatEven: 10,
    tempControl: 7,
    shadeGradient: 9,
    sandCapacity: 6,
    cost: 5,
    tempRegulated: false,
    portable: false,
    heatSource: "copper_conduct_heat",
    bestUse: "even_gradient_shade",
  },
  sand_bag_portable: {
    heatEven: 5,
    tempControl: 4,
    shadeGradient: 5,
    sandCapacity: 4,
    cost: 2,
    tempRegulated: false,
    portable: true,
    heatSource: "external_heat_bag",
    bestUse: "field_demo_shade",
  },
};

export function heatEven(type: SandShadeType): number {
  return SHADE_DATA[type].heatEven;
}
export function tempControl(type: SandShadeType): number {
  return SHADE_DATA[type].tempControl;
}
export function shadeGradient(type: SandShadeType): number {
  return SHADE_DATA[type].shadeGradient;
}
export function sandCapacity(type: SandShadeType): number {
  return SHADE_DATA[type].sandCapacity;
}
export function shadeCost(type: SandShadeType): number {
  return SHADE_DATA[type].cost;
}
export function tempRegulated(type: SandShadeType): boolean {
  return SHADE_DATA[type].tempRegulated;
}
export function portable(type: SandShadeType): boolean {
  return SHADE_DATA[type].portable;
}
export function heatSource(type: SandShadeType): string {
  return SHADE_DATA[type].heatSource;
}
export function bestUse(type: SandShadeType): string {
  return SHADE_DATA[type].bestUse;
}
export function sandShades(): SandShadeType[] {
  return Object.keys(SHADE_DATA) as SandShadeType[];
}
