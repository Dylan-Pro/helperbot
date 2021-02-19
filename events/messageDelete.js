const Discord = require('discord.js');
const Logs = require('../models/setlogs');

module.exports = async (client, message) => {
    if(!message.author) return;
    if(message.author.bot) return;
    if(!message.channel.type === "dm") return;
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author.tag,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null,
      avatar: message.author.displayAvatarURL({ dynamic: true }),
      channel: message.channel.id
    });
  
    let ChannelLogs = await Logs.findOne({ guild: message.guild.id });
    if(!ChannelLogs) return;
  
    let imageDelete = message.attachments.first() ? message.attachments.first().proxyURL : null;
  
    const embedMessageDelete = new Discord.MessageEmbed()
    .setTitle(`__**MessageDeleted**__`)
    .addField("<:HBuser:783351289114918973> **Message Author:**", `${message.author} | ${message.author.id}`)
    .addField("<:HBinformation:783351288062672896> **Deleted In:**", `${message.channel}`)
    .addField("<:HBtrash:783351287504437280> **Message Deleted:**", `${message.content || `[Attachment Link](${imageDelete})`}`)
    .setColor(`${message.member.displayHexColor || "BLUE"}`)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setImage(imageDelete)
    message.guild.channels.cache.get(ChannelLogs.ChannelID).send(embedMessageDelete);
  
}