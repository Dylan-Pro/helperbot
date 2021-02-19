const Discord = require("discord.js");
const Developers = require('../../config.json').devs;

module.exports = {
  name: "exec",
  aliases: ["ex"],
  description: "Execute a JavaScrip code",
  category: "Developers",
  usage: "exec <action>",
  cooldown: 1,
  run: async (client, message, args) => {

    if(!Developers.includes(message.author.id))
    return;

if (!args[0])
return message.channel.send("<:HBminus:783351288515657728> | You need to specify something to install")

try {
    const date = Date.now();
    let res = require('child_process').execSync(args.join(' ')).toString();

    res = res.split('').reverse().slice(0, 1900).reverse().join('')

    message.channel.send(res, { code: 'js' }).catch(() => { })
    message.channel.send(`Time: ${Date.now() - date}`).catch(() => { })

} catch (err) {

    message.channel.send(err, { code: 'js' }).catch(() => { });
    
   }
  }
}