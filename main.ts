import { chatInputApplicationCommandMention, ChatInputCommandInteraction, CommandInteraction, Interaction, InteractionType, makePlainError } from "discord.js";
import CruBot from "./src/cruBot/cruBot";
import path from 'path'
import * as env from 'dotenv'


// create bot instance
const cruBot = await CruBot.create()
await cruBot.syncCommands()

// async function main() {
//     await cruBot.init()
//     cruBot.on('interactionCreate', async (interaction:Interaction) => {
//     console.log(interaction.type == InteractionType.ApplicationCommand)
//     if (interaction.type == InteractionType.ApplicationCommand) {async () => {
//             console.log('test')    
//             const command = cruBot.commands.get(interaction.commandName)
//             command ? command.execute(interaction as ChatInputCommandInteraction, cruBot) : console.log('failed')
//         }}
//     })
// }


// main()