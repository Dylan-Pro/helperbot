module.exports = {
    name: "play",
    aliases: ["p"],
    description: "Play a song",
    category: "Music",
    usage: "play [name/URL]",
    cooldown: 2,
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel !`);

        if (!args[0]) return message.channel.send(`<:HBminus:783351288515657728> | Please indicate the title of a song !`);

        client.player.play(message, args.join(" "), { firstResult: true });
    },
};