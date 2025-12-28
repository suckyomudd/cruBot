# cruBot DOCS

## Setting up the bot:
run the following commands in your terminal
    
    git clone https://github.com/suckyomudd/cruBot.git
    cd cruBot
    npm install
    npm run dev
    
- If this is the first time running the bot, the terminal will prompt you for some information.
- This will create your bot's .env configuration automatically.

If you wish to manually set up the bot, follow the instructions below.
- clone and cd into the project folder 
        
        git clone https://github.com/suckyomudd/cruBot.git
        cd cruBot
        echo >> .env

- inside the .env file, paste the code below and enter the necessary details
    
        BOT_TOKEN=your_token_here
        BOT_GUILD=your_server_guild_id_here

- run this command to start the bot

        npm run dev
