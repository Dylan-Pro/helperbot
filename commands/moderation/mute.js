const Discord = require("discord.js");

module.exports = {
  name: "mute",
  aliases: [],
  description: "Mute a member",
  category: "Moderation",
  usage: "mute <mention> (reason)",
  cooldown: Number,
  run: async (client, message, args) => {

const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

let razon = args.slice(1).join(' ') || 'Reason not defined';
let role = message.guild.roles.cache.find(x => x.name === 'Muted');

if(!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send("<:HBminus:783351288515657728> | You don't have `MUTE_MEMBERS` permission!");
if(!message.guild.me.permissions.has('MUTE_MEMBERS')) return message.channel.send('<:HBminus:783351288515657728> | I need `MUTE_MEMBERS` permission!');
if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send('<:HBminus:783351288515657728> | I need `MANAGE_ROLES` permission!');
if(!usuario) return message.channel.send('<:HBminus:783351288515657728> | You have not mentioned any user.');
if(usuario.id === message.author.id) return message.channel.send('<:HBminus:783351288515657728> | You cannot silence yourself.'); 
if(usuario.id === client.user.id) return message.channel.send('<:HBminus:783351288515657728> | You can not silence me.') 
if(message.guild.ownerID !== message.author.id && usuario.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) return message.channel.send('<:HBminus:783351288515657728> | You cannot mute that user.'); 
if(role && role.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('<:HBminus:783351288515657728> | I can not play the Muteado role.'); 
if(role && usuario.roles.cache.has(role.id)) return message.channel.send('<:HBminus:783351288515657728> | That user is already muted.'); 
if(razon.length > 1024) return message.channel.send('The reason cannot exceed 1024 characters.') 
if(!role){ 
message.guild.roles.create({ 
data: { name: 'Muted', 
color: '#979797', 
reason: 'Mute role'} 
}).then(role => { 
message.guild.channels.cache.forEach(r => r.updateOverwrite(role.id, { 
SEND_MESSAGES: false 
  })) 

usuario.roles.add(role.id) 
})
}else{ 
usuario.roles.add(role.id) 
} 
let embed = new Discord.MessageEmbed()

.setTitle(`**${message.guild.name}** | **New Mute**`)
.addField('**<:HBuser:783351289114918973> Member Muted**', `${usuario.user.tag} | ${usuario.id}`)
.addField(`**<:HBshield:783351288313937991> Mod/Admin**`, `${message.author.tag}`)
.addField(`**<:HBinformation:783351288062672896> Reason**`, `${razon}`)
.setColor(`#11DD00`)
.setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({dynamic: true}));
message.channel.send(embed);

const embedMuteUser = new Discord.MessageEmbed()
.setTitle(`**You Have Muted**`)
.addField(`**<:HBhouse:783351287940382731> Server**`, `${message.guild.name} | ${message.guild.id}`)
.addField(`**<:HBuser:783351289114918973> Member Muted**`, `${usuario.user.tag} | ${usuario.id}`)
.addField(`**<:HBshield:783351288313937991> Mod/Admin**`, `${message.author.tag}`)
.addField(`**<:HBinformation:783351288062672896> Reason**`, `${razon}`)
.setColor(`#FF0000`)
.setFooter("Helper Bot | Moderation System", client.user.displayAvatarURL({dynamic: true}))
usuario.send(embedMuteUser).catch(e => message.channel.send('<:HBminus:783351288515657728> | The muted user has disabled DMs. Therefore I cannot send you information about your mute.'));

  }
}