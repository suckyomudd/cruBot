import { Client, Collection, Guild, REST, Routes } from "discord.js";
import { GatewayIntentBits } from "discord.js";
import { readdir } from "fs/promises";
import Command from "../classes/Command";
import * as env from 'dotenv'

import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { dir } from "node:console";
import Module, { ModuleSource } from "node:module";
import interactionRouter from "../interactions/commands/interactionRouter";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class CruBot {    
    client:Client
    guild:Guild
    commands: Collection<string, Command>
    public constructor(
        client:Client, 
        guild:Guild, 
    ){       
        this.client = client
        this.guild = guild
        this.commands = new Collection<string, Command>()
        client.on('interactionCreate', async interaction => interactionRouter(interaction, this))
    }

    static async create() {
        // get env data
        const envPath = path.join(__dirname, '../../.env')
        const envData = env.config({'path': envPath, 'quiet':true}).parsed!
        const botToken = envData['BOT_TOKEN']
        const botGuild = envData['BOT_GUILD']
        
        // init client
        const client = new Client({intents:[GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds]})
        client.token = botToken

        // start client
        await client.login(client.token)

        // on ready
        client.on('clientReady', () => console.log('READY'))
        // fetch guild
        const guild = await client.guilds.fetch(botGuild)
        return new CruBot(client, guild)
    }
    
    async syncCommands() {
        const commandDirs:string[] = ['util']
        const commands:object[] = []

        for (const directory of commandDirs) {
            const p = path.join(__dirname, '..', 'commands', directory)
            const files = (await readdir(p)).filter((file:string) => file.endsWith('.ts'))

            for (const file of files) {
                const filePath = path.join(p, file)
                const commandModule = await import(filePath)
                const command:Command = commandModule.default
                this.commands.set(command.data.name, command)
                commands.push(command.data.toJSON())
            }
        }
        
        const token = this.client.token
        const appID = this.client.application?.id

        if (token == null || appID == null) {return}

        const rest = new REST({ version:'10' }).setToken(token)
        await rest.put(
            Routes.applicationCommands(appID),
            { body: {}}
        )
        await rest.put(
            Routes.applicationGuildCommands(appID, this.guild.id),
            { body: commands}
        )
    }
}

export default CruBot