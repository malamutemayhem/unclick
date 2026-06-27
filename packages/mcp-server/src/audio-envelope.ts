export interface ADSRConfig {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export class ADSREnvelope {
  private config: ADSRConfig;
  private phase: "idle" | "attack" | "decay" | "sustain" | "release" = "idle";
  private time = 0;
  private level = 0;
  private releaseLevel = 0;

  constructor(config: Partial<ADSRConfig> = {}) {
    this.config = {
      attack: config.attack ?? 0.01,
      decay: config.decay ?? 0.1,
      sustain: config.sustain ?? 0.7,
      release: config.release ?? 0.3,
    };
  }

  noteOn(): void {
    this.phase = "attack";
    this.time = 0;
  }

  noteOff(): void {
    if (this.phase !== "idle") {
      this.releaseLevel = this.level;
      this.phase = "release";
      this.time = 0;
    }
  }

  process(dt: number): number {
    this.time += dt;

    switch (this.phase) {
      case "idle":
        this.level = 0;
        break;
      case "attack":
        this.level = Math.min(1, this.time / this.config.attack);
        if (this.time >= this.config.attack) {
          this.phase = "decay";
          this.time = 0;
        }
        break;
      case "decay": {
        const t = Math.min(1, this.time / this.config.decay);
        this.level = 1 - t * (1 - this.config.sustain);
        if (this.time >= this.config.decay) {
          this.phase = "sustain";
          this.level = this.config.sustain;
        }
        break;
      }
      case "sustain":
        this.level = this.config.sustain;
        break;
      case "release": {
        const t = Math.min(1, this.time / this.config.release);
        this.level = this.releaseLevel * (1 - t);
        if (this.time >= this.config.release) {
          this.phase = "idle";
          this.level = 0;
        }
        break;
      }
    }

    return this.level;
  }

  getLevel(): number {
    return this.level;
  }

  getPhase(): string {
    return this.phase;
  }

  isActive(): boolean {
    return this.phase !== "idle";
  }

  reset(): void {
    this.phase = "idle";
    this.time = 0;
    this.level = 0;
    this.releaseLevel = 0;
  }

  totalDuration(): number {
    return this.config.attack + this.config.decay + this.config.release;
  }

  getConfig(): ADSRConfig {
    return { ...this.config };
  }
}

export class MultiEnvelope {
  private envelopes: ADSREnvelope[] = [];
  private maxVoices: number;

  constructor(config: Partial<ADSRConfig> = {}, maxVoices = 8) {
    this.maxVoices = maxVoices;
    for (let i = 0; i < maxVoices; i++) {
      this.envelopes.push(new ADSREnvelope(config));
    }
  }

  noteOn(): number {
    for (let i = 0; i < this.envelopes.length; i++) {
      if (!this.envelopes[i].isActive()) {
        this.envelopes[i].noteOn();
        return i;
      }
    }
    this.envelopes[0].noteOn();
    return 0;
  }

  noteOff(voice: number): void {
    if (voice >= 0 && voice < this.envelopes.length) {
      this.envelopes[voice].noteOff();
    }
  }

  process(dt: number): number[] {
    return this.envelopes.map((e) => e.process(dt));
  }

  activeVoices(): number {
    return this.envelopes.filter((e) => e.isActive()).length;
  }

  voiceCount(): number {
    return this.maxVoices;
  }
}
