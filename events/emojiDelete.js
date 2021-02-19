const Discord = require('discord.js');
const Logs = require('../models/setlogs');

module.exports = async (client, emoji) => {
    let ChannelLogs = await Logs.findOne({ guild: emoji.guild.id });
    if (!ChannelLogs) return;

    let deletedBy = await emoji.guild.fetchAuditLogs({type: `EMOJI_DELETE` }).then(a => a.entries.array()[0].executor.id).catch(()=>{});

    let a1;
    if(!deletedBy) {
        a1 = "I can't see who deleted it"
    } else {
        a1 = `${client.users.cache.get(deletedBy).tag}`
    };


    const embedEmojiDelete = new Discord.MessageEmbed()
        .setTitle("__**EmojiDelete**__")
        .addField("**<:HBfile:783351289224101928> Name:**", `${emoji.name} | ${emoji.id}`)
        .addField('**<:HBuser:783351289114918973> Deleted by:**',  a1)
        .addField("**<:HBrefresh:783351288292442183> Created At:**", `${emoji.createdAt.toUTCString().substr(0, 16)}`)
        .addField("**<:HBsearch:783351288149835857> Animated:**", emoji.animated ? "Yes" : "No")
        .setFooter("Helper Bot | Logs", client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(emoji.url)
        .setAuthor(emoji.guild.name, emoji.guild.iconURL({ dynamic: true }))
        .setColor("RANDOM")
    emoji.guild.channels.resolve(ChannelLogs.ChannelID).send(embedEmojiDelete);
}