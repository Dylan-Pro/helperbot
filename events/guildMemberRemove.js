const Discord = require('discord.js');
const Logs = require('../models/setlogs');

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

module.exports = async (client, member) => {
    if (member.user.bot) return;

    let ChannelLogs = await Logs.findOne({ guild: member.guild.id });
    if (!ChannelLogs) return;

    const embedRemoveMember = new Discord.MessageEmbed()
        .setTitle("<:HBback:783351288091901952> | Outgoing Member")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField("<:HBuser:783351289114918973> **User tag:**", `${member.user.tag}`)
        .addField("<:HBinformation:783351288062672896> **User ID:**", `${member.user.id}`)
        .addField("<:HBagenda:783351287847845890> **Account Create:**", `${member.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(member.user.createdAt)})`)
        .setFooter("Helper Bot | Logs", client.user.displayAvatarURL())
        .setColor("#FF0000")
    member.guild.channels.resolve(ChannelLogs.ChannelID).send(embedRemoveMember);
};