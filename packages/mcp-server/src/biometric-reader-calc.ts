export type BiometricReaderType =
  | "fingerprint_optical_sensor"
  | "iris_recognition_camera"
  | "facial_recognition_ai"
  | "palm_vein_infrared"
  | "multi_modal_combo";

interface BiometricReaderData {
  accuracy: number;
  speed: number;
  spoofResist: number;
  userAccept: number;
  brCost: number;
  contactless: boolean;
  forHighSecurity: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<BiometricReaderType, BiometricReaderData> = {
  fingerprint_optical_sensor: {
    accuracy: 8, speed: 9, spoofResist: 6, userAccept: 8, brCost: 4,
    contactless: false, forHighSecurity: false,
    sensor: "optical_cmos_fingerprint_live",
    bestUse: "office_door_time_attendance",
  },
  iris_recognition_camera: {
    accuracy: 10, speed: 7, spoofResist: 9, userAccept: 6, brCost: 8,
    contactless: true, forHighSecurity: true,
    sensor: "nir_camera_iris_pattern_match",
    bestUse: "government_border_control_id",
  },
  facial_recognition_ai: {
    accuracy: 9, speed: 10, spoofResist: 7, userAccept: 9, brCost: 7,
    contactless: true, forHighSecurity: false,
    sensor: "3d_depth_camera_ai_face_match",
    bestUse: "corporate_lobby_frictionless",
  },
  palm_vein_infrared: {
    accuracy: 9, speed: 8, spoofResist: 10, userAccept: 7, brCost: 7,
    contactless: true, forHighSecurity: true,
    sensor: "nir_vein_pattern_subcutaneous",
    bestUse: "hospital_clean_room_hygiene",
  },
  multi_modal_combo: {
    accuracy: 10, speed: 6, spoofResist: 10, userAccept: 5, brCost: 10,
    contactless: false, forHighSecurity: true,
    sensor: "finger_face_iris_fusion_multi",
    bestUse: "military_scif_vault_access",
  },
};

function get(t: BiometricReaderType): BiometricReaderData {
  return DATA[t];
}

export const accuracy = (t: BiometricReaderType) => get(t).accuracy;
export const speed = (t: BiometricReaderType) => get(t).speed;
export const spoofResist = (t: BiometricReaderType) => get(t).spoofResist;
export const userAccept = (t: BiometricReaderType) => get(t).userAccept;
export const brCost = (t: BiometricReaderType) => get(t).brCost;
export const contactless = (t: BiometricReaderType) => get(t).contactless;
export const forHighSecurity = (t: BiometricReaderType) => get(t).forHighSecurity;
export const sensor = (t: BiometricReaderType) => get(t).sensor;
export const bestUse = (t: BiometricReaderType) => get(t).bestUse;
export const biometricReaderTypes = (): BiometricReaderType[] =>
  Object.keys(DATA) as BiometricReaderType[];
