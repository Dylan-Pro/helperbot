const Discord = require("discord.js");
const warns = require('../../models/warns');

module.exports = {
  name: "warns",
  aliases: ["warnings"],
  description: "Get a user's warns in the guild",
  category: "Moderation",
  usage: "warnings <User Mention>",
  cooldown: 3,
  run: async (client, message, args) => {

    let user = message.mentions.members.first();
    if(!user) return message.channel.send("<:HBminus:783351288515657728> | You did a mention a user");
    warns.find({ Guild: message.guild.id, User: user.id}, async(err, data) =>{
        if(err) console.log(err)
        if(!data.length) return message.channel.send("<:HBminus:783351288515657728> | This user has no warnings.");
        const embedWarnings = new Discord.MessageEmbed()
        .setTitle(`**${user.user.tag}** | **Warnings**`)
        .setDescription(data.map(d => {
            return d.Warns.map((w, i) =>`\`${i + 1}\` | **Moderator:** ${message.guild.members.cache.get(w.Moderator).user.tag}\n**Reason:** ${w.Reason}\n`)
        }))
        .setColor("#F3FF00")
        .setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({dynamic: true}))
        message.channel.send(embedWarnings)
    })

  }
}