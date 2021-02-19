const Discord = require("discord.js");

module.exports = {
  name: "boost",
  aliases: [],
  description: "Gives the server boost information",
  category: "Utility",
  usage: "boost",
  cooldown: 3,
  run: async (client, message, args) => {

    var server = message.guild;
    let features = {
        ANIMATED_ICON: "Animated icon",
        PREVIEW_ENABLED: "Preview",
        MEMBER_VERIFICATION_GATE_ENABLED: "Verification Gate",
        BANNER: "Server banner",
        COMMERCE: "Store channel",
        COMMUNITY: "Community",
        DISCOVERABLE: "Discord Discovery List Server",
        FEATURABLE: "Eligible to be on the featured list",
        INVITE_SPLASH: "Background for invitations",
        PUBLIC: "Public Servers",
        NEWS: "News channel",
        PARTNERED: "Associated Server",
        VANITY_URL: "Personalized invitation",
        VERIFIED: "Verified server",
        VIP_REGIONS: "Region V.I.P",
        WELCOME_SCREEN_ENABLED: "Welcome Screen"
    };

    let nivel = {
        0: "None",
        1: "Level 1",
        2: "Level 2",
        3: "Level 3"
    };

    const embedBoost = new Discord.MessageEmbed()
        .setColor('0xE700FF')
        .setAuthor(server.name)
        .setThumbnail(server.iconURL({ dynamic: true }))
        .addFields({
            name: "<a:gempink:781189104489463868> Boost level:", 
            value: nivel[server.premiumTier],
            inline: true
        })
        .addFields({
            name: "<a:nitroboost:781191750848479243> Boost size:", value: server.premiumSubscriptionCount === 0 ? "No boosts"
                : `${server.premiumSubscriptionCount} ${
                server.premiumSubscriptionCount === 1 ? "Boost" : "Boosts"}`,
            inline: true
        }) 
        .addFields({
            name: "<a:cdmusic:781188506981498891> Server benefits:", value: `${server.features.length <= 0
                ? "None"
                : `${server.features.map(f => features[f]).join(" | ")}`
                }`
            , inline: false
        })
    message.channel.send(embedBoost);

  }
}