const Discord = require("discord.js");

module.exports = {
  name: "unlock",
  aliases: [],
  description: "Unlock to a server channel",
  category: "Moderation",
  usage: "unlock (mention)",
  cooldown: 2,
  run: async (client, message, args) => {

      if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send('<:HBminus:783351288515657728> | You do not have \`MANAGE_CHANNELS\` permissions to use this command.');
      if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send('<:HBminus:783351288515657728> | I require \`MANAGE_CHANNELS\` permission to lock.');

      let lockChannel = message.mentions.channels.first() || message.channel;

      if(!message.guild.channels.cache.get(lockChannel.id)) return message.channel.send("<:HBminus:783351288515657728> | That channel is not from this server.");

      if(!lockChannel.permissionsFor(client.user).has('VIEW_CHANNEL')) return message.channel.send("<:HBminus:783351288515657728> | I don't have permission \`VIEW_CHANNEL\` on the channel mentioned.");
  
      if(!lockChannel.permissionsFor(client.user).has('SEND_MESSAGES')) return message.channel.send("<:HBminus:783351288515657728> | I don't have permission \`SEND_MESSAGES\` on the channel mentioned.");

      let alluser = message.guild.roles.cache.find(aus => aus.name === '@everyone');

      await lockChannel.updateOverwrite(alluser, {
          SEND_MESSAGES: true,
          VIEW_CHANNELS: true
      }).catch(err => message.channel.send(`<:HBwarning:783351287944970251> | **${err.name}:** ${err.message}`));

      const unlockEmbed = new Discord.MessageEmbed()
        .setDescription(`<#${lockChannel.id}> was unlocked :unlock:`)
        .setColor("#0FFF00")
    message.channel.send(unlockEmbed)

  }
}