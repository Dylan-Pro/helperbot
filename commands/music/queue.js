module.exports = {
    name: "queue",
    aliases: [],
    description: "Shows the song queue of a server",
    category: "Music",
    usage: "queue",
    cooldown: 3,
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No songs currently playing!`);

        message.channel.send(`<:HBhouse:783351287940382731> **Server queue - ${message.guild.name} <:HBfile:783351289224101928> ${client.player.getQueue(message).loopMode ? '(looped)' : ''}**\nCurrent : **${queue.playing.title}**\n\n` + (queue.tracks.map((track, i) => {
            return `\`${i + 1}\` - **${track.title}** (requested by: **${track.requestedBy.tag}**)`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** more songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`));
    },
};