const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang, pau} = require("../../emojis.json")
module.exports = {

        name: 'pause',
        noalias: 'No Aliases',
        category: "music",
        description: 'Pause command.',
        usage: " ",
        accessableby: "everyone",
        premium: false,
    run: async (bot, message, args, ops) => {
        const serverQueue = ops.queue.get(message.guild.id);
        const { channel } = message.member.voice;
      try {
        if (!channel) return message.channel.send('You need to be in a voice channel to pause music!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send(" You Have To Be In The Same Channel With The Bot! ");
        };
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true);
            return message.channel.send(`${pau} Paused`);
        }
        return message.channel.send(`${pr} There is Nothing Playing!`);
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
      }
    }
};