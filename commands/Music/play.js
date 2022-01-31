const { Util, MessageEmbed } = require('discord.js');
const { GOOGLE_API_KEY } = require('../../config');
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(GOOGLE_API_KEY);
const Discord = require("discord.js");
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");
const ytdl = require('ytdl-core');
const { prefix, developerID, bot, support } = require("../../config.json");
const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang} = require("../../emojis.json")
 const ba = b;
module.exports = {

        name: 'play',
        description: 'Play command',
        aliases: ["p"],
        category: "music",
        usage: '[song (name | link)]',
        accessableby: "everyone",
        premium: false,
    run: async (client, message, args, ops) => {


const db =require("quick.db");
let color = db.get(`color_${message.author.id}`);
  if(color === null) color = "#EFB9BE";

if(args[0])
  {
      
 const { channel } = message.member.voice;
        if (!channel) return message.channel.send('You should join voice channel to play music!');

        if (!args[0]) return message.channel.send("Give me a link or song name or link you want to play!")
        args = message.content.split(' ');
        const searchString = args.slice(1).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';


        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Missing Permission, I dont have connect permission.');
        if (!permissions.has('SPEAK')) return message.channel.send('Missing Permission, I dont have speak permission.');

        let button1 = new MessageButton()
    .setLabel(`Pause`)
    .setEmoji(`937063426121936907`)
    .setID(`pause`)
    .setStyle("grey");

    let button2 = new MessageButton()
    .setLabel(`Resume`)
    .setEmoji(`937063455612096523`)
    .setID(`resume`)
    .setStyle("grey");

    let button3 = new MessageButton()
    .setLabel(`Skip`)
    .setEmoji(`937265413463605278`)
    .setID(`skip`)
    .setStyle("grey");

    let button4 = new MessageButton()
    .setLabel(`Pause`)
     .setEmoji(`937063426121936907`)
    .setID(`dpause`)
    .setDisabled()
    .setStyle("grey");

     let button5 = new MessageButton()
    .setLabel(`Resume`)
    .setEmoji(`937063455612096523`)
    .setID(`dresume`)
    .setDisabled()
    .setStyle("grey");

     let button6 = new MessageButton()
    .setLabel(`Skip`)
    .setEmoji(`937265413463605278`)
    .setID(`dskip`)
    .setDisabled()
    .setStyle("grey");

    let button7 = new MessageButton()
    .setLabel(`Loop`)
    .setEmoji(`937063815286226985`)
    .setID(`loop`)
    .setStyle("grey");

    let button8 = new MessageButton()
    .setLabel(`Loop`)
    .setID(`dloop`)
    .setEmoji(`937063815286226985`)
    .setDisabled()
    .setStyle("grey");

let rowss = new MessageActionRow()
    .addComponents(button4, button5, button6, button8);


    let row = new MessageActionRow()
    .addComponents(button1, button3, button7);

    let rows = new MessageActionRow()
    .addComponents(button2, button3);

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, channel, true);
            }
            return message.channel.send(`**Playlist \`${playlist.title}\` has been added to the queue!**`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch (err) {
                    console.error(err)
                    return message.channel.send(`Sorry ${messahe.author.username}, I cant find that song`)
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
                            .setTitle("Added To Queue", message.author.displayAvatarURL())
                            .setThumbnail(song.thumbnail)
                            .setTimestamp()
                            .setDescription(`**Title:** [${song.title}](${song.url}) \n\n **Song Duration:** ${np} minutes \n\n **Status:** Pending`)
                            .setFooter(`Added By: ${message.member.displayName}`);
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
  
  
        
                const embed = new MessageEmbed()
                    .setColor(color)
                    .setTitle('Started Playing')
                    .setThumbnail(song.thumbnail)
                    .setTimestamp()
                    .setDescription(`${m} **Title:** [${song.title}](${song.url}) \n\n ${r}**Song Duration** ${np} minutes \n\n ${dot} **Status:** **Playing** \n\n *Only author can skip and loop song*`)
                    .setFooter(`Played by: ${message.member.displayName} `, message.author.displayAvatarURL());

                    const embed3 = new MessageEmbed()
                    .setColor(color)
                    .setTitle('Song was Ended')
                    .setThumbnail(song.thumbnail)
                    .setTimestamp()
                    .setDescription(`${m} **Title:** [${song.title}](${song.url}) \n\n ${d} **Song Duration** ${np} minutes \n\n ${dot} **Status:** **Finished** `)
                    .setFooter(`Played by: ${message.member.displayName} `, message.author.displayAvatarURL());

  



                    
                
                const MESSAGE = await queue.textChannel.send(embed, row);

    const filter = (button) => button.clicker.user.id !== client.user.id

    const collector = MESSAGE.createButtonCollector(filter, { time: song.time > 0 ? song.time * 1000 : 600000 });

    collector.on('collect', async (b) => {
const { channel } = message.member.voice;
        
      const embed4 = new MessageEmbed()
                    .setColor(color)
                    .setTitle('Started Playing')
                    .setThumbnail(song.thumbnail)
                    .setTimestamp()
                    .setDescription(`${m} **Title:** [${song.title}](${song.url}) \n\n ${d} **Song Duration** ${np} minutes \n\n ${dot} **Status:** Resumed by ${b.clicker.member} \n\n *Only author can skip and loop song* `)
                    .setFooter(`Played by: ${message.member.displayName} `, message.author.displayAvatarURL());

      const embed2 = new MessageEmbed()
                    .setColor(color)
                    .setTitle('Music Paused')
                    .setThumbnail(song.thumbnail)
                    .setTimestamp()
                    .setDescription(`${m} **Title:** [${song.title}](${song.url}) \n\n ${d} **Song Duration:** ${np} minutes \n\n ${dot} **Status:** Paused by ${b.clicker.member} \n\n *Only author can skip and loop song* `)
                    .setFooter(`Played by: ${message.member.displayName}`, message.author.displayAvatarURL());

                     const embed5 = new MessageEmbed()
                    .setColor(color)
                    .setTitle('Skiped Song')
                    .setThumbnail(song.thumbnail)
                    .setTimestamp()
                    .setDescription(`${m} **Title:** [${song.title}](${song.url}) \n\n ${d} **Song Duration** ${np} minutes \n\n ${dot} **Status:** Skiped by ${b.clicker.member} `)
                    .setFooter(`Played by: ${message.member.displayName} `, message.author.displayAvatarURL());

        if(b.id == "pause") {
          if (!channel) return await b.reply.send('You need to be in voice channel', true);
          if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return await b.reply.send('You have to join my VC', true);
        }
  
           if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true);
            MESSAGE.edit(embed2, rows);
            return await b.reply.send('Music has been paused', true);
             
        }
  
    return await b.reply.send('There is nothing is playing or song is already paused!', true);

   
  
        
        
            
        }
         if(b.id == "resume") {

           if (!channel) return await b.reply.send('You need to be in voice channel', true);
           if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return await b.reply.send('You have to join my VC', true);
        }

           if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
                MESSAGE.edit(embed4, row);
            return await b.reply.send('Music has been resumed', true);
        }
      
    return await b.reply.send('There is nothing is playing or song is already resumed!', true);


  
        
        
            
            
        }

         if(b.id == "skip") {

           if (!channel) return await b.reply.send('You need to be in voice channel', true);
if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return await b.reply.send('You have to join my VC', true);
        }

       if (b.clicker.id === message.author.id) {
        serverQueue.connection.dispatcher.end();
        MESSAGE.edit(embed5, rowss);
        return await b.reply.send('Skiped!', true)
        
         }
         return await b.reply.send(`Only ${message.author.username} can skip! Please contact him to skip`, true)
      
       
            
            
        }
         if(b.id == "loop") {
if (!channel) return await b.reply.send('You need to be in voice channel', true);
           
if (b.clicker.id === message.author.id ) {
            if (!serverQueue) return await b.reply.send('There is nothing playing.', true);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return await b.reply.send('You have to join my VC', true);
        }
        if (!serverQueue.loop) {
            serverQueue.loop = true;
            return await b.reply.send('Loop is now on', true);
        } else {
            serverQueue.loop = false;
            return await b.reply.send('Loop is now off', true);
        }
 }
         return await b.reply.send(`Only ${message.author.username} can loop queue please contact him to loop`, true)


  
        
        
            
            
        }
      

    });

    collector.on('end', async (b) => {
  
        MESSAGE.edit(embed3, rowss)
    })
            };
  }

else {


 

   let nb1 = new MessageButton()
    .setLabel(`English`)
    .setEmoji(`937180804516282418`)
    .setID(`english`)
    .setDisabled()
    .setStyle("grey");

     let nb2 = new MessageButton()
    .setLabel(`Hindi`)
    .setEmoji(`937180804516282418`)
    .setID(`hindi`)
    .setDisabled()
    .setStyle("grey");

    let nb3 = new MessageButton()
    .setLabel(`Spanish`)
    .setEmoji(`937180804516282418`)
    .setID(`spanish`)
    .setDisabled()
    .setStyle("grey");

let nb4 = new MessageButton()
    .setLabel(`Nepali`)
    .setEmoji(`937180804516282418`)
    .setID(`nepali`)
    .setDisabled()
    .setStyle("grey");

    

     

        let b1 = new MessageButton()
    .setLabel(`English`)
    .setEmoji(`937180804516282418`)
    .setID(`english`)
    .setStyle("grey");

     let b2 = new MessageButton()
    .setLabel(`Hindi`)
    .setEmoji(`937180804516282418`)
    .setID(`hindi`)
    .setStyle("grey");

     let b3 = new MessageButton()
    .setLabel(`Spanish`)
    .setEmoji(`937180804516282418`)
    .setID(`spanish`)
    .setStyle("grey");

     let b4 = new MessageButton()
    .setLabel(`Nepali`)
    .setEmoji(`937180804516282418`)
    .setID(`nepali`)
    .setStyle("grey");

     


        
let rows = new MessageActionRow()
    .addComponents(b1, b2, b3, b4);


let nhh = new MessageActionRow()
    .addComponents(nb1, nb2, nb3, nb4);

 const nvchelp = new MessageEmbed()
                    .setColor(color)
                    .setDescription(`${m} **Please join VC to play lofi songs**\n${ba}${d} Developer: [Supreme#2401](https://discord.gg/whJeF4mDAX)`) 
  

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(nvchelp, nhh);

                const abab = new MessageEmbed()
                    .setColor(color)
                    .setDescription(`${d} Select the language you want to listen.\n${ba}${dev} Developer: [Supreme#2401](https://discord.gg/whJeF4mDAX)`)

                 const MESSAGE = await message.channel.send(abab, rows);

    const filter = (button) => button.clicker.user.id !== client.user.id

    const collector = MESSAGE.createButtonCollector(filter, { time: 60000 });

    collector.on('collect', async (b) => {
const { channel } = message.member.voice;
        
      const embed1 = new MessageEmbed()
                    .setColor(color)
                    .setTimestamp()
                    .setDescription(`${m} Successfully joined and bound to ${  message.guild.me.voice.channel || message.member.voice.channel}\n${ba}${d} **Playing/Added English Lofi Songs.**`)


                       const embed2 = new MessageEmbed()
                    .setColor(color)
                    .setTimestamp()
                    .setDescription(`${m} Successfully joined and bound to ${  message.guild.me.voice.channel || message.member.voice.channel}\n${ba}${d} **Playing/Added/Added Hindi Lofi Songs.**`)

                     const embed3 = new MessageEmbed()
                    .setColor(color)
                    .setTimestamp()
                    .setDescription(`${m} Successfully joined and bound to ${  message.guild.me.voice.channel || message.member.voice.channel}\n${ba}${d} **Playing/Added Spanish Lofi Songs.**`)


                       const embed4 = new MessageEmbed()
                    .setColor(color)
                    .setTimestamp()
                    .setDescription(`${m} Successfully joined and bound to ${  message.guild.me.voice.channel || message.member.voice.channel}\n${ba}${d} **Playing/Added  Nepali Lofi Songs.**`)

        if(b.id == "english") {
           

const supreme1 = ['English lofi song 2021', '1 hours english lofi song', 'Top Hit english lofi song', 'english lofi song study', 'english lofi song sleep/relax', 'english lofi song collection', 'aesthetic english lofi reverb song', 'english lofi slowed song'];

  let eng = supreme1[Math.floor(Math.random() * supreme1.length)];


          if (!channel) return await b.reply.send('You need to be in voice channel', true); 
  

        args = `${eng}`;
        const searchString = args
        const url = args ? args.replace(/<(.+)>/g, '$1') : '';
  
         MESSAGE.edit(embed1, nhh)
             b.reply.send(`${p} Playing/Added  English lo-fi songs`, true);
             
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
                            .setTitle("Added To Queue", message.author.displayAvatarURL())
                            .setDescription(`${m} ${song.title}\n ${bnn}${vo} Added by: ${message.member.displayName}\n ${bnn}${d} English lo-fi`)
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
             
    

   
  
        
        
            
        }  if(b.id == "hindi") {
           




          if (!channel) return await b.reply.send('You need to be in voice channel', true); 

const supreme2 = ['hindi lofi songs', 'hindi lofi song sleep/relax', 'hindi lofi song study', 'hindi lofi slowed song', 'hindi lofi song collection', 'aesthetic hindi lofi reverb song', 'romantic lofi hindi song'];
  let hin = supreme2[Math.floor(Math.random() * supreme2.length)];  

        args = `${hin}`;
        const searchString = args
        const url = args ? args.replace(/<(.+)>/g, '$1') : '';
  
         MESSAGE.edit(embed2, nhh)
             b.reply.send(`${p} Playing/Added  Hindi lo-fi songs`, true);
             
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, channel, true);
            }
            return message.channel.send(`**Playlist \`${playlist.title}\` has been added to the queue!**`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch (err) {
                    console.error(err)
                    return message.channel.send(`Sorry ${messahe.author.username}, I cant find that song`)
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
                            .setTitle("Added To Queue", message.author.displayAvatarURL())
                            .setDescription(`${m} ${song.title}\n ${bnn}${vo} Added by: ${message.member.displayName}\n ${bnn}${d} Hindi lo-fi`)
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
             
    

   
  
        
        
            
        }


         if(b.id == "spanish") {
           




          if (!channel) return await b.reply.send('You need to be in voice channel', true); 
  
const supreme3 = ['spanish lofi songs', 'spanish lofi song sleep/relax', 'spanish lofi song study', 'spanish lofi slowed song', 'spanish lofi song collection', 'aesthetic spanish lofi reverb song'];
  let spa = supreme3[Math.floor(Math.random() * supreme3.length)];
        args = `${spa}`;
        const searchString = args
        const url = args ? args.replace(/<(.+)>/g, '$1') : '';
  
         MESSAGE.edit(embed3, nhh)
             b.reply.send(`${p} Playing/Added  Spanish lo-fi songs`, true);
             
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
                    return message.channel.send(`Sorry ${messahe.author.username}, I cant find that song`)
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
                            .setTitle("Added To Queue", message.author.displayAvatarURL())
                            .setDescription(`${m} ${song.title}\n ${bnn}${vo} Added by: ${message.member.displayName}\n ${bnn}${d} Spanish lo-fi`)
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
             
    

   
  
        
        
            
        }

         if(b.id == "nepali") {
           




          if (!channel) return await b.reply.send('You need to be in voice channel', true); 
  const supreme4 = ['nepali lofi songs', 'nepali lofi song sleep/relax', 'nepali lofi song study', 'nepali lofi slowed song', 'nepali lofi song collection', 'aesthetic nepali lofi reverb song'];
  let nep = supreme4[Math.floor(Math.random() * supreme4.length)];

        args = `${nep}`;
        const searchString = args
        const url = args ? args.replace(/<(.+)>/g, '$1') : '';
  
         MESSAGE.edit(embed4, nhh)
             b.reply.send(`${p} Playing/Added  Nepali lo-fi songs`, true);
             
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
                    return message.channel.send(`Sorry ${messahe.author.username}, I cant find that song`)
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
                            .setTitle("Added To Queue", message.author.displayAvatarURL())
                            .setDescription(`${m} ${song.title}\n ${bnn}${vo} Added by: ${message.member.displayName}\n ${bnn}${d} Nepali lo-fi`)
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
             
    

   
  
        
        
            
        }
    });


      
        


        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Missing Permission, I dont have connect permission.');
        if (!permissions.has('SPEAK')) return message.channel.send('Missing Permission, I dont have speak permission.');

}

    }
};