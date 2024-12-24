const { ActivityType } = require('discord.js');

module.exports = (client) => {
  console.log("Бот запущен!");

  client.user.setActivity('за вами! /help', { type: ActivityType.Watching });
};