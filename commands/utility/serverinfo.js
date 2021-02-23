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

    let server = message.guild
    let a = await message.guild.fetch()
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
        `**Creation Date:** ${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`
      ])
      .addField("<:HBsearch:783351288149835857> **Server stats:**", [
        `**Users:** ${message.guild.members.cache.size} Total | ${message.guild.members.cache.filter(member => !member.user.bot).size} Member | ${message.guild.members.cache.filter(member => member.user.bot).size} Bot`,
        `**Channels:** ${message.guild.channels.cache.size} Total | ${text} Text | ${vc} Voice | ${category} Category`
      ])
      .addField("<:HBclipboard:783351287504044082> **Server emojis:**", [
        `**Emojis Size:** ${message.guild.emojis.cache.size}`,
        `**Emojis:** \n${message.guild.emojis.cache.first(10).join(' | ').toString() + ` and **${message.guild.emojis.cache.size - 10}** more emojis` || "Has no emojis"}`
      ])
      .addField("<:HBfile:783351289224101928> **Server roles:**", [
        `**Roles Size:** ${message.guild.roles.cache.size}`,
        `**Roles:** \n${message.guild.roles.cache.first(10).join(' | ').toString() + ` and **${message.guild.roles.cache.size - 10}** more roles` || "Has no roles"}`
      ])
      .setFooter("Helper Bot | Utility System", client.user.displayAvatarURL())
    message.channel.send(embed);


  }
}