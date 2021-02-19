const Discord = require("discord.js");

module.exports = {
  name: "editsnipe",
  aliases: [],
  description: "Watch a ultimate edit message",
  category: "Utility",
  usage: "editsnipe",
  cooldown: 3,
  run: async (client, message, args) => {

    let msg = client.editsnipes.get(message.channel.id);
    if(!msg) return message.channel.send('<:HBminus:783351288515657728> | I have not seen a edited message.');

    const embedEditSnipe = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.av)
    .addField("<:HBfolder:783351287868817448> **Channel:**", `<#${msg.channel}>`)
    .addField("<:HBback:783351288091901952> **Old Message:**", `${msg.oldmessage}`)
    .addField("<:HBnext:783351287692394536> **New Message:**", `${msg.newmessage}`)
    .setFooter("Helper Bot | EditSnipe", client.user.displayAvatarURL())
    .setColor("RANDOM")
    message.channel.send(embedEditSnipe);

  }
}