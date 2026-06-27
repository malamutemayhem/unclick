// Dog clamp calculator - timber framing holding/clamping dogs

export type DogClampType =
  | "log_dog_standard"
  | "timber_dog_offset"
  | "ring_dog_chain"
  | "spike_dog_driven"
  | "adjustable_dog_screw";

const DOG_DATA: Record<
  DogClampType,
  {
    gripForce: number;
    setSpeed: number;
    holdSecure: number;
    removeEase: number;
    cost: number;
    adjustable: boolean;
    forRoundLog: boolean;
    legStyle: string;
    bestUse: string;
  }
> = {
  log_dog_standard: {
    gripForce: 8,
    setSpeed: 8,
    holdSecure: 8,
    removeEase: 7,
    cost: 3,
    adjustable: false,
    forRoundLog: true,
    legStyle: "straight_point_pair",
    bestUse: "log_hold_sawing",
  },
  timber_dog_offset: {
    gripForce: 9,
    setSpeed: 7,
    holdSecure: 9,
    removeEase: 6,
    cost: 4,
    adjustable: false,
    forRoundLog: false,
    legStyle: "offset_angle_grip",
    bestUse: "squared_beam_hold",
  },
  ring_dog_chain: {
    gripForce: 7,
    setSpeed: 9,
    holdSecure: 7,
    removeEase: 9,
    cost: 5,
    adjustable: false,
    forRoundLog: true,
    legStyle: "ring_chain_loop",
    bestUse: "quick_drag_attach",
  },
  spike_dog_driven: {
    gripForce: 10,
    setSpeed: 6,
    holdSecure: 10,
    removeEase: 4,
    cost: 3,
    adjustable: false,
    forRoundLog: false,
    legStyle: "long_spike_drive",
    bestUse: "permanent_joint_pin",
  },
  adjustable_dog_screw: {
    gripForce: 8,
    setSpeed: 6,
    holdSecure: 9,
    removeEase: 8,
    cost: 7,
    adjustable: true,
    forRoundLog: true,
    legStyle: "screw_thread_jaw",
    bestUse: "variable_size_hold",
  },
};

export function gripForce(type: DogClampType): number {
  return DOG_DATA[type].gripForce;
}
export function setSpeed(type: DogClampType): number {
  return DOG_DATA[type].setSpeed;
}
export function holdSecure(type: DogClampType): number {
  return DOG_DATA[type].holdSecure;
}
export function removeEase(type: DogClampType): number {
  return DOG_DATA[type].removeEase;
}
export function dogCost(type: DogClampType): number {
  return DOG_DATA[type].cost;
}
export function adjustable(type: DogClampType): boolean {
  return DOG_DATA[type].adjustable;
}
export function forRoundLog(type: DogClampType): boolean {
  return DOG_DATA[type].forRoundLog;
}
export function legStyle(type: DogClampType): string {
  return DOG_DATA[type].legStyle;
}
export function bestUse(type: DogClampType): string {
  return DOG_DATA[type].bestUse;
}
export function dogClamps(): DogClampType[] {
  return Object.keys(DOG_DATA) as DogClampType[];
}
