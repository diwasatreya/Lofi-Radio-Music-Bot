const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang} = require("../../emojis.json")
module.exports = {

        name: 'stop',
        aliases: ["leave"],
        category: "music",
        description: "stops the music playing",
        usage: ' ',
        acessableby: "everyone",
        premium: false,
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('You need to be in a voice channel to stop music!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("You Have To Be In The Same Channel With The Bot!");
          }
        const serverQueue = ops.queue.get(message.guild.id);
      try {
        if (serverQueue) {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
        message.guild.me.voice.channel.leave();
        } else {
        channel.leave();
        }
        return message.channel.send(`${s} Disconnected`)
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("Something Went Wrong!");
      }
    }
};