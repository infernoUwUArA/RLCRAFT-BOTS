import { Message } from "discord.js";
import { Command } from "./commands";

const promote: Command = {
    name: 'promote',
    description: 'Promote a user.',
    execute: async (message: Message, args: string[]) => {
        message.channel.send('User Promoted');
    }
};

export default promote;