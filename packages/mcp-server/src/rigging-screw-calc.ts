// Rigging screw calculator - rigging turnbuckle/screw tools

export type RiggingScrewType =
  | "jaw_jaw_standard"
  | "fork_fork_toggle"
  | "eye_eye_closed"
  | "stud_stud_terminal"
  | "bottle_screw_marine";

const SCREW_DATA: Record<
  RiggingScrewType,
  {
    loadCapacity: number;
    adjustRange: number;
    corrosionResist: number;
    installEase: number;
    cost: number;
    toggleEnd: boolean;
    closedBody: boolean;
    endFitting: string;
    bestUse: string;
  }
> = {
  jaw_jaw_standard: {
    loadCapacity: 8,
    adjustRange: 8,
    corrosionResist: 7,
    installEase: 9,
    cost: 4,
    toggleEnd: false,
    closedBody: false,
    endFitting: "jaw_clevis_pin",
    bestUse: "general_standing_rig",
  },
  fork_fork_toggle: {
    loadCapacity: 8,
    adjustRange: 8,
    corrosionResist: 7,
    installEase: 8,
    cost: 5,
    toggleEnd: true,
    closedBody: false,
    endFitting: "fork_toggle_pin",
    bestUse: "angular_load_rig",
  },
  eye_eye_closed: {
    loadCapacity: 9,
    adjustRange: 7,
    corrosionResist: 8,
    installEase: 7,
    cost: 5,
    toggleEnd: false,
    closedBody: true,
    endFitting: "eye_loop_closed",
    bestUse: "permanent_stay_rig",
  },
  stud_stud_terminal: {
    loadCapacity: 9,
    adjustRange: 9,
    corrosionResist: 8,
    installEase: 7,
    cost: 7,
    toggleEnd: false,
    closedBody: true,
    endFitting: "stud_swage_term",
    bestUse: "wire_rope_terminal",
  },
  bottle_screw_marine: {
    loadCapacity: 10,
    adjustRange: 8,
    corrosionResist: 10,
    installEase: 8,
    cost: 8,
    toggleEnd: false,
    closedBody: true,
    endFitting: "bottle_closed_body",
    bestUse: "marine_heavy_stay",
  },
};

export function loadCapacity(type: RiggingScrewType): number {
  return SCREW_DATA[type].loadCapacity;
}
export function adjustRange(type: RiggingScrewType): number {
  return SCREW_DATA[type].adjustRange;
}
export function corrosionResist(type: RiggingScrewType): number {
  return SCREW_DATA[type].corrosionResist;
}
export function installEase(type: RiggingScrewType): number {
  return SCREW_DATA[type].installEase;
}
export function screwCost(type: RiggingScrewType): number {
  return SCREW_DATA[type].cost;
}
export function toggleEnd(type: RiggingScrewType): boolean {
  return SCREW_DATA[type].toggleEnd;
}
export function closedBody(type: RiggingScrewType): boolean {
  return SCREW_DATA[type].closedBody;
}
export function endFitting(type: RiggingScrewType): string {
  return SCREW_DATA[type].endFitting;
}
export function bestUse(type: RiggingScrewType): string {
  return SCREW_DATA[type].bestUse;
}
export function riggingScrews(): RiggingScrewType[] {
  return Object.keys(SCREW_DATA) as RiggingScrewType[];
}
