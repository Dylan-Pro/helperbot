const Discord = require("discord.js");

module.exports = {
  name: "clear-queue",
  aliases: ["cq"],
  description: "Delete the songs from the queue",
  category: "Music",
  usage: "clear-queue",
  cooldown: 5,
  run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`<:HBminus:783351288515657728> | There is only one song in the queue.`);

        client.player.clearQueue(message);

        message.channel.send(`<:HBchecked:783351288171593728> | The queue has just been **removed**!`);
    },
};