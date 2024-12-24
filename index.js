const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const path = require("path");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandHandler({
  client,
  eventsPath: path.join(__dirname, "events"),
  commandsPath: path.join(__dirname, "commands"),
  testServer: "1276095762450612305",
});

// Обработка необработанных исключений
process.on("uncaughtException", (error) => {
  console.error("Необработанное исключение:", error);
  // Дополнительная логика для записи в лог или уведомления
});

// Обработка необработанных отклонений промисов
process.on("unhandledRejection", (reason, promise) => {
  console.error("Необработанное отклонение промиса:", reason);
  // Дополнительная логика для записи в лог или уведомления
});

// process.env.tokenMain - Основная версия бота
// process.env.tokenDev - Версия бота для разработчиков
client.login(process.env.tokenDev);
