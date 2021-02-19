const Discord = require("discord.js");

module.exports = {
  name: "vote",
  aliases: [],
  description: "Vote for me on [top.gg](https://top.gg/bot/761300013317488660)",
  category: "Utility",
  usage: "vote",
  cooldown: 3,
  run: async (client, message, args) => {

    const embedVote = new Discord.MessageEmbed()
        .setTitle("Thanks for voting")
        .setDescription("<:HBupvote:808214399037997056> Vote on **[top.gg](https://top.gg/bot/761300013317488660)**\n\n<:yes:806948674201976874> Vote on **[MadKing](https://madking.us/bot/761300013317488660/vote)**\n\n<:bfdvote:598348336210378818> Vote on **[BotsForDiscord](https://botsfordiscord.com/bot/761300013317488660/vote)**")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setColor("RANDOM")
        message.channel.send(embedVote)
  }
}