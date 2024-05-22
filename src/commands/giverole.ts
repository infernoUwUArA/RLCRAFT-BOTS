import { Message } from 'discord.js';
import { Command } from './commands';

const giverole: Command = {
  name: 'giverole',
  description: 'Give a role to a user.',
  execute: async (message: Message, args: string[]) => {
    message.channel.send('Role given!');
  }
};

export default giverole;