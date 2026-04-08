import type { ConnectorConfig } from "./index.js";

export const telegramConnector: ConnectorConfig = {
  name: "Telegram",
  slug: "telegram",
  authType: "bot_token",
  description: "Telegram Bot API. Send messages, read chats, manage groups, and handle media via your Telegram bot.",
  credentialFields: [
    {
      key:         "bot_token",
      label:       "Bot Token",
      description: "Token from @BotFather. Create a new bot with /newbot to get yours.",
      secret:      true,
      placeholder: "1234567890:ABCdefGHIjklmNOPqrstUVwxyz",
      findGuideUrl: "https://core.telegram.org/bots/tutorial#obtain-your-bot-token",
    },
  ],
  docsUrl: "https://core.telegram.org/bots/api",
};
