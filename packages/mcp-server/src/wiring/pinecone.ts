// wiring/pinecone.ts
// Per-app MCP wiring for the pinecone connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { pineconeListIndexes, pineconeDescribeIndex, pineconeQueryVectors, pineconeUpsertVectors, pineconeDeleteVectors } from "../pinecone-tool.js";

export const pineconeTools = [
  // ── pinecone-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "pinecone_list_indexes",
    description: "List all Pinecone vector indexes in the project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key from app.pinecone.io" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "pinecone_describe_index",
    description: "Get details (dimension, metric, status, host) for a Pinecone index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key" },
        index_name: { type: "string", description: "Index name" },
      },
      required: ["api_key", "index_name"],
    },
  },
  {
    name: "pinecone_query_vectors",
    description: "Query a Pinecone index for nearest-neighbor vectors.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key" },
        index_host: { type: "string", description: "Index host URL from describe_index (e.g. https://my-index-xxx.svc.pinecone.io)" },
        vector: { type: "array", items: { type: "number" }, description: "Query vector (array of floats matching index dimension)" },
        top_k: { type: "number", description: "Number of nearest neighbors to return (default: 10)" },
        namespace: { type: "string", description: "Namespace to query" },
        include_metadata: { type: "boolean", description: "Include metadata in results (default: true)" },
        include_values: { type: "boolean", description: "Include vector values in results" },
        filter: { type: "object", additionalProperties: true, description: "Metadata filter object" },
      },
      required: ["api_key", "index_host", "vector"],
    },
  },
  {
    name: "pinecone_upsert_vectors",
    description: "Upsert (insert or update) vectors into a Pinecone index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key" },
        index_host: { type: "string", description: "Index host URL from describe_index" },
        vectors: { type: "array", description: "Array of {id, values, metadata?} objects to upsert", items: { type: "object", additionalProperties: true } },
        namespace: { type: "string", description: "Namespace to write to" },
      },
      required: ["api_key", "index_host", "vectors"],
    },
  },
  {
    name: "pinecone_delete_vectors",
    description: "Delete vectors from a Pinecone index by ID or filter.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key" },
        index_host: { type: "string", description: "Index host URL from describe_index" },
        ids: { type: "array", items: { type: "string" }, description: "Array of vector IDs to delete" },
        delete_all: { type: "boolean", description: "Delete all vectors in the namespace" },
        namespace: { type: "string", description: "Namespace to delete from" },
        filter: { type: "object", additionalProperties: true, description: "Metadata filter - delete matching vectors" },
      },
      required: ["api_key", "index_host"],
    },
  },
] as const;

export const pineconeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pinecone-tool.ts
  pinecone_list_indexes:   (args) => pineconeListIndexes(args),
  pinecone_describe_index: (args) => pineconeDescribeIndex(args),
  pinecone_query_vectors:  (args) => pineconeQueryVectors(args),
  pinecone_upsert_vectors: (args) => pineconeUpsertVectors(args),
  pinecone_delete_vectors: (args) => pineconeDeleteVectors(args),
};
