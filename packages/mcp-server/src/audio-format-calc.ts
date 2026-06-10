export type AudioFormat = "wav" | "flac" | "mp3" | "aac" | "ogg";

export function audioQuality(f: AudioFormat): number {
  const m: Record<AudioFormat, number> = {
    wav: 10, flac: 10, mp3: 6, aac: 7, ogg: 7,
  };
  return m[f];
}

export function fileSize(f: AudioFormat): number {
  const m: Record<AudioFormat, number> = {
    wav: 10, flac: 7, mp3: 3, aac: 3, ogg: 3,
  };
  return m[f];
}

export function compatibility(f: AudioFormat): number {
  const m: Record<AudioFormat, number> = {
    wav: 9, flac: 6, mp3: 10, aac: 8, ogg: 5,
  };
  return m[f];
}

export function streamingEfficiency(f: AudioFormat): number {
  const m: Record<AudioFormat, number> = {
    wav: 2, flac: 4, mp3: 9, aac: 10, ogg: 8,
  };
  return m[f];
}

export function editingWorkflow(f: AudioFormat): number {
  const m: Record<AudioFormat, number> = {
    wav: 10, flac: 8, mp3: 4, aac: 3, ogg: 5,
  };
  return m[f];
}

export function lossless(f: AudioFormat): boolean {
  const m: Record<AudioFormat, boolean> = {
    wav: true, flac: true, mp3: false, aac: false, ogg: false,
  };
  return m[f];
}

export function openSource(f: AudioFormat): boolean {
  const m: Record<AudioFormat, boolean> = {
    wav: false, flac: true, mp3: false, aac: false, ogg: true,
  };
  return m[f];
}

export function bestUseCase(f: AudioFormat): string {
  const m: Record<AudioFormat, string> = {
    wav: "studio_recording_mastering", flac: "archival_audiophile",
    mp3: "portable_universal", aac: "streaming_apple_ecosystem",
    ogg: "gaming_web_streaming",
  };
  return m[f];
}

export function compressionAlgorithm(f: AudioFormat): string {
  const m: Record<AudioFormat, string> = {
    wav: "uncompressed_pcm", flac: "linear_prediction",
    mp3: "psychoacoustic_mdct", aac: "advanced_psychoacoustic",
    ogg: "vorbis_mdct",
  };
  return m[f];
}

export function audioFormats(): AudioFormat[] {
  return ["wav", "flac", "mp3", "aac", "ogg"];
}
