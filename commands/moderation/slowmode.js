const Discord = require("discord.js");
const ms = require("ms");
const humanize = require("humanize-duration");

module.exports = {
    name: "slowmode",
    aliases: ["slow"],
    description: "Activate **slowmode** on a channel",
    category: "Moderation",
    usage: "slowmode <#channel> <time>",
    cooldown: 3,
    run: async (client, message, args, p) => {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("<:HBminus:783351288515657728> | You don't have `MANAGE_CHANNELS` permission!");

        if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send('<:HBminus:783351288515657728> | I need the \`MANAGE_CHANNELS\` permission.');

        const channelXD = message.mentions.channels.first();

        if (!channelXD) return message.channel.send('<:HBminus:783351288515657728> | You must mention a channel.');

        if (!message.guild.channels.cache.get(channelXD.id)) return message.channel.send("<:HBminus:783351288515657728> | That channel is not from this server.");

        if (!channelXD.permissionsFor(client.user).has('VIEW_CHANNEL')) return message.channel.send("<:HBminus:783351288515657728> | I don't have permission \`VIEW_CHANNEL\` on the channel mentioned.");

        if (!channelXD.permissionsFor(client.user).has('SEND_MESSAGES')) return message.channel.send("<:HBminus:783351288515657728> | I don't have permission \`SEND_MESSAGES\` on the channel mentioned.");

        let time = channelXD ? args[1] : args[0];

        if (time === "off" || time === "reset") {
            if (channelXD.rateLimitPerUser < 1) return message.channel.send("<:HBminus:783351288515657728> | That chat does not have `slowmode`!");
            await channelXD.setRateLimitPerUser(0);
            const embedSlowmodeOff = new Discord.MessageEmbed()
                .setDescription(`<#${channelXD.id}> **\`slowmode\`** has been deactivated!`)
                .setColor("RANDOM")
            return message.channel.send(embedSlowmodeOff);
        }

        if (!time) return message.channel.send("<:HBminus:783351288515657728> | Please insert a time. **`Example: (30m | 90m | 105m)`** ");

        let toMS = ms(time);
        let result = Math.floor(toMS / 1000);

        if (!result) return message.channel.send("<:HBminus:783351288515657728> | Please insert a **`valid`** time. **`Example: (30m | 90m | 105m)`** ");
        if (result > 21600) return message.channel.send("<:HBminus:783351288515657728> | Time should be less than or equal to 6 hours!");
        else if (result < 1) return message.channel.send("<:HBminus:783351288515657728> | Time should be less than or equal to 1 second! `(or, use " + p + "slowmode off)`");

        await channelXD.setRateLimitPerUser(result);

        const embedSlowmode = new Discord.MessageEmbed()
            .setDescription(`<#${channelXD.id}> is now in **\`slow motion\`** for **\`${humanize(toMS)}\`**!`)
            .setColor("RANDOM")
        message.channel.send(embedSlowmode);

    }
}