const Discord = require("discord.js");
const my = require("myscrapper");

module.exports = {
  name: "topgg",
  aliases: [],
  description: "Search a bot or server on top.gg",
  category: "Utility",
  usage: "topgg [name]",
  cooldown: 3,
  run: async (client, message, args) => {

    if(!args[0]) return message.channel.send("<:HBminus:783351288515657728> | Please enter a bot to search!")

    const { data } = await my.topGG(args[0], true, "type: bot");
    console.log(data[0])

    if(!data) return message.channel.send(`<:HBminus:783351288515657728> | I did not find any results with \`${args[0]}\`!`)

    let owners = data[0].owners.map(x => x.name);

   const embedTopGG = new Discord.MessageEmbed()
        .setTitle(`**${data[0].name}** | **Information**`)
        .addFields(
            {
                name: "<:HBcrown:781262409720922192> **Owner's**",
                value: owners,
                inline: null
            },
            {
                name: "<:HBclipboard:783351287504044082> **Type**",
                value: data[0].type,
                inline: null
            },
            {
                name: "<:HBfile:783351289224101928> **ID**",
                value: data[0].id,
                inline: null
            },
            {
                name: "<:HBsearch:783351288149835857> **Description**",
                value: data[0].description || "Has no description",
                inline: null
            },
            {
                name: "<:HBshare:783351288389042248> **Invite**",
                value: `[Click here](${data[0].invite})`,
                inline: null
            },
            {
                name: "<:HBshield:783351288313937991> **Tag's**",
                value: data[0].tags || "Has no tag's",
                inline: null
            }
        )
        .setThumbnail(data[0].icon)
        .setColor("RANDOM") 
    message.channel.send(embedTopGG)

  }
}