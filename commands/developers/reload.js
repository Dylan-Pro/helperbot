const Discord = require("discord.js");
const Developers = require('../../config.json').devs;

module.exports = {
  name: "reload",
  aliases: ["creload"],
  description: "Reloads a bot commands",
  category: "Developers",
  usage: "reload <command>",
  cooldown: 2,
  run: async (client, message, args) => {

    if(!Developers.includes(message.author.id))
    return;

    const folderName = args[0]
    if(!folderName) return message.channel.send("<:HBminus:783351288515657728> | Please provide a folder!");

    const commandName = args.slice(1).join(' ');
    if(!commandName) return message.channel.send("<:HBminus:783351288515657728> | Please provide a command to reload!");

    try {
        delete require.cache[require.resolve(`../../commands/${folderName}/${commandName}.js`)]
        client.commands.delete(commandName)
        const pull = require(`../../commands/${folderName}/${commandName}.js`)
        client.commands.set(commandName, pull)
    } catch(e) {
        console.log(e.message)
        return message.channel.send(`<:HBminus:783351288515657728> | Cloud not reload \`${commandName}\``)
    }

    message.channel.send(`<:HBchecked:783351288171593728> | The command \`${commandName}\` has been reloaded!`)
}}