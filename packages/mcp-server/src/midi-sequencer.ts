export interface MidiNote {
  pitch: number;
  velocity: number;
  start: number;
  duration: number;
  channel: number;
}

export interface MidiTrack {
  name: string;
  notes: MidiNote[];
  instrument: number;
}

export class MidiSequencer {
  private tracks: MidiTrack[] = [];
  private tempo = 120;
  private timeSignature = { beats: 4, unit: 4 };
  private position = 0;

  setTempo(bpm: number): void {
    this.tempo = Math.max(1, Math.min(300, bpm));
  }

  getTempo(): number {
    return this.tempo;
  }

  setTimeSignature(beats: number, unit: number): void {
    this.timeSignature = { beats, unit };
  }

  getTimeSignature(): { beats: number; unit: number } {
    return { ...this.timeSignature };
  }

  addTrack(name: string, instrument = 0): number {
    this.tracks.push({ name, notes: [], instrument });
    return this.tracks.length - 1;
  }

  addNote(trackIndex: number, pitch: number, velocity: number, start: number, duration: number, channel = 0): void {
    const track = this.tracks[trackIndex];
    if (!track) return;
    track.notes.push({
      pitch: Math.max(0, Math.min(127, pitch)),
      velocity: Math.max(0, Math.min(127, velocity)),
      start,
      duration,
      channel,
    });
  }

  getNotesAtTime(time: number): MidiNote[] {
    const result: MidiNote[] = [];
    for (const track of this.tracks) {
      for (const note of track.notes) {
        if (time >= note.start && time < note.start + note.duration) {
          result.push(note);
        }
      }
    }
    return result;
  }

  getTrack(index: number): MidiTrack | undefined {
    return this.tracks[index];
  }

  trackCount(): number {
    return this.tracks.length;
  }

  totalNotes(): number {
    return this.tracks.reduce((sum, t) => sum + t.notes.length, 0);
  }

  duration(): number {
    let max = 0;
    for (const track of this.tracks) {
      for (const note of track.notes) {
        const end = note.start + note.duration;
        if (end > max) max = end;
      }
    }
    return max;
  }

  quantize(gridSize: number): void {
    for (const track of this.tracks) {
      for (const note of track.notes) {
        note.start = Math.round(note.start / gridSize) * gridSize;
        note.duration = Math.max(gridSize, Math.round(note.duration / gridSize) * gridSize);
      }
    }
  }

  transpose(trackIndex: number, semitones: number): void {
    const track = this.tracks[trackIndex];
    if (!track) return;
    for (const note of track.notes) {
      note.pitch = Math.max(0, Math.min(127, note.pitch + semitones));
    }
  }

  beatsToSeconds(beats: number): number {
    return (beats / this.tempo) * 60;
  }

  secondsToBeats(seconds: number): number {
    return (seconds * this.tempo) / 60;
  }

  pitchToNoteName(pitch: number): string {
    const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const octave = Math.floor(pitch / 12) - 1;
    return `${names[pitch % 12]}${octave}`;
  }
}
