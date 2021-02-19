const Discord = require("discord.js");

module.exports = {
  name: "thanks",
  aliases: ["thx"],
  description: "Give an honorable mention to users who supported and contributed to the development of the bot",
  category: "Utility",
  usage: "thx",
  cooldown: 3,
  run: async (client, message, args) => {

    const thxEmbed = new Discord.MessageEmbed()
    .setTitle("**Thank you very much to**")
    .setTimestamp()
    .setColor("RANDOM")
    .addField("<:HBwubbzy:797644012948422706> **AndreMor#0008**", "[GidGet Bot](https://discord.com/api/oauth2/authorize?client_id=694306281736896573&permissions=0&scope=bot) | [GitHub](https://github.com/AndreMor955)")
    .addField("<:CentralHost3:784231214521122857> **Steven Castro#1111**", "[AudioMix Bot](https://top.gg/bot/616017129409478677) | [CentralHost](https://www.centralhost.us/)")
    .setImage("https://cdn.discordapp.com/attachments/795927365074550794/797642484615217212/thanksHelperBot_1.gif")
    .setFooter(" Helper Bot | Thanks", client.user.displayAvatarURL())
    message.channel.send(thxEmbed);

  }
}