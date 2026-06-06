export interface XGateClientHookOptions {
  endpointUrl?: string;
  bearerEnvVar?: string;
  environmentEnvVar?: string;
  autonomyEnvVar?: string;
  defaultEnvironment?: "dev" | "staging" | "prod";
  defaultAutonomyLevel?: "interactive" | "unattended";
  timeoutMs?: number;
}

const DEFAULT_ENDPOINT = "https://unclick.world/api/xgate-check";
const DEFAULT_BEARER_ENV = "XGATE_BEARER";
const DEFAULT_ENVIRONMENT_ENV = "XGATE_ENVIRONMENT";
const DEFAULT_AUTONOMY_ENV = "XGATE_AUTONOMY";

function optionsWithDefaults(options: XGateClientHookOptions = {}) {
  return {
    endpointUrl: options.endpointUrl ?? DEFAULT_ENDPOINT,
    bearerEnvVar: options.bearerEnvVar ?? DEFAULT_BEARER_ENV,
    environmentEnvVar: options.environmentEnvVar ?? DEFAULT_ENVIRONMENT_ENV,
    autonomyEnvVar: options.autonomyEnvVar ?? DEFAULT_AUTONOMY_ENV,
    defaultEnvironment: options.defaultEnvironment ?? "dev",
    defaultAutonomyLevel: options.defaultAutonomyLevel ?? "interactive",
    timeoutMs: options.timeoutMs ?? 8000,
  };
}

export function buildXGateHookNodeScript(client: "claude-code" | "cursor", options: XGateClientHookOptions = {}) {
  const cfg = optionsWithDefaults(options);
  return [
    "const fs=require('node:fs');",
    `const endpoint=process.env.XGATE_ENDPOINT||${JSON.stringify(cfg.endpointUrl)};`,
    `const token=process.env[${JSON.stringify(cfg.bearerEnvVar)}]||'';`,
    `const environment=process.env[${JSON.stringify(cfg.environmentEnvVar)}]||${JSON.stringify(cfg.defaultEnvironment)};`,
    `const autonomyLevel=process.env[${JSON.stringify(cfg.autonomyEnvVar)}]||${JSON.stringify(cfg.defaultAutonomyLevel)};`,
    `const timeoutMs=${JSON.stringify(cfg.timeoutMs)};`,
    "const inputText=fs.readFileSync(0,'utf8')||'{}';",
    "let input={};",
    "try{input=JSON.parse(inputText);}catch{input={raw:inputText};}",
    "const tool=String(input.tool_name||input.toolName||input.name||input.tool||'client_tool');",
    "const lower=tool.toLowerCase();",
    "const actionClass=lower.includes('bash')||lower.includes('shell')||lower.includes('terminal')?'shell':lower.includes('edit')||lower.includes('write')?'filesystem':lower.includes('git')?'git':lower.includes('web')||lower.includes('fetch')?'network':'shell';",
    "const raw=typeof input.command==='string'?input.command:typeof input.raw==='string'?input.raw:JSON.stringify(input.tool_input||input.input||input);",
    `const metadata={client:${JSON.stringify(client)}};`,
    "const payload={action:{class:actionClass,raw,tool},context:{environment,autonomyLevel,now:Date.now()},metadata};",
    "const controller=new AbortController();",
    "const timer=setTimeout(()=>controller.abort(),timeoutMs);",
    "fetch(endpoint,{method:'POST',signal:controller.signal,headers:{'content-type':'application/json',authorization:token?`Bearer ${token}`:''},body:JSON.stringify(payload)})",
    ".then(async r=>{clearTimeout(timer);const text=await r.text();let data={};try{data=JSON.parse(text);}catch{data={error:text};}if(!r.ok){console.error(data.error||text||'XGate rejected the action');process.exit(2);}if(data.verdict==='allow'){process.exit(0);}console.error(data.reason||data.ruleId||`XGate verdict ${data.verdict}`);process.exit(2);})",
    ".catch(err=>{clearTimeout(timer);console.error(`XGate unavailable: ${err&&err.message?err.message:String(err)}`);process.exit(2);});",
  ].join("");
}

export function buildXGateHookCommand(client: "claude-code" | "cursor", options: XGateClientHookOptions = {}) {
  return `node -e ${JSON.stringify(buildXGateHookNodeScript(client, options))}`;
}

export function generateClaudeCodeHook(options: XGateClientHookOptions = {}): string {
  return JSON.stringify(
    {
      hooks: {
        PreToolUse: [
          {
            matcher: "Bash|Edit|MultiEdit|Write|WebFetch",
            hooks: [
              {
                type: "command",
                command: buildXGateHookCommand("claude-code", options),
              },
            ],
          },
        ],
      },
    },
    null,
    2,
  );
}

export function generateCursorHook(options: XGateClientHookOptions = {}): string {
  const cfg = optionsWithDefaults(options);
  return JSON.stringify(
    {
      version: 1,
      client: "cursor",
      endpoint: cfg.endpointUrl,
      bearerEnvVar: cfg.bearerEnvVar,
      command: buildXGateHookCommand("cursor", options),
      boundary:
        "Cursor rule files are not a universal hard pre-tool interceptor. Use this command where Cursor or a runner supports hooks; otherwise XGate covers UnClick-routed tools only.",
      ruleFile: ".cursor/rules/xgate.mdc",
      ruleText: [
        "Before shell, file-write, git, SQL, network, send, or deploy actions, run the XGate command.",
        "Continue only when the verdict is allow.",
        "If the hook is unavailable, stop and ask for a safer route.",
      ].join("\n"),
    },
    null,
    2,
  );
}
