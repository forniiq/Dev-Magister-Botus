const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping_ms")
    .setDescription("Показывает задержку бота"),

  run: async ({ interaction, client }) => {
    await interaction.reply(`Понг! Задержка: ${client.ws.ping}ms`);
  },
};
