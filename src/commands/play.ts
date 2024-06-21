import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getPlayerId } from '../player';

export const play = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Adds a song to the queue'),
  execute: async (interaction: CommandInteraction) => {
    let id = crypto.randomUUID();
    console.log(id);

    await interaction.reply('Pong!');
  },
};
