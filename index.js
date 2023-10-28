const { Client, GatewayIntentBits, Events } = require("discord.js");
const eventHandler = require("./src/handlers/eventHandler");
const { discord, database } = require("./src/config/config");
const express = require("express");
const cors = require("cors");
const { StableDiffusionUploader } = require("./src/services/sd-uploader");
const app = express();
const port = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Cors options
const corsOptions = {
  origin: true,
};
app.use(cors(corsOptions));

const client = new Client({
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

eventHandler(client);

client.login(discord.token);

const sdUploader = new StableDiffusionUploader({
  name: "stable-diffusion-mancho-server",
  channelId: "1167803342114783292",
  client,
});
sdUploader.init();

app.post("/upload/sd-image", async (req, res) => {
  const { images } = req.body;
  try {
    sdUploader.upload(images);
    res.status(200).send("Successfully uploaded images for processing...");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong while uploading the images...");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
