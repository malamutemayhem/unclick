export interface PitchResult {
  frequency: number;
  note: string;
  octave: number;
  cents: number;
  confidence: number;
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export class PitchDetector {
  static autocorrelation(signal: number[], sampleRate: number, minFreq = 50, maxFreq = 2000): PitchResult {
    const minPeriod = Math.floor(sampleRate / maxFreq);
    const maxPeriod = Math.floor(sampleRate / minFreq);

    let bestPeriod = 0;
    let bestCorrelation = -1;

    for (let period = minPeriod; period <= Math.min(maxPeriod, signal.length / 2); period++) {
      let correlation = 0;
      let norm1 = 0;
      let norm2 = 0;
      const len = signal.length - period;

      for (let i = 0; i < len; i++) {
        correlation += signal[i] * signal[i + period];
        norm1 += signal[i] * signal[i];
        norm2 += signal[i + period] * signal[i + period];
      }

      const normalizedCorr = norm1 > 0 && norm2 > 0 ? correlation / Math.sqrt(norm1 * norm2) : 0;

      if (normalizedCorr > bestCorrelation) {
        bestCorrelation = normalizedCorr;
        bestPeriod = period;
      }
    }

    const frequency = bestPeriod > 0 ? sampleRate / bestPeriod : 0;
    const noteInfo = PitchDetector.frequencyToNote(frequency);

    return {
      frequency,
      note: noteInfo.note,
      octave: noteInfo.octave,
      cents: noteInfo.cents,
      confidence: Math.max(0, bestCorrelation),
    };
  }

  static frequencyToNote(frequency: number): { note: string; octave: number; cents: number } {
    if (frequency <= 0) return { note: "?", octave: 0, cents: 0 };

    const semitones = 12 * Math.log2(frequency / 440);
    const roundedSemitones = Math.round(semitones);
    const cents = Math.round((semitones - roundedSemitones) * 100);
    const noteIndex = ((roundedSemitones % 12) + 12 + 9) % 12;
    const octave = Math.floor((roundedSemitones + 9) / 12) + 4;

    return { note: NOTE_NAMES[noteIndex], octave, cents };
  }

  static noteToFrequency(note: string, octave: number): number {
    const noteIndex = NOTE_NAMES.indexOf(note);
    if (noteIndex < 0) throw new Error(`Unknown note: ${note}`);
    const semitones = (octave - 4) * 12 + (noteIndex - 9);
    return 440 * Math.pow(2, semitones / 12);
  }

  static midiToFrequency(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  static frequencyToMidi(frequency: number): number {
    return Math.round(69 + 12 * Math.log2(frequency / 440));
  }

  static interval(freq1: number, freq2: number): number {
    return 12 * Math.log2(freq2 / freq1);
  }

  static harmonics(fundamental: number, count: number): number[] {
    return Array.from({ length: count }, (_, i) => fundamental * (i + 1));
  }

  static isOctave(freq1: number, freq2: number, tolerance = 0.5): boolean {
    const ratio = freq2 / freq1;
    const octaves = Math.log2(ratio);
    return Math.abs(octaves - Math.round(octaves)) < tolerance / 12;
  }
}
