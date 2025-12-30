import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder, SlashCommandStringOption, TextBasedChannel } from 'discord.js'
import Command from '../../classes/Command'

const Purge:Command = {
    data: new SlashCommandBuilder()
        .setName('purge')                                                   // set the name of the slash command: /'purge'
        .setDescription('Clears all messages in a channel.')                // set the command description
    ,
    async execute(interaction: ChatInputCommandInteraction) {
        interaction.deferReply({flags:[MessageFlags.Ephemeral]})            // defer interaction if it can take longer than 3 seconds

        const channel = interaction.channel as TextBasedChannel             // need to tell typescript its a text based channel
        const messages = await channel.messages.fetch()                     // get the messages

        messages.forEach(async message => {                                 // for each message
            await message.delete()                                              // delete message
        })
        interaction.editReply(`Deleted ${messages.size} message(s)`)        // edit the interaction reply (the defered interaction message)
    }
}

export default Purge