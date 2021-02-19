const Discord = require("discord.js");

module.exports = {
    name: "clyde",
    aliases: [],
    description: "Say text",
    category: "Fun",
    usage: "clyde <text>",
    cooldown: 3,
    run: async (client, message, args) => {

        let mensaje = args.join('%20');
        if (!mensaje) return message.channel.send("<:HBminus:783351288515657728> | You have not put any text");

        let api = `https://ctk-api.herokuapp.com/clyde/${mensaje}`;

        const faraonwapo = new Discord.MessageEmbed()
            .setImage(api)
            .setColor('RANDOM');

        message.channel.send(faraonwapo);

    }
}