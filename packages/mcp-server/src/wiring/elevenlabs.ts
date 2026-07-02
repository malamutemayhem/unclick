// wiring/elevenlabs.ts
// Per-app MCP wiring for the elevenlabs connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { elevenlabsListVoices, elevenlabsGetVoice, elevenlabsTextToSpeech, elevenlabsGetModels, elevenlabsGetHistory } from "../elevenlabs-tool.js";

export const elevenlabsTools = [
  // ── elevenlabs-tool.ts ────────────────────────────────────────────────────────
  {
    name: "elevenlabs_list_voices",
    description: "List all available voices in ElevenLabs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "elevenlabs_get_voice",
    description: "Get metadata for a specific ElevenLabs voice by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        voice_id: { type: "string" },
        with_settings: { type: "boolean", description: "Include voice settings (stability, similarity_boost)" },
      },
      required: ["api_key", "voice_id"],
    },
  },
  {
    name: "elevenlabs_text_to_speech",
    description: "Convert text to speech with a selected ElevenLabs voice. Returns base64-encoded audio.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        voice_id: { type: "string" },
        text: { type: "string", description: "Text to synthesize (max 5000 characters)" },
        model_id: { type: "string", description: "ElevenLabs model ID (default: eleven_monolingual_v1)" },
        output_format: { type: "string", description: "mp3_44100_128, pcm_16000, etc. (default: mp3_44100_128)" },
        stability: { type: "number", description: "0.0-1.0 (default: 0.5)" },
        similarity_boost: { type: "number", description: "0.0-1.0 (default: 0.75)" },
        style: { type: "number", description: "0.0-1.0 style exaggeration" },
        use_speaker_boost: { type: "boolean" },
      },
      required: ["api_key", "voice_id", "text"],
    },
  },
  {
    name: "elevenlabs_get_models",
    description: "List available ElevenLabs TTS models and their supported languages.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "elevenlabs_get_history",
    description: "Get the TTS generation history for an ElevenLabs account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        page_size: { type: "number" },
        voice_id: { type: "string", description: "Filter history by voice ID" },
        start_after_history_item_id: { type: "string" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const elevenlabsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // elevenlabs-tool.ts
  elevenlabs_list_voices:      (args) => elevenlabsListVoices(args),
  elevenlabs_get_voice:        (args) => elevenlabsGetVoice(args),
  elevenlabs_text_to_speech:   (args) => elevenlabsTextToSpeech(args),
  elevenlabs_get_models:       (args) => elevenlabsGetModels(args),
  elevenlabs_get_history:      (args) => elevenlabsGetHistory(args),
};
