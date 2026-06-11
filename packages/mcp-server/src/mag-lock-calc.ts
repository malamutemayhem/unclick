export type MagLockType =
  | "single_door_600_lb"
  | "double_door_1200_lb"
  | "shear_lock_mortise"
  | "mini_mag_cabinet_gate"
  | "outdoor_weather_sealed";

interface MagLockData {
  holdForce: number;
  reliability: number;
  installEase: number;
  aesthetic: number;
  mlCost: number;
  failSafe: boolean;
  forExterior: boolean;
  mounting: string;
  bestUse: string;
}

const DATA: Record<MagLockType, MagLockData> = {
  single_door_600_lb: {
    holdForce: 6, reliability: 9, installEase: 8, aesthetic: 6, mlCost: 3,
    failSafe: true, forExterior: false,
    mounting: "surface_mount_header_frame",
    bestUse: "standard_interior_office_door",
  },
  double_door_1200_lb: {
    holdForce: 10, reliability: 9, installEase: 6, aesthetic: 5, mlCost: 6,
    failSafe: true, forExterior: false,
    mounting: "dual_surface_mount_header",
    bestUse: "double_door_lobby_entrance",
  },
  shear_lock_mortise: {
    holdForce: 9, reliability: 8, installEase: 4, aesthetic: 10, mlCost: 7,
    failSafe: true, forExterior: false,
    mounting: "concealed_mortise_frame_door",
    bestUse: "architectural_concealed_mount",
  },
  mini_mag_cabinet_gate: {
    holdForce: 3, reliability: 8, installEase: 9, aesthetic: 8, mlCost: 2,
    failSafe: true, forExterior: false,
    mounting: "compact_surface_mount_small",
    bestUse: "cabinet_gate_light_security",
  },
  outdoor_weather_sealed: {
    holdForce: 8, reliability: 8, installEase: 6, aesthetic: 5, mlCost: 6,
    failSafe: true, forExterior: true,
    mounting: "sealed_surface_mount_rated",
    bestUse: "exterior_gate_perimeter_door",
  },
};

function get(t: MagLockType): MagLockData {
  return DATA[t];
}

export const holdForce = (t: MagLockType) => get(t).holdForce;
export const reliability = (t: MagLockType) => get(t).reliability;
export const installEase = (t: MagLockType) => get(t).installEase;
export const aesthetic = (t: MagLockType) => get(t).aesthetic;
export const mlCost = (t: MagLockType) => get(t).mlCost;
export const failSafe = (t: MagLockType) => get(t).failSafe;
export const forExterior = (t: MagLockType) => get(t).forExterior;
export const mounting = (t: MagLockType) => get(t).mounting;
export const bestUse = (t: MagLockType) => get(t).bestUse;
export const magLockTypes = (): MagLockType[] =>
  Object.keys(DATA) as MagLockType[];
