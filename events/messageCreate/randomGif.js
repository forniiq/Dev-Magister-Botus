const https = require("https"); // Модуль для работы с HTTP-запросами
const { EmbedBuilder } = require("discord.js"); // Модуль для создания embed сообщений

module.exports = async (message) => {
  if (message.author.bot) return; // Игнорируем сообщения от бота

  const channels = ["1317491302535008319", "687589500225847318"]; // Массив с допустимыми каналами
  if (!channels.includes(message.channel.id)) return; // Если сообщение не из разрешённого канала, игнорируем

  const chance = Math.floor(Math.random() * 100) + 1; // Случайное число от 1 до 100
  if (chance <= 5) {
    try {
      const url =
        "https://api.giphy.com/v1/gifs/random?api_key=1VW1fvXNzoKoR3g1p7695fZuaVME73gG"; // URL для получения случайного GIF

      // Используем Promise для асинхронной работы
      const gifUrl = await new Promise((resolve, reject) => {
        https
          .get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => {
              data += chunk; // Сбор данных из ответа
            });

            res.on("end", () => {
              try {
                const json = JSON.parse(data); // Парсим данные
                const gifr = json.data.images.original.url; // Получаем URL анимационного GIF
                resolve(gifr); // Разрешаем Promise с URL
              } catch (error) {
                reject(error); // Ошибка при парсинге
              }
            });
          })
          .on("error", (error) => {
            reject(error); // Ошибка при запросе
          });
      });

      const embed = new EmbedBuilder().setImage(gifUrl); // Создаём Embed с изображением

      await message.channel.send({ embeds: [embed] }); // Отправляем Embed в канал
    } catch (error) {
      console.error("Ошибка при получении GIF:", error); // Логируем ошибку
      await message.channel.send(
        "Извините, произошла ошибка при получении GIF.", // Отправляем сообщение об ошибке
      );
    }
  }
};
