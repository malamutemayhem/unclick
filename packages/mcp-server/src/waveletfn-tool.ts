import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Haar wavelet transform (forward and inverse).
 *
 * Forward transform decomposes a signal into averages and detail coefficients
 * at each level. Inverse reconstructs the original signal from coefficients.
 * Input length must be a power of 2.
 */
export async function haarWavelet(args: Record<string, unknown>) {
  const values = args.values;
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of numbers.");
  }
  if (values.length > 65536) {
    throw new Error("Maximum 65536 values supported.");
  }
  const n = values.length;
  if ((n & (n - 1)) !== 0) {
    throw new Error("values length must be a power of 2.");
  }
  const nums = values.map((v) => {
    const x = Number(v);
    if (!Number.isFinite(x)) throw new Error("All values must be finite numbers.");
    return x;
  });

  const inverse = args.inverse === true;
  const SQRT2 = Math.SQRT2;

  if (!inverse) {
    // Forward Haar wavelet transform
    const coeffs = nums.slice();
    let len = n;
    while (len > 1) {
      const half = len >> 1;
      const temp: number[] = [];
      for (let i = 0; i < half; i++) {
        const a = coeffs[2 * i];
        const b = coeffs[2 * i + 1];
        temp.push((a + b) / SQRT2);   // average
        temp.push((a - b) / SQRT2);   // detail
      }
      for (let i = 0; i < len; i++) {
        coeffs[i] = temp[i];
      }
      // Rearrange: averages to first half, details to second half
      const avgs: number[] = [];
      const dets: number[] = [];
      for (let i = 0; i < half; i++) {
        avgs.push(temp[2 * i]);
        dets.push(temp[2 * i + 1]);
      }
      for (let i = 0; i < half; i++) {
        coeffs[i] = avgs[i];
        coeffs[i + half] = dets[i];
      }
      len = half;
    }

    const round6 = (x: number) => Math.round(x * 1e6) / 1e6;

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use inverse=true to reconstruct the original signal",
        "Detail coefficients indicate signal variation at each scale",
      ],
    };

    return stampMeta(
      {
        direction: "forward",
        input_length: n,
        coefficients: coeffs.map(round6),
      },
      meta,
    );
  } else {
    // Inverse Haar wavelet transform
    const coeffs = nums.slice();
    let len = 1;
    while (len < n) {
      const dbl = len * 2;
      const temp = new Array(dbl);
      for (let i = 0; i < len; i++) {
        const a = coeffs[i];
        const d = coeffs[i + len];
        temp[2 * i] = (a + d) / SQRT2;
        temp[2 * i + 1] = (a - d) / SQRT2;
      }
      for (let i = 0; i < dbl; i++) {
        coeffs[i] = temp[i];
      }
      len = dbl;
    }

    const round6 = (x: number) => Math.round(x * 1e6) / 1e6;

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Forward transform can decompose the reconstructed signal again",
        "Compare reconstructed values against originals to verify round-trip",
      ],
    };

    return stampMeta(
      {
        direction: "inverse",
        input_length: n,
        reconstructed: coeffs.map(round6),
      },
      meta,
    );
  }
}
