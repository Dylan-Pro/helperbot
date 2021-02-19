const Discord = require('discord.js');

module.exports = (client, message, queue) => {
    const embedQueueEnd = new Discord.MessageEmbed()
    .setColor("#FF00F7")
    .setDescription("<:HBwarning:783351287944970251> | Playlist empty! I'm leaving the voice channel...")
    message.channel.send(embedQueueEnd);
};