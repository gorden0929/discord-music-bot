import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import ytdl from 'ytdl-core';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
});

client.on(Events.MessageCreate, async (message) => {
  if (!message.content.startsWith('!play') || message.author.bot) return;

  const args = message.content.split(' ');
  const url = args[1];

  if (!url || !ytdl.validateURL(url)) {
    message.channel.send('Please provide a valid YouTube URL.');
    return;
  }

  if (message.member!.voice.channel) {
    const connection = joinVoiceChannel({
      channelId: message.member!.voice.channel.id,
      guildId: message.guild!.id,
      adapterCreator: message.guild!.voiceAdapterCreator,
    });

    const stream = ytdl(url, {
      filter: 'audioonly',
      dlChunkSize: 0,
      quality: 'highest',
      highWaterMark: 1 << 25,
    });

    const resource = createAudioResource(stream);
    const player = createAudioPlayer();

    connection.subscribe(player);
    player.play(resource);

    player.on(AudioPlayerStatus.Playing, () => {
      console.log('The bot has started playing audio.');
    });

    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy();
      console.log('The bot has finished playing audio.');
    });
  } else {
    message.channel.send('You need to join a voice channel first!');
  }
});

client.login(process.env.DISCORD_TOKEN);
