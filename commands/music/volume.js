module.exports = {
    name: "volume",
    aliases: [],
    description: "Change the volume of songs",
    category: "Music",
    usage: "volume [0-100]",
    cooldown: 3,
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`<:HBminus:783351288515657728> | Please enter a valid number!`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`<:HBminus:783351288515657728> | Please enter a valid number (between 1 and 100)!`);

        client.player.setVolume(message, parseInt(args[0]));

        message.channel.send(`<:HBvolume:783351287734730814> | Volume set to **${parseInt(args[0])}%** !`);
    },
};