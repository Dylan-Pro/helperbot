const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  name: "djs",
  aliases: ["discord"],
  description: "search for something in the discord.js library",
  category: "Utility",
  usage: "djs <serach>",
  cooldown: 3,
  run: async (client, message, args) => {

            if(!args[0]) return message.channel.send('<:HBminus:783351288515657728> | You must add to search.');
        fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(' '))}`).then(e => e.json()).then(data => {
        message.channel.send(new Discord.MessageEmbed(data))
        
    }).catch(e => {
        const embed = new Discord.MessageEmbed()
        .setColor("#FF0000")        
        .addField(`**Error <:HBwarning:783351287944970251>**`, `\`\`\`js\n${e}\`\`\``)
        .setFooter('Requested by: '+message.author.tag+'', message.author.displayAvatarURL({dynamic: true}));        
        message.channel.send(embed)
    });

  }
}