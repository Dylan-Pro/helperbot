const Discord = require("discord.js");

module.exports = {
  name: "channels",
  aliases: ["chlist"],
  description: "Show channel list",
  category: "Utility",
  usage: "channels",
  cooldown: 5,
  run: async (client, message, args) => {


    const lepush = (q,c) => {
        if(c.type=="text") q.push(`[💬] ${c.name}`)
        else if(c.type=="voice") q.push(`[🔊] ${c.name}`)
        else if(c.type=="news") q.push(`[📢] ${c.name}`)
        else if(c.type=="store") q.push(`[🔰] ${c.name}`)
        else if(c.type=="category") q.push(`>>> 🗂️ ${c.name}`)
        else q.push(`[💎] ${c.name}`)
      };
      
      let categorias = message.guild.channels.cache.filter(q=>q.type=="category").sort((p,c)=>p.position- c.position);
      let canales = []
      message.guild.channels.cache.filter(q=>q.type!="category").filter(q=>!q.parentID).sort((p,c)=>p.position- c.position).forEach(c=>lepush(canales,c))
      categorias.forEach(c=>{
        lepush(canales,c)
        message.guild.channels.cache.filter(q=>q.parentID==c.id).sort((p,c)=>p.position- c.position).forEach(c=>lepush(canales,c))
      });
       message.channel.send(`${canales.join("\n")}`, { code: 'ini', split: { char: '', maxLength: 1900 } }) ;

  }
}