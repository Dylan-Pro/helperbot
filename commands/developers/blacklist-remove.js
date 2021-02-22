const Discord = require("discord.js");
const blacklist = require('../../models/blacklist')


module.exports = {
  name: "blacklist-remove",
  aliases: ["bl-remove"],
  description: "",
  category: "Developers",
  usage: "bl-remove <mention/ID>",
  cooldown: 3,
  run: async (client, message, args) => {

    if(!["577000793094488085", "723158623404032022"].includes(message.author.id))
    return;

    const user = client.users.cache.find(e => e.id == args[0]) || message.mentions.users.first();
    if(!user) return message.channel.send("<:HBminus:783351288515657728> | Mention or enter a user's ID!");

    blacklist.findOne({ id: user.id }, async(err, data) =>{ 
        if(err) throw err;
        if(data) {
        await blacklist.findOneAndDelete({ id: user.id }).catch(err => message.channel.send(`<:HBwarning:783351287944970251> | **${err.name}:** ${err.message}`))
        return message.channel.send(`<:HBchecked:783351288171593728> | **${user.tag}** was successfully remove to the blacklist!`)
        }

        message.channel.send('<:HBminus:783351288515657728> | That user is not on the blacklist!')
    })
  }
}