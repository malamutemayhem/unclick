export type RemoteShutterType = "wired_cable_release" | "infrared_line_sight" | "bluetooth_phone_pair" | "radio_frequency_long" | "intervalometer_timer";

export function range(t: RemoteShutterType): number {
  const m: Record<RemoteShutterType, number> = {
    wired_cable_release: 2, infrared_line_sight: 5, bluetooth_phone_pair: 7, radio_frequency_long: 10, intervalometer_timer: 2,
  };
  return m[t];
}

export function reliability(t: RemoteShutterType): number {
  const m: Record<RemoteShutterType, number> = {
    wired_cable_release: 10, infrared_line_sight: 6, bluetooth_phone_pair: 7, radio_frequency_long: 9, intervalometer_timer: 10,
  };
  return m[t];
}

export function features(t: RemoteShutterType): number {
  const m: Record<RemoteShutterType, number> = {
    wired_cable_release: 3, infrared_line_sight: 2, bluetooth_phone_pair: 6, radio_frequency_long: 7, intervalometer_timer: 10,
  };
  return m[t];
}

export function easeOfUse(t: RemoteShutterType): number {
  const m: Record<RemoteShutterType, number> = {
    wired_cable_release: 9, infrared_line_sight: 8, bluetooth_phone_pair: 7, radio_frequency_long: 7, intervalometer_timer: 5,
  };
  return m[t];
}

export function remoteCost(t: RemoteShutterType): number {
  const m: Record<RemoteShutterType, number> = {
    wired_cable_release: 1, infrared_line_sight: 1, bluetooth_phone_pair: 2, radio_frequency_long: 4, intervalometer_timer: 4,
  };
  return m[t];
}

export function needsBattery(t: RemoteShutterType): boolean {
  const m: Record<RemoteShutterType, boolean> = {
    wired_cable_release: false, infrared_line_sight: true, bluetooth_phone_pair: true, radio_frequency_long: true, intervalometer_timer: true,
  };
  return m[t];
}

export function timelapse(t: RemoteShutterType): boolean {
  const m: Record<RemoteShutterType, boolean> = {
    wired_cable_release: false, infrared_line_sight: false, bluetooth_phone_pair: false, radio_frequency_long: false, intervalometer_timer: true,
  };
  return m[t];
}

export function connectMethod(t: RemoteShutterType): string {
  const m: Record<RemoteShutterType, string> = {
    wired_cable_release: "cable_port_direct",
    infrared_line_sight: "infrared_sensor_beam",
    bluetooth_phone_pair: "bluetooth_le_app",
    radio_frequency_long: "rf_24ghz_transceiver",
    intervalometer_timer: "cable_programmable_lcd",
  };
  return m[t];
}

export function bestShoot(t: RemoteShutterType): string {
  const m: Record<RemoteShutterType, string> = {
    wired_cable_release: "long_exposure_macro",
    infrared_line_sight: "self_portrait_quick",
    bluetooth_phone_pair: "group_photo_selfie",
    radio_frequency_long: "wildlife_remote_hide",
    intervalometer_timer: "timelapse_astro_bulb",
  };
  return m[t];
}

export function remoteShutters(): RemoteShutterType[] {
  return ["wired_cable_release", "infrared_line_sight", "bluetooth_phone_pair", "radio_frequency_long", "intervalometer_timer"];
}
