const ButtonPages = require('discord-button-pages');
const { MessageEmbed } = require('discord.js')
const disbutpages = require("discord-embeds-pages-buttons")
const Discord = require("discord.js");
const disbut = require("discord-buttons");
const MessageButton = require("discord-buttons");
const { prefix, developerID, support, bot } = require("../../config.json")
const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang} = require("../../emojis.json")

module.exports = {
  name: "invite",
  aliases: ["support"],
  description: "Information",
  premium: false,

  run: async (client, message, args) => {
     
    const db =require("quick.db");
let color = db.get(`color_${message.author.id}`);
  if(color === null) color = "#EFB9BE";
    let helpEmbed = new MessageEmbed()
    .setAuthor(`${client.user.username} Links`, "https://images-ext-2.discordapp.net/external/Ab0oASUOj_dyvpA5iVEliz9s8w1YXszoXUr-s2CS2uQ/https/cdn.discordapp.com/avatars/884311931656237146/6aee6101fc5dcc6a4a686ee0909532dc.webp")
      .setDescription(`*${dot} Here is invite and support server link* \n${b}${dev} **Developer:** [Supreme#2401](https://discord.gg/whJeF4mDAX)`)
      .setColor(color)

      let button1 = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Invite') 
      .setEmoji(`937180690091487343`)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);
      let button2 = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Support Server') 
       .setEmoji(`937063787821953034`)
      .setURL(`${support}`);


      return message.channel.send(helpEmbed,{
        button: [button1,button2],
      });

  }
};