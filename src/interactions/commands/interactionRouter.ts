import { Interaction } from "discord.js";
import CruBot from "../../cruBot/cruBot";

function interactionRouter(interaction:Interaction, cruBot:CruBot) {
    if (interaction.isChatInputCommand()) {
        cruBot.commands.get(interaction.commandName)?.execute(interaction, cruBot)
    }
}
export default interactionRouter