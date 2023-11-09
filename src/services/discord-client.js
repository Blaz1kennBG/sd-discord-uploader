const { discord } = require("../config/config");
const { eventHandler } = require("../handlers/eventHandler");
const { Client, GatewayIntentBits, Events } = require("discord.js");
let client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
  ],
});

client.on("ready", async () => {
  eventHandler(client);
  await client.login(discord.token);
});

async function getDiscordClient() {
  const gc = () => client || null;
  return new Promise(async (resolve) => {
    const c = gc();
    if (c) {
      resolve(c);
    } else {
    }
  });
  if (!client) {
    setTimeout(() => {
      getDiscordClient();
    }, 200);
    return;
  }
  return client;
}

module.exports = {
  getDiscordClient,
};
