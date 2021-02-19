const Discord = require("discord.js");

module.exports = {
  name: "membercount",
  aliases: ["count"],
  description: "Shows the number of members of the server",
  category: "Utility",
  usage: "count",
  cooldown: 3,
  run: async (client, message, args) => {

    const embed = new Discord.MessageEmbed()
    .setTitle(`**${message.guild.name}** | Member Count`)
    .setColor("RANDOM")
    .addFields({
        name: "<:HBusers:805668912888938527> **Members:**",
        value: `${message.guild.members.cache.size}`,
        inline: false
    },
    {
        name: "<:HBuser:783351289114918973> **Humans:**",
        value: `${message.guild.members.cache.filter(m => !m.user.bot).size}`,
        inline: false
    },
    {
        name: "<:HBbot:805669602017148939> **Bots:**",
        value: `${message.guild.members.cache.filter(m => m.user.bot).size}`,
        inline: false
    },
    {
        name: "<:HBonline:805670625502429205> **Online:**",
        value: `${message.guild.members.cache.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size}`,
        inline: false
    }
    )
    message.channel.send(embed)

  }
}