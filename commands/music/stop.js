const Discord = require('discord.js');

module.exports = {
    name: "stop",
    aliases: ["dc"],
    description: "Stop a song",
    category: "Music",
    usage: "stop",
    cooldown: 2,
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

        client.player.setRepeatMode(message, false);
        client.player.stop(message);

        const embedQueueEnd = new Discord.MessageEmbed()
        .setColor("#FF00F7")
        .setDescription("Playlist empty! I'm leaving the voice channel...")
        message.channel.send(embedQueueEnd);
    },
};