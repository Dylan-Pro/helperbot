const Discord = require("discord.js");

module.exports = {
    name: "banlist",
    aliases: [],
    description: "Server banned user list",
    category: "Moderation",
    usage: "banlist",
    cooldown: 3,
    run: async (client, message, args) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("<:HBminus:783351288515657728> | You don't have `BAN_MEMBERS` permission!");
        if (!message.guild.me.permissions.has("VIEW_AUDIT_LOG")) return message.channel.send("<:HBminus:783351288515657728> | I need `VIEW_AUDIT_LOG` permission!");

        const fetchBans = message.guild.fetchBans();

        if (!fetchBans < 1) return message.channel.send("<:HBminus:783351288515657728> | Has no bannned users!");

        let i = 0;
        const bannedMembers = message.guild.fetchBans().then(a=>a.map((b)=>`**${++i}** - ${b.user.tag} [${b.user.id}]`));
        const embedBannedMemebers = new Discord.MessageEmbed()
            .setDescription(await bannedMembers)
            .setColor("#FF0000");
        message.channel.send(embedBannedMemebers);

    }
}