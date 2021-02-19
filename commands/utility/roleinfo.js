const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");

module.exports = {
  name: "roleinfo",
  aliases: ["role"],
  description: "Give information about a role",
  category: "Utility",
  usage: "roleinfo <rol>",
  cooldown: 4,
  run: async (client, message, args) => {

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(e => e.name.match(new RegExp(`${args[0]}`, 'gi')));

    if(!role) return message.channel.send("<:HBminus:783351288515657728> | Specify a role")
    function Markdown(str)  {
        return `\`\`\`\n${str}\n\`\`\``;
        };
    
    
    const EmbedRolInfo = new Discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setTitle("**<:HBfolder:783351287868817448> Role information**")
    .setDescription("This is the information")
    .setColor("RANDOM")
    .addField("<:HBinformation:783351288062672896> **Name**", ` ${role.name}`) 
    .addField("<:HBfile:783351289224101928>  **ID**", ` ${role.id}`) 
    .addField("<:HBrefresh:783351288292442183> **Created At**", humanizeDuration(Date.now() - new Date(role.createdAt).getTime(), { largest: 2, conjunction: " and ", round: true }))
    .addField("<:HBuser:783351289114918973> **Members with the Role**", ` ${role.members.size}`) 
    .addField("<:HBshield:783351288313937991>  **Position**", ` ${role.rawPosition}`) 
    .addField("<:HBflag:783351287709171752> **HexColor**", ` ${role.hexColor}`) 
    .addField("<:HBfunnel:783351288670584862>  **Mentionable?**", role.mentionable ? 'Yes' : 'Not' ) 
    .addField("<:HBsearch:783351288149835857> **Separated?**", role.hoist ? 'Yes' : 'Not') 
    .addField("<:HBsettings:783351288536629268> **Managed by the system?**", role.managed ? 'Yes' : 'Not')
    .addField("<:HBprohibition:783351287868817419> **Permissions**", Markdown(role.permissions.toArray().join(', ')))
    .setFooter(" Helper Bot | Utility System", client.user.displayAvatarURL()) 
  
          
          
    message.channel.send(EmbedRolInfo);

  }
}