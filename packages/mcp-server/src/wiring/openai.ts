// wiring/openai.ts
// Per-app MCP wiring for the openai connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { openaiChatCompletion, openaiCreateEmbedding, openaiGenerateImage, openaiCreateTranscription, openaiListModels } from "../openai-tool.js";

export const openaiTools = [
  // ── openai-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "openai_chat_completion",
    description: "Run a chat completion with an OpenAI model (GPT-4o, GPT-4, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        model: { type: "string", description: "Model ID, e.g. gpt-4o, gpt-4o-mini (default: gpt-4o-mini)" },
        prompt: { type: "string", description: "Convenience: single user message (alternative to messages array)" },
        system_prompt: { type: "string", description: "System instruction (used with prompt param)" },
        messages: { description: "Array of {role, content} message objects (alternative to prompt)" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
        top_p: { type: "number" },
        n: { type: "number" },
        response_format: { description: "e.g. {type: 'json_object'}" },
        seed: { type: "number" },
        org_id: { type: "string", description: "OpenAI organization ID (optional)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "openai_create_embedding",
    description: "Create vector embeddings for text using an OpenAI embedding model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        input: { description: "String or array of strings to embed" },
        model: { type: "string", description: "Embedding model (default: text-embedding-3-small)" },
        dimensions: { type: "number", description: "Number of output dimensions (for text-embedding-3-* models)" },
        org_id: { type: "string" },
      },
      required: ["api_key", "input"],
    },
  },
  {
    name: "openai_generate_image",
    description: "Generate images from a text prompt using DALL-E.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        prompt: { type: "string" },
        model: { type: "string", description: "dall-e-3 or dall-e-2 (default: dall-e-3)" },
        n: { type: "number", description: "Number of images to generate" },
        size: { type: "string", description: "1024x1024, 1792x1024, or 1024x1792 for DALL-E 3" },
        quality: { type: "string", enum: ["standard", "hd"], description: "standard or hd (DALL-E 3 only)" },
        style: { type: "string", enum: ["natural", "vivid"], description: "natural or vivid (DALL-E 3 only)" },
        response_format: { type: "string", enum: ["url", "b64_json"], description: "url or b64_json (default: url)" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "openai_create_transcription",
    description: "Transcribe audio to text using OpenAI Whisper.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        audio_url: { type: "string", description: "URL of the audio file to transcribe" },
        model: { type: "string", description: "Transcription model (default: whisper-1)" },
        language: { type: "string", description: "ISO-639-1 language code (optional)" },
        response_format: { type: "string", enum: ["json", "text", "srt", "verbose_json", "vtt"], description: "json, text, srt, verbose_json, vtt (default: json)" },
        prompt: { type: "string" },
        temperature: { type: "number" },
        filename: { type: "string" },
      },
      required: ["api_key", "audio_url"],
    },
  },
  {
    name: "openai_list_models",
    description: "List all OpenAI models available to the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const openaiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openai-tool.ts
  openai_chat_completion:      (args) => openaiChatCompletion(args),
  openai_create_embedding:     (args) => openaiCreateEmbedding(args),
  openai_generate_image:       (args) => openaiGenerateImage(args),
  openai_create_transcription: (args) => openaiCreateTranscription(args),
  openai_list_models:          (args) => openaiListModels(args),
};
