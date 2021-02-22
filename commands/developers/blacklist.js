const Discord = require("discord.js");
const blacklist = require('../../models/blacklist')

module.exports = {
  name: "blacklist",
  aliases: ["bl-add"],
  description: "",
  category: "Developers",
  usage: "bl-add <mention/ID>",
  cooldown: 3,
  run: async (client, message, args) => {

    if(!["577000793094488085", "723158623404032022"].includes(message.author.id))
    return;

    const user = client.users.cache.find(e => e.id == args[0]) || message.mentions.users.first();
    if(!user) return message.channel.send("<:HBminus:783351288515657728> | Mention or enter a user's ID!");

    if(user.id === "723158623404032022") return message.channel.send("<:HBminus:783351288515657728> | I can't blacklist my creator");

    if(user.id === "577000793094488085") return message.channel.send("<:HBminus:783351288515657728> | I can't blacklist my friend Andre");

    blacklist.findOne({ id: user.id }, async(err, data) =>{ 
        if(err) throw err;
        if(data) {
        return message.channel.send('<:HBminus:783351288515657728> | This user is already on the blacklist!')
    };
    
    
    data = new blacklist({ id: user.id })
    data.save().catch(err => message.channel.send(`<:HBwarning:783351287944970251> | **${err.name}:** ${err.message}`))
    message.channel.send(`<:HBchecked:783351288171593728> | **${user.tag}** was successfully added to the blacklist!`)
    

    })

  }
}