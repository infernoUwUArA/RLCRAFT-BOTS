import { Message } from "discord.js";
import { Command } from "./commands";

const demote: Command = {
    name: 'demote',
    description: 'Demote a user',
    execute: async (message: Message, args: string[]) => {
        message.channel.send('User Demoted');
    }
};

export default demote;