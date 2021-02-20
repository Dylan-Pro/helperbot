const Discord = require("discord.js");

module.exports = {
  name: "servers",
  aliases: ["guilds"],
  description: "Shows the bot's servers",
  category: "Utility",
  usage: "servers",
  cooldown: 3,
  run: async (client, message, args) => {

    const embedServers = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} | Servers`, client.user.displayAvatarURL())
        .setDescription(`<:HBfolder:783351287868817448> **Servers:** ${client.guilds.cache.size}\n\n<:HBuser:783351289114918973> **Users:** ${client.guilds.cache.reduce((c,v) => c + v.memberCount, 0).toLocaleString()}\n\n<:HBchat:806684699032158228> **Channels:** ${client.channels.cache.size}`)
        .setColor("RANDOM")
        message.channel.send(embedServers);

  }
}