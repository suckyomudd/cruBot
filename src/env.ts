import * as fs from 'fs/promises'
import * as env from 'dotenv'
import * as readline from 'readline/promises'

/**
 * check for env
 *      if no env create a file and prompt user for the details
 * load env
 *      check if all parameters are correct
 */

async function getenv() {
    const envFound = await findenv()
    if (envFound) return loadenv()
    else {
        await createenv()
        return loadenv()
    }
}

async function findenv(){
    const dirFiles = await fs.readdir('.')
    const envFound:boolean = dirFiles.includes('.env')
    return envFound
}


async function createenv(){
    console.log('Cannot find .env\nPlease follow the setup process.\n')
        
    const rl = readline.createInterface({
        'input': process.stdin,
        'output': process.stdout
    })
    const token = await rl.question('Bot token: ')
    const guild = await rl.question('Discord server ID (guild): ')

    const dotenvString = `
    BOT_TOKEN=${token}
    BOT_GUILD=${guild}
    `

    await fs.writeFile('.env', dotenvString)
}

async function loadenv():Promise<any> {
    const configData = env.config({'path': '.env', 'quiet':true}).parsed

    // check if valid .env
    if (configData) {
        if (configData['BOT_TOKEN'] && configData['BOT_GUILD']) return configData
        else {
            await fs.unlink('.env')
            return getenv()
        }
    }
    
}

export default getenv