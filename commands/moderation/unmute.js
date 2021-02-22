const Discord = require("discord.js");

module.exports = {
  name: "unmute",
  aliases: [],
  description: "Unmute members",
  category: "Moderation",
  usage: "unmute <mention> (reason)",
  cooldown: 2,
  run: async (client, message, args) => {

    let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let role = message.guild.roles.cache.find(x => x.name === 'Muted');
    let reason = args.slice(1).join(' ') || "Reason not defined"
    if (!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send("<:HBminus:783351288515657728> | You don't have `MUTE_MEMBERS` permission!");
    if (!message.guild.me.permissions.has('MUTE_MEMBERS')) return message.channel.send('<:HBminus:783351288515657728> | I need `MUTE_MEMBERS` permission!');
    if (!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send('<:HBminus:783351288515657728> | I need `MANAGE_ROLES` permission!');
    if (!usuario) return message.channel.send('<:HBminus:783351288515657728> | You have not mentioned any user.');
    if (role && !usuario.roles.cache.has(role.id))
      return message.channel.send('<:HBminus:783351288515657728> | That user is not muted!');


    usuario.roles.remove(role.id)

    const embed = new Discord.MessageEmbed()

      .setTitle(`**${message.guild.name}** | **New Unmute**`)
      .addField('**<:HBuser:783351289114918973> Member Unmuted**', `${usuario.user.tag} | ${usuario.id}`)
      .addField(`**<:HBshield:783351288313937991> Mod/Admin**`, `${message.author.tag}`)
      .addField(`**<:HBinformation:783351288062672896> Reason**`, `${reason}`)
      .setColor(`#11DD00`)
      .setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({ dynamic: true }));
    message.channel.send(embed);

    const embedMuteUser = new Discord.MessageEmbed()
      .setTitle(`**You Have Unmute**`)
      .addField(`**<:HBhouse:783351287940382731> Server**`, `${message.guild.name} | ${message.guild.id}`)
      .addField(`**<:HBuser:783351289114918973> Member Unmuted**`, `${usuario.user.tag} | ${usuario.id}`)
      .addField(`**<:HBshield:783351288313937991> Mod/Admin**`, `${message.author.tag}`)
      .addField(`**<:HBinformation:783351288062672896> Reason**`, `${reason}`)
      .setColor(`#FF0000`)
      .setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({ dynamic: true }))
    usuario.send(embedMuteUser).catch(e => message.channel.send('<:HBminus:783351288515657728> | The Unmuted user has disabled DMs. Therefore I cannot send you information about your unmute.'));

  }
}