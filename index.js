const { Client, GatewayIntentBits, Events } = require("discord.js");
const eventHandler = require("./src/handlers/eventHandler");
const { discord, database } = require("./src/config/config");

const cors = require("cors");
const { StableDiffusionUploader } = require("./src/services/sd-uploader");
const port = 3000;

const {
  addUser,
  removeUser,
  getUsers,
  removeUserBySocketId,
} = require("./src/services/socket-users");

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

// Cors options
const corsOptions = {
  origin: "http://127.0.0.1:7860",
  methods: ["GET", "POST"],
  credentials: true,
};

const io = socketIo(server, {
  cors: corsOptions,
});

/* Discord variables */
let client = null;
let socket = null;
const getDiscordClient = () => client;
const getSocket = () => socket;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));
let counter = 0;
async function init() {
  client = new Client({
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

  await client.login(discord.token);

  const sdUploader = new StableDiffusionUploader({
    name: "stable-diffusion-mancho-server",
    channelId: "1165618812876496957",
    client,
  });
  await sdUploader.init();

  app.post("/upload/sd-image", async (req, res) => {
    const { images } = req.body;
    try {
      sdUploader.upload(images);
      res.status(200).send("Successfully uploaded images for processing...");
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .send("Something went wrong while uploading the images...");
    }
  });

  io.on("connection", (_socket) => {
    socket = _socket;
    const channel = client.channels.cache.get("1167803342114783292");
    channel.send({ content: "A connection! " });
    _socket.on("connection", (data) => {
      channel.send({ content: "An instance initialized!" });
    });
    _socket.on("join", (data) => {
      const body = data;
      addUser(body.data.username.toLowerCase(), {
        socket: _socket,
        username: body.data.username.toLowerCase(),
        counter,
      });
      counter++;
      channel.send({
        content: `${body.data.username.toLowerCase()} connected. Time for exploatation`,
      });
    });
    _socket.on("is-processing", (data) => {
      channel.send({ content: `${data.data.username} is still processing;..` });
    });
    _socket.on("disconnect", (reason) => {
      counter--;
      if (counter < 0) {
        counter = 0;
      }
      const disconnectedUsername = removeUserBySocketId(_socket.id);

      channel.send({
        content: "A disconnect! " + disconnectedUsername,
      });
    });
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // app.listen(port, () => {
  //   console.log(`Server is running on port ${port}`);
  // });
}
function promptSDInstance(index, prompt, negative_prompt) {
  const user = getUsers()[index];
  if (!user) return;
  user.socket.emit("generate-image", {
    prompt,
    negative_prompt: negative_prompt || "",
  });
}

init();
module.exports = {
  getSocket,
  getDiscordClient,
  promptSDInstance,
};
