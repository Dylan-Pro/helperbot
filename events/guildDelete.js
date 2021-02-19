const Discord = require('discord.js');

module.exports = async (client, guild) => {
    const EmbedNewGuild = new Discord.MessageEmbed()
        .setDescription(
            "**Server information.**\n\`\`\`diff\n- Name: " + guild.name + "\n- Owner: " + guild.owner.user.tag + "\n- Server ID: " + guild.id + "\n- Members: " + guild.memberCount + "\n\`\`\`"
        )
        .addField("**My stats.**", "\`\`\`diff\n- Servers: " + client.guilds.cache.size + "\n- Users: " + client.users.cache.size + "\n- Channels: " + client.channels.cache.size + "\n\`\`\`")
        .setTimestamp()
        .setColor("#FF0000")
        .setTitle(`**${client.user.username}** has been remove to a server`)
        .setThumbnail(guild.iconURL({ dynamic: true, format: 'png' }));
        client.channels.cache.get('800071257491767335').send(EmbedNewGuild);
};