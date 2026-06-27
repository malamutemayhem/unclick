export type SmartLock = "keypad_deadbolt" | "fingerprint" | "bluetooth_proximity" | "wifi_hub" | "retrofit_adapter";

export function securityRating(s: SmartLock): number {
  const m: Record<SmartLock, number> = {
    keypad_deadbolt: 8, fingerprint: 9, bluetooth_proximity: 6, wifi_hub: 7, retrofit_adapter: 5,
  };
  return m[s];
}

export function convenienceScore(s: SmartLock): number {
  const m: Record<SmartLock, number> = {
    keypad_deadbolt: 7, fingerprint: 10, bluetooth_proximity: 9, wifi_hub: 8, retrofit_adapter: 6,
  };
  return m[s];
}

export function batteryLife(s: SmartLock): number {
  const m: Record<SmartLock, number> = {
    keypad_deadbolt: 8, fingerprint: 6, bluetooth_proximity: 9, wifi_hub: 4, retrofit_adapter: 10,
  };
  return m[s];
}

export function installDifficulty(s: SmartLock): number {
  const m: Record<SmartLock, number> = {
    keypad_deadbolt: 6, fingerprint: 7, bluetooth_proximity: 5, wifi_hub: 8, retrofit_adapter: 3,
  };
  return m[s];
}

export function lockCost(s: SmartLock): number {
  const m: Record<SmartLock, number> = {
    keypad_deadbolt: 5, fingerprint: 8, bluetooth_proximity: 6, wifi_hub: 7, retrofit_adapter: 4,
  };
  return m[s];
}

export function remoteAccess(s: SmartLock): boolean {
  const m: Record<SmartLock, boolean> = {
    keypad_deadbolt: false, fingerprint: false, bluetooth_proximity: false, wifi_hub: true, retrofit_adapter: false,
  };
  return m[s];
}

export function physicalKeyBackup(s: SmartLock): boolean {
  const m: Record<SmartLock, boolean> = {
    keypad_deadbolt: true, fingerprint: true, bluetooth_proximity: false, wifi_hub: true, retrofit_adapter: true,
  };
  return m[s];
}

export function authMethod(s: SmartLock): string {
  const m: Record<SmartLock, string> = {
    keypad_deadbolt: "numeric_pin_code_entry", fingerprint: "biometric_capacitive_scan",
    bluetooth_proximity: "phone_ble_auto_unlock", wifi_hub: "app_cloud_remote_control",
    retrofit_adapter: "motorized_thumb_turn_bridge",
  };
  return m[s];
}

export function bestScenario(s: SmartLock): string {
  const m: Record<SmartLock, string> = {
    keypad_deadbolt: "family_home_shared_codes", fingerprint: "high_security_fast_entry",
    bluetooth_proximity: "hands_free_auto_approach", wifi_hub: "airbnb_remote_management",
    retrofit_adapter: "keep_existing_deadbolt",
  };
  return m[s];
}

export function smartLocks(): SmartLock[] {
  return ["keypad_deadbolt", "fingerprint", "bluetooth_proximity", "wifi_hub", "retrofit_adapter"];
}
