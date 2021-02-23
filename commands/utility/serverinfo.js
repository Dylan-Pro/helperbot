const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  aliases: ["sv", "server"],
  description: "Give the server information",
  category: "Utility",
  usage: "server",
  cooldown: 3,
  run: async (client, message, args) => {

    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    };

    let verificationLevel = {
      "NONE": "None",
      "LOW": "Low",
      "MEDIUM": "Medium",
      "HIGH": "(╯°□°）╯︵  ┻━┻",
      "VERY_HIGH": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
    };
    let region = {
      "europe": ":flag_eu: Europe",
      "brazil": ":flag_br: Brazil",
      "eu-central": ":flag_eu: Central Europe",
      "singapore": ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      "sydney": ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      "london": ":flag_gb: London",
      "amsterdam": ":flag_nl: Amsterdam",
      "hong_kong": ":flag_hk: Hong Kong",
      "russia": ":flag_ru: Russia",
      "south_africa": ":flag_za:  South Africa"
    };
    let nivel = { //este seria el nivel de boost en el servidor
      0: "None",
      1: "Level 1",
      2: "Level 2",
      3: "Level 3"
    };
    let channels = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size
    let vc = channels.cache.filter(r => r.type === "voice").size
    let category = channels.cache.filter(r => r.type === "category").size;

    const rolesxd = message.guild.roles.cache.filter((x) => x.id !== message.guild.id).map((x) => `${x}`)
    const listaRoles = rolesxd.length > 12 ? `${rolesxd.slice(0, 12).join(' | ')} and **${rolesxd.length - 10}** more roles` : rolesxd.join(' | ');

    const emojisxd = message.guild.emojis.cache.filter((x) => x.id !== message.guild.id).map((x) => `${x}`)
    const listaEmojis = emojisxd.length > 12 ? `${emojisxd.slice(0, 12).join(' | ')} and **${emojisxd.length - 10}** more emojis` : emojisxd.join(' | ');

    const rulesID = message.guild.rulesChannelID;
    let rules1;
    if (!rulesID) {
      rules1 = 'Has no rules channel'
    } else {
      rules1 = `<#${rulesID}>`
    };

    const afkID = message.guild.afkChannelID;
    const timeAFK = message.guild.afkTimeout;
    let afk1;
    if (!afkID) {
      afk1 = 'Has no afk channel'
    } else {
      afk1 = `<#${afkID}> (${timeAFK}ms)`
    };


    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setTitle(`${message.guild.name}'s Information`)
      .addField("<:HBbarchart:783351287676665917> **Server Information:**", [
        `**Name:** ${message.guild.name}`,
        `**ID:** ${message.guild.id}`,
        `**Owner:** ${message.guild.owner.user.tag}`,
        `**Region:** ${region[message.guild.region]}`,
        `**Verification Level:** ${verificationLevel[message.guild.verificationLevel]}`,
        `**Creation Date:** ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`,
        `**Rules Channel:** ${rules1}`,
        `**AFK Channel:** ${afk1}`
      ])
      .addField("<:HBsearch:783351288149835857> **Server stats:**", [
        `**Users:** ${message.guild.members.cache.size} Total | ${message.guild.members.cache.filter(member => !member.user.bot).size} Member | ${message.guild.members.cache.filter(member => member.user.bot).size} Bot`,
        `**Channels:** ${message.guild.channels.cache.size} Total | ${text} Text | ${vc} Voice | ${category} Category`
      ])
      .addField("<a:HBcool:813654744845254708> **Server emojis:**", [
        `**Emojis Size:** ${message.guild.emojis.cache.size}`,
        `**Emojis:** \n${listaEmojis}`
      ])
      .addField("<:HBshield:783351288313937991> **Server roles:**", [
        `**Roles Size:** ${message.guild.roles.cache.size}`,
        `**Roles:** \n${listaRoles}`
      ])
      .setFooter("Helper Bot | Utility System", client.user.displayAvatarURL())
    message.channel.send(embed);


  }
}