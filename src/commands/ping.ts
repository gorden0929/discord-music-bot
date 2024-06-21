import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getPlayerId } from '../player';

export const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  execute: async (interaction: CommandInteraction) => {
    console.log(getPlayerId());
    await interaction.reply('Pong!');
  },
};
