module.exports = (message) => {
  if (message.author.bot) return;

  if (message.content === "Привет") {
    message.reply("Привет!");
  }
};
