import type { ConnectorConfig } from "./index.js";

export const slackConnector: ConnectorConfig = {
  name: "Slack",
  slug: "slack",
  authType: "bot_token",
  description: "Slack API. Send messages, read channels, manage reactions, list users, and search across your workspace.",
  credentialFields: [
    {
      key:         "bot_token",
      label:       "Bot Token",
      description: "Slack bot token. Must start with xoxb-. Create a Slack app and install it to your workspace.",
      secret:      true,
      placeholder: "xoxb-00000000000-00000000000-xxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://api.slack.com/authentication/token-types#bot",
    },
  ],
  docsUrl: "https://api.slack.com/",
};
