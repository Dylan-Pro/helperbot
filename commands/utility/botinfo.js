const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");

module.exports = {
  name: "botinfo",
  aliases: ["bot"],
  description: "Give information about the bot",
  category: "Utility",
  usage: "botinfo",
  cooldown: 3,
  run: async (client, message, args) => {

    const actividad = moment
    .duration(client.uptime)
    .format(" D [Days], H [Hours], m [Minutes], s [Seconds]")



    const usagePercent = require("util").promisify(require("cpu-stat").usagePercent);
    const porcentaje = await usagePercent();
       
    const embed2 = new Discord.MessageEmbed()
    .setThumbnail(client.user.avatarURL())
    .setTitle("**Helper Bot**")
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("0x303136")
    .addField(`<:HBbarchart:783351287676665917> **General**`, [
        "**Developer:** [TheEaterOfSouls#3075](https://github.com/TheEaterOfSouls)",
        `**Commands:** ${client.commands.size}`,
        `**Servers:** ${client.guilds.cache.size}`,
        `**Voice Connections:** ${client.voice.connections.size}`,
        "**Language:** JavaScript",
        "**Library:** Discord.js v12.5.1",
    ])
    .addField(`<:HBsettings:783351288536629268> **System**`, [
        `**Platform:** ${os.platform()[0].toUpperCase()}${os.platform().slice(1)}`,
        `**Uptime:** ${actividad}`,
        `**Memory:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        `**CPU Usage:** ${porcentaje.toFixed(2)}%`,
        `**CPU Model:** ${os.cpus()[0].model}`
    ])
    .addField("<:HBnotification:783351287587930133> **Links**", "**__[Invite me](https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=8)__** | **__[Support Server](https://discord.gg/jNQkg9qdDM)__** | __**[GitHub Repository](https://github.com/TheEaterOfSouls/helperbot)**__")
    message.channel.send(embed2);
  }
}