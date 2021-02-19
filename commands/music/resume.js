module.exports = {
    name: "resume",
    aliases: [],
    description: "Unpause the song",
    category: "Music",
    usage: "resume",
    cooldown: 3,
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

        if (!client.player.getQueue(message).paused) return message.channel.send(`<:HBminus:783351288515657728> | The music is already playing!`);

        client.player.resume(message);

        message.channel.send(`<:HBchecked:783351288171593728> | Song **${client.player.getQueue(message).playing.title}** resumed!`);
    },
};