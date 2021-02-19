const Discord = require('discord.js');
const Logs = require('../models/setlogs');

module.exports = async (client, oldRole, newRole) => {

  if (!newRole.guild) return;

  let ChannelLogs = await Logs.findOne({ guild: oldRole.guild.id });
  if (!ChannelLogs) return;

  if (!oldRole.guild.member(client.user).permissions.has('VIEW_AUDIT_LOG')) return;

  oldRole.guild.fetchAuditLogs().then(logs => {

    let userID = logs.entries.first().executor.id;

    let tag = logs.entries.first().executor.tag;
    if (oldRole.name !== newRole.name) {
      const msgChannel = new Discord.MessageEmbed()
        .setAuthor(oldRole.guild.name, oldRole.guild.iconURL({ dynamic: true }))
        .setTitle('__**RoleUpdate**__')
        .setColor("RANDOM")
        .addField("<:HBback:783351288091901952> **Old Role Name:**", `${oldRole.name}`)
        .addField("<:HBnext:783351287692394536> **New Role Name:**", `${newRole.name}`)
        .addField("<:HBrefresh:783351288292442183> **Create at:**", `${oldRole.createdAt.toUTCString().substr(0, 16)}`)
        .addField("<:HBuser:783351289114918973> **Edited by:**", `${tag} | ${userID}`)
        .addField("<:HBwarning:783351287944970251> **Mentionable:**", newRole.mentionable ? "Yes" : "No")
        .addField("<:HBshield:783351288313937991> **Role HexColor:**", newRole.hexColor)
        .addField("<:HBsearch:783351288149835857> **Role Permissions:**", `\`\`\`\n${newRole.permissions.toArray().join(", ")}\n\`\`\``)
        .setThumbnail(oldRole.guild.iconURL({ dynamic: true }))
        .setFooter("Helper Bot | Logs", client.user.displayAvatarURL())
      newRole.guild.channels.resolve(ChannelLogs.ChannelID).send(msgChannel);
    }
  })

  const p1 = newRole.permissions;
  const p2 = newRole.permissions
  if (p1.equals(p2)) return;
  const r1 = p1.missing(p2)

  const r2 = p2.missing(p1)
  if (!oldRole.guild.member(client.user).permissions.has('VIEW_AUDIT_LOG')) return;
  oldRole.guild.fetchAuditLogs().then(logs => {
    let userID = logs.entries.first().executor.id;
    const rolPermissionsUpdate = new Discord.MessageEmbed()
      .setAuthor(oldRole.guild.name, oldRole.guild.iconURL({ dynamic: true }))
      .setThumbnail(oldRole.guild.iconURL({ dynamic: true }))
      .setTitle("__**RoleUpdate**__")
      .addField("<:HBinformation:783351288062672896> **Rol Name:**", `${oldRole.name} | ${oldRole.id}`)
      .setColor("RANDOM")
      .setFooter("Helper Bot | Logs", client.user.displayAvatarURL())
      .addField("<:HBnext:783351287692394536> **Added permissions:**", `\`\`\`\n${r1.join(", ") || "Has no added permissions"}\n\`\`\``)
      .addField("<:HBprohibition:783351287868817419> **Permissions removed:**", `\`\`\`\n${r2.join(", ") || "Has no removed permissions"}\n\`\`\``)
    oldRole.guild.channels.resolve(ChannelLogs.ChannelID).send(rolPermissionsUpdate)
  })
};