const Discord = require("discord.js");

module.exports = {
  name: "kick",
  aliases: [],
  description: "Kick a member from the server",
  category: "Moderation",
  usage: "kick <mention> (reason)",
  cooldown: 5,
  run: async (client, message, args, p) => {

    let user = message.mentions.members.first();
    let razon = args.join(" ") || "Reason Not Specified";

    var perms = message.member.hasPermission("KICK_MEMBERS");

    if (!perms) {
      return message.channel.send("<:HBminus:783351288515657728> | You don't have `KICK_MEMBERS` permission!")
    }

    if (!message.guild.me.permissions.has("KICK_MEMBERS"))
      return message.channel.send('<:HBminus:783351288515657728> | I need the `KICK_MEMBERS` permission.');

    if (!user)
      return message.channel.send('<:HBminus:783351288515657728> | You must mention someone.').catch(console.error);

    if (user.id === client.user.id) {
      return message.channel.send("<:HBminus:783351288515657728> | I can't kick myself.")
    }

    if (user.id === message.author.id) {
      return message.channel.send("<:HBminus:783351288515657728> | You can't kick yourself")
    }

    if (message.mentions.users.size < 1) return message.reply('Mention 1 single user').catch(console.error);

    if (!razon) return message.channel.send('<:HBminus:783351288515657728> | Enter a reason, `' + p + 'kick @mention [reason]`');


    if (razon.length > 100) return message.channel.send('<:HBminus:783351288515657728> | The reason cannot exceed 100 characters.')


    if (!message.guild.member(user).kickable) return message.reply("I can't kick the mentioned user.");


    const embedKick = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name} | New Kick`)
      .addField(`**<:HBuser:783351289114918973> Kicked user**`, `${user.user.tag} | ${user.id}`)
      .addField(`**<:HBshield:783351288313937991> Mod/Admin**`, `${message.author.tag}`)
      .addField(`**<:HBinformation:783351288062672896> Reason**`, `${razon}`)
      .setColor(`#11DD00`)
      .setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({ dynamic: true }))

    message.channel.send(embedKick);

    const embedKickUser = new Discord.MessageEmbed()
      .setTitle(`**You Have Kicked**`)
      .addField(`**<:HBhouse:783351287940382731> Server**`, `${message.guild.name} | ${message.guild.id}`)
      .addField(`**<:HBuser:783351289114918973> Kicked user**`, `${user.user.tag} | ${user.id}`)
      .addField(`**<:HBshield:783351288313937991> Mod/Admin**`, `${message.author.tag}`)
      .addField(`**<:HBinformation:783351288062672896> Reason**`, `${razon}`)
      .setColor(`#FF0000`)
      .setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({ dynamic: true }))
    user.send(embedKickUser).catch(e => message.channel.send('<:HBminus:783351288515657728> | The kicked user has disabled DMs. Therefore I cannot send you information about your kick.'));
    message.guild.member(user).kick(razon);

  }
}