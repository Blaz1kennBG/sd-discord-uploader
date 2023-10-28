const getLocalCommands = require("../../utils/getLocalCommands");

// use data all the time, due to the reason there is Discord slashCommandBuilder that we use!!!
module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.data.name === interaction.commandName
    );

    if (!commandObject)
      return interaction.reply({
        content: "This command is not existing!",
        ephemeral: true,
      });

    await commandObject.execute({ client, interaction });
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};
