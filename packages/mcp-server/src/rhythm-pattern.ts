export interface Beat {
  onset: number;
  duration: number;
  velocity: number;
}

export class RhythmPattern {
  beats: Beat[];
  bpm: number;

  constructor(bpm = 120) {
    this.bpm = bpm;
    this.beats = [];
  }

  addBeat(onset: number, duration: number, velocity = 1): void {
    this.beats.push({ onset, duration, velocity });
  }

  static fromString(pattern: string, subdivision = 0.25): RhythmPattern {
    const rp = new RhythmPattern();
    let pos = 0;
    for (const ch of pattern) {
      if (ch === "x" || ch === "X") {
        rp.addBeat(pos, subdivision, ch === "X" ? 1 : 0.7);
      }
      pos += subdivision;
    }
    return rp;
  }

  toString(subdivision = 0.25): string {
    const len = Math.ceil(this.totalDuration() / subdivision);
    const chars: string[] = new Array(len).fill(".");
    for (const beat of this.beats) {
      const idx = Math.round(beat.onset / subdivision);
      if (idx < len) chars[idx] = beat.velocity >= 1 ? "X" : "x";
    }
    return chars.join("");
  }

  totalDuration(): number {
    if (this.beats.length === 0) return 0;
    return Math.max(...this.beats.map(b => b.onset + b.duration));
  }

  density(): number {
    const dur = this.totalDuration();
    if (dur === 0) return 0;
    return Math.round((this.beats.length / (dur * 4)) * 10000) / 10000;
  }

  euclidean(pulses: number, steps: number): void {
    this.beats = [];
    const pattern: boolean[] = [];
    let bucket = 0;
    for (let i = 0; i < steps; i++) {
      bucket += pulses;
      if (bucket >= steps) {
        bucket -= steps;
        pattern.push(true);
      } else {
        pattern.push(false);
      }
    }
    const sub = 1 / steps;
    pattern.forEach((hit, i) => {
      if (hit) this.addBeat(i * sub, sub);
    });
  }

  shift(amount: number): void {
    for (const beat of this.beats) {
      beat.onset += amount;
    }
  }

  reverse(): void {
    const dur = this.totalDuration();
    for (const beat of this.beats) {
      beat.onset = dur - beat.onset - beat.duration;
    }
    this.beats.reverse();
  }

  merge(other: RhythmPattern): RhythmPattern {
    const rp = new RhythmPattern(this.bpm);
    for (const b of this.beats) rp.addBeat(b.onset, b.duration, b.velocity);
    for (const b of other.beats) rp.addBeat(b.onset, b.duration, b.velocity);
    rp.beats.sort((a, b) => a.onset - b.onset);
    return rp;
  }

  repeat(times: number): RhythmPattern {
    const rp = new RhythmPattern(this.bpm);
    const dur = this.totalDuration();
    for (let t = 0; t < times; t++) {
      for (const b of this.beats) {
        rp.addBeat(b.onset + t * dur, b.duration, b.velocity);
      }
    }
    return rp;
  }

  beatCount(): number {
    return this.beats.length;
  }
}
