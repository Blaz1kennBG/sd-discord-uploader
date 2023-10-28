const { EmbedBuilder, ActionRowBuilder } = require("discord.js");

const SendSDImagesEmbed = ({ userId, message, files }) => {
  const logo =
    "https://cdn.discordapp.com/attachments/712021598298701864/1156701893733658785/image.png?ex=6515ee15&is=65149c95&hm=5f642245bff5d2596202d49fa1b6a6197a6bdfc52cb9c1e2c81a823a4fb8af58&";

  const embedBody = new EmbedBuilder()
    .setColor("#008080")
    .setTitle(`Your Diffusion`)
    .setThumbnail(logo)
    .setDescription(`${`<@${userId}>`}\n${message}`)
    .setImage("https://i.stack.imgur.com/Fzh0w.png")
    // .setImage(evalProgressBarImage(progress))
    .setTimestamp()
    .setAuthor({
      name: "littlebirbo",
      iconURL: logo,
      url: "https://www.youtube.com/watch?v=vT896XOqyrc",
    })
    .setFooter({
      text: "♿ Neshta 2024 💨",
      iconURL: logo,
    });

  return {
    embeds: [embedBody],
    files,
  };
};

module.exports = {
  SendSDImagesEmbed,
};
