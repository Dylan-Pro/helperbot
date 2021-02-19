const Discord = require('discord.js');
const Logs = require('../models/setlogs');

module.exports = async (client, role) => {
  if (!role.guild) return;

  let ChannelLogs = await Logs.findOne({ guild: role.guild.id });
  if (!ChannelLogs) return;

  if (!role.guild.member(client.user).permissions.has('VIEW_AUDIT_LOG')) return;

  role.guild.fetchAuditLogs().then(logs => {

    let userID = logs.entries.first().executor.id;

    let tag = logs.entries.first().executor.tag
    let msgChannel = new Discord.MessageEmbed()
      .setAuthor(role.guild.name, role.guild.iconURL({ dynamic: true }))
      .setTitle('__**RoleCreate**__')
      .setColor("RANDOM")
      .addField("<:HBinformation:783351288062672896> **Role Name:**", `${role.name} | ${role.id}`)
      .addField("<:HBrefresh:783351288292442183> **Create at:**", `${role.createdAt.toUTCString().substr(0, 16)}`)
      .addField("<:HBuser:783351289114918973> **Create by:**", `${tag} | ${userID}`)
      .addField("<:HBwarning:783351287944970251> **Mentionable:**", role.mentionable ? "Yes" : "No")
      .addField("<:HBshield:783351288313937991> **Role HexColor:**", role.hexColor)
      .addField("<:HBsearch:783351288149835857> **Role Permissions:**", `\`\`\`\n${role.permissions.toArray().join(", ")}\n\`\`\``)
      .setThumbnail(role.guild.iconURL({ dynamic: true }))
      .setFooter("Helper Bot | Logs", client.user.displayAvatarURL())
    role.guild.channels.resolve(ChannelLogs.ChannelID).send(msgChannel);

  })
};