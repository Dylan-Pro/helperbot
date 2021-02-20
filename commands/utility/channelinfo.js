const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");

module.exports = {
  name: "channelinfo",
  aliases: ["chinfo"],
  description: "Gives information about a channel",
  category: "Utility",
  usage: "channelinfo",
  cooldown: 3,
  run: async (client, message, args) => {

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

    
  const embed = new Discord.MessageEmbed()
  .setTitle("**Here you have the information of that channel**")
      
  .addField(`<:HBinformation:783351288062672896> **Name**:`, ` ${Discord.Util.escapeMarkdown(channel.name)}`)
  
  
  .addField(`<:HBfunnel:783351288670584862> **Mention**:`,  `${channel}`)
  
  
  .addField(`<:HBfile:783351289224101928> **ID:**`, `${channel.id}`)
  

  .addField("<:HBsearch:783351288149835857> **Created At:**", humanizeDuration(Date.now() - new Date(channel.createdAt).getTime(), { largest: 2, conjunction: " and ", round: true }))

  
  .addField(`<:HBhouse:783351287940382731> **Type:**`, `${channel.type}`)

      
  .addField(`<:HB18:793198875639939159> **NSFW:**`, `${channel.nsfw ? "Yes" : "Not"}`)
  
     
  .addField(`<:HBmenu:783351287688724530> **It is in the section**:`, ` ${channel.parent ? channel.parent.name : "Has no section"}`)

      
  .setColor("RANDOM")

  .setFooter(" Helper Bot | Utility System", client.user.displayAvatarURL());
      
  message.channel.send(embed);

  }
}