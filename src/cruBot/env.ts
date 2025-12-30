import * as fs from 'fs/promises'
import * as env from 'dotenv'
import * as readline from 'readline/promises'
import path from 'path'

async function assistedSetup() {
    const rl = readline.createInterface({
        'input': process.stdin,
        'output': process.stdout
    })

    // handle yes and no
    const data = [
        `BOT_TOKEN=${await rl.question('Bot token: ')}`,
        `BOT_GUILD=${await rl.question('Server guild ID: ')}`        
    ]
    rl.close()
    console.log('.env -> writing data')
    await fs.writeFile('.env', data.join('\n'))        
}

async function getenv() {
    
    // bool: root dir contains .env file
    const envFound = (await fs.readdir('.')).includes('.env')
    console.log('.env -> found:', envFound)

    if (envFound) {
        const envData = env.config({'path': path.join(__dirname, '.env'), 'quiet':true}).parsed!
        
        // check if valid .env
        console.log('.env -> verifying data')
        
        let envValid = false
        if (
            envData['BOT_TOKEN'] && 
            envData['BOT_GUILD']
        ) {
            console.log('.env -> valid:', true)
            return envData
        }
        
        else {
            envValid = false
            console.log('.env -> valid:', false)
            // setup
            await assistedSetup()
            return env.config({'path': path.join(__dirname, '.env'), 'quiet':true}).parsed!
        }
    
    }
    else {
        await assistedSetup()
        return env.config({'path': path.join(__dirname, '.env'), 'quiet':true}).parsed!
    }

}

export default getenv