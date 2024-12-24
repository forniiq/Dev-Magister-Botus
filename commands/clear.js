const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Очищает сообщения в чате.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Количество сообщений для удаления")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100),
    ),

  run: async ({ interaction, client }) => {
    // Получаем количество сообщений для удаления
    const amount = interaction.options.getInteger("amount");

    // Проверяем, есть ли у бота разрешение на управление сообщениями
    if (!interaction.guild.members.me.permissions.has("MANAGE_MESSAGES")) {
      return interaction.reply(
        "У меня нет разрешения на управление сообщениями.",
      );
    }

    // Проверка, прошло ли больше 3 секунд, чтобы избежать таймаута
    if (interaction.deferred || interaction.replied) {
      return interaction.followUp("Взаимодействие было уже завершено.");
    }

    try {
      // Отправляем отложенный ответ, чтобы дать Discord время на обработку
      await interaction.deferReply();

      // Удаляем сообщения
      await interaction.channel.bulkDelete(amount, true);

      // Отправляем ответ с подтверждением
      await interaction.editReply(`Удалено ${amount} сообщений.`);
    } catch (error) {
      console.error("Ошибка при удалении сообщений:", error);

      // Проверяем, не был ли таймаут
      if (error.code === 10062) {
        return interaction.followUp(
          "Взаимодействие было завершено. Попробуйте снова.",
        );
      }

      // Отправляем ошибку, если возникла другая проблема
      await interaction.editReply("Произошла ошибка при удалении сообщений.");
    }
  },
};
