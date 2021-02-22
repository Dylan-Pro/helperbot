const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");

module.exports = {
    name: "userinfo",
    aliases: ["ui", "user"],
    description: "Give the information of a server member",
    category: "Utility",
    usage: "user",
    cooldown: 5,
    run: async (client, message, args) => {

        let user = args[0] ? message.mentions.members.first() || message.guild.members.cache.find(e => e.user.username.match(new RegExp(`${args[0]}`, 'gi'))) || message.guild.members.cache.get(args[0]) || message.member : message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "🟢 Online";
                break;
            case "dnd":
                status = "⛔ Do not disturb";
                break;
            case "idle":
                status = "🌙 Missing";
                break;
            case "offline":
                status = "⚪ Offline";
                break;
        }

        let badges1 = {
            'BUGHUNTER_LEVEL_1': '<:bug_hunter_badge:767200588231344128>',
            'BUGHUNTER_LEVEL_2': '<:bughunterlvl2:784154198219685899>',
            'VERIFIED_DEVELOPER': '<a:botdevolper:773249213109633034>',
            'EARLY_VERIFIED_DEVELOPER': '<:developer:778943805138665514>',
            'HOUSE_BRILLIANCE': '<:brilliance_badge:767201442531770378>',
            'HOUSE_BRAVERY': '<:bravery_badge:767201411791978507>',
            'HOUSE_BALANCE': '<:balance_badge:767201464585945130>',
            'VERIFIED_BOT': '<:botverify:773244892708470814>',
            'DISCORD_PARTNER': '<:partner_badge:767203723277369384>',
            'HYPESQUAD_EVENTS': '<a:hypesquad_events:787442653717069856>',
            'DISCORD_EMPLOYEE': '<:staff_badge:767200534603497482>',
            'EARLY_SUPPORTER': '<:earlysupport:784154535517618266>',
        }

        let obj = {
            "HOUSE_BRAVERY": "Bravery", "VERIFIED_BOT": "Bot verificado", "VERIFIED_DEVELOPER": "Desarrollador de bots verificado", "HOUSE_BRILLIANCE": "Brilliance", "DISCORD_PARTNER": "Socio de discord", 'HOUSE_BALANCE': "Balance", 'EARLY_VERIFIED_DEVELOPER': "Desarrollador inicial de bots verificado"
        }

        let fields;
        const avatar = user.user.displayAvatarURL({ dynamic: true })

        if (avatar.endsWith('.gif')) {
            fields = '| <:badge_nitro:781517803861704715>'
        } else {
            fields = ' '
        }
        function Markdown(str) {
            return `\`\`\`\n${str}\n\`\`\``;
        };

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };

        const rolesxd = user.roles.cache.filter((x) => x.id !== message.guild.id).map((x) => `${x}`)
        const listaRoles = rolesxd.length > 10 ? `${rolesxd.slice(0, 10).join(', ')} and **${rolesxd.length - 10}** more roles` : rolesxd.join(', ');
        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.user.username}'s Information`)
            .setColor(user.roles.color ? user.roles.color.hexColor : "BLUE")
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .addField(`<:HBbarchart:783351287676665917> **User Information:**`, [
                `**Tag:** ${user.user.tag}`,
                `**ID:** ${user.user.id}`,
                `**Activity:** ${status}`,
                `**Badges:** ${user.user.flags > 0 ? user.user.flags.toArray().filter((x) => !['VERIFIED_DEVELOPER', 'DISCORD_PARTNER'].includes(x)).map(badge => badges1[badge]).join(' | ') : "Has no badges"} ${fields || ""}`,
                `**Creation Date:** ${user.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(user.user.createdAt)})`
            ])
            .addField("<:HBuser:783351289114918973> **Member Information:**", [
                `**Join Server:** ${user.joinedAt.toUTCString().substr(0, 16)} (${checkDays(user.joinedAt)})`,
                `**Booster:** ${user.premiumSince ? 'I am Boosting <:badge_boost:784078410003644467>' : 'I am not Boosting'}`,
                `**Hex Color:** ${user.displayHexColor || "Has no Color"}`,
                `**Nickname:** ${user.nickname || "Has no Nickname"}`
            ])
            .addField(`<:HBsearch:783351288149835857> **Member Roles:**`, [
                `**Highest Role:** ${user.roles.highest || "Has No Higher Role"}`,
                `**Role Color:** ${user.roles.color || "Is has no role that gives it color"}`,
                `**Roles:** ${listaRoles || "Has no roles"}`
            ])
            .addField('<:HBshield:783351288313937991> **Member Permissions:**', Markdown(user.permissions.toArray().join(', ')))
            .setFooter("Helper Bot | System utility", client.user.displayAvatarURL())

        await message.channel.send(embed);
    }
}