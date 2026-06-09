export type WaveType = "sine" | "square" | "triangle" | "sawtooth";

export function generateWave(type: WaveType, frequency: number, sampleRate: number, duration: number): Float64Array {
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float64Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const phase = (frequency * t) % 1;
    switch (type) {
      case "sine":
        samples[i] = Math.sin(2 * Math.PI * frequency * t);
        break;
      case "square":
        samples[i] = phase < 0.5 ? 1 : -1;
        break;
      case "triangle":
        samples[i] = 1 - 4 * Math.abs(phase - 0.5);
        break;
      case "sawtooth":
        samples[i] = 2 * phase - 1;
        break;
    }
  }
  return samples;
}

export function mixSignals(signals: Float64Array[], gains?: number[]): Float64Array {
  if (signals.length === 0) return new Float64Array(0);
  const len = Math.max(...signals.map(s => s.length));
  const out = new Float64Array(len);
  for (let i = 0; i < signals.length; i++) {
    const g = gains ? (gains[i] ?? 1) : 1;
    for (let j = 0; j < signals[i].length; j++) {
      out[j] += signals[i][j] * g;
    }
  }
  return out;
}

export function applyEnvelope(signal: Float64Array, attack: number, decay: number, sustain: number, release: number, sampleRate: number): Float64Array {
  const out = new Float64Array(signal.length);
  const attackSamples = Math.floor(attack * sampleRate);
  const decaySamples = Math.floor(decay * sampleRate);
  const releaseSamples = Math.floor(release * sampleRate);
  const sustainEnd = signal.length - releaseSamples;

  for (let i = 0; i < signal.length; i++) {
    let env: number;
    if (i < attackSamples) {
      env = i / attackSamples;
    } else if (i < attackSamples + decaySamples) {
      const t = (i - attackSamples) / decaySamples;
      env = 1 - t * (1 - sustain);
    } else if (i < sustainEnd) {
      env = sustain;
    } else {
      const t = (i - sustainEnd) / releaseSamples;
      env = sustain * (1 - t);
    }
    out[i] = signal[i] * Math.max(0, env);
  }
  return out;
}

export function normalize(signal: Float64Array): Float64Array {
  let peak = 0;
  for (let i = 0; i < signal.length; i++) {
    const abs = Math.abs(signal[i]);
    if (abs > peak) peak = abs;
  }
  if (peak === 0) return new Float64Array(signal.length);
  const out = new Float64Array(signal.length);
  for (let i = 0; i < signal.length; i++) {
    out[i] = signal[i] / peak;
  }
  return out;
}

export function rms(signal: Float64Array): number {
  if (signal.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < signal.length; i++) sum += signal[i] * signal[i];
  return Math.sqrt(sum / signal.length);
}

export function lowPassFilter(signal: Float64Array, cutoff: number, sampleRate: number): Float64Array {
  const rc = 1 / (2 * Math.PI * cutoff);
  const dt = 1 / sampleRate;
  const alpha = dt / (rc + dt);
  const out = new Float64Array(signal.length);
  out[0] = signal[0];
  for (let i = 1; i < signal.length; i++) {
    out[i] = out[i - 1] + alpha * (signal[i] - out[i - 1]);
  }
  return out;
}

export function highPassFilter(signal: Float64Array, cutoff: number, sampleRate: number): Float64Array {
  const rc = 1 / (2 * Math.PI * cutoff);
  const dt = 1 / sampleRate;
  const alpha = rc / (rc + dt);
  const out = new Float64Array(signal.length);
  out[0] = signal[0];
  for (let i = 1; i < signal.length; i++) {
    out[i] = alpha * (out[i - 1] + signal[i] - signal[i - 1]);
  }
  return out;
}

export function delay(signal: Float64Array, delaySamples: number, feedback = 0.5, mix = 0.5): Float64Array {
  const out = new Float64Array(signal.length);
  for (let i = 0; i < signal.length; i++) {
    const delayed = i >= delaySamples ? out[i - delaySamples] : 0;
    out[i] = signal[i] + delayed * feedback;
  }
  const mixed = new Float64Array(signal.length);
  for (let i = 0; i < signal.length; i++) {
    mixed[i] = signal[i] * (1 - mix) + out[i] * mix;
  }
  return mixed;
}
