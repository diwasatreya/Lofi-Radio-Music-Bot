const { Util, MessageEmbed } = require('discord.js');
const { GOOGLE_API_KEY } = require('../../config');
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(GOOGLE_API_KEY);
const Discord = require("discord.js");
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");
const ytdl = require('ytdl-core');
const { prefix, developerID, bot, support } = require("../../config.json");
const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang, pau, on, off, fp} = require("../../emojis.json")
 const ba = bnn;
module.exports = {

        name: 'help',
        description: 'Play command',
        aliases: ["h"],
        category: "music",
        usage: '[song (name | link)]',
        accessableby: "everyone",
        premium: false,
    run: async (client, message, args, ops) => {


const db =require("quick.db");
let color = db.get(`color_${message.author.id}`);
  if(color === null) color = "#EFB9BE";

  const vchelp = new Discord.MessageEmbed()
    .setAuthor(`${client.user.username}`, "https://images-ext-2.discordapp.net/external/Ab0oASUOj_dyvpA5iVEliz9s8w1YXszoXUr-s2CS2uQ/https/cdn.discordapp.com/avatars/884311931656237146/6aee6101fc5dcc6a4a686ee0909532dc.webp")
    .setDescription(`${m} **Music**\n${b}${p} **play:** Joins your voice channel and starts playing 24/7.\n${b}${pau} **pause:** Pause the music.\n${b}${s} **stop:** Leaves the voice channel.\n${b}${d} **song:** Shows the current playing song.\n${b}${v} **volume:** Shows or changes the current volume.\n${b}${on} **247:** Play song 24/7 in VC.\n${c} **Config**\n${b}${dot} **setprefix:** Changes the prefix of ${client.user.username}.\n${b}${pr} **premium:** Shows information about ${client.user.username} premium.\n${i} **Info**\n${b}${su} **support:** Send us a message or [join](https://discord.gg/whJeF4mDAX) our support server.\n${b}${vo} **Vote:** Vote ${client.user.username}.\n${b}${inv} **invite:** [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) ${client.user.username} to your server.`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(color)

   let nb1 = new MessageButton()
    .setLabel(`Play`)
    .setEmoji(`937063455612096523`)
    .setID(`nbplay`)
    .setDisabled()
    .setStyle("grey");

     let nb2 = new MessageButton()
    .setLabel(`Stop`)
    .setEmoji(`937063697157861527`)
    .setID(`nbstop`)
    .setDisabled()
    .setStyle("grey");

     let nb3 = new MessageButton()
    .setLabel(`Support`)
    .setEmoji(`937063787821953034`)
    .setStyle("url")
     .setURL(`${support}`);
    
     let nb4 = new MessageButton()
    .setLabel(`Invite`)
    .setEmoji(`937180690091487343`)
    .setStyle("url")
     .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);
     

    

     

       let b1 = new MessageButton()
    .setLabel(`Play`)
    .setEmoji(`937063455612096523`)
    .setID(`play`)
    .setStyle("grey");

     let b2 = new MessageButton()
    .setLabel(`Stop`)
    .setEmoji(`937063697157861527`)
    .setID(`stop`)
    .setStyle("grey");

     let b3 = new MessageButton()
    .setLabel(`Support`)
    .setEmoji(`937063787821953034`)
    .setStyle("url")
     .setURL(`${support}`);
    
     let b4 = new MessageButton()
    .setLabel(`Invite`)
    .setEmoji(`937180690091487343`)
    .setStyle("url")
     .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);

     


        
let rows = new MessageActionRow()
    .addComponents(b1, nb2, b3, b4);

    let rowss = new MessageActionRow()
    .addComponents(nb1, b2, b3, b4);


let nhh = new MessageActionRow()
    .addComponents(nb1, nb2, nb3, nb4);



  

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(vchelp, nhh);

              

                 const MESSAGE = await message.channel.send(vchelp, rows);

    const filter = (button) => button.clicker.user.id !== client.user.id

    const collector = MESSAGE.createButtonCollector(filter, { time: 60000 });

    collector.on('collect', async (b) => {
const { channel } = message.member.voice;
         const embed1 = new MessageEmbed()
                    .setColor(color)
                    .setDescription(`${m} Successfully joined and bound to ${  message.guild.me.voice.channel || message.member.voice.channel}\n${ba}${d} You can enable 24/7 mode by getting premium.`)


                      const embed2 = new MessageEmbed()
                    .setColor(color)
                    .setDescription(`${m} Successfully stoped playing lofi music.\n${ba}${d} You can enable 24/7 mode by getting premium.`)

        if(b.id == "play") {

const songgs = require("../../songg.json")
let songg = songgs.songg[Math.floor((Math.random() * songgs.songg.length))];

          if (!channel) return await b.reply.send('You need to be in voice channel', true); 
         
  

        args = `${songg}`;
        const searchString = args
        const url = args ? args.replace(/<(.+)>/g, '$1') : '';
  
         MESSAGE.edit(vchelp, rowss)
             b.reply.send(embed1, b3);
             
             
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, channel, true);
            }
            return message.channel.send(`**Playlist \`${playlist.title}\` has been songgded to the queue!**`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch (err) {
                    console.error(err)
                    return message.channel.send(`Sorry ${message.author.username}, I cant find that song`)
                }
            }
            return handleVideo(video, message, channel);
        }
            async function handleVideo(video, message, channel, playlist = false) {
                const serverQueue = ops.queue.get(message.guild.id);
                const songInfo = await ytdl.getInfo(video.id);
                const song = {
                    id: video.id,
                    title: Util.escapeMarkdown(video.title),
                    url: `https://www.youtube.com/watch?v=${video.id}`,
                    thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
                    duration: video.duration,
                    time: songInfo.videoDetails.lengthSeconds
                };

                let npmin = Math.floor(song.time / 60);
                let npsec = song.time - npmin * 60
                let np = `${npmin}:${npsec}`.split(' ')

                if (serverQueue) {
                    serverQueue.songs.push(song);


                    if (playlist) return undefined;
                    else {
                        const sembed = new MessageEmbed()
                            .setColor(color)
                            .setTitle(client.user.username, message.author.displayAvatarURL())
                            .setDescription(`${m} Added one more song in queue ${np} minutes \n${d} **Added by:** ${message.member.displayName}`)
                            .setFooter(`Dev: Supreme#2401`);
                        message.channel.send(sembed)
                    }
                    return undefined;
                }

                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: channel,
                    connection: null,
                    songs: [],
                    volume: 6,
                    playing: true,
                    loop: false,
                };
                ops.queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song);
                try {
                    const connection = await channel.join();
                   
                    queueConstruct.connection = connection;
                    play(queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error.message}`);
                    ops.queue.delete(message.guild.id);
                    await channel.leave();
                    return message.channel.send(`I could not join the voice channel: ${error.message}`);
                }
            };
            async function play(song) {
                const queue = ops.queue.get(message.guild.id);
                if (!song) {
                    queue.voiceChannel.leave();
                    ops.queue.delete(message.guild.id);
                    return;
                };

            
                
  const serverQueue = ops.queue.get(message.guild.id);
                let npmin = Math.floor(song.time / 60);
                let npsec = song.time - npmin * 60
                let np = `${npmin}:${npsec}`.split(' ')

  const dispatcher = queue.connection.play(ytdl(song.url, { highWaterMark: 1 << 20, quality: "highestaudio" }))
                    .on('finish', () => {
                        if (queue.loop) {
                            queue.songs.push(queue.songs.shift());
                            return play(queue.songs[0]);
                        }
                        queue.songs.shift();
                        play(queue.songs[0]);
                    })
                    .on('error', error => console.error(error));
                dispatcher.setVolumeLogarithmic(queue.volume / 5);


            };
             
    

   
  
        
        
            
        }  if(b.id == "stop") {
           

  if (!channel) return await b.reply.send('You need to be in voice channel', true);
           if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return await b.reply.send('You have to join my VC', true);
        }

               
  const serverQueue = ops.queue.get(message.guild.id);
if (serverQueue) {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
        message.guild.me.voice.channel.leave();
        } else {
        channel.leave();
        }
        MESSAGE.edit(vchelp, nhh);
            return await b.reply.send(embed2, b4);

      if(serverQueue = null ) {
    return await b.reply.send('There is nothing to stop', true);
      }
        
            
        }


    });

    collector.on('end', async (b) => {
  
        MESSAGE.edit(vchelp, nhh)
    })

      
        


        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Missing Permission, I dont have connect permission.');
        if (!permissions.has('SPEAK')) return message.channel.send('Missing Permission, I dont have speak permission.');



    }
};
