const Discord = require("discord.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "Ban a member from the server",
  category: "Moderation",
  usage: "ban <mention> (reason)",
  cooldown: 4,
  run: async (client, message, args) => {

    let user = message.mentions.members.first()
    let razon = args.slice(1).join(" ") || "Reason Not Specified";

    let perms = message.member.hasPermission("BAN_MEMBERS");
    if (!perms) return message.channel.send("<:HBminus:783351288515657728> | You don't have `BAN_MEMBERS` permission!");

    if (!message.guild.me.permissions.has('BAN_MEMBERS'))
      return message.channel.send("<:HBminus:783351288515657728> | I need `BAN_MEMBERS` permission!");

    if (!user)
      return message.channel.send('<:HBminus:783351288515657728> | You must mention someone.').catch(console.error);

    if (user.id === message.author.id) return message.channel.send("<:HBminus:783351288515657728> | You can't ban yourself");

    if (user.id === client.user.id) return message.channel.send("<:HBminus:783351288515657728> | I can't ban myself.");

    if (message.guild.ownerID !== message.author.id && user.roles.highest.comparePositionTo(message.member.roles.highest) >= 0)
      return message.channel.send('<:HBminus:783351288515657728> | Based on the role hierarchy, you cannot ban this user.');

    if (razon.length > 100) return message.channel.send('<:HBminus:783351288515657728> | The reason cannot exceed 100 characters.');

    if (!message.guild.member(user).bannable) return message.reply('I cannot ban the mentioned user.');

    message.guild.members.ban(user, { reason: razon })
    const embedBan = new Discord.MessageEmbed()
      .setTitle(`Helper Bot | New Ban <:ban:360209986040758273>`)
      .setThumbnail(user.user.displayAvatarURL())
      .addField("User:", `${user}`)
      .addField("ID:", `${user.id}`)
      .addField("Reason:", `${razon}`)
      .addField("Mod/Admin:", `${message.author.tag}`)
      .setFooter("Helper Bot | Moderation System", message.author.avatarURL)
      .setColor(0xff001e)

    message.channel.send(embedBan);

    const embedUserBan = new Discord.MessageEmbed()
      .setTitle(`**You Have Banned**`)
      .setThumbnail(user.user.displayAvatarURL())
      .addField("Server:", `${message.guild.name}`)
      .addField("User:", `${user}`)
      .addField("ID:", `${user.id}`)
      .addField("Reason:", `${razon}`)
      .addField("Mod/Admin:", `${message.author.tag}`)
      .setFooter("Helper Bot | Moderation System", message.author.avatarURL)
      .setColor(0xff001e)

    user.send(embedUserBan).catch(e => message.channel.send('<:HBwarning:783351287944970251> | The warned user has disabled DMs. Therefore I cannot send you information about your ban.'))

  }
}