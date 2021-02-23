const Discord = require("discord.js");

module.exports = {
    name: "support",
    aliases: ["supp"],
    description: "Support server link",
    category: "Utility",
    usage: "support",
    cooldown: 3,
    run: async (client, message, args) => {
        const embedSupportServerLink = new Discord.MessageEmbed()
            .addField("<:HBnotification:783351287587930133> **Links**", "**__[Invite me](https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=8)__** | **__[Support Server](https://discord.gg/jNQkg9qdDM)__** | __**[GitHub Repository](https://github.com/TheEaterOfSouls/helperbot)**__")
            .setColor("RANDOM");
        message.channel.send(embedSupportServerLink);
    }
};