const Discord = require("discord.js");

module.exports = {
  name: "snipe",
  aliases: ["ms"],
  description: "Show the last deleted message",
  category: "Utility",
  usage: "snipe",
  cooldown: 3,
  run: async (client, message, args) => {

    let msg = client.snipes.get(message.channel.id);
    if(!msg) return message.channel.send('<:HBminus:783351288515657728> | I have not seen a deleted message.');
    
    const embedSnipe = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.avatar)
    .addField('<:HBclipboard:783351287504044082> **Channel:**', `<#${msg.channel}>`)
    .addField("<:HBtrash:783351287504437280> **Message Deleted:**", `${msg.content || `[Attachment Link](${msg.image})`}`)
    .setFooter("Helper Bot | Snipe", client.user.displayAvatarURL())
    .setColor("RANDOM")
    message.channel.send(embedSnipe);

  }
}
