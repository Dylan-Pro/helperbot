const Discord = require("discord.js");

module.exports = {
    name: "hug",
    aliases: [],
    description: "Has hug a member",
    category: "Fun",
    usage: "hug <mention>",
    cooldown: 3,
    run: async (client, message, args) => {


        let user = message.mentions.users.first();
        if (!user) return message.channel.send(`<:HBminus:783351288515657728> | You have to mention someone first!`);
        if (user.id === message.author.id) return message.reply(`How do you try to hug yourself?`);

        let gifs = [
            'https://media1.tenor.com/images/1d78f70a84ad818aa36f9af0d15e9eae/tenor.gif',
            'https://media1.tenor.com/images/6db54c4d6dad5f1f2863d878cfb2d8df/tenor.gif?itemid=7324587',
            'https://25.media.tumblr.com/tumblr_ma7l17EWnk1rq65rlo1_500.gif',
            'https://pa1.narvii.com/5832/6668d563d976ad72473bf86d679b156f3c436ab9_hq.gif',
            'https://cdn.lowgif.com/medium/6b0a88162a4b836c-.gif',
            "https://media.tenor.com/images/b6d0903e0d54e05bb993f2eb78b39778/tenor.gif",
            "https://media1.tenor.com/images/195ec8f45c728b30e988b98764bd293c/tenor.gif?itemid=14102400",
            "https://media1.tenor.com/images/f02c7e8d52dac534526dbb86ccc5289e/tenor.gif?itemid=14722700",
            "https://media.giphy.com/media/143v0Z4767T15e/giphy.gif",
            "https://i.gifer.com/GXfC.gif",
            "https://i.pinimg.com/originals/e6/98/eb/e698eb79572e5485636a9ff2282cf4c8.gif",
            "https://media1.tenor.com/images/44b4b9d5e6b4d806b6bcde2fd28a75ff/tenor.gif?itemid=9383138"
        ]
        let randomIMG = gifs[Math.floor(Math.random() * gifs.length)];

        const embed = new Discord.MessageEmbed()
            .setDescription(`**${message.author.username}** gives **${user.username}** a hug :hearts:`)
            .setColor("RANDOM")
            .setImage(randomIMG)
        message.channel.send(embed);
    }
}