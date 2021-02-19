const Discord = require('discord.js');

module.exports = (client, message, queue) => {
    const embedChannelEmpty = new Discord.MessageEmbed()
    .setColor("#FFFB00")
    .setDescription("<:HBwarning:783351287944970251> | Music stopped as there is no more member in the voice channel!")
    message.channel.send(embedChannelEmpty);
};