import type { ConnectorConfig } from "./index.js";

export const discordConnector: ConnectorConfig = {
  name: "Discord",
  slug: "discord",
  authType: "bot_token",
  description: "Discord Bot API. Send messages, read channels, manage threads, add reactions, and search servers.",
  credentialFields: [
    {
      key:         "bot_token",
      label:       "Bot Token",
      description: "Discord bot token from the Discord Developer Portal. Must start with xoxb- ... wait, that's Slack. Discord tokens look like: MTExxx.GYxxxx.xxx",
      secret:      true,
      placeholder: "MTExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://discord.com/developers/docs/getting-started#creating-an-app",
    },
  ],
  docsUrl: "https://discord.com/developers/docs/intro",
};
