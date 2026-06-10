// Cab machine calculator - lapidary cabochon grinding/polishing machines

export type CabMachineType =
  | "flat_lap_disc"
  | "combo_unit_multi"
  | "wet_belt_sand"
  | "sphere_cup_grind"
  | "vibratory_tumble_batch";

const CAB_DATA: Record<
  CabMachineType,
  {
    grindSpeed: number;
    finishQuality: number;
    shapeControl: number;
    batchSize: number;
    cost: number;
    wetProcess: boolean;
    multiWheel: boolean;
    abrasiveType: string;
    bestUse: string;
  }
> = {
  flat_lap_disc: {
    grindSpeed: 7,
    finishQuality: 8,
    shapeControl: 6,
    batchSize: 3,
    cost: 5,
    wetProcess: true,
    multiWheel: false,
    abrasiveType: "diamond_disc_plate",
    bestUse: "flat_slab_polish",
  },
  combo_unit_multi: {
    grindSpeed: 8,
    finishQuality: 8,
    shapeControl: 9,
    batchSize: 3,
    cost: 8,
    wetProcess: true,
    multiWheel: true,
    abrasiveType: "silicon_carbide_wheel",
    bestUse: "full_cab_workflow",
  },
  wet_belt_sand: {
    grindSpeed: 9,
    finishQuality: 7,
    shapeControl: 7,
    batchSize: 4,
    cost: 6,
    wetProcess: true,
    multiWheel: false,
    abrasiveType: "belt_grit_strip",
    bestUse: "rapid_shape_rough",
  },
  sphere_cup_grind: {
    grindSpeed: 5,
    finishQuality: 9,
    shapeControl: 8,
    batchSize: 2,
    cost: 7,
    wetProcess: true,
    multiWheel: false,
    abrasiveType: "cup_wheel_diamond",
    bestUse: "sphere_bead_round",
  },
  vibratory_tumble_batch: {
    grindSpeed: 4,
    finishQuality: 6,
    shapeControl: 2,
    batchSize: 10,
    cost: 4,
    wetProcess: true,
    multiWheel: false,
    abrasiveType: "grit_slurry_media",
    bestUse: "batch_tumble_polish",
  },
};

export function grindSpeed(type: CabMachineType): number {
  return CAB_DATA[type].grindSpeed;
}
export function finishQuality(type: CabMachineType): number {
  return CAB_DATA[type].finishQuality;
}
export function shapeControl(type: CabMachineType): number {
  return CAB_DATA[type].shapeControl;
}
export function batchSize(type: CabMachineType): number {
  return CAB_DATA[type].batchSize;
}
export function machineCost(type: CabMachineType): number {
  return CAB_DATA[type].cost;
}
export function wetProcess(type: CabMachineType): boolean {
  return CAB_DATA[type].wetProcess;
}
export function multiWheel(type: CabMachineType): boolean {
  return CAB_DATA[type].multiWheel;
}
export function abrasiveType(type: CabMachineType): string {
  return CAB_DATA[type].abrasiveType;
}
export function bestUse(type: CabMachineType): string {
  return CAB_DATA[type].bestUse;
}
export function cabMachines(): CabMachineType[] {
  return Object.keys(CAB_DATA) as CabMachineType[];
}
