const {b, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, ski} = require("../../emojis.json")
module.exports = {
        name: 'skip',
        description: 'Skip command.',
        category: "music",
        aliases: ["next"],
        usage: " ",
        accessableby: "everyone",
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('You need to be in a voice channel to skip music!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("You Have To Be In The Same Channel With The Bot!");
          }
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('Nothing playing in this server');
      try {
        serverQueue.connection.dispatcher.end();
        return message.channel.send(`${ski} Skipped`)
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("Something Went Wrong!")
      }
    }
};