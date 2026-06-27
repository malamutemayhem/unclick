export type AudioCableType = "rca_analog" | "xlr_balanced" | "optical_toslink" | "speaker_wire_gauge" | "usb_digital_audio";

export function signalQuality(t: AudioCableType): number {
  const m: Record<AudioCableType, number> = {
    rca_analog: 6, xlr_balanced: 10, optical_toslink: 8, speaker_wire_gauge: 7, usb_digital_audio: 9,
  };
  return m[t];
}

export function noiseRejection(t: AudioCableType): number {
  const m: Record<AudioCableType, number> = {
    rca_analog: 4, xlr_balanced: 10, optical_toslink: 10, speaker_wire_gauge: 3, usb_digital_audio: 8,
  };
  return m[t];
}

export function maxRunLength(t: AudioCableType): number {
  const m: Record<AudioCableType, number> = {
    rca_analog: 5, xlr_balanced: 10, optical_toslink: 4, speaker_wire_gauge: 8, usb_digital_audio: 3,
  };
  return m[t];
}

export function flexibility(t: AudioCableType): number {
  const m: Record<AudioCableType, number> = {
    rca_analog: 8, xlr_balanced: 6, optical_toslink: 3, speaker_wire_gauge: 7, usb_digital_audio: 9,
  };
  return m[t];
}

export function cableCost(t: AudioCableType): number {
  const m: Record<AudioCableType, number> = {
    rca_analog: 2, xlr_balanced: 5, optical_toslink: 3, speaker_wire_gauge: 2, usb_digital_audio: 4,
  };
  return m[t];
}

export function digitalSignal(t: AudioCableType): boolean {
  const m: Record<AudioCableType, boolean> = {
    rca_analog: false, xlr_balanced: false, optical_toslink: true, speaker_wire_gauge: false, usb_digital_audio: true,
  };
  return m[t];
}

export function lockingConnector(t: AudioCableType): boolean {
  const m: Record<AudioCableType, boolean> = {
    rca_analog: false, xlr_balanced: true, optical_toslink: false, speaker_wire_gauge: false, usb_digital_audio: false,
  };
  return m[t];
}

export function connectorType(t: AudioCableType): string {
  const m: Record<AudioCableType, string> = {
    rca_analog: "rca_phono_plug",
    xlr_balanced: "3_pin_xlr_cannon",
    optical_toslink: "fiber_optic_square_tip",
    speaker_wire_gauge: "bare_wire_banana_plug",
    usb_digital_audio: "usb_b_or_c_async",
  };
  return m[t];
}

export function bestUse(t: AudioCableType): string {
  const m: Record<AudioCableType, string> = {
    rca_analog: "home_stereo_turntable",
    xlr_balanced: "studio_mic_monitor",
    optical_toslink: "tv_soundbar_digital",
    speaker_wire_gauge: "amp_to_passive_speaker",
    usb_digital_audio: "computer_dac_interface",
  };
  return m[t];
}

export function audioCables(): AudioCableType[] {
  return ["rca_analog", "xlr_balanced", "optical_toslink", "speaker_wire_gauge", "usb_digital_audio"];
}
