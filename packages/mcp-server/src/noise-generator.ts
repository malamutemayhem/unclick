export class NoiseGenerator {
  static white(length: number, amplitude = 1): number[] {
    return Array.from({ length }, () =>
      Math.round((Math.random() * 2 - 1) * amplitude * 10000) / 10000,
    );
  }

  static gaussian(length: number, mean = 0, stdDev = 1): number[] {
    const result: number[] = [];
    for (let i = 0; i < length; i += 2) {
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
      result.push(Math.round((z0 * stdDev + mean) * 10000) / 10000);
      if (i + 1 < length) {
        result.push(Math.round((z1 * stdDev + mean) * 10000) / 10000);
      }
    }
    return result;
  }

  static pink(length: number): number[] {
    const white = NoiseGenerator.white(length);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    return white.map(w => {
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      const val = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362;
      b6 = w * 0.115926;
      return Math.round(val * 0.11 * 10000) / 10000;
    });
  }

  static brown(length: number, step = 0.1): number[] {
    const result: number[] = [0];
    for (let i = 1; i < length; i++) {
      const delta = (Math.random() * 2 - 1) * step;
      result.push(Math.round((result[i - 1] + delta) * 10000) / 10000);
    }
    return result;
  }

  static addNoise(signal: number[], snrDb: number): number[] {
    const signalPower = signal.reduce((s, v) => s + v * v, 0) / signal.length;
    const noisePower = signalPower / Math.pow(10, snrDb / 10);
    const noiseStd = Math.sqrt(noisePower);
    const noise = NoiseGenerator.gaussian(signal.length, 0, noiseStd);
    return signal.map((v, i) => Math.round((v + noise[i]) * 10000) / 10000);
  }

  static snr(signal: number[], noisy: number[]): number {
    const signalPower = signal.reduce((s, v) => s + v * v, 0);
    const noisePower = signal.reduce((s, v, i) => s + (v - noisy[i]) ** 2, 0);
    if (noisePower === 0) return Infinity;
    return Math.round(10 * Math.log10(signalPower / noisePower) * 10000) / 10000;
  }
}
