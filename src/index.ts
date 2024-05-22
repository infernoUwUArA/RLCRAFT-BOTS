import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import ExtendedClient from './client';
import { Command } from './commands/commands';

dotenv.config();

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

if (!token) {
  throw new Error('DISCORD_TOKEN is not defined in .env file');
}

if (!prefix) {
  throw new Error('PREFIX is not defined in .env file');
}

const client = new ExtendedClient();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  import(filePath).then((commandModule) => {
    const command: Command | undefined = commandModule.default;

    if (command) {
      client.commands.set(command.name, command);
    } else {
      console.error(`Command module ${filePath} does not have a default export`);
    }
  }).catch(error => console.error(`Error loading command ${filePath}:`, error));
}

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

client.login(token);
