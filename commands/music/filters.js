const Discord = require("discord.js");

module.exports = {
  name: "filters",
  aliases: [],
  description: "Show filter list",
  category: "Music",
  usage: "filters",
  cooldown: 2,
  run: async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

    const filtersStatuses = [[], []];

    client.filters.forEach((filterName) => {
        const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
        array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ? "<:HBchecked:783351288171593728>" : "<:HBminus:783351288515657728>"));
    });

    
    const embeFilters = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("__**Filter List**__")
        .setDescription(filtersStatuses[0].join('\n'))
        .addField("\u200b", filtersStatuses[1].join('\n'))
        .setFooter("Helper Bot | Music", client.user.displayAvatarURL())
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
    message.channel.send(embeFilters);
  }
}