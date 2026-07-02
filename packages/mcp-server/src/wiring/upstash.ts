// wiring/upstash.ts
// Per-app MCP wiring for the upstash connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Dev / Cloud

import { upstashRedisGet, upstashRedisSet, upstashRedisDel, upstashRedisListKeys, upstashRedisIncr, upstashKafkaProduce, upstashKafkaListTopics } from "../upstash-tool.js";

export const upstashTools = [
  // ── upstash-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "upstash_redis_get",
    description: "Get the value of a key from an Upstash Redis database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Upstash API key" },
        email: { type: "string", description: "Upstash account email" },
        db_id: { type: "string", description: "Redis database ID" },
        key: { type: "string", description: "Key to retrieve" },
      },
      required: ["api_key", "email", "db_id", "key"],
    },
  },
  {
    name: "upstash_redis_set",
    description: "Set a key-value pair in an Upstash Redis database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        db_id: { type: "string" },
        key: { type: "string" },
        value: { type: "string", description: "Value to store" },
        ex: { type: "number", description: "Expiry in seconds (optional)" },
      },
      required: ["api_key", "email", "db_id", "key", "value"],
    },
  },
  {
    name: "upstash_redis_del",
    description: "Delete a key from an Upstash Redis database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        db_id: { type: "string" },
        key: { type: "string" },
      },
      required: ["api_key", "email", "db_id", "key"],
    },
  },
  {
    name: "upstash_redis_list_keys",
    description: "List keys in an Upstash Redis database matching a pattern.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        db_id: { type: "string" },
        pattern: { type: "string", description: "Key pattern (default *)" },
      },
      required: ["api_key", "email", "db_id"],
    },
  },
  {
    name: "upstash_redis_incr",
    description: "Increment a numeric key in an Upstash Redis database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        db_id: { type: "string" },
        key: { type: "string" },
      },
      required: ["api_key", "email", "db_id", "key"],
    },
  },
  {
    name: "upstash_kafka_produce",
    description: "Produce messages to an Upstash Kafka topic.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        cluster_id: { type: "string" },
        topic: { type: "string" },
        messages: { type: "string", description: "JSON array of message objects [{value: '...'}]" },
      },
      required: ["api_key", "email", "cluster_id", "topic", "messages"],
    },
  },
  {
    name: "upstash_kafka_list_topics",
    description: "List all topics in an Upstash Kafka cluster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        cluster_id: { type: "string" },
      },
      required: ["api_key", "email", "cluster_id"],
    },
  },
] as const;

export const upstashHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // upstash-tool.ts
  upstash_redis_get:       (args) => upstashRedisGet(args),
  upstash_redis_set:       (args) => upstashRedisSet(args),
  upstash_redis_del:       (args) => upstashRedisDel(args),
  upstash_redis_list_keys: (args) => upstashRedisListKeys(args),
  upstash_redis_incr:      (args) => upstashRedisIncr(args),
  upstash_kafka_produce:   (args) => upstashKafkaProduce(args),
  upstash_kafka_list_topics:(args) => upstashKafkaListTopics(args),
};
