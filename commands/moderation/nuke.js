const Discord = require("discord.js");

module.exports = {
    name: "nuke",
    aliases: [],
    description: "Clone a server channel",
    category: "Moderation",
    usage: "nuke",
    cooldown: 3,
    run: async (client, message, args) => {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("<:HBminus:783351288515657728> | You don't have `MANAGE_CHANNELS` permission!");
        if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send("<:HBminus:783351288515657728> | I need `MANAGE_CHANNELS` permission!");
        try {
            message.channel.clone().then((ch) => {
                ch.setParent(message.channel.parent.id);
                ch.setPosition(message.channel.position);
                ch.setTopic(message.channel.topic);
                ch.setNSFW(message.channel.nsfw);
                ch.setRateLimitPerUser(message.channel.rateLimitPerUser);
                message.channel.delete();

                const embedChNuked = new Discord.MessageEmbed()
                    .setDescription(`<#${ch.id}> was nuked! <:HBtrash:783351287504437280>`)
                    .setColor("#0FFF00")
                ch.send(embedChNuked);

            })
        } catch (e) {
            message.channel.send(`<:HBwarning:783351287944970251> | **${e.name}:** ${e.message}`);
        }
    }
}