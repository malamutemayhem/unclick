// Pole lathe calculator - green woodworking turning tools

export type PoleLatheType =
  | "spring_pole_standard"
  | "bungee_cord_modern"
  | "treadle_flywheel_cont"
  | "bow_lathe_portable"
  | "great_wheel_heavy";

const LATHE_DATA: Record<
  PoleLatheType,
  {
    turnSpeed: number;
    controlFeel: number;
    setupEase: number;
    portability: number;
    cost: number;
    continuous: boolean;
    portable: boolean;
    driveMethod: string;
    bestUse: string;
  }
> = {
  spring_pole_standard: {
    turnSpeed: 7,
    controlFeel: 9,
    setupEase: 7,
    portability: 6,
    cost: 4,
    continuous: false,
    portable: false,
    driveMethod: "spring_pole_return",
    bestUse: "traditional_bowl_turn",
  },
  bungee_cord_modern: {
    turnSpeed: 7,
    controlFeel: 8,
    setupEase: 9,
    portability: 7,
    cost: 3,
    continuous: false,
    portable: true,
    driveMethod: "elastic_cord_return",
    bestUse: "modern_pole_turn",
  },
  treadle_flywheel_cont: {
    turnSpeed: 9,
    controlFeel: 8,
    setupEase: 5,
    portability: 3,
    cost: 7,
    continuous: true,
    portable: false,
    driveMethod: "flywheel_momentum",
    bestUse: "continuous_spin_turn",
  },
  bow_lathe_portable: {
    turnSpeed: 6,
    controlFeel: 7,
    setupEase: 10,
    portability: 10,
    cost: 2,
    continuous: false,
    portable: true,
    driveMethod: "bow_string_wrap",
    bestUse: "field_demo_turn",
  },
  great_wheel_heavy: {
    turnSpeed: 10,
    controlFeel: 7,
    setupEase: 3,
    portability: 2,
    cost: 8,
    continuous: true,
    portable: false,
    driveMethod: "large_wheel_drive",
    bestUse: "heavy_spindle_turn",
  },
};

export function turnSpeed(type: PoleLatheType): number {
  return LATHE_DATA[type].turnSpeed;
}
export function controlFeel(type: PoleLatheType): number {
  return LATHE_DATA[type].controlFeel;
}
export function setupEase(type: PoleLatheType): number {
  return LATHE_DATA[type].setupEase;
}
export function portability(type: PoleLatheType): number {
  return LATHE_DATA[type].portability;
}
export function latheCost(type: PoleLatheType): number {
  return LATHE_DATA[type].cost;
}
export function continuous(type: PoleLatheType): boolean {
  return LATHE_DATA[type].continuous;
}
export function portable(type: PoleLatheType): boolean {
  return LATHE_DATA[type].portable;
}
export function driveMethod(type: PoleLatheType): string {
  return LATHE_DATA[type].driveMethod;
}
export function bestUse(type: PoleLatheType): string {
  return LATHE_DATA[type].bestUse;
}
export function poleLathes(): PoleLatheType[] {
  return Object.keys(LATHE_DATA) as PoleLatheType[];
}
