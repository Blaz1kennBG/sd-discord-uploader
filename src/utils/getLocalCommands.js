const getAllFiles = require("./getAllFiles");
const path = require("path");

module.exports = (exceptions = []) => {
  let localCommands = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      // Ignore .png files
      if (
        commandFile.endsWith(".png") ||
        commandFile.endsWith(".jpg") ||
        commandFile.endsWith(".jpeg")
      ) {
        continue;
      }
      const commandObject = require(commandFile);
      if (exceptions.includes(commandObject.name)) {
        continue;
      }

      localCommands.push(commandObject);
    }
  }

  console.log(`Loaded ${localCommands.length} local commands.`);

  return localCommands;
};
