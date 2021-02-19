const Discord = require("discord.js");

module.exports = {
  name: "reportbug",
  aliases: ["rb", "report"],
  description: "It allows the user to submit a bug or error report.",
  category: "Utility",
  usage: "reportbug <error/bug>",
  cooldown: 10,
  run: async (client, message, args) => {

    if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send("<:HBminus:783351288515657728> | I don't have permissions to send embeds.")

    let reporte = args.join(' ');
  
    if (!reporte) return message.channel.send("<:HBminus:783351288515657728> | Send your question or question.")
  
    
    const seguro = new Discord.MessageEmbed()
      .setColor("0xFF0000")
      .setDescription("Are you sure you want to send this message to my Developer?")
   
    message.channel.send(seguro).then(m => { 
      setTimeout(() => {
          m.react('✅'); }, 1000);
        setTimeout(() => {
          m.react('❌'); }, 1500);
  
  
    
    const siFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
    
    const noFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
  
    
    const si = m.createReactionCollector(siFilter, { time: 10000 }); 
    const no = m.createReactionCollector(noFilter, { time: 12000 }); 
  
    
    si.on('collect', async function(r) {
     
      
  
  
      
      message.channel.send("<:HBchecked:783351288171593728> | The message has been sent successfully!")
  
      
      const embed = new Discord.MessageEmbed()
        .setColor("0x00FF0F")
        .setTitle("**Somebody needs help!**")
        .setDescription("**<:HBwarning:783351287944970251> Report**\n"+reporte+"")
        .addField("**<:HBclipboard:783351287504044082> Server Name**", message.guild.name)
        .addField("**<:HBuser:783351289114918973> Report Author**", `${message.author.tag}`)
     
      client.channels.cache.get("800071257684312135").send(embed)
   
     
     await m.delete().catch(() => { }); 
    });
  
    no.on('collect', async function(r) {

    message.channel.send("<:HBchecked:783351288171593728> | Canceling call.")
    
    await m.delete().catch(() => { })
  
   });
  
  });  

  }
}