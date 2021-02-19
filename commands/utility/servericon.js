const Discord = require("discord.js");

module.exports = {
  name: "servericon",
  aliases: ["icon"],
  description: "Show the server icon",
  category: "Utility",
  usage: "icon",
  cooldown: 3,
  run: async (client, message, args) => {

    let server = message.guild;
    let icono = message.guild.iconURL({size : 2048, dynamic: true});
    const EmbedServerIcon = new Discord.MessageEmbed()
    .setAuthor(`${server.name}`)
    .setTitle("<a:cdmusic:781188506981498891> | **This is the server icon**")
    .setColor("RANDOM")
    .setImage(`${icono}`)
    message.channel.send(EmbedServerIcon);

  }
}