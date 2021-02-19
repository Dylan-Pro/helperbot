const Discord = require("discord.js");

module.exports = {
    name: "rolelist",
    aliases: [],
    description: "Watch a role list on the server",
    category: "Utility",
    usage: "rolelist",
    cooldown: 5,
    run: async (client, message, args) => {

        if (message.guild.roles.cache.size < 1) return message.channel.send('<:HBminus:783351288515657728> | There are no roles on the server.');

        let roles = []

        message.guild.roles.cache.map(x => roles.push(`<@&${x.id}>`));

        const emebdRoleList = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} | Roles`)
            .addField("<:HBhouse:783351287940382731> Server role list", roles[0] ? roles.slice(0, 10).join('\n') : 'Has No Roles')
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setFooter("Helper Bot | Utility System", client.user.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM");

        let x = await message.channel.send(emebdRoleList)
        await x.react('783351288091901952')
        await x.react('783351287868817419')
        await x.react('783351287692394536')

        let i = 0;
        let i2 = 10;


        let filtro = (reaction, user) => ['783351288091901952', '783351287868817419', '783351287692394536'].includes(reaction.emoji.id) && user.id === message.author.id;

        let colector = x.createReactionCollector(filtro, { time: 20000, max: 5 });

        colector.on('collect', reaction => {
            switch (reaction.emoji.id) {
                case "783351288091901952":
                    if (i > 1) {
                        i -= 10
                        i2 -= 10

                        const emebdRoleList2 = new Discord.MessageEmbed()
                        .setTitle(`${message.guild.name} | Roles`)
                        .addField("<:HBhouse:783351287940382731> Server role list", roles[0] ? roles.slice(i, i2).join('\n') : 'Has No Roles')
                        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                        .setFooter("Helper Bot | Utility System", client.user.displayAvatarURL({ dynamic: true }))
                        .setColor("RANDOM");
                        x.edit(emebdRoleList2)
                    }
                    break;
                case "783351287868817419":
                    colector.stop()
                    x.reactions.removeAll().catch(e => message.channel.send("<:HBwarning:783351287944970251> | I do not have the permission to remove the reactions"))
                    break;
                case "783351287692394536":
                    if (roles.slice(i, i2 + 1)[roles.slice(i, i2 + 1).length - 1] !== roles[roles.length - 1]) {
                        i += 10
                        i2 += 10

                        const emebdRoleList3 = new Discord.MessageEmbed()
                        .setTitle(`${message.guild.name} | Roles`)
                        .addField("<:HBhouse:783351287940382731> Server role list", roles[0] ? roles.slice(i, i2).join('\n') : 'Has No Roles')
                        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                        .setFooter("Helper Bot | Utility System", client.user.displayAvatarURL({ dynamic: true }))
                        .setColor("RANDOM")

                        x.edit(emebdRoleList3)
                    }
                    break;
            }
        })
    }

}