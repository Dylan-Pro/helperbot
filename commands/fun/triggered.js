const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  name: "triggered",
  aliases: [],
  description: "A simple command to put you triggered",
  category: "Fun",
  cooldown: 5,
  run: async (client, message, args) => {
    
    var persona = message.mentions.users.first() || message.author;

    var avatar = persona.displayAvatarURL({dynamic:false, format:'png'});

    var datos = await canvacord.Canvas.trigger(avatar);

    let imagen = new Discord.MessageAttachment(datos,"TriggeredHelperBot.gif");

    message.channel.send(imagen)
  }
}