const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  description: "Displays the member's avatar",
  category: "Utility",
  usage: "avatar",
  cooldown: 3,
  run: async (client, message, args) => {

let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; 

const EmbedAvatar = new Discord.MessageEmbed()
 .setTitle(`<:HBuser:783351289114918973> **${user.username}** Avatar`)
 .setDescription(`<:HBdownload:783351287596711987> **Formats**\n[GIF](${user.displayAvatarURL({format: "gif", size : 2048})}) | [PNG](${user.displayAvatarURL({format: "png", size : 2048})}) | [JPG](${user.displayAvatarURL({format: "jpg", size : 2048})}) | [WEBP](${user.displayAvatarURL({format: "webp", size : 2048})})`)
 .setImage(user.displayAvatarURL({dynamic: true, size : 2048 }))
 .setColor("RANDOM")
 .setFooter(`Requested by: ${message.author.username}`,  message.author.displayAvatarURL({dynamic: true}));
 message.channel.send(EmbedAvatar);

  }
}