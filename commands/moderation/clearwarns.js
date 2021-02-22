const Discord = require("discord.js");
const warns = require('../../models/warns');

module.exports = {
  name: "clearwarns",
  aliases: ["clear-warnings"],
  description: "Remove all warnings from a member",
  category: "Moderation",
  usage: "clearwarns <mention>",
  cooldown: 4,
  run: async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("<:HBminus:783351288515657728> | You don't have `ADMINISTRATOR` permission!");
    let user = message.mentions.members.first();
    if(!user) return message.channel.send("<:HBminus:783351288515657728> | Please mention a member")

    let a = await warns.findOneAndDelete({ Guild: message.guild.id, User: user.id });
    if(!a) return message.channel.send("<:HBminus:783351288515657728> | This member has no warnings");
    message.channel.send("<:HBchecked:783351288171593728> | Ready, **"+user.user.tag+"** no longer has warnings")
  }
}