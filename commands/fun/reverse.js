module.exports = {
    name: "reverse",
    aliases: [],
    description: "Show your message in reverse!",
    category: "Fun",
    cooldown: 2,
    run: (client, message, args) => {
  
      if(!args[0]) return message.channel.send("<:HBminus:783351288515657728> | You have to write a text.");
        message.channel.send(args.join(' ').split('').reverse().join(''), { allowedMentions: { parse: [] }});
    }
  }