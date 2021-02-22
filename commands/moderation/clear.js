const Discord = require("discord.js");

module.exports = {
  name: "clear",
  aliases: ["purge"],
  description: "Delete messages from a chat",
  category: "Moderation",
  usage: "clear <amount>",
  cooldown: 3,
  run: async (client, message, args) => {


if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("<:HBminus:783351288515657728> | You don't have `MANAGE_MESSAGES` permission!")


if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) 
return message.channel.send('<:HBminus:783351288515657728> | I need `MANAGE_MESSAGES` permission!');

try {
let deleteAmount;

if(isNaN(args[0]) || parseInt(args[0]) <= 0) return message.channel.send("<:HBminus:783351288515657728> | Please enter a number");

if(parseInt(args[0]) > 100) return message.channel.send("<:HBminus:783351288515657728> |The amount cannot be more than 100");

deleteAmount = parseInt(args[0]);

message.channel.bulkDelete(deleteAmount + 1, true);

message.channel.send(`<:HBchecked:783351288171593728> | Successfully Deleted **${deleteAmount}** Messages!`).then(x => x.delete({timeout: 5000}));
} catch (err) {
  message.channel.send(`<:HBwarning:783351287944970251> | Due to discord limitations, I cannot delete messages that are more than 14 days old`).then(x => x.delete({timeout: 5000}));
}
  }
}