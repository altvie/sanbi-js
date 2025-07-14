# 🤖 Sanbi Bot
Discord bot using javascript.

## 🌳 Project Structure
```bash
discord-bot/
├── src/
│   ├── commands/
│   ├── ├── admin/
│   │   └── kick.js
│   ├── ├── general/
│   │   └── ping.js
│   ├── events/
│   │   ├── interactionCreate.js
│   │   └── ready.js
│   ├── config/
│   │   └── client.js
├── .env
├── index.js
├── .gitignore
├── package.json
└── README.md
```
## 📦 Installation
### 1. Clone the repository
```bash
git clone https://github.com/altvie/sanbi-js.git
cd sanbi-js
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup .env
```bash
cp .env-example .env
```
Change with your own value
```bash
BOT_TOKEN=your_bot_token
BOT_OWNER_ID=your_discord_user_id
CLIENT_ID=your_bot_application_id
GUILD_ID=your_dev_server_id
```

## 🧠 Usage
### Start the bot
```bash
npm run start
```

### Deploy your slash command to test server
```bash
npm run deploy
```