const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");
const db = require("quick.db");
const { prefix, developerID, support, bot } = require("../../config.json")

module.exports = {
  name: "setpremium",
  aliases: ["setpre"],
  description: "Information",
  premium: false,

  run: async (client, message, args) => {

     if(message.author.id != developerID){
    return message.channel.send(`Only Bot Owner can use this command`)
  } 

 let guild = client.guilds.cache.get(args[0])

 if (!guild)  return message.channel.send(`Give me guild ID`)
 

db.set(`premium_${args[0]}`, true)

 message.channel.send(`**${guild.name}** is now premium server!`)

  }
};