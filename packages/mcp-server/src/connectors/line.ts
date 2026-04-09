import type { ConnectorConfig } from "./index.js";

export const lineConnector: ConnectorConfig = {
  name: "LINE",
  slug: "line",
  authType: "bot_token",
  description: "LINE Messaging API. Send messages to users and groups, reply to webhook events, broadcast to followers, and retrieve user and group profiles via your LINE Official Account.",
  credentialFields: [
    {
      key:         "channel_access_token",
      label:       "Channel Access Token",
      description: "Long-lived channel access token from your LINE Developers channel settings. Issue one under Messaging API → Channel access token.",
      secret:      true,
      placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://developers.line.biz/en/docs/messaging-api/channel-access-tokens/",
    },
  ],
  docsUrl: "https://developers.line.biz/en/docs/messaging-api/",
};
