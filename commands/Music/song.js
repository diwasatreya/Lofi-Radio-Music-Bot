const ButtonPages = require('discord-button-pages');
const { MessageEmbed } = require('discord.js')
const disbutpages = require("discord-embeds-pages-buttons")
const Discord = require("discord.js");
const disbut = require("discord-buttons");
const MessageButton = require("discord-buttons");
const { prefix, developerID, support, bot } = require("../../config.json")
const {b, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang} = require("../../emojis.json")

module.exports = {
 
        name: 'song',
        category: "music",
        aliases: ["np", "nowplaying"],
        description: 'Now playing command',
        usage: "Shows current song playing",
        accessableby: "everyone",
        premium: false,
    run: async (bot, message, args, ops) => {
        try {
          const db =require("quick.db");
let color = db.get(`color_${message.author.id}`);
  if(color === null) color = "#EFB9BE";
            const serverQueue = ops.queue.get(message.guild.id);
            if (!serverQueue) return message.channel.send('Nothing playing in this server ');
            let video = serverQueue.songs[0];
            let description;
            if (video.duration == 'Live Stream') {
                description = 'Live Stream';
            } else {
                description = `${m} ${video.title} \n${b}${dev} **Developer:** [Supreme#2401](https://discord.gg/whJeF4mDAX)`;
            }
            const videoEmbed = new MessageEmbed()
                .setColor(color)
                .setAuthor(`Now Playing`, "https://images-ext-2.discordapp.net/external/vZHbVyrbM-oe7tactb-xDtTWKfUCa17PRi4Umg0-SZk/https/images-ext-2.discordapp.net/external/Ab0oASUOj_dyvpA5iVEliz9s8w1YXszoXUr-s2CS2uQ/https/cdn.discordapp.com/avatars/884311931656237146/6aee6101fc5dcc6a4a686ee0909532dc.webp")
                .setDescription(description)
            message.channel.send(videoEmbed);
            return;

            function playbackBar(video) {
                const passedTimeInMS = serverQueue.connection.dispatcher.streamTime;
                const passedTimeInMSObj = {
                    seconds: Math.floor((passedTimeInMS / 1000) % 60),
                    minutes: Math.floor((passedTimeInMS / (1000 * 60)) % 60),
                    hours: Math.floor((passedTimeInMS / (1000 * 60 * 60)) % 24)
                };
                const passedTimeFormatted = formatDuration(
                    passedTimeInMSObj
                );

                const totalDurationObj = video.duration;
                const totalDurationFormatted = formatDuration(
                    totalDurationObj
                );

                let totalDurationInMS = 0;
                Object.keys(totalDurationObj).forEach(function (key) {
                    if (key == 'hours') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 3600000;
                    } else if (key == 'minutes') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 60000;
                    } else if (key == 'seconds') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 100;
                    }
                });
                const playBackBarLocation = Math.round(
                    (passedTimeInMS / totalDurationInMS) * 10
                );
                
                let playBack = '';
                for (let i = 1; i < 21; i++) {
                    if (playBackBarLocation == 0) {
                        playBack = ':musical_note:▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
                        break;
                    } else if (playBackBarLocation == 11) {
                        playBack = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬:musical_note:';
                        break;
                    } else if (i == playBackBarLocation * 2) {
                        playBack = playBack + ':musical_note:';
                    } else {
                        playBack = playBack + '▬';
                    }
                }
                playBack = `${playBack}\n\n\`${passedTimeFormatted} / ${totalDurationFormatted}\``;
                return playBack
            }

            function formatDuration(durationObj) {
                const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
                    durationObj.minutes ? durationObj.minutes : '00'
                    }:${
                    (durationObj.seconds < 10)
                        ? ('0' + durationObj.seconds)
                        : (durationObj.seconds
                            ? durationObj.seconds
                            : '00')
                    }`;
                return duration;
            }
        } catch {
            message.channel.send(" Something Went Wrong! ")
        }
    }
}