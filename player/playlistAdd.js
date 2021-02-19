const Discord = require('discord.js');

module.exports = (client, message, queue, playlist) => {
    const embedNewPlayList = new Discord.MessageEmbed()
    .setAuthor("<a:esperando:781188590477901845> | Playlist add", message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`**[${playlist.title}](${playlist.url})** has been added to the queue! [**${playlist.tracks.length}** songs]`)
    .setColor("#FF8700")
    message.channel.send(embedNewPlayList);
};