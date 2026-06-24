// Public surface of the discovery sensor core.

export type {
  CapturedExchange,
  FieldType,
  SchemaNode,
  Shape,
} from "./types.js";
export {
  extractShape,
  inferSchema,
  looksLikeId,
  mergeSchemas,
  templatePath,
} from "./shape.js";
export type { ConnectorDraft, Operation } from "./connector-draft.js";
export {
  classifyOperation,
  draftConnector,
  endpointKey,
} from "./connector-draft.js";
export type { PrivacyTier, SiteSetting } from "./privacy.js";
export {
  canPromoteToPublic,
  canShareToPublic,
  DEFAULT_TIER,
  isPublicPromotable,
  K_ANONYMITY_THRESHOLD,
  shouldCapture,
} from "./privacy.js";

// Day-one features
export type { RedactionReport } from "./redaction-report.js";
export { describeRedaction } from "./redaction-report.js";
export type {
  JsonRpcCall,
  McpRequest,
  MemoryCategory,
  SaveFactInput,
} from "./memory.js";
export {
  buildMcpRequest,
  buildSaveFactRpc,
  composeFact,
  DEFAULT_MCP_ENDPOINT,
  FACT_MAX_LEN,
} from "./memory.js";
export type {
  ConnectionLike,
  ConnectionsSummary,
  SignalsLike,
} from "./status.js";
export {
  badgeText,
  summarizeConnections,
  summarizeSignals,
} from "./status.js";
export type { Coverage, LearnContext } from "./coverage.js";
export {
  coverageForHost,
  coverageLabel,
  shouldOfferLearn,
} from "./coverage.js";
