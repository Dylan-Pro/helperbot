    module.exports = {
        name: "skip",
        aliases: ["sk"],
        description: "Skip a song",
        category: "Music",
        usage: "skip",
        cooldown: 2,
        run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

        client.player.skip(message);

        message.channel.send(`<:HBchecked:783351288171593728> | The current music has just been **skipped**!`);
    },
};