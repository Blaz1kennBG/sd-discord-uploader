const path = require("path");
const getAllFiles = require("../../utils/getAllFiles");

module.exports = async (client, interaction) => {
  if (!interaction.isButton()) return;
  const interactionCustomId = interaction.customId;
  const buttonFolders = getAllFiles(
    path.join(__dirname, "..", "..", "components", "buttons"),
    true
  );

  for (const buttonFolder of buttonFolders) {
    const buttonFiles = getAllFiles(buttonFolder);
    buttonFiles.sort((a, b) => a > b);

    // const buttonName = buttonFolder.replace(/\\/g, "/").split("/").pop();

    for (const buttonFile of buttonFiles) {
      const { id, callback } = require(buttonFile);
      if (id === interactionCustomId) {
        await callback({ client, interaction });
        return;
      }
    }
  }
};
