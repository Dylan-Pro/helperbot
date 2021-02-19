const Discord = require("discord.js");
const prefixSchema = require('../../models/prefix');
const chlogs = require('../../models/setlogs');
const chconf = require('../../models/setconfessions');
const chsugg = require('../../models/setsuggestions');

module.exports = {
    name: "settings",
    aliases: [],
    description: "Displays the current server configuration",
    category: "Utility",
    usage: "settings",
    cooldown: 3,
    run: async (client, message, args) => {

        let customPrefix = await prefixSchema.findOne({ Guild: message.guild.id });
        let newLogs = await chlogs.findOne({ guild: message.guild.id });
        let newConf = await chconf.findOne({ guild: message.guild.id });
        let chsuggestions = await chsugg.findOne({ guild: message.guild.id });

        let a1;
        if(!customPrefix) {
            a1 = 'There is no custom prefix on the server'
        } else {
            a1 = `${customPrefix.Prefix}`
        };

        let a2;
        if(!newLogs) {
            a2 = "There is no channel for logs on the server"
        } else {
            a2 = `<#${newLogs.ChannelID}>`
        };

        let a3;
        if(!newConf) {
            a3 = "There is no channel for confessions on the server"
        } else {
            a3 = `<#${newConf.ChannelID}>`
        };

        let a4;
        if(!chsuggestions) {
            a4 = "There is no channel for suggestions on the server"
        } else {
            a4 = `<#${chsuggestions.ChannelID}>`
        };
        
        const embedSettings = new Discord.MessageEmbed()
            .setTitle("**Server Settings**")
            .setDescription(`<:HBpencil:783351288662327366> **Custom Prefix:** ${a1}\n\n<:HBfile:783351289224101928> **Logs Channel:** ${a2}\n\n<:HBfolder:783351287868817448> **Confessions Channel:** ${a3}\n\n<:HBdirection:783351288154423336> **Suggestions Channel:** ${a4}`)
            .setColor("RANDOM")
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setFooter("Helper Bot | Settings", client.user.displayAvatarURL({ dynamic: true }))
            message.channel.send(embedSettings);
    }
}