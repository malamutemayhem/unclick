import { stampMeta, ConnectorMeta } from "./connector-meta.js";

const SPEED_OF_LIGHT = 299792458;

const SPECTRUM: { name: string; min: number; max: number }[] = [
  { name: "gamma ray", min: 0, max: 1e-11 },
  { name: "x-ray", min: 1e-11, max: 1e-8 },
  { name: "ultraviolet", min: 1e-8, max: 3.8e-7 },
  { name: "visible light", min: 3.8e-7, max: 7.5e-7 },
  { name: "infrared", min: 7.5e-7, max: 1e-3 },
  { name: "microwave", min: 1e-3, max: 1 },
  { name: "radio wave", min: 1, max: Infinity },
];

export async function wavelengthConvert(args: Record<string, unknown>) {
  const wavelength_m = typeof args.wavelength_m === "number" ? args.wavelength_m : undefined;
  const frequency_hz = typeof args.frequency_hz === "number" ? args.frequency_hz : undefined;

  if (wavelength_m === undefined && frequency_hz === undefined) {
    return { error: "Provide either wavelength_m (meters) or frequency_hz (hertz)" };
  }

  let wl: number;
  let freq: number;
  if (wavelength_m !== undefined) {
    if (wavelength_m <= 0) return { error: "wavelength_m must be positive" };
    wl = wavelength_m;
    freq = SPEED_OF_LIGHT / wl;
  } else {
    if (frequency_hz! <= 0) return { error: "frequency_hz must be positive" };
    freq = frequency_hz!;
    wl = SPEED_OF_LIGHT / freq;
  }

  const h = 6.62607015e-34;
  const energy_j = h * freq;
  const energy_ev = energy_j / 1.602176634e-19;

  const band = SPECTRUM.find((s) => wl >= s.min && wl < s.max);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["E = hf (photon energy)", "c = wavelength * frequency"],
  };
  return stampMeta({
    wavelength_m: +wl.toExponential(6),
    wavelength_nm: +(wl * 1e9).toFixed(4),
    frequency_hz: +freq.toExponential(6),
    frequency_thz: +(freq / 1e12).toFixed(6),
    energy_joules: +energy_j.toExponential(6),
    energy_ev: +energy_ev.toExponential(6),
    spectrum_band: band ? band.name : "unknown",
  }, meta);
}
