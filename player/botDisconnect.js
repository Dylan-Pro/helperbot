const Discord = require('discord.js')

module.exports = (client, message, queue) => {
    const embedQueueEnd = new Discord.MessageEmbed()
    .setColor("#7400FF")
    .setDescription("<:HBwarning:783351287944970251> | I was taken off the voice channel")
    message.channel.send(embedQueueEnd);
};