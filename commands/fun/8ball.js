const Discord = require("discord.js");

module.exports = {
  name: "8ball",
  aliases: ["8b"],
  description: "I answer a simple question",
  category: "Fun",
  cooldown: 3,
  run: (client, message, args) => {
    
  if(!args.join(" ")) return message.channel.send("<:HBminus:783351288515657728> | Please put the question.");
  
  if(args.join(" ").length > 50) return message.channel.send("<:HBminus:783351288515657728> | The question is too long.");

  const answers = [
  "Yes",
  "No",
  "Maybe",
  "Obvious",
  "I say yes",
  "I say no",
  "Probably",
  "Morning",
  "Today"
    ]
  random = answers[Math.floor(Math.random() * answers.length)];

  const embed = new Discord.MessageEmbed()
  .setTitle(":8ball:  8Ball")
  .addField("Question:", args.join(" "))
  .addField("My answer:", `${random}`)
  .setColor("PURPLE")
  .setFooter("Helper Bot | 8ball", client.user.displayAvatarURL())
message.channel.send(embed);
}
}