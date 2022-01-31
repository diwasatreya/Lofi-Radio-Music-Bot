const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang, pau, on, off} = require("../../emojis.json")
const ButtonPages = require('discord-button-pages');
const { MessageEmbed } = require('discord.js')
const disbutpages = require("discord-embeds-pages-buttons")
const Discord = require("discord.js");
const disbut = require("discord-buttons");
const MessageButton = require("discord-buttons");
module.exports = {
  
        name: '247',
        aliases: [""],
        category: "music",
        description: 'Repeats all songs in the queue',
        usage: " ",
        accessableby: "everyone",
        premium: true,
    run: async (client, message, args, ops) => {

        
const db =require("quick.db");
let color = db.get(`color_${message.author.id}`);
  if(color === null) color = "#EFB9BE";

          let supreme = new MessageEmbed()
      .setDescription(`${on} **24/7 mode is enabled.** \n ${bnn}${pr} Premium Command`)
      .setColor(color)

        let supreme1 = new MessageEmbed()
      .setDescription(`${off} **24/7 mode is disabled.** \n ${bnn}${pr} Premium Command`)
      .setColor(color)

      
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('You need to be in a voice channel to loop music!');
        const serverQueue = ops.queue.get(message.guild.id);
    try {
        if (!serverQueue) return message.channel.send('Please play some song to enable 24/7.');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("You Have To Be In The Same Channel With The Bot! ");
        }
        if (!serverQueue.loop) {
            serverQueue.loop = true;
            return message.channel.send(supreme);
        } else {
            serverQueue.loop = false;
            return message.channel.send(supreme1);
        }
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send(" Something Went Wrong, Please Try Again! ");
      }
    }
};
