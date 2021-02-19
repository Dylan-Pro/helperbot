const Discord = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Give the bot invite",
  category: "Utility",
  usage: "invite",
  cooldown: 3,
  run: async (client, message, args) => {

    let user = message.member;

    const embed = new Discord.MessageEmbed()
    .setTitle("**My invitation**")
    .setDescription("Hello! Thanks for inviting me to your server, you help me a lot to become a Verified bot!")
    .addField("**Bot Invitation**", `[🤖 Click here](https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=8)`)
    .addField("**Support Server**", `[🔧 Click here](https://discord.gg/jNQkg9qdDM)`)
    .setImage("https://cdn.discordapp.com/attachments/798229714409750590/798300763025309706/helperbot_2.gif")
    .setColor("RANDOM")
    .setThumbnail(user.user.displayAvatarURL({dynamic : true})) 
    .setFooter("Helper Bot | Invite", client.user.displayAvatarURL())
    message.channel.send(embed);

  }
}