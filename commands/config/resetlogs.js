const Discord = require("discord.js");
const prefixSchema = require("../../models/setlogs");

module.exports = {
  name: "resetlogs",
  aliases: ["rlogs"],
  description: "Delete Logs channel",
  category: "Config",
  usage: "rlogs",
  cooldown: 4,
  run: async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("<:HBminus:783351288515657728> | I'm sorry, but you don't have the necessary permissions to use that command.");

    let a = await prefixSchema.findOneAndDelete({ guild: message.guild.id });
    if(!a) return message.channel.send("<:HBminus:783351288515657728> | There is no Logs channel established on the server");
    message.channel.send("<:HBchecked:783351288171593728> | The Logs channel has been removed")
  }
};