const Discord = require("discord.js");
const prefixSchema = require('../../models/prefix');

module.exports = {
  name: "setprefix",
  aliases: ["prefix"],
  description: "Change a my prefix in you server",
  category: "Config",
  usage: "prefix <new-prefix>",
  cooldown: 3,
  run: async (client, message, args) => {
      const res = await args.join(' ');

      if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("<:HBminus:783351288515657728> | I'm sorry, but you don't have the necessary permissions to use that command.");

      if(!res) return message.channel.send("<:HBminus:783351288515657728> | Please specify a prefix to change to.");
      if(res.length > 3) return message.channel.send("<:HBminus:783351288515657728> | The new prefix cannot exceed 3 characters.");

      let a = await prefixSchema.findOne({ Guild: message.guild.id })
  
      let sv = new prefixSchema({
        Guild: message.guild.id,
        Prefix: res
      })
    
      a ? await prefixSchema.updateOne({ Guild: message.guild.id }, { Prefix: res }) : await sv.save();
       
     message.channel.send("<:HBchecked:783351288171593728> | Congratulations, my new prefix is `"+res+"`");
  }
}