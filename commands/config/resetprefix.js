const Discord = require("discord.js");
const prefixSchema = require("../../models/prefix")


module.exports = {
  name: "resetprefix",
  aliases: ["rprefix"],
  description: "Change the bot prefix to the original prefix",
  category: "Config",
  usage: "rprefix",
  cooldown: 4,
  run: async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("<:HBminus:783351288515657728> | I'm sorry, but you don't have the necessary permissions to use that command.");

    let a = await prefixSchema.findOneAndDelete({ Guild: message.guild.id });
    if(!a) return message.channel.send("<:HBminus:783351288515657728> | On this server, there is no cuztomized prefix");
    message.channel.send("<:HBchecked:783351288171593728> | The prefix on the server has been reset, it is now **`h!`**")
  }
}