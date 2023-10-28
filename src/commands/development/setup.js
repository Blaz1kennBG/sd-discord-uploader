const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const {
  embed: WelcomeEmbed,
} = require("../../components/embeds/welcome-embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Send the welcome embed")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute({ client, interaction }) {
    await interaction.deferReply({
      ephemeral: true,
    });

    await interaction.editReply({
      content: "Моля изчакайте, докато се изпълни командата.",
      ephemeral: true,
    });

    const commandChannel = interaction.channel;
    const channel = await client.channels.fetch(commandChannel.id);

    // Send the embeds
    await channel.send(WelcomeEmbed());

    // Reply to the interaction
    interaction.editReply({
      content: "Каналите са създадени успешно.",
      ephemeral: true,
    });
  },
};
