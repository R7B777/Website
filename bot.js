const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client(1076481275961032764);
const token = 'MTA3NjQ4MTI3NTk2MTAzMjc2NA.GbOS-q.KCjnDVJrrCOi63bHc3Fh3YrpAjtywlCN991V6E';
 

const prefix = '?';

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        if (!message.member.voice.channel) {
            return message.reply('You need to be in a voice channel to use this command!');
        }

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel.joinable || !voiceChannel.speakable) {
            return message.reply('I cannot join or speak in your voice channel.');
        }

        const videoURL = args[0];

        if (!videoURL) {
            return message.reply('You need to provide a valid YouTube URL.');
        }

        try {
            const connection = await voiceChannel.join();
            const stream = ytdl(videoURL, { filter: 'audioonly' });
            const dispatcher = connection.play(stream);

            dispatcher.on('finish', () => {
                voiceChannel.leave();
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

client.login(token);
