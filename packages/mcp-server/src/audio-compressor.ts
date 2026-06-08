export interface CompressorSettings {
  threshold: number;
  ratio: number;
  attack: number;
  release: number;
  makeupGain: number;
}

export class AudioCompressor {
  private settings: CompressorSettings;
  private envelope = 0;

  constructor(settings: Partial<CompressorSettings> = {}) {
    this.settings = {
      threshold: settings.threshold ?? -20,
      ratio: settings.ratio ?? 4,
      attack: settings.attack ?? 0.003,
      release: settings.release ?? 0.25,
      makeupGain: settings.makeupGain ?? 0,
    };
  }

  process(signal: number[], sampleRate: number): number[] {
    const result = new Array<number>(signal.length);
    const attackCoeff = Math.exp(-1 / (sampleRate * this.settings.attack));
    const releaseCoeff = Math.exp(-1 / (sampleRate * this.settings.release));
    const makeupLinear = AudioCompressor.dbToLinear(this.settings.makeupGain);

    for (let i = 0; i < signal.length; i++) {
      const inputDb = AudioCompressor.linearToDb(Math.abs(signal[i]));
      const gainReduction = this.computeGainReduction(inputDb);
      const targetEnv = -gainReduction;

      if (targetEnv > this.envelope) {
        this.envelope = attackCoeff * this.envelope + (1 - attackCoeff) * targetEnv;
      } else {
        this.envelope = releaseCoeff * this.envelope + (1 - releaseCoeff) * targetEnv;
      }

      const gainLinear = AudioCompressor.dbToLinear(this.envelope);
      result[i] = signal[i] * gainLinear * makeupLinear;
    }

    return result;
  }

  private computeGainReduction(inputDb: number): number {
    if (inputDb <= this.settings.threshold) return 0;
    const excess = inputDb - this.settings.threshold;
    return excess * (1 - 1 / this.settings.ratio);
  }

  static linearToDb(value: number): number {
    if (value <= 0) return -Infinity;
    return 20 * Math.log10(value);
  }

  static dbToLinear(db: number): number {
    return Math.pow(10, db / 20);
  }

  static limiter(signal: number[], ceiling: number): number[] {
    const ceilingLinear = AudioCompressor.dbToLinear(ceiling);
    return signal.map((s) => {
      const abs = Math.abs(s);
      if (abs > ceilingLinear) {
        return Math.sign(s) * ceilingLinear;
      }
      return s;
    });
  }

  static gate(signal: number[], thresholdDb: number, sampleRate: number, holdTime = 0.01): number[] {
    const thresholdLinear = AudioCompressor.dbToLinear(thresholdDb);
    const holdSamples = Math.floor(sampleRate * holdTime);
    const result = new Array<number>(signal.length);
    let holdCounter = 0;

    for (let i = 0; i < signal.length; i++) {
      if (Math.abs(signal[i]) >= thresholdLinear) {
        holdCounter = holdSamples;
      }
      result[i] = holdCounter > 0 ? signal[i] : 0;
      if (holdCounter > 0) holdCounter--;
    }

    return result;
  }

  getSettings(): CompressorSettings {
    return { ...this.settings };
  }

  setThreshold(db: number): void {
    this.settings.threshold = db;
  }

  setRatio(ratio: number): void {
    this.settings.ratio = Math.max(1, ratio);
  }

  reset(): void {
    this.envelope = 0;
  }
}
