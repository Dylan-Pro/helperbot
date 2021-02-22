const Discord = require("discord.js");
const { inspect } = require("util")

module.exports = {
  name: "eval",
  aliases: ["e", "ev"],
  description: "Evaluate a JavaScript code",
  category: "Developers",
  usage: "eval <code>",
  cooldown: 2,
  run: async (client, message, args) => {


    const command = args.join(" ")

    if(!["577000793094488085", "723158623404032022"].includes(message.author.id))
    return;

    if (!command) return message.channel.send("<:HBminus:783351288515657728> | You need to specify something to eval")

    let user = message.member;


    try {
      const evaled = await eval(command)

      let msg = await message.channel.send(`(${typeof (evaled)}) ${inspect(evaled, { depth: 0 }).replace(client.token, "CONTENT_PRIVATE")}`, { code: 'js', split: { char: '', maxLength: 1900 } })
      for (let i of msg) {
        i.react('783351288515657728')
        i.awaitReactions((reaction, user) => {
          if (user.id != message.author.id) return;
          if (reaction.emoji.id == '783351288515657728') return i.delete()
        })
      }
    } catch (e) {
      message.channel.send(`<:HBwarning:783351287944970251> | **${e.name}:** ${e.message}`)
    }


  }
}