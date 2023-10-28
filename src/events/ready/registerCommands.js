const { discord } = require("../../config/config");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    
    const apps = [];

    for (const guildId of discord.guildIds) {
      const app = await getApplicationCommands(client, guildId);
      apps.push(app);
    }

    for (const app of apps) {
      for (const localCommand of localCommands) {
        const { data } = localCommand;
        const { name, description, options } = data;
        const guildName = app.guild ? app.guild.name : "Unknown";

        const existingCommand = await app.cache.find(
          (cmd) => cmd.name === name
        );

        if (existingCommand) {
          if (localCommand.deleted) {
            await app.delete(existingCommand.id);
            console.log(`🗑 [${guildName}] Deleted command "${name}".`);
            continue;
          }

          if (areCommandsDifferent(existingCommand, localCommand)) {
            await app.edit(existingCommand.id, {
              description,
              options,
            });

            console.log(`🔁 [${guildName}] Edited command "${name}".`);
          }
        } else {
          if (localCommand.deleted) {
            console.log(
              `⏩ [${guildName}] Skipping registering command "${name}" as it's set to delete.`
            );
            continue;
          }

          await app.create({
            name,
            description,
            options,
          });

          console.log(`👍 [${guildName}] Registered command "${name}."`);
        }
      }
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};
