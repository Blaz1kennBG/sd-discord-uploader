const { SlashCommandBuilder } = require("@discordjs/builders");
const { getUsers } = require("../../services/socket-users");
const { getSocket, promptSDInstance } = require("../../../index.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("prompt-instance")
    .setDescription(`Users available: ${Object.keys(getUsers()).join(", ")}`)
    .addStringOption((option) =>
      option.setName("index").setDescription("The index").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("prompt").setDescription("The prompt").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("negative_prompt")
        .setDescription("The negative prompt")
        .setRequired(true)
    ),
  async execute({ client, interaction }) {
    await interaction.deferReply();

    const index = interaction.options.getString("index");
    const prompt = interaction.options.getString("prompt");
    const negativePrompt = interaction.options.getString("negative_prompt");
    const user = getUsers()[index];
    const msg = user
      ? `Prompter:${user.username}\nPrompt: ${prompt}\nNegative: ${negativePrompt}`
      : "User not existing";
    promptSDInstance(index, prompt, negativePrompt);
    // Do something with username, prompt, and negativePrompt

    await interaction.editReply({
      content: msg,
    });
  },
};
