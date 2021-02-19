const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "emojiinfo",
  aliases: ["emoji"],
  description: "Give the information of an emoji",
  category: "Utility",
  usage: "emoji :emoji:",
  cooldown: 3,
  run: async (client, message, args) => {

    let emojiProvided = args[0];
    if(!emojiProvided) return message.channel.send('<:HBminus:783351288515657728> | Provide an emoji, It has to be from this server.');
    
    const match = emojiProvided.match(/<:[a-zA-Z0-9_-]+:(\d{18})>/) || emojiProvided.match(/<a:[a-zA-Z0-9_-]+:(\d{18})>/); 

    if (!match || !match[1]) {
        return message.channel.send('<:HBminus:783351288515657728> | Please provide a valid emoji.');
    }
    
    let emoji = message.guild.emojis.cache.get(match[1]);
    
    if(!emoji) return message.channel.send('<:HBminus:783351288515657728> | That emoji could not be identified on the server.');
    const emojicreacion = moment.utc(emoji.createdAt).format('DD/MM/YYYY, h:mm A');
    
    let embed = new Discord.MessageEmbed()
    .setTitle(`**Emoji information**\n`)
    .setThumbnail(emoji.url) 
    .addField('**<:HBinformation:783351288062672896> Name**', emoji.name)
    .addField('**<:HBfile:783351289224101928> ID**', emoji.id)
    .addField('**<:HBuser:783351289114918973> Added by**', emoji.author || "I can't see who added it")
    .addField('**<a:cdmusic:781188506981498891> ¿Animated?**', emoji.animated ? 'Yes' : 'Not')
    .addField('**<:HBsettings:783351288536629268> Identifier**', emoji.identifier)
    .addField('**<:HBsearch:783351288149835857> Created At**', emojicreacion)
    .addField('**<:HBdownload:783351287596711987> Emoji URL**', `[Click here](${emoji.url})`)
    .setColor('RANDOM');
    message.channel.send(embed);

  }
}