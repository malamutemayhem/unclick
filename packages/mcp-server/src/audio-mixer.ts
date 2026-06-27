export interface AudioTrack {
  name: string;
  samples: number[];
  volume: number;
  pan: number;
  muted: boolean;
  solo: boolean;
}

export class AudioMixer {
  private tracks: Map<string, AudioTrack> = new Map();
  private masterVolume = 1;

  addTrack(name: string, samples: number[], volume = 1, pan = 0): void {
    this.tracks.set(name, { name, samples: [...samples], volume, pan, muted: false, solo: false });
  }

  removeTrack(name: string): boolean {
    return this.tracks.delete(name);
  }

  setVolume(name: string, volume: number): void {
    const track = this.tracks.get(name);
    if (track) track.volume = Math.max(0, Math.min(volume, 2));
  }

  setPan(name: string, pan: number): void {
    const track = this.tracks.get(name);
    if (track) track.pan = Math.max(-1, Math.min(pan, 1));
  }

  mute(name: string): void {
    const track = this.tracks.get(name);
    if (track) track.muted = true;
  }

  unmute(name: string): void {
    const track = this.tracks.get(name);
    if (track) track.muted = false;
  }

  solo(name: string): void {
    const track = this.tracks.get(name);
    if (track) track.solo = true;
  }

  unsolo(name: string): void {
    const track = this.tracks.get(name);
    if (track) track.solo = false;
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(volume, 2));
  }

  mixDown(): { left: number[]; right: number[] } {
    const activeTracks = this.getActiveTracks();
    const maxLen = Math.max(0, ...activeTracks.map((t) => t.samples.length));
    const left = new Array<number>(maxLen).fill(0);
    const right = new Array<number>(maxLen).fill(0);

    for (const track of activeTracks) {
      const leftGain = track.volume * Math.cos((track.pan + 1) * Math.PI / 4);
      const rightGain = track.volume * Math.sin((track.pan + 1) * Math.PI / 4);

      for (let i = 0; i < track.samples.length; i++) {
        left[i] += track.samples[i] * leftGain;
        right[i] += track.samples[i] * rightGain;
      }
    }

    for (let i = 0; i < maxLen; i++) {
      left[i] *= this.masterVolume;
      right[i] *= this.masterVolume;
    }

    return { left, right };
  }

  mixMono(): number[] {
    const { left, right } = this.mixDown();
    return left.map((l, i) => (l + right[i]) / 2);
  }

  private getActiveTracks(): AudioTrack[] {
    const allTracks = Array.from(this.tracks.values());
    const hasSolo = allTracks.some((t) => t.solo);

    if (hasSolo) {
      return allTracks.filter((t) => t.solo && !t.muted);
    }
    return allTracks.filter((t) => !t.muted);
  }

  trackCount(): number {
    return this.tracks.size;
  }

  getTrackNames(): string[] {
    return Array.from(this.tracks.keys());
  }

  getTrack(name: string): AudioTrack | null {
    const t = this.tracks.get(name);
    return t ? { ...t, samples: [...t.samples] } : null;
  }

  peakLevel(): { left: number; right: number } {
    const { left, right } = this.mixDown();
    return {
      left: left.length > 0 ? Math.max(...left.map(Math.abs)) : 0,
      right: right.length > 0 ? Math.max(...right.map(Math.abs)) : 0,
    };
  }
}
