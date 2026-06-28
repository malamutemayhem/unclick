import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const MCP_OAUTH_ISSUER = "https://unclick.world";
export const MCP_OAUTH_RESOURCE = "https://unclick.world/api/mcp";
export const MCP_OAUTH_SCOPE = "unclick:mcp";
export const MCP_OAUTH_PROTECTED_RESOURCE_METADATA_URL =
  "https://unclick.world/.well-known/oauth-protected-resource/api/mcp";
export const MCP_OAUTH_AUTHORIZATION_ENDPOINT = "https://unclick.world/mcp/authorize";
export const MCP_OAUTH_TOKEN_ENDPOINT = "https://unclick.world/api/mcp/oauth/token";
export const MCP_OAUTH_REGISTRATION_ENDPOINT = "https://unclick.world/api/mcp/oauth/register";

const ACCESS_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30;
const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 90;
const AUTH_CODE_TTL_SECONDS = 10 * 60;
const CLIENT_REGISTRATION_TTL_SECONDS = 60 * 60 * 24;
const CLIENT_ID_PREFIX = "unclick-mcp-";
export const MCP_OAUTH_MAX_REDIRECT_URI_LENGTH = 2048;

type McpOAuthTokenKind = "code" | "access" | "refresh";

export interface McpOAuthTokenPayload {
  aud: string;
  client_id?: string;
  code_challenge?: string;
  code_challenge_method?: "S256";
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  kind: McpOAuthTokenKind;
  redirect_uri?: string;
  scope: string;
  sub: string;
  v: 1;
}

export interface McpOAuthClientRegistrationPayload {
  client_name: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  kind: "client";
  redirect_uris: string[];
  v: 1;
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

function base64UrlEncode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signingSecret(env: NodeJS.ProcessEnv): string {
  const secret =
    env.MCP_OAUTH_SIGNING_SECRET ??
    env.UNCLICK_OAUTH_SIGNING_SECRET ??
    env.SUPABASE_SERVICE_ROLE_KEY ??
    "";
  if (!secret) throw new Error("MCP OAuth signing secret is not configured.");
  return secret;
}

function signPayload(encodedPayload: string, env: NodeJS.ProcessEnv): string {
  return createHmac("sha256", signingSecret(env)).update(encodedPayload, "utf8").digest("base64url");
}

function createSignedToken(
  input: Omit<McpOAuthTokenPayload, "aud" | "exp" | "iat" | "iss" | "jti" | "v"> & {
    ttlSeconds: number;
  },
  env: NodeJS.ProcessEnv,
): string {
  const iat = nowSeconds();
  const payload: McpOAuthTokenPayload = {
    aud: MCP_OAUTH_RESOURCE,
    exp: iat + input.ttlSeconds,
    iat,
    iss: MCP_OAUTH_ISSUER,
    jti: randomBytes(16).toString("base64url"),
    kind: input.kind,
    scope: normalizeMcpOAuthScope(input.scope),
    sub: input.sub,
    v: 1,
    ...(input.client_id ? { client_id: input.client_id } : {}),
    ...(input.redirect_uri ? { redirect_uri: input.redirect_uri } : {}),
    ...(input.code_challenge ? { code_challenge: input.code_challenge } : {}),
    ...(input.code_challenge_method ? { code_challenge_method: input.code_challenge_method } : {}),
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return `${encodedPayload}.${signPayload(encodedPayload, env)}`;
}

export function createMcpOAuthClientId(input: {
  clientName?: string;
  redirectUris?: string[];
}, env: NodeJS.ProcessEnv): { client_id: string; client_id_issued_at: number } {
  const iat = nowSeconds();
  const payload: McpOAuthClientRegistrationPayload = {
    client_name: (input.clientName?.trim() || "MCP client").slice(0, 120),
    exp: iat + CLIENT_REGISTRATION_TTL_SECONDS,
    iat,
    iss: MCP_OAUTH_ISSUER,
    jti: randomBytes(16).toString("base64url"),
    kind: "client",
    redirect_uris: input.redirectUris ?? [],
    v: 1,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return {
    client_id: `${CLIENT_ID_PREFIX}${encodedPayload}.${signPayload(encodedPayload, env)}`,
    client_id_issued_at: iat,
  };
}

export function verifyMcpOAuthClientId(
  clientId: string,
  env: NodeJS.ProcessEnv,
  now = nowSeconds(),
): McpOAuthClientRegistrationPayload | null {
  if (!clientId.startsWith(CLIENT_ID_PREFIX)) return null;
  const token = clientId.slice(CLIENT_ID_PREFIX.length);
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) throw new Error("Invalid MCP OAuth client registration.");

  let payload: McpOAuthClientRegistrationPayload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload)) as McpOAuthClientRegistrationPayload;
  } catch {
    throw new Error("Invalid MCP OAuth client registration.");
  }

  if (
    payload.v !== 1 ||
    payload.kind !== "client" ||
    payload.iss !== MCP_OAUTH_ISSUER ||
    typeof payload.client_name !== "string" ||
    typeof payload.exp !== "number" ||
    !Array.isArray(payload.redirect_uris) ||
    payload.redirect_uris.some((uri) => typeof uri !== "string")
  ) {
    throw new Error("Invalid MCP OAuth client registration.");
  }

  const expectedSignature = signPayload(encodedPayload, env);
  const actual = Buffer.from(signature, "utf8");
  const expected = Buffer.from(expectedSignature, "utf8");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new Error("MCP OAuth client registration signature mismatch.");
  }

  if (payload.exp < now) throw new Error("MCP OAuth client registration expired.");
  return payload;
}

export function validateRegisteredRedirectUri(clientId: string, redirectUri: string, env: NodeJS.ProcessEnv): boolean {
  const registration = verifyMcpOAuthClientId(clientId, env);
  if (!registration) return true;
  return registration.redirect_uris.length === 0 || registration.redirect_uris.includes(redirectUri);
}

export function verifyMcpOAuthToken(
  token: string,
  expectedKind: McpOAuthTokenKind,
  env: NodeJS.ProcessEnv,
  now = nowSeconds(),
): McpOAuthTokenPayload {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) throw new Error("Invalid MCP OAuth token.");

  let payload: McpOAuthTokenPayload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload)) as McpOAuthTokenPayload;
  } catch {
    throw new Error("Invalid MCP OAuth token.");
  }

  if (
    payload.v !== 1 ||
    payload.kind !== expectedKind ||
    payload.iss !== MCP_OAUTH_ISSUER ||
    payload.aud !== MCP_OAUTH_RESOURCE ||
    typeof payload.sub !== "string" ||
    typeof payload.exp !== "number" ||
    typeof payload.scope !== "string"
  ) {
    throw new Error("Invalid MCP OAuth token.");
  }

  const expectedSignature = signPayload(encodedPayload, env);
  const actual = Buffer.from(signature, "utf8");
  const expected = Buffer.from(expectedSignature, "utf8");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new Error("MCP OAuth token signature mismatch.");
  }

  if (payload.exp < now) throw new Error("MCP OAuth token expired.");
  return payload;
}

export function createMcpOAuthAuthorizationCode(input: {
  clientId: string;
  codeChallenge: string;
  redirectUri: string;
  scope?: string;
  userId: string;
}, env: NodeJS.ProcessEnv): string {
  return createSignedToken(
    {
      client_id: input.clientId,
      code_challenge: input.codeChallenge,
      code_challenge_method: "S256",
      kind: "code",
      redirect_uri: input.redirectUri,
      scope: input.scope ?? MCP_OAUTH_SCOPE,
      sub: input.userId,
      ttlSeconds: AUTH_CODE_TTL_SECONDS,
    },
    env,
  );
}

export function createMcpOAuthAccessToken(input: {
  scope?: string;
  userId: string;
}, env: NodeJS.ProcessEnv): { access_token: string; expires_in: number } {
  return {
    access_token: createSignedToken(
      {
        kind: "access",
        scope: input.scope ?? MCP_OAUTH_SCOPE,
        sub: input.userId,
        ttlSeconds: ACCESS_TOKEN_TTL_SECONDS,
      },
      env,
    ),
    expires_in: ACCESS_TOKEN_TTL_SECONDS,
  };
}

export function createMcpOAuthRefreshToken(input: {
  scope?: string;
  userId: string;
}, env: NodeJS.ProcessEnv): { refresh_token: string } {
  return {
    refresh_token: createSignedToken(
      {
        kind: "refresh",
        scope: input.scope ?? MCP_OAUTH_SCOPE,
        sub: input.userId,
        ttlSeconds: REFRESH_TOKEN_TTL_SECONDS,
      },
      env,
    ),
  };
}

export function normalizeMcpOAuthScope(scope?: string): string {
  const parts = String(scope ?? "")
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.includes(MCP_OAUTH_SCOPE) ? parts.join(" ") : [MCP_OAUTH_SCOPE, ...parts].join(" ");
}

export function isSafeOAuthRedirectUri(value: unknown): value is string {
  if (typeof value !== "string" || !value) return false;
  if (value.length > MCP_OAUTH_MAX_REDIRECT_URI_LENGTH) return false;
  try {
    const url = new URL(value);
    if (url.protocol === "https:") return true;
    if (url.protocol !== "http:") return false;
    return ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  } catch {
    return false;
  }
}

export function verifyPkceS256(codeVerifier: string, codeChallenge: string): boolean {
  if (!codeVerifier || !codeChallenge) return false;
  const digest = createHash("sha256").update(codeVerifier, "utf8").digest("base64url");
  return digest === codeChallenge;
}

export function appendOAuthResponseParams(
  redirectUri: string,
  params: Record<string, string | undefined>,
): string {
  const url = new URL(redirectUri);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, value);
  }
  return url.toString();
}

export function protectedResourceMetadata() {
  return {
    resource: MCP_OAUTH_RESOURCE,
    authorization_servers: [MCP_OAUTH_ISSUER],
    bearer_methods_supported: ["header"],
    scopes_supported: [MCP_OAUTH_SCOPE],
    resource_documentation: "https://unclick.world/docs",
  };
}

export function authorizationServerMetadata() {
  return {
    issuer: MCP_OAUTH_ISSUER,
    authorization_endpoint: MCP_OAUTH_AUTHORIZATION_ENDPOINT,
    token_endpoint: MCP_OAUTH_TOKEN_ENDPOINT,
    registration_endpoint: MCP_OAUTH_REGISTRATION_ENDPOINT,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
    scopes_supported: [MCP_OAUTH_SCOPE],
    authorization_response_iss_parameter_supported: true,
  };
}

export function mcpOAuthWwwAuthenticate(error?: string): string {
  const params = [
    `realm="mcp"`,
    `resource_metadata="${MCP_OAUTH_PROTECTED_RESOURCE_METADATA_URL}"`,
    `scope="${MCP_OAUTH_SCOPE}"`,
  ];
  if (error) params.push(`error="${error}"`);
  return `Bearer ${params.join(", ")}`;
}
