const Discord = require('discord.js');
const Logs = require('../models/setlogs');

module.exports = async  (client, newEmoji) => {
    let ChannelLogs = await Logs.findOne({ guild: newEmoji.guild.id });
    if (!ChannelLogs) return;

    const embedNewEmoji = new Discord.MessageEmbed()
        .setTitle("__**EmojiCreate**__")
        .addField("**<:HBfile:783351289224101928> Name:**", `${newEmoji.name} | ${newEmoji.id}`)
        .addField('**<:HBuser:783351289114918973> Added by:**',  await newEmoji.fetchAuthor().then(user => user.tag) || "I can't see who added it")
        .addField("**<:HBrefresh:783351288292442183> Created At:**", `${newEmoji.createdAt.toUTCString().substr(0, 16)}`)
        .addField("**<:HBsearch:783351288149835857> Animated:**", newEmoji.animated ? "Yes" : "No")
        .setFooter("Helper Bot | Logs", client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(newEmoji.url)
        .setAuthor(newEmoji.guild.name, newEmoji.guild.iconURL({ dynamic: true }))
        .setColor("RANDOM")
        newEmoji.guild.channels.resolve(ChannelLogs.ChannelID).send(embedNewEmoji);
};