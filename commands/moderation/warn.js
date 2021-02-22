const Discord = require("discord.js");
const warns = require("../../models/warns")

module.exports = {
    name: "warn",
    aliases: [],
    description: "Warn a user",
    category: "Moderation",
    usage: "warn <User> <Reason>",
    cooldown: 3,
    run: async (client, message, args) => {

        var perms = message.member.hasPermission("KICK_MEMBERS");

        if (!perms) return message.channel.send("<:HBminus:783351288515657728> | You don't have `KICK_MEMBERS` permission!");

        let user = message.mentions.members.first();
        if (!user) return message.channel.send("<:HBminus:783351288515657728> | You did a mention a user");

        if (user.id === client.user.id)
            return message.channel.send("<:HBminus:783351288515657728> | I can't warn myself.");

        if (user.id === message.author.id)
            return message.channel.send("<:HBminus:783351288515657728> | You can't warn yourself");

        if (message.guild.ownerID !== message.author.id && user.roles.highest.comparePositionTo(message.member.roles.highest) >= 0)
            return message.channel.send('<:HBminus:783351288515657728> | Based on the role hierarchy, you cannot warn this user.');

        let reason = args.slice(1).join(' ') || "Reason No specify"
        if (reason.length > 100) return message.channel.send('<:HBminus:783351288515657728> | The reason cannot exceed 100 characters.')
        warns.findOne({ Guild: message.guild.id, User: user.id }, async (err, data) => {
            if (err) console.log(err)
            if (!data) {
                let newWarns = new warns({
                    User: user.id,
                    Guild: message.guild.id,
                    Warns: [
                        {

                            Moderator: message.author.id,
                            Reason: reason

                        }
                    ]
                })
                newWarns.save();
                const embedWarn = new Discord.MessageEmbed()
                    .setTitle(`**${message.guild.name}** | **New Warning**`)
                    .addField("**<:HBuser:783351289114918973> Member:**", `${user.user.tag} | ${user.id}`)
                    .addField("**<:HBshield:783351288313937991> Mod/Admin:**", `${message.author.tag} | ${message.author.id}`)
                    .addField("**<:HBsearch:783351288149835857> Reason:**", `${reason}`)
                    .addField("**<:HBclipboard:783351287504044082> Number of warnings:**", "1 warn")
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setColor(`#11DD00`)
                    .setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({ dynamic: true }))
                message.channel.send(embedWarn);

                const embedUserWarn = new Discord.MessageEmbed()
                    .setTitle(`**You Are Warning**`)
                    .addField(`**<:HBhouse:783351287940382731> Server:**`, `${message.guild.name} | ${message.guild.id}`)
                    .addField("**<:HBuser:783351289114918973> Member:**", `${user.user.tag} | ${user.id}`)
                    .addField("**<:HBshield:783351288313937991> Mod/Admin:**", `${message.author.tag} | ${message.author.id}`)
                    .addField("**<:HBsearch:783351288149835857> Reason:**", `${reason}`)
                    .addField("**<:HBclipboard:783351287504044082> Number of warnings:**", "1 warn")
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setColor(`#FF0000`)
                    .setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({ dynamic: true }))
                user.send(embedUserWarn).catch(e => message.channel.send('<:HBminus:783351288515657728> | The warned user has disabled DMs. Therefore I cannot send you information about your warn.'));
            } else {
                data.Warns.unshift({
                    Moderator: message.author.id,
                    Reason: reason
                })
                data.save();
                const embedWarn = new Discord.MessageEmbed()
                    .setTitle(`**${message.guild.name}** | **New Warning**`)
                    .addField("**<:HBuser:783351289114918973> Member:**", `${user.user.tag} | ${user.id}`)
                    .addField("**<:HBshield:783351288313937991> Mod/Admin:**", `${message.author.tag} | ${message.author.id}`)
                    .addField("**<:HBsearch:783351288149835857> Reason:**", `${reason}`)
                    .addField("**<:HBclipboard:783351287504044082> Number of warnings:**", `${data.Warns.length} warnings`)
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setColor(`#11DD00`)
                    .setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({ dynamic: true }))
                message.channel.send(embedWarn);

                const embedUserWarn = new Discord.MessageEmbed()
                    .setTitle(`**You Are Warning**`)
                    .addField(`**<:HBhouse:783351287940382731> Server:**`, `${message.guild.name} | ${message.guild.id}`)
                    .addField("**<:HBuser:783351289114918973> Member:**", `${user.user.tag} | ${user.id}`)
                    .addField("**<:HBshield:783351288313937991> Mod/Admin:**", `${message.author.tag} | ${message.author.id}`)
                    .addField("**<:HBsearch:783351288149835857> Reason:**", `${reason}`)
                    .addField("**<:HBclipboard:783351287504044082> Number of warnings:**", `${data.Warns.length} warnings`)
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setColor(`#FF0000`)
                    .setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({ dynamic: true }))
                user.send(embedUserWarn).catch(e => message.channel.send('<:HBminus:783351288515657728> | The warned user has disabled DMs. Therefore I cannot send you information about your warn.'));
            }
        })

    }
}