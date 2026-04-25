-- Seed starter TestPass packs as system packs (owner_user_id NULL).
-- System packs are visible to every signed-in user via the
-- testpass_packs_read RLS policy from 20260421040000_testpass_schema.sql.
--
-- Idempotent: re-running this migration is a no-op once the slugs exist.
-- The yaml jsonb mirrors packages/testpass/packs/testpass-core.yaml so the
-- runner can also read the pack from disk for deterministic and agent runs.

insert into testpass_packs (slug, name, version, description, yaml, owner_user_id)
values (
  'testpass-core',
  'TestPass Core v0',
  '0.1.0',
  'Use this when you want to smoke-test an MCP server. Twelve checks: six on JSON-RPC 2.0 wire format and six on the MCP startup handshake. Run it the first time you point TestPass at any MCP endpoint.',
  $pack$
{
  "id": "testpass-core",
  "name": "TestPass Core v0",
  "version": "0.1.0",
  "description": "Baseline conformance checks for MCP servers. Covers JSON-RPC 2.0 wire-protocol correctness (deterministic) and MCP lifecycle compliance (agent-assisted). No LLM calls required for the RPC items.\n",
  "items": [
    {
      "id": "RPC-001",
      "title": "Request must include jsonrpc field set to \"2.0\"",
      "category": "json-rpc",
      "severity": "critical",
      "check_type": "deterministic",
      "description": "Every request object must contain the field \"jsonrpc\" with the exact string value \"2.0\".",
      "expected": { "field": "jsonrpc", "value": "2.0" },
      "on_fail": "Set the framework or handler to emit jsonrpc: \"2.0\" on every request. Most MCP libraries do this for you, so check that you have not overridden the request builder.",
      "tags": ["wire-protocol", "mandatory"],
      "profiles": ["smoke", "standard", "deep"]
    },
    {
      "id": "RPC-002",
      "title": "Request must include an id field (non-null for requests expecting a response)",
      "category": "json-rpc",
      "severity": "high",
      "check_type": "deterministic",
      "description": "Request objects that expect a response must carry an id (string, number, or null). Notifications omit id.",
      "on_fail": "Make sure every request you expect a reply for sets an id. If you only need fire-and-forget, use a notification (no id) instead.",
      "tags": ["wire-protocol", "mandatory"],
      "profiles": ["smoke", "standard", "deep"]
    },
    {
      "id": "RPC-003",
      "title": "Error response must include code and message fields",
      "category": "json-rpc",
      "severity": "high",
      "check_type": "deterministic",
      "description": "When a method call fails, the error object must contain integer code and string message.",
      "expected": { "error_shape": { "code": "integer", "message": "string" } },
      "on_fail": "Wrap server errors so the response always includes a numeric code and a string message. Add a default catch-all that produces a valid error object instead of letting raw exceptions through.",
      "tags": ["wire-protocol", "error-handling"],
      "profiles": ["smoke", "standard", "deep"]
    },
    {
      "id": "RPC-004",
      "title": "Method not found returns error code -32601",
      "category": "json-rpc",
      "severity": "high",
      "check_type": "deterministic",
      "description": "Calling a method that does not exist must return error code -32601 (Method not found).",
      "expected": { "error_code": -32601 },
      "on_fail": "Add a default branch in your dispatcher that returns code -32601 with message \"Method not found\" for any unrecognized method name.",
      "tags": ["wire-protocol", "error-handling"],
      "profiles": ["smoke", "standard", "deep"]
    },
    {
      "id": "RPC-005",
      "title": "Batch requests return an array of responses",
      "category": "json-rpc",
      "severity": "medium",
      "check_type": "deterministic",
      "description": "A JSON array of request objects must be handled as a batch and return a JSON array of response objects.",
      "on_fail": "Detect when the incoming body is an array, dispatch each entry, and return the results as a JSON array. If batches are out of scope, at minimum return a clean error rather than crashing.",
      "tags": ["wire-protocol", "batch"],
      "profiles": ["standard", "deep"]
    },
    {
      "id": "RPC-006",
      "title": "Notification (no id) must not return a response",
      "category": "json-rpc",
      "severity": "medium",
      "check_type": "deterministic",
      "description": "A request object without an id field is a notification. The server must not return a response object.",
      "on_fail": "Branch on whether id is present. For notifications, run the handler and return nothing on the wire.",
      "tags": ["wire-protocol", "notifications"],
      "profiles": ["standard", "deep"]
    },
    {
      "id": "MCP-001",
      "title": "Server responds to initialize with a valid InitializeResult",
      "category": "mcp-lifecycle",
      "severity": "critical",
      "check_type": "agent",
      "description": "Call the initialize method with a valid ClientInfo and ProtocolVersion. The server must respond with serverInfo, protocolVersion, and capabilities.\n",
      "on_fail": "Implement an initialize handler that returns serverInfo, protocolVersion, and a capabilities object. Most MCP SDKs do this for you, so verify you have not removed or overridden the default handler.",
      "tags": ["lifecycle", "handshake"],
      "profiles": ["smoke", "standard", "deep"]
    },
    {
      "id": "MCP-002",
      "title": "Server returns non-empty instructions in InitializeResult",
      "category": "mcp-lifecycle",
      "severity": "medium",
      "check_type": "agent",
      "description": "InitializeResult.instructions should be a non-empty string describing server capabilities and usage.",
      "on_fail": "Set the instructions field on your initialize handler to a short paragraph that tells an agent what your server is for and how to use it.",
      "tags": ["lifecycle", "documentation"],
      "profiles": ["standard", "deep"]
    },
    {
      "id": "MCP-003",
      "title": "Server declares at least one capability in InitializeResult",
      "category": "mcp-lifecycle",
      "severity": "high",
      "check_type": "agent",
      "description": "InitializeResult.capabilities must declare at least one of tools, resources, or prompts.",
      "on_fail": "Populate the capabilities object with the categories you actually expose. If your server has no tools, resources, or prompts at all, there is nothing for an agent to use.",
      "tags": ["lifecycle", "capabilities"],
      "profiles": ["smoke", "standard", "deep"]
    },
    {
      "id": "MCP-004",
      "title": "Server accepts and does not error on initialized notification",
      "category": "mcp-lifecycle",
      "severity": "high",
      "check_type": "agent",
      "description": "After initialize, the client must send the initialized notification. The server must not return an error or close the connection.\n",
      "on_fail": "Add a no-op handler for the initialized notification. Do not return a response and do not close the transport.",
      "tags": ["lifecycle", "handshake"],
      "profiles": ["smoke", "standard", "deep"]
    },
    {
      "id": "MCP-005",
      "title": "Server responds to ping with an empty result",
      "category": "mcp-lifecycle",
      "severity": "medium",
      "check_type": "agent",
      "description": "The ping method must return an empty result object {} within 5 seconds.",
      "expected": { "max_latency_ms": 5000 },
      "on_fail": "Add a ping handler that returns {} immediately. If the server is slow under load, look for synchronous work blocking the request loop.",
      "tags": ["lifecycle", "health"],
      "profiles": ["standard", "deep"]
    },
    {
      "id": "MCP-006",
      "title": "Unknown method returns error, does not crash server",
      "category": "mcp-lifecycle",
      "severity": "high",
      "check_type": "agent",
      "description": "Calling a method name not in the server declared tools, resources, or prompts must return a JSON-RPC error (code -32601) and leave the server alive for subsequent calls.\n",
      "expected": { "error_code": -32601 },
      "on_fail": "Make sure your dispatcher returns a JSON-RPC error for unknown methods instead of throwing. The next request must still succeed.",
      "tags": ["lifecycle", "resilience", "error-handling"],
      "profiles": ["smoke", "standard", "deep"]
    }
  ]
}
$pack$::jsonb,
  null
)
on conflict (slug) do nothing;
