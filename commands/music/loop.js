module.exports = {
    name: "loop",
    aliases: ["lp", "repeat"],
    description: "Repeat a song",
    category: "Music",
    usage: "loop",
    cooldown: 3,
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`<:HBchecked:783351288171593728> | Repeat mode **disabled**!`);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`<:HBchecked:783351288171593728> | Repeat mode **enabled** the whole queue will be repeated endlessly!`);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`<:HBchecked:783351288171593728> | Repeat mode **disabled**!`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`<:HBchecked:783351288171593728> | Repeat mode **enabled** the current music will be repeated endlessly!`);
            };
        };
    },
};