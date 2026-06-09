import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Goertzel algorithm - efficiently computes a single DFT bin.
 *
 * Given an array of real-valued samples and a target frequency bin index,
 * computes the magnitude, phase, and complex components of that specific
 * DFT bin without computing the full FFT.
 *
 * Runs in O(N) time with O(1) space.
 */
export async function goertzel(args: Record<string, unknown>) {
  const samples = args.samples as number[];
  const bin = args.bin as number;

  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("samples must be a non-empty array of numbers");
  }
  if (samples.length > 1_000_000) {
    throw new Error("samples must have at most 1,000,000 elements");
  }
  for (let i = 0; i < samples.length; i++) {
    if (typeof samples[i] !== "number" || !isFinite(samples[i])) {
      throw new Error("all samples must be finite numbers");
    }
  }
  if (!Number.isInteger(bin) || bin < 0 || bin >= samples.length) {
    throw new Error("bin must be an integer in [0, samples.length)");
  }

  const N = samples.length;
  const omega = (2 * Math.PI * bin) / N;
  const coeff = 2 * Math.cos(omega);

  let s0 = 0;
  let s1 = 0;
  let s2 = 0;

  for (let i = 0; i < N; i++) {
    s0 = samples[i] + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }

  // Final complex value: X[k] = s1 - s2 * e^(-j*omega)
  const real = s1 - s2 * Math.cos(omega);
  const imaginary = s2 * Math.sin(omega);
  const magnitude = Math.sqrt(real * real + imaginary * imaginary);
  const phase = Math.atan2(imaginary, real);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Magnitude indicates signal strength at the target frequency bin",
      "Use multiple bin queries to build a partial spectrum without a full FFT",
    ],
  };

  return stampMeta(
    {
      bin,
      sample_count: N,
      magnitude,
      phase,
      real,
      imaginary,
    },
    meta,
  );
}
