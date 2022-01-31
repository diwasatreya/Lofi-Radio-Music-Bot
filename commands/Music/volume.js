const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang, pau} = require("../../emojis.json")
module.exports = {
        name: 'volume',
        aliases: ["vol"],
        category: "music",
        description: 'Shows and changes volume.',
        usage: ', vol [volume]',
        accessableby: "everyone",
        premium: false,
    run: async (bot, message, args, ops) => {
       if(isNaN(args[0])) {
                return message.channel.send(`Invalid Volume provided!`)
            
            }
            if(args[0] >= 8) {
  return message.channel.send(`${message.author.username} provide me volume less than 8`) }
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('You need to be in a voice channel to change volume!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("You Have To Be In The Same Channel With The Bot!");
          }
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
      try {
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        return message.channel.send(`I have set the volume to **${args[0]}**`);
      } catch {
          return message.channel.send('Something Went Wrong!');
      }
    }
};