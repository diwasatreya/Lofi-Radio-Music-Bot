const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");
const db = require("quick.db");
const { prefix, developerID, support, bot } = require("../../config.json")
// Helllo bro whats up? I am poor guy LMAO
module.exports = {
  name: "removepremium",
  aliases: ["rpremium"],
  description: "Information",
  premium: false,

  run: async (client, message, args) => {

    if(message.author.id != developerID){
    return message.channel.send(`Only Bot Owner can use this command`)
  } 

 let guild = client.guilds.cache.get(args[0])

 if (!guild)  return message.channel.send(`Gimme me a Guild ID`)
 

db.set(`premium_${args[0]}`, false)

 message.channel.send(`Removed ${guild.name} as premium server!`)

  }
};