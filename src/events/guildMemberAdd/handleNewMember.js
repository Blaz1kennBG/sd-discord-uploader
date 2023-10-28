module.exports = async (client, member) => {
  const role = member.guild.roles.cache.find((r) => r.name === "Клиент");
  member.roles.add(role);
};
