const Discord = require('discord.js');
const Logs = require('../models/setlogs');

module.exports = async (client, oldMessage, newMessage) => {
    if(newMessage.partial) return;
    if(newMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;
    client.editsnipes.set(newMessage.channel.id, {
        oldmessage: oldMessage,
        newmessage: newMessage,
        channel: newMessage.channel.id,
        av: newMessage.author.displayAvatarURL({ dynamic: true }),
        author: oldMessage.author.tag
    });
    let ChannelLogs = await Logs.findOne({ guild: newMessage.guild.id });
    if (!ChannelLogs) return;

    const embedMessageUptade = new Discord.MessageEmbed()
        .setTitle("__**MessageUpdate**__")
        .setColor("RANDOM")
        .addField("<:HBuser:783351289114918973> **Message Author:**", `${oldMessage.author} | ${oldMessage.author.id}`)
        .addField("<:HBfolder:783351287868817448> **Channel:**", `<#${newMessage.channel.id}> | ${newMessage.channel.id}`)
        .addField("<:HBchat:806684699032158228> **Message URL:**", `[Click here](${newMessage.url})`)
        .addField("<:HBback:783351288091901952> **Old Message:**", `${oldMessage.content}`)
        .addField("<:HBnext:783351287692394536> **New Message:**", `${newMessage.content}`)
        .setFooter("Helper Bot | Logs", client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
        .setAuthor(newMessage.guild.name, newMessage.guild.iconURL({dynamic: true}))
        newMessage.guild.channels.resolve(ChannelLogs.ChannelID).send(embedMessageUptade);
};