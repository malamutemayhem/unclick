// wiring/assemblyai.ts
// Per-app MCP wiring for the assemblyai connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { assemblyaiTranscribe, assemblyaiGetTranscript, assemblyaiListTranscripts, assemblyaiGetSentences, assemblyaiGetParagraphs, assemblyaiSummarize } from "../assemblyai-tool.js";

export const assemblyaiTools = [
  // ── assemblyai-tool.ts ────────────────────────────────────────────────────────
  {
    name: "assemblyai_transcribe",
    description: "Submit an audio or video file for transcription with AssemblyAI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key from assemblyai.com/dashboard" },
        audio_url: { type: "string", description: "Publicly accessible URL of the audio/video file" },
        language_code: { type: "string", description: "Language code (e.g. en, es, fr, de). Omit for auto-detection." },
        language_detection: { type: "boolean", description: "Enable automatic language detection" },
        speaker_labels: { type: "boolean", description: "Enable speaker diarization" },
        auto_chapters: { type: "boolean", description: "Generate auto chapters" },
        summarization: { type: "boolean", description: "Generate a summary (also set summary_type)" },
        summary_type: { type: "string", enum: ["bullets", "bullets_verbose", "gist", "headline", "paragraph"], description: "Summary format" },
        sentiment_analysis: { type: "boolean", description: "Enable sentiment analysis per sentence" },
        entity_detection: { type: "boolean", description: "Enable named entity detection" },
        punctuate: { type: "boolean", description: "Add punctuation (default: true)" },
        format_text: { type: "boolean", description: "Format text with capitalisation" },
        webhook_url: { type: "string", description: "URL to POST transcript results to when complete" },
      },
      required: ["api_key", "audio_url"],
    },
  },
  {
    name: "assemblyai_get_transcript",
    description: "Get the status and results of an AssemblyAI transcription job.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        transcript_id: { type: "string", description: "Transcript ID returned by assemblyai_transcribe" },
      },
      required: ["api_key", "transcript_id"],
    },
  },
  {
    name: "assemblyai_list_transcripts",
    description: "List recent AssemblyAI transcripts for the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        limit: { type: "number", description: "Number of transcripts to return (default: 10, max: 200)" },
        status: { type: "string", enum: ["queued", "processing", "completed", "error"], description: "Filter by status" },
        after_id: { type: "string", description: "Cursor: return transcripts after this ID" },
        before_id: { type: "string", description: "Cursor: return transcripts before this ID" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "assemblyai_get_sentences",
    description: "Get a completed transcript split into individual sentences.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        transcript_id: { type: "string", description: "Completed transcript ID" },
      },
      required: ["api_key", "transcript_id"],
    },
  },
  {
    name: "assemblyai_get_paragraphs",
    description: "Get a completed transcript split into paragraphs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        transcript_id: { type: "string", description: "Completed transcript ID" },
      },
      required: ["api_key", "transcript_id"],
    },
  },
  {
    name: "assemblyai_summarize",
    description: "Get the AI-generated summary for a completed AssemblyAI transcript (must have been submitted with summarization enabled).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        transcript_id: { type: "string", description: "Completed transcript ID" },
      },
      required: ["api_key", "transcript_id"],
    },
  },
] as const;

export const assemblyaiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // assemblyai-tool.ts
  assemblyai_transcribe:       (args) => assemblyaiTranscribe(args),
  assemblyai_get_transcript:   (args) => assemblyaiGetTranscript(args),
  assemblyai_list_transcripts: (args) => assemblyaiListTranscripts(args),
  assemblyai_get_sentences:    (args) => assemblyaiGetSentences(args),
  assemblyai_get_paragraphs:   (args) => assemblyaiGetParagraphs(args),
  assemblyai_summarize:        (args) => assemblyaiSummarize(args),
};
