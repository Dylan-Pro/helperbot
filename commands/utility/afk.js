const Discord = require("discord.js");
const AFK = require('../../models/afk');

module.exports = {
    name: "afk",
    aliases: [],
    description: "Notify member is offline or AFK",
    category: "Utility",
    usage: "afk (reason)",
    cooldown: 2,
    run: async (client, message, args) => {

        let afk_data = await AFK.findOne({id: message.author.id});
        const reason1 = args.join(' ') || 'Reason not specified';
        if(reason1.length > 100) return message.channel.send('<:HBminus:783351288515657728> | The reason cannot exceed 100 characters.')


        if(!afk_data)
            await AFK.create({
              reason: reason1,
              id: message.author.id,
              isafk: true,
              timeAfk: Date.now()
            })
    
            else{
    
    await AFK.updateOne({id: message.author.id}, {
              reason: reason1,
               isafk: true,
               timeAfk: Date.now()
            })
            };
    
    
    const embedAFKUser = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
    .setColor('#FF00DC')
    .setDescription("<:HBuser:783351289114918973> **"+message.author.tag+"** you are **AFK**\nIf you send a message again, you will be removed from the AFK list")
    .addField('<:HBsearch:783351288149835857> **Reason:**', `${reason1}`);
    message.channel.send(embedAFKUser);
  }
}