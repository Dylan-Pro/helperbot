const Discord = require("discord.js");

module.exports = {
  name: "jumbo",
  aliases: [],
  description: "Expand the size of the emoji",
  category: "Utility",
  usage: "jumbo :emoji:",
  cooldown: 3,
  run: async (client, message, args) => {

    try{
    
        if (!args[0]) return message.channel.send("<:HBminus:783351288515657728> | You have to specify an emoji.")//ustedes definen los args
    
        var emoji = Discord.Util.parseEmoji(args[0]);
    
        if(emoji.id == null) return message.channel.send("<:HBminus:783351288515657728> | Please enter a valid emoji.");
    
        const embedEmoji = new Discord.MessageEmbed()
        .setImage(`https://cdn.discordapp.com/emojis/${emoji.id}.${(emoji.animated ? 'gif': 'png')}`)
        .setColor('RANDOM')
        
        message.channel.send(embedEmoji)
    
        } catch(e) {
        message.channel.send(`<:HBwarning:783351287944970251> | **${e.name}:** ${e.message}`);
      };    

  },
};