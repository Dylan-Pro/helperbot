const Discord = require("discord.js");

module.exports = {
  name: "say",
  aliases: ["repeat"],
  description: "Say your text",
  category: "Fun",
  usage: "say [text]",
  cooldown: 3,
  run: async (client, message, args) => {

    if(!args.join(" ")) return message.channel.send(`<:HBminus:783351288515657728> | | You must enter a text`);
    message.delete().catch(err => message.channel.send(`<:HBwarning:783351287944970251> | I do not have permission to delete the message`)).then(x => x.delete({timeout: 3000}));
    message.channel.send(args.join(" "), { allowedMentions: { parse: [] } });

  }
}