const Discord = require("discord.js");

module.exports = {
  name: "filter",
  aliases: [],
  description: "Activate a filter",
  category: "Music",
  usage: "filter [filter]",
  cooldown: 2,
  run: async (client, message, args, p) => {


    if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

    if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

    if (!args[0]) return message.channel.send(`<:HBminus:783351288515657728> | Please specify a valid filter to enable or disable!`);

    const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

    if (!filterToUpdate) return message.channel.send(`<:HBminus:783351288515657728> | That filter doesn't exist, use \`${p}filters\` to see the filter list!`);

    const filtersUpdated = {};

    filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

    client.player.setFilters(message, filtersUpdated);

    if (filtersUpdated[filterToUpdate]) message.channel.send(`<:HBchecked:783351288171593728> | I'm **adding** the filter to the music, please wait...`);
    else message.channel.send(`<:HBchecked:783351288171593728> | I'm **disabling** the filter on the music, please wait...`);

  }
}