const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flip")
    .setDescription("Подбросить монету"),

  run: async ({ interaction }) => {
    const result = Math.random()
    if (result < 0.5) await interaction.reply("Орёл!");
    else await interaction.reply("Решка!");
  },
};