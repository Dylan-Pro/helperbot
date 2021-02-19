const Discord = require('discord.js');

module.exports = (client, message, queue, track) => {
    const embedNewSong = new Discord.MessageEmbed()
    .setTitle("<a:esperando:781188590477901845> | Track Add")
    .setDescription(`[${track.title}](${track.url}) [${track.duration}]`)
    .setColor("#0013FF")
    .setFooter(`🔊 Volume: ${client.player.getQueue(message).volume}% | 👀 Views: ${track.views}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embedNewSong);
};