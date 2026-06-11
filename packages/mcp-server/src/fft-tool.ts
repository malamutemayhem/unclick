import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function fftTransform(args: Record<string, unknown>) {
  const input = args.signal as number[];
  if (!Array.isArray(input) || input.length === 0) {
    throw new Error("signal must be a non-empty array of numbers.");
  }

  let n = 1;
  while (n < input.length) n *= 2;
  const re = new Array(n).fill(0);
  const im = new Array(n).fill(0);
  for (let i = 0; i < input.length; i++) re[i] = Number(input[i]);

  if (n > 65536) throw new Error("Signal length must be 65536 or fewer (after zero-padding).");

  const inverse = !!args.inverse;
  const dir = inverse ? -1 : 1;

  for (let i = 0, j = 0; i < n; i++) {
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
    let bit = n >> 1;
    while (bit & j) {
      j ^= bit;
      bit >>= 1;
    }
    j ^= bit;
  }

  for (let len = 2; len <= n; len *= 2) {
    const angle = (dir * 2 * Math.PI) / len;
    const wRe = Math.cos(angle);
    const wIm = Math.sin(angle);
    for (let i = 0; i < n; i += len) {
      let curRe = 1;
      let curIm = 0;
      for (let j = 0; j < len / 2; j++) {
        const uRe = re[i + j];
        const uIm = im[i + j];
        const vRe = re[i + j + len / 2] * curRe - im[i + j + len / 2] * curIm;
        const vIm = re[i + j + len / 2] * curIm + im[i + j + len / 2] * curRe;
        re[i + j] = uRe + vRe;
        im[i + j] = uIm + vIm;
        re[i + j + len / 2] = uRe - vRe;
        im[i + j + len / 2] = uIm - vIm;
        const tmpRe = curRe * wRe - curIm * wIm;
        curIm = curRe * wIm + curIm * wRe;
        curRe = tmpRe;
      }
    }
  }

  if (inverse) {
    for (let i = 0; i < n; i++) {
      re[i] /= n;
      im[i] /= n;
    }
  }

  const magnitudes = re.map((r, i) =>
    Math.round(Math.sqrt(r * r + im[i] * im[i]) * 1e8) / 1e8,
  );

  const roundedRe = re.map((v) => Math.round(v * 1e8) / 1e8);
  const roundedIm = im.map((v) => Math.round(v * 1e8) / 1e8);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Magnitudes show frequency strength", "Set inverse=true to reconstruct signal from spectrum"],
  };
  return stampMeta(
    {
      real: roundedRe,
      imaginary: roundedIm,
      magnitudes,
      input_length: input.length,
      padded_length: n,
      inverse,
    },
    meta,
  );
}
