const Discord = require("discord.js");
const Logs = require("../models/setlogs");

module.exports = async (client, oldEmoji, newEmoji) => {
    let ChannelLogs = await Logs.findOne({ guild: newEmoji.guild.id });
    if (!ChannelLogs) return;

    if (!oldEmoji.guild) return;
    if (!newEmoji.guild) return;

    oldEmoji.guild.fetchAuditLogs().then(logs => {

        let userID = logs.entries.first().executor.id;

        let a1;
        if(!userID) {
            a1 = "I can't see who deleted it"
        } else {
            a1 = `${client.users.cache.get(userID).tag}`
        };

        if (oldEmoji.name !== newEmoji.name) {

            const embedEmojiUpdate = new Discord.MessageEmbed()
                .setThumbnail(newEmoji.url)
                .setAuthor(newEmoji.guild.name, newEmoji.guild.iconURL({ dynamic: true }))
                .setTitle("__**EmojiUpdate**__")
                .addField(`<:HBback:783351288091901952> **Old name:**`, `${oldEmoji.name}`)
                .addField(`<:HBnext:783351287692394536> **New name:**`, `${newEmoji.name}`)
                .addField(`<:HBsearch:783351288149835857> **Animated:**`, newEmoji.animated ? "Yes" : "No")
                .addField("<:HBrefresh:783351288292442183> **Created At:**", `${newEmoji.createdAt.toUTCString().substr(0, 16)}`)
                .addField(`<:HBuser:783351289114918973> **Edited by:**`, `${a1}`)
                .setColor("RANDOM")
                .setFooter("Helper Bot | Logs", client.user.displayAvatarURL())
            newEmoji.guild.channels.resolve(ChannelLogs.ChannelID).send(embedEmojiUpdate)
        }
    })
}