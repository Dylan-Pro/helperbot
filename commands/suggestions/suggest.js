const Discord = require("discord.js");
const sugg = require('../../models/setsuggestions');

module.exports = {
  name: "suggest",
  aliases: [],
  description: "Submit a server suggestion to the suggestion channel",
  category: "Suggestions",
  usage: "suggest <suggestion>",
  cooldown: 5,
  run: async (client, message, args) => {

    const suggestionQuery = args.join(' ');

    let channelSugg = await sugg.findOne({ guild: message.guild.id });
    if (!channelSugg) return message.channel.send('<:HBminus:783351288515657728> | There is no established suggestion channel.');

    if (!suggestionQuery) return message.channel.send("<:HBminus:783351288515657728> | Please specify a suggestion! **`(You can add a single image)`**");
    if (suggestionQuery.length > 2000) return message.channel.send("<:HBminus:783351288515657728> | Suggestion cannot exceed **`2000`** characters!");

    let imageDelete = message.attachments.first() ? message.attachments.first().url : null;
    const embedSuggest = new Discord.MessageEmbed()
      .setTitle("__**New Suggestion**__")
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter("Helper Bot | Suggestions", client.user.displayAvatarURL())
      .setDescription(`**Suggestion:**\n${suggestionQuery}`)
      .setImage(imageDelete)
      .setColor("#FF8000");

      message.delete().catch(err => message.channel.send(`<:HBwarning:783351287944970251> | I do not have permission to delete the message`)).then(msg => msg.delete({timeout: 4000}));
    message.channel.send("<:HBchecked:783351288171593728> | Suggestion was sent successfully!").then(x => x.delete({ timeout: 9000 }));

    client.channels.cache.get(channelSugg.ChannelID).send(embedSuggest);

  }
}