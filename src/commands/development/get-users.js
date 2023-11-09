const { SlashCommandBuilder } = require("@discordjs/builders");
const { getUsers } = require("../../services/socket-users");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("getusers")
    .setDescription("Get a list of users in the server"),
  async execute({ client, interaction }) {
    await interaction.deferReply();
    const users = getUsers()
      .map((x) => `${x.username} - ${x.counter}`)
      .join("\n");

    await interaction.editReply({
      content: `Users available: ${users}`,
    });
  },
};
