const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], fetchAllMembers: true });
require("dotenv").config();
const fs = require("fs");
const cooldown = new Set();
require("./mongo.js");
const prefix = process.env.PREFIX
const MuteDB = require('./models/SystemMute.js');
const prefixSchema = require("./models/prefix")
const moment = require('moment');
const path = require('path');
client.snipes = new Map();
client.editsnipes = new Map();
client.conf = require('./config/bot');

client.filters = client.conf.filters;

const { Player } = require('discord-player');

client.player = new Player(client);



//Collections
client.commands = new Discord.Collection();

//Reading files
fs.readdirSync("./commands").forEach(folder => {
  const commands = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith(".js"));
  for (file of commands) {
    const cmdn = require(`./commands/${folder}/${file}`);
    client.commands.set(cmdn.name, cmdn);
  };
});

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of player) {
  console.log(`[discord-player event] ${file}`);
  const event = require(`./player/${file}`);
  client.player.on(file.split(".")[0], event.bind(null, client));
};

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of events) {
  console.log(`[discord.js event] ${file}`);
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
};

client.prefix = async function (message) {
  if (!message.guild) return;
  let custom;

  const data = await prefixSchema.findOne({ Guild: message.guild.id })
    .catch(err => console.log(err))

  if (data) {
    custom = data.Prefix;
  } else {
    custom = prefix;
  }
  return custom;
};

function presence() {
  client.user.setPresence({
    status: "dnd",
    activity: {
      name: "invite me ✨",
      type: "WATCHING",
    }
  });
}

client.on("ready", () => {
  console.log(`${client.user.tag} ready ⚡`);
  presence();

  setInterval(async function () {
    let allData = await MuteDB.find()
    allData.map(async a => {
      if (a.time < Date.now()) {
        let member = client.guilds.resolve(a.guildID).member(a.userID)
        member.roles.remove(a.rolID)
        await MuteDB.deleteOne({ userID: a.userID })
      }
    })
  }, 10000);

  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size
  }
  ////////////////express section////////////////

  const express = require("express");

  const app = express();

  const port = 3000 || 3001;

  app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "..", "helper-bot", "pages", "landingPage.html"))
  })

  app.get("/info", (req, res) => {
    res.status(200).send(clientDetails)
  })

  app.listen(port)
});


client.on("message", async message => {
  const blacklist = require('./models/blacklist');
  const p = await client.prefix(message);

  if (message.channel.type === "dm") return;
  if (message.guild.unavailable) return;
  if (message.author.bot) return;

  let modelafk = require("./models/afk"),
    users = message.mentions.users.array(),
    isafk = await modelafk.findOne({ id: message.author.id });

  if (isafk && isafk.isafk) {

    let data = await modelafk.findOne({ id: message.author.id });
    await modelafk.deleteOne({ id: message.author.id });

    const embedAFK = new Discord.MessageEmbed()
      .setDescription("<:HBuser:783351289114918973> Hello **" + message.author.username + "**, i have removed your **AFK**")
      .setColor('#00FF42')
      .addField('<:HBrefresh:783351288292442183> **AFK time**', moment.duration(Date.now() - data.timeAfk).format("d [Days], h [Hours], m [Minutes], s [Seconds]", {
        largest: 1
      }))
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embedAFK);


  }
  for (let i of users) {
    let data = await modelafk.findOne({ id: i.id });
    if (data && data.isafk) {
      const embedMentionUserAFK = new Discord.MessageEmbed()
        .setDescription(`<:HBuser:783351289114918973> **${i.tag}** is AFK`)
        .addField("<:HBsearch:783351288149835857> **Reason:**", "" + data.reason || 'Has No Reason' + "")
        .addField("<:HBrefresh:783351288292442183> **Time AFK:**", moment.duration(Date.now() - data.timeAfk).format("d [Days], h [Hours], m [Minutes], s [Seconds]", {
          largest: 1
        }))
        .setColor('#F3FF0')
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(i.displayAvatarURL({ dynamic: true }))
      message.channel.send(embedMentionUserAFK);
      break;
    }
  };

  const embed = new Discord.MessageEmbed()
    .setDescription("<a:HBarrow:810905324013355092> My prefix is ​​**`" + p + "`**\n<a:HBarrow:810905324013355092> Use **`" + p + "help`** to see my commands\n<a:HBarrow:810905324013355092> I have **`6`** categories and **`" + client.commands.size + "`** commands")
    .setColor("RANDOM")
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return message.channel.send(embed);

  if (!message.content.startsWith(p)) return;
  let blacklist1 = await blacklist.findOne({ id: message.author.id })
  if (blacklist1) return;
  let args = message.content.slice(p.length).trim().split(" ");
  let command = args.shift().toLowerCase();
  const file = client.commands.get(command) || client.commands.find(c => c.aliases.includes(command));
  if (!file) return;
  var id = message.author.id + file.name + file.aliases.join("");
  const time = file.cooldown;
  if (cooldown.has(id)) return message.channel.send(`${message.author}, please wait **${time}** seconds to use that command.`);
  cooldown.add(id);
  if (file) file.run(client, message, args, p);
  setTimeout(() => {
    cooldown.delete(id);
  }, time + "000");
});

client.login(process.env.TOKENBOT);