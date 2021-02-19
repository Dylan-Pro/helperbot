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
    let channels  = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size
    let vc = channels.cache.filter(r => r.type === "voice").size
    let category = channels.cache.filter(r => r.type === "category").size;

    let server = message.guild
    let a  = await message.guild.fetch()
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .addField("<:HBinformation:783351288062672896> ID", message.guild.id)
    .addField("<:HBcrown:781262409720922192> Owner", `${a.owner.toString()}`)
    .addField("🌎 Region", region[message.guild.region])
    .addField("🌐 Total  |  😃 Humans  |  🤖 Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`)
    .addField("💯 Verification Level",  verificationLevel[message.guild.verificationLevel])
    .addField("📘 Channels", `${message.guild.channels.cache.size}\n💬 **Text**\n${text}\n🎧 **Voice**\n${vc}\n📁 **Category**\n${category}`)
    .addField("💤 AFK Channel", `${message.guild.afkChannel || "Does No Have AFK Channel"}`)
    .addField("<:HBrules:793991601814241311> Rules Channel", `${message.guild.rulesChannel || "Does No Have Rules Channel"}`)
    .addField("<:HBfunnel:783351288670584862> Personalized server invitation", `${message.guild.vanityURLCode || "Does not have personalized invitation"}`)
    .addField("💎 Roles", message.guild.roles.cache.size)
    .addField("<a:gempink:781189104489463868> Level Boost", nivel[server.premiumTier])
    .addField("🔎 Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`)
    .addField("😃 Emojis", message.guild.emojis.cache.size)
    .setImage(message.guild.bannerURL({ size: 4096, dynamic: true, format: 'png' }))
    .setFooter("Helper Bot | Utility System", client.user.displayAvatarURL())
    message.channel.send(embed);


  }
}