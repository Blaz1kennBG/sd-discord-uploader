const { EmbedBuilder, ActionRowBuilder } = require("discord.js");

const embed = () => {
  const logo =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/980379f0-8359-433c-8ef3-f2a0594a04bd/dflxo50-b37f0bad-dd80-420e-93d2-22dc4a0dc44d.png/v1/fill/w_894,h_894,q_70,strp/cute_anime_girl_by_imnoai_dflxo50-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzk4MDM3OWYwLTgzNTktNDMzYy04ZWYzLWYyYTA1OTRhMDRiZFwvZGZseG81MC1iMzdmMGJhZC1kZDgwLTQyMGUtOTNkMi0yMmRjNGEwZGM0NGQucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7ksWdCni8pdtSTbNpB9t5A8oRa-JhOMNvrRSUqZ3AQ0";

  const embedBody = new EmbedBuilder()
    .setColor("#008080")
    .setTitle(`Здрасти!`)
    .setThumbnail(logo)
    .setDescription("Здрасти, как съм!")
    .setImage("https://i.stack.imgur.com/Fzh0w.png")
    .setFields({
      name: "Добър ден!",
      value: "hello@google.com",
    })
    .setAuthor({
      name: "Аз",
      iconURL: logo,
      url: "https://google.com/",
    })
    .setFooter({
      text: "Copyright © аз съм",
      iconURL: logo,
    });

  return {
    embeds: [embedBody],
    files: [logo],
  };
};

module.exports = {
  embed,
};
