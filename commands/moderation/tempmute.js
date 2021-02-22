const Discord = require("discord.js");
const ms = require('ms');
const MuteDB = require("../../models/SystemMute.js");

module.exports = {
    name: "tempmute",
    aliases: ["tmute"],
    description: "Temporarily mute a member",
    category: "Moderation",
    usage: "tempmute <mention> <1h>",
    cooldown: 3,
    run: async (client, message, args) => {

        if (!message.member.permissions.has("MUTE_MEMBERS")) return message.channel.send("<:HBminus:783351288515657728> | You don't have `MUTE_MEMBERS` permission!");

        if (!message.guild.me.permissions.has("MUTE_MEMBERS"))
            return message.channel.send('<:HBminus:783351288515657728> | I need `MUTE_MEMBERS` permission!');

        if (!message.guild.me.permissions.has("MANAGE_ROLES"))
            return message.channel.send('<:HBminus:783351288515657728> | I need `MANAGE_ROLES` permission!');

        let user = message.mentions.users.first();

        if (!user) return message.channel.send("<:HBminus:783351288515657728> | You must mention a member");

        if (user.id === client.user.id)
            return message.channel.send("<:HBminus:783351288515657728> | I can't mute myself.");

        if (user.id === message.author.id)
            return message.channel.send("<:HBminus:783351288515657728> | You can't mute yourself");


        let data = await MuteDB.findOne({ userID: user.id });

        if (data) return message.channel.send("<:HBminus:783351288515657728> | That member is already muted");

        let time = args.slice(1).join(' ');

        if (!time) return message.channel.send("<:HBminus:783351288515657728> | Enter a time");

        let rolMute;
        if (message.guild.roles.cache.find(x => x.name == "Muted")) {
            rolMute = message.guild.roles.cache.find(x => x.name == "Muted").id
        } else {
            let a = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#979797'
                }
            })
            rolMute = a.id
        }
        message.guild.channels.cache.forEach(async (channel) => {
            await channel.updateOverwrite(rolMute, {
                SEND_MESSAGES: false,
            });
        });
        message.guild.member(user).roles.add(rolMute)
        const embedMute = new Discord.MessageEmbed()
            .setTitle("**__Memeber Mute__**")
            .addField("**<:HBuser:783351289114918973> Member Muted:**", `${user} | ${user.id}`)
            .addField("**<:HBshield:783351288313937991> Mod/Admin:**", `${message.author} | ${message.author.id}`)
            .addField("**<:HBrefresh:783351288292442183> Mute Time:**", `${ms(ms(time))}`)
            .setColor("#00FF13")
        message.channel.send(embedMute);

        const embedUserMute = new Discord.MessageEmbed()
            .setTitle("**__You are Muted__**")
            .addField("**<:HBuser:783351289114918973> Member Muted:**", `${user} | ${user.id}`)
            .addField("**<:HBshield:783351288313937991> Mod/Admin:**", `${message.author} | ${message.author.id}`)
            .addField("**<:HBrefresh:783351288292442183> Mute Time:**", `${ms(ms(time))}`)
            .setColor("#FF0000")
        user.send(embedUserMute).catch(e => message.channel.send('<:HBminus:783351288515657728> | The warned user has disabled DMs. Therefore I cannot send you information about your mute.'));
        let wc = new MuteDB({ guildID: message.guild.id, userID: user.id, rolID: rolMute, time: Date.now() + ms(time) }) //Creamos una colección en la DB con los datos
        await wc.save();

    }
}