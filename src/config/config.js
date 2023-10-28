const { config } = require("dotenv");
const path = require("path");

config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  discord: {
    token: process.env.TOKEN,
    clienId: process.env.CLIENT_ID,
    guildIds: process.env.GUILD_IDS.split(","),
  },
};
