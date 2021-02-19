const Discord = require('discord.js');

module.exports = {
    name: "shuffle",
    aliases: ["sh"],
    description: "Shows the number of songs playing",
    category: "Music",
    usage: "shuffle",
    cooldown: 3,
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

        client.player.shuffle(message);
        const embedShuffle = new Discord.MessageEmbed()
        .setAuthor("| Queue shuffled", message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**${client.player.getQueue(message).tracks.length}** song(s)!`)
        .setColor("RANDOM")
        return message.channel.send(embedShuffle);
    },
};