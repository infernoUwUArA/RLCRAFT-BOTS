import { Message } from 'discord.js';
import { Command } from './commands';

const removerole: Command = {
  name: 'removerole',
  description: 'Remove a role from a user.',
  execute: async (message: Message, args: string[]) => {
    message.channel.send('Role removed!');
  }
};

export default removerole;
