import { Client, Collection } from 'discord.js';
import { Command } from './commands/commands';

class ExtendedClient extends Client {
  commands: Collection<string, Command>;

  constructor() {
    super({
      intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
      ]
    });
    this.commands = new Collection();
  }
}

export default ExtendedClient;
