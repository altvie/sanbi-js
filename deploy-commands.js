require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('@discordjs/rest');

const commands = [];

// Baca semua file command secara rekursif
const loadCommands = (dir = '') => {
  const basePath = path.join(__dirname, 'src', 'commands', dir);
  if (!fs.existsSync(basePath)) return;

  const files = fs.readdirSync(basePath);
  for (const file of files) {
    const fullPath = path.join(basePath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      loadCommands(path.join(dir, file));
    } else if (file.endsWith('.js')) {
      const Command = require(fullPath);
      const cmd = typeof Command === 'function' ? new Command() : null;
      if (cmd && cmd.data) {
        commands.push(cmd.data.toJSON());
      }
    }
  }
};
loadCommands();

// Bot + Server info dari environment
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('⏳ Refreshing application (/) commands...');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('✅ Successfully reloaded slash commands!');
  } catch (error) {
    console.error(error);
  }
})();
