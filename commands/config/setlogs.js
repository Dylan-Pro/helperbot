const Discord = require("discord.js");
const Logs = require("../../models/setlogs.js");

module.exports = {
  name: "setlogs",
  aliases: ["logs"],
  description: "Establish a log channel on the server",
  category: "Config",
  usage: "setlogs <mention-channel>",
  cooldown: 5,
  run: async (client, message, args) => {

    const channelXD = message.mentions.channels.first()

    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("<:HBminus:783351288515657728> | I'm sorry, but you don't have the necessary permissions to use that command.");

    if(!channelXD) return message.channel.send('<:HBminus:783351288515657728> | You must mention a channel.');

    if(!message.guild.channels.cache.get(channelXD.id)) return message.channel.send("<:HBminus:783351288515657728> | That channel is not from this server.");

    if(!channelXD.permissionsFor(client.user).has('VIEW_CHANNEL')) return message.channel.send("<:HBminus:783351288515657728> | I don't have permission \`VIEW_CHANNEL\` on the channel mentioned.");

    if(!channelXD.permissionsFor(client.user).has('SEND_MESSAGES')) return message.channel.send("<:HBminus:783351288515657728> | I don't have permission \`SEND_MESSAGES\` on the channel mentioned.");
  
    let a = await Logs.findOne({ guild: message.guild.id })
  
    let sv = new Logs({
      guild: message.guild.id,
      ChannelID: message.mentions.channels.first().id
    })
  
    a ? await Logs.updateOne({ guild: message.guild.id }, { ChannelID: message.mentions.channels.first().id }) : await sv.save();

    const EmbedLogsChannel = new Discord.MessageEmbed()
    .setDescription("Congratulations, the new channel logs is <#"+message.mentions.channels.first()+">\n\n*You can change it whenever you want*")
    .setColor('#00FC2A')
    .setFooter("Helper Bot | Logs", client.user.displayAvatarURL())
    .setThumbnail(message.guild.iconURL({ dynamic: true }));
     
   message.channel.send(EmbedLogsChannel);

  }
}