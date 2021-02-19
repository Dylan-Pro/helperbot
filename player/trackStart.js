const Discord = require("discord.js");

module.exports = (client, message, track) => {
    const embedNowPlay = new Discord.MessageEmbed()
    .setTitle("<a:cdmusic:781188506981498891> | Track Start")
    .setDescription(`[${track.title}](${track.url}) [${track.duration}]`)
    .setColor("#FF0000")
    .setFooter(`🔊 Volume: ${client.player.getQueue(message).volume}% | 👀 Views: ${track.views}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embedNowPlay);
};