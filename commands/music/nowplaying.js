const Discord = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    description: "Displays information about the currently playing song",
    category: "Music",
    usage: "np",
    cooldown: 2,
    run: async (client, message, args, playlist) => {


        if (!message.member.voice.channel) return message.channel.send(`<:HBminus:783351288515657728> | You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`<:HBminus:783351288515657728> | You are not in the same voice channel!`);

        if (!client.player.getQueue(message)) return message.channel.send(`<:HBminus:783351288515657728> | No music currently playing!`);

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;
        
        
        const embedSong = new Discord.MessageEmbed()
            .setColor('#00FFF7')
            .setTitle(track.title)
            .setURL(track.url)
            .setFooter('Helper Bot | Music')
            .addFields(
                {
                    name: '<:HBclipboard:783351287504044082> **Channel**',
                    value: track.author,
                    inline: true
                },
                {
                    name: '<:HBuser:783351289114918973> **Requested by**',
                    value: track.requestedBy.tag,
                    inline: true
                },
                {
                    name: '<:HBfile:783351289224101928> **From playlist**',
                    value: track.fromPlaylist ? 'Yes' : 'No',
                    inline: true
                },
                {
                    name: '<:HBsearch:783351288149835857> **Views**',
                    value: track.views,
                    inline: true
                },
                {
                    name: '⏲️ **Duration**',
                    value: track.duration,
                    inline: true
                },
                {
                    name: '<:HBvolume:783351287734730814> **Volume**',
                    value: client.player.getQueue(message).volume,
                    inline: true
                },
                {
                    name: '<:HBrefresh:783351288292442183> **Repeat mode**',
                    value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No',
                    inline: true
                },
                {
                    name: '<:HBshield:783351288313937991> **Currently paused**',
                    value: client.player.getQueue(message).paused ? 'Yes' : 'No',
                    inline: true
                },
                {
                    name: '<:HBsettings:783351288536629268> **Filters activated**',
                    value: filters.length + '/' + client.filters.length,
                    inline: true
                },
                {
                    name: '<:HBbarchart:783351287676665917> **Progress bar**',
                    value: client.player.createProgressBar(message, { timecodes: true }),
                    inline: false
                }
            )
            .setThumbnail(track.thumbnail)
            .setTimestamp();
            message.channel.send(embedSong)

    }
}