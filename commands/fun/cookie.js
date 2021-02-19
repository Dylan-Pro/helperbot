const Discord = require("discord.js");

module.exports = {
  name: "cookie",
  aliases: [],
  description: "Have a coockie a user",
  category: "Fun",
  usage: "cookie <mention>",
  cooldown: 2,
  run: async (client, message, args) => {


    let user = message.mentions.members.first() || message.author;

    if (!message.mentions.members.first()) return message.reply("Mention if you want to give someone else a cookie >w<");

    if (user.id === message.author.id)
      return message.channel.send("**"+message.author.username+"** Have a cookie.. :cookie: on my part (｡♡‿♡｡) ");

    message.channel.send("**"+message.author.username+"** gives him a cookie \n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :cookie: to **"+user.user.username+"**");

  }
}