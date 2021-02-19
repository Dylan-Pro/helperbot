const Discord = require("discord.js");
const Conf = require('../../models/setconfessions');

module.exports = {
  name: "confession",
  aliases: [],
  description: "Send a text anonymously",
  category: "Fun",
  usage: "confession <confession>",
  cooldown: 3,
  run: async (client, message, args) => {

let channelConf = await Conf.findOne({ guild: message.guild.id });
if(!channelConf) return message.channel.send('<:HBminus:783351288515657728> | There is no established confession channel.');

let text = args.join(" ");
if(!text) return message.channel.send("<:HBminus:783351288515657728> | You have not written a message").then(m => m.delete({timeout: 10000})).catch(err => message.channel.send(`<:HBwarning:783351287944970251> | I do not have permission to delete the message`)).then(x => x.delete({timeout: 5000}));

const embed = new Discord.MessageEmbed()
.setTitle('<a:sonrojao:774039793888657489> | **New confession**')
.setDescription(text) 
.setColor('RANDOM') 
.setFooter('Author: Unknown')
.setThumbnail(message.guild.iconURL({ dynamic: true }))
message.guild.channels.cache.get(channelConf.ChannelID).send(embed);

  },
};