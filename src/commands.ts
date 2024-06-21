// register slash commands
import { REST } from '@discordjs/rest';
import { commands } from './commands/_index';
import { Routes } from 'discord.js';

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

export const registerCommands = async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    const result = await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      {
        body: commands,
      }
    );
    console.log(result);

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};
