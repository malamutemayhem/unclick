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
