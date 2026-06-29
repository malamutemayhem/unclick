// wiring/twilio.ts
// Per-app MCP wiring for the twilio connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Messaging

import { twilioSendSms, twilioListMessages, twilioGetMessage, twilioMakeCall, twilioListCalls, twilioSendVerify, twilioCheckVerify } from "../twilio-tool.js";

export const twilioTools = [
  // ── twilio-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "twilio_send_sms",
    description: "Send an SMS via Twilio.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        to: { type: "string", description: "Recipient phone number in E.164 format" },
        from: { type: "string", description: "Your Twilio phone number or messaging service SID" },
        body: { type: "string", description: "Message text" },
        status_callback: { type: "string", description: "URL to receive status updates" },
      },
      required: ["account_sid", "auth_token", "to", "from", "body"],
    },
  },
  {
    name: "twilio_list_messages",
    description: "List SMS messages sent or received on a Twilio account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        to: { type: "string" },
        from: { type: "string" },
        date_sent: { type: "string", description: "Filter by date (YYYY-MM-DD)" },
        page_size: { type: "number" },
      },
      required: ["account_sid", "auth_token"],
    },
  },
  {
    name: "twilio_get_message",
    description: "Get a single Twilio message by SID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        message_sid: { type: "string" },
      },
      required: ["account_sid", "auth_token", "message_sid"],
    },
  },
  {
    name: "twilio_make_call",
    description: "Initiate an outbound phone call via Twilio.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        to: { type: "string", description: "E.164 phone number to call" },
        from: { type: "string", description: "Your Twilio phone number" },
        twiml: { type: "string", description: "TwiML instructions for the call" },
        url: { type: "string", description: "URL that returns TwiML for the call" },
      },
      required: ["account_sid", "auth_token", "to", "from"],
    },
  },
  {
    name: "twilio_list_calls",
    description: "List outbound and inbound calls on a Twilio account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        to: { type: "string" },
        from: { type: "string" },
        status: { type: "string", description: "queued, ringing, in-progress, completed, failed, busy, no-answer" },
        page_size: { type: "number" },
      },
      required: ["account_sid", "auth_token"],
    },
  },
  {
    name: "twilio_send_verify",
    description: "Send a verification code via Twilio Verify (SMS, call, email, or WhatsApp).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        service_sid: { type: "string", description: "Twilio Verify Service SID" },
        to: { type: "string", description: "E.164 phone number or email" },
        channel: { type: "string", enum: ["sms", "call", "email", "whatsapp"], description: "sms, call, email, or whatsapp (default: sms)" },
      },
      required: ["account_sid", "auth_token", "service_sid", "to"],
    },
  },
  {
    name: "twilio_check_verify",
    description: "Check a verification code submitted by a user via Twilio Verify.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        service_sid: { type: "string" },
        to: { type: "string" },
        code: { type: "string", description: "The OTP code entered by the user" },
      },
      required: ["account_sid", "auth_token", "service_sid", "to", "code"],
    },
  },
] as const;

export const twilioHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // twilio-tool.ts
  twilio_send_sms:         (args) => twilioSendSms(args),
  twilio_list_messages:    (args) => twilioListMessages(args),
  twilio_get_message:      (args) => twilioGetMessage(args),
  twilio_make_call:        (args) => twilioMakeCall(args),
  twilio_list_calls:       (args) => twilioListCalls(args),
  twilio_send_verify:      (args) => twilioSendVerify(args),
  twilio_check_verify:     (args) => twilioCheckVerify(args),
};
