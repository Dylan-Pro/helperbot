const Discord = require("discord.js");
const sugg = require('../../models/setsuggestions');

module.exports = {
    name: "accept-suggestion",
    aliases: ["accept"],
    description: "Accept a server suggestion",
    category: "Suggestions",
    usage: "accept-suggestion <message-suggest-ID> <reason>",
    cooldown: 2,
    run: async (client, message, args, p) => {
        const messageID = args[0];
        const acceptSuggestionQuery = args.slice(1).join(' ');

        let channelSugg = await sugg.findOne({ guild: message.guild.id });
        if (!channelSugg) return message.channel.send('<:HBminus:783351288515657728> | There is no established suggestion channel.');

        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("<:HBminus:783351288515657728> | I'm sorry, but you don't have the `MANAGE_MESSAGES` permission to use that command.");
        if (!messageID) return message.channel.send("<:HBminus:783351288515657728> | Enter the ID of a suggestion. **`(You can use " + p + "help accept)`**");

        try {
            const suggestionChannel = message.guild.channels.cache.get(channelSugg.ChannelID);
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
            if (!suggestedEmbed) return message.channel.send("<:HBminus:783351288515657728> | Please enter a valid ID!")

            const data = suggestedEmbed.embeds[0];

            let images = data.image ? data.image.proxyURL : null;
            const acceptEmbed = new Discord.MessageEmbed()
                .setAuthor(data.author.name, data.author.iconURL)
                .setTitle("__**Suggestion accepted**__")
                .setThumbnail(data.thumbnail.url)
                .setDescription(data.description)
                .setImage(images)
                .setColor("#13FF00")
                .addField("Status (ACCEPTED)", acceptSuggestionQuery || "Has no reason")
                .addField("Accept by", message.author)

            message.channel.send("<:HBchecked:783351288171593728> | Suggestion approved successfully!").then(x => x.delete({ timeout: 6000 }));
            suggestedEmbed.edit(acceptEmbed).catch(err => message.channel.send("<:HBminus:783351288515657728> | That message is not a suggestion `1`"));
            const user = client.users.cache.find((u) => u.tag === data.author.name);
            user.send(`<:HBchecked:783351288171593728> | Your suggestion has been accepted by: **\`${message.author.tag}\`**!`).catch(error => message.channel.send("<:HBminus:783351288515657728> | The author of the suggestion has closed DM's, so I cannot tell you that your suggestion was accepted."));
        } catch (err) {
            message.channel.send("<:HBminus:783351288515657728> | That message is not a suggestion `2`")
        };
    }
}