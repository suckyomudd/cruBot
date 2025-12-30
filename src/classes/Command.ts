import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    SlashCommandOptionsOnlyBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import CruBot from '../cruBot/cruBot';

interface Command {
    // 2. Update the data property to accept either type
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: ChatInputCommandInteraction, client:CruBot) => Promise<void>;
}

export default Command