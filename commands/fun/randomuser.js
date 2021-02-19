const Discord = require("discord.js");

module.exports = {
    name: "randomuser",
    aliases: ["random"],
    description: "Avata and Tag for random user",
    category: "Fun",
    usage: "randomuser",
    cooldown: 3,
    run: async (client, message, args) => {

        let member = message.guild.members.cache.filter(m => m.user != m.user.bot).random();
        let memberAvatar = member.user.displayAvatarURL({ dynamic: true, size: 2048 });
        let memberTag = member.user.tag;

        const embedRandomMember= new Discord.MessageEmbed()
            .setTitle(memberTag)
            .setImage(memberAvatar)
            .setColor("RANDOM")
        message.channel.send(embedRandomMember);

    }
}